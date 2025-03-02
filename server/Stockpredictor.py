import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from datetime import datetime

def create_training_dataset():
    """
    Creates a new training dataset with updated product details for model training.
    """
    training_data = [
        {'last_month_sales': 100, 'last_year_same_month_sales': 110, 'last_year_last_month_sales': 105, 'target': 105},
        {'last_month_sales': 200, 'last_year_same_month_sales': 205, 'last_year_last_month_sales': 195, 'target': 215},
         {'last_month_sales': 220, 'last_year_same_month_sales': 205, 'last_year_last_month_sales': 195, 'target': 240},
        {'last_month_sales': 150, 'last_year_same_month_sales': 150, 'last_year_last_month_sales': 140, 'target': 165},
        {'last_month_sales': 300, 'last_year_same_month_sales': 300, 'last_year_last_month_sales': 290, 'target': 320},
        {'last_month_sales': 50, 'last_year_same_month_sales': 45, 'last_year_last_month_sales': 40, 'target': 55},
         {'last_month_sales': 50, 'last_year_same_month_sales': 45, 'last_year_last_month_sales': 50, 'target': 47},
         {'last_month_sales': 70, 'last_year_same_month_sales': 45, 'last_year_last_month_sales': 40, 'target': 100},
         {'last_month_sales': 30, 'last_year_same_month_sales': 45, 'last_year_last_month_sales': 20, 'target': 50},
        {'last_month_sales': 150, 'last_year_same_month_sales': 160, 'last_year_last_month_sales': 155, 'target': 155},
        {'last_month_sales': 150, 'last_year_same_month_sales': 100, 'last_year_last_month_sales': 150, 'target': 95},
         {'last_month_sales': 300, 'last_year_same_month_sales': 480, 'last_year_last_month_sales': 200, 'target': 560},
        {'last_month_sales': 500, 'last_year_same_month_sales': 480, 'last_year_last_month_sales': 470, 'target': 560},
        {'last_month_sales': 1200, 'last_year_same_month_sales': 1190, 'last_year_last_month_sales': 1185, 'target': 1205},
        {'last_month_sales': 800, 'last_year_same_month_sales': 810, 'last_year_last_month_sales': 800, 'target': 812},
        {'last_month_sales': 100, 'last_year_same_month_sales': 110, 'last_year_last_month_sales': 108, 'target': 102},
        {'last_month_sales': 1800, 'last_year_same_month_sales': 1750, 'last_year_last_month_sales': 1700, 'target': 1900},
        {'last_month_sales': 600, 'last_year_same_month_sales': 590, 'last_year_last_month_sales': 580, 'target': 610}
    ]
    return pd.DataFrame(training_data)

def prepare_features(df):
    """
    Extracts and prioritizes the features for the model.
    """
    features = df[['last_month_sales', 'last_year_same_month_sales', 'last_year_last_month_sales']]
    return features

def train_stock_predictor():
    """
    Trains the random forest regression model.
    """
    train_df = create_training_dataset()
    X = prepare_features(train_df)
    y = train_df['target']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    predictions = model.predict(X_test)

    mse = mean_squared_error(y_test, predictions)
    print(f'Mean Squared Error: {mse}')

    return model

def extract_features(df):
    """
    Extracts last month's sales, last year's same month sales, and last year's last month sales from the fetched data.
    """
    current_month = datetime.now().month
    print(f'Current Month: {current_month}')
    df['last_month_sales'] = df['current_month_sales']  # Last month sales directly from current month sales
    df['last_year_same_month_sales'] = df['yearly_sales'].apply(lambda x: x[current_month - 1])  # Same month last year
    df['last_year_last_month_sales'] = df['yearly_sales'].apply(lambda x: x[current_month - 2] if current_month > 1 else x[-1])  # Last month last year
    return df[['last_month_sales', 'last_year_same_month_sales', 'last_year_last_month_sales']]

def predict_next_month_stock(model, fetched_df):
    """
    Predicts stock for the next month using the trained model on fetched data.
    """
    features = extract_features(fetched_df)
    predictions = model.predict(features)
    fetched_df['predicted_stock_next_month'] = predictions
    return fetched_df

if __name__ == '__main__':
    from Fetch import fetch_product_data  # Assuming the fetched data script is named data_fetcher.py

    model = train_stock_predictor()
    fetched_df = fetch_product_data()
    result = predict_next_month_stock(model, fetched_df)
    print(result[['product_name', 'last_month_sales', 'last_year_same_month_sales', 'last_year_last_month_sales', 'predicted_stock_next_month']])
