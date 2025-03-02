import sys
import os
import pandas as pd
import numpy as np
from datetime import datetime
from ExpPredictor import train_alert_model, predict_alert_for_product
from Fetch import fetch_product_data

def calculate_discount_score(df):
    """
    Computes a discount score for each product based on:
      - Margin (higher is better)
      - Current month sales (lower is better)
      - Expiry ratio (closer to 1 means product is nearing expiry)
      
    Each attribute contributes equally (1 point maximum each).
    """
    # Train expiry alert model from ExpPredictor and compute expiry ratio for each product.
    alert_model = train_alert_model()
    expiry_ratios = []
    for _, row in df.iterrows():
        predicted_alert, _ = predict_alert_for_product(row, alert_model)
        expiry_ratios.append(predicted_alert)
    df['expiry_ratio'] = expiry_ratios
    
    # Exclude products that are already expired (expiry ratio >= 1.0)
    eligible_df = df[df['expiry_ratio'] < 1.0].copy()
    if eligible_df.empty:
        return eligible_df
    
    # Normalize margin score: higher margin yields a higher score.
    max_margin = eligible_df['margin'].max() if eligible_df['margin'].max() != 0 else 1
    eligible_df['margin_score'] = eligible_df['margin'] / max_margin
    
    # Normalize sales score: lower current sales yields a higher score.
    min_sales = eligible_df['current_month_sales'].min()
    max_sales = eligible_df['current_month_sales'].max() if eligible_df['current_month_sales'].max() != min_sales else min_sales + 1
    eligible_df['sales_score'] = 1 - ((eligible_df['current_month_sales'] - min_sales) / (max_sales - min_sales))
    
    # Expiry score: directly use the expiry ratio (closer to 1 means more urgency).
    eligible_df['expiry_score'] = eligible_df['expiry_ratio']
    
    # Total score (each attribute is weighted equally)
    eligible_df['total_score'] = eligible_df['margin_score'] + eligible_df['sales_score'] + eligible_df['expiry_score']
    
    return eligible_df

def suggest_discounts(df, threshold=2.0):
    """
    Suggests discounts for products whose total score is at least the threshold.
    
    Returns a DataFrame with discount suggestions.
    """
    eligible_df = calculate_discount_score(df)
    discount_df = eligible_df[eligible_df['total_score'] >= threshold].copy()
    
    # Example: derive a suggested discount percentage based on the total score
    discount_df['suggested_discount'] = (discount_df['total_score'] - threshold) * 10  # Adjust scaling as needed
    
    return discount_df[['product_id', 'product_name', 'margin', 'current_month_sales', 
                        'expiry_ratio', 'total_score', 'suggested_discount']]

def demo_main():
    # Fetch product data from Fetch.py
    df = fetch_product_data()
    discount_suggestions = suggest_discounts(df, threshold=2.0)
    
    print("Discount Suggestions:")
    if discount_suggestions.empty:
        print("No products meet the criteria for discount suggestions.")
    else:
        print(discount_suggestions)

if __name__ == '__main__':
    demo_main()
