import sys
import os
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from sklearn.ensemble import RandomForestRegressor

# Ensure the current directory is in the Python path
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.append(current_dir)

from Fetch import fetch_product_data  # Import the data fetching function from Fetch.py

############################################
# Existing Expiry Prediction Functions
############################################

def train_alert_model():
    ref_date = datetime.now()
    synthetic_data = {
        'shelf_life': [2, 547.5, 180, 30, 15],
        'alert_threshold': [0.5, 30, 20, 7, 2],
        'time_left': [0.3, 15, 10, 3, 1]
    }
    synthetic_data['expiry_date'] = [ref_date + timedelta(days=tl) for tl in synthetic_data['time_left']]
    targets = []
    for i in range(len(synthetic_data['shelf_life'])):
        tl = synthetic_data['time_left'][i]
        thresh = synthetic_data['alert_threshold'][i]
        if tl <= 0:
            target = 1.0
        elif tl >= thresh:
            target = 0.0
        else:
            target = 1 - (tl / thresh)
        targets.append(target)
    synthetic_data['target'] = targets
    train_df = pd.DataFrame({
        'shelf_life': synthetic_data['shelf_life'],
        'days_left': [(synthetic_data['expiry_date'][i] - ref_date).total_seconds()/86400 
                      for i in range(len(synthetic_data['shelf_life']))],
        'target': synthetic_data['target']
    })
    features = ['shelf_life', 'days_left']
    X = train_df[features]
    y = train_df['target']
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X, y)
    return model

def predict_alert_for_product(product_row, model):
    now = datetime.now()
    days_left = (product_row['expiry_date'] - now).total_seconds() / (24 * 3600)
    if days_left < 0:
        return 1.0, days_left
    features = {'shelf_life': product_row['shelf_life'], 'days_left': days_left}
    input_data = pd.DataFrame([features])
    predicted_alert = model.predict(input_data)[0]
    return predicted_alert, days_left

def expiarypredictor(df, model, alert_cutoff=0.5):
    alerts = []
    for _, row in df.iterrows():
        predicted_alert, days_left = predict_alert_for_product(row, model)
        if predicted_alert >= alert_cutoff:
            alert_message = "already expired" if predicted_alert >= 1.0 else round(predicted_alert, 2)
            alerts.append({
                'product_id': row['product_id'],
                'product_name': row['product_name'],
                'days_left': round(days_left, 2),
                'predicted_alert': alert_message
            })
    return alerts


def demo_main():
    df = fetch_product_data()
    expiry_model = train_alert_model()
    expiry_alerts = expiarypredictor(df, expiry_model, alert_cutoff=0.5)
    print("Predicted Expiry Alerts:")
    for alert in expiry_alerts:
        print(alert)
    
   

if __name__ == '__main__':
    demo_main()
