import pandas as pd
import os
from datetime import datetime

def create_sample_dataset():
    """
    Creates a sample dataset containing product details.
    """
    data = {
        'product_id': [101, 102, 103, 104, 105],
        'product_name': ['Milk', 'Chips Early', 'Chips Late', 'Product X', 'Product Y'],
        'expiry_date': ['04/03/25', '05/03/25', '15/03/25', '07/03/25', '10/08/23'],
        'shelf_life': [2, 15, 15, 30, 10],
        'current_month_sales': [200, 200, 150, 300, 50],
        'yearly_sales': [
            [190, 195, 200, 205, 210, 200, 195, 205, 200, 198, 202, 200],
            [180, 190, 195, 200, 205, 210, 200, 195, 190, 200, 205, 210],
            [140, 145, 110, 155, 150, 145, 140, 150, 155, 150, 145, 150],
            [280, 290, 300, 310, 300, 290, 280, 300, 310, 305, 295, 300],
            [45, 50, 55, 50, 45, 50, 55, 50, 45, 50, 55, 50]
        ],
        'stocks_left': [50, 80, 70, 150, 20],
        'product_delay': [1, 2, 1, 3, 0],
        'margin': [5, 10, 8, 15, 7]  # Sample margin values
    }
    df = pd.DataFrame(data)
    df['expiry_date'] = pd.to_datetime(df['expiry_date'], format='%d/%m/%y')
    return df

def fetch_product_data(file_path='product_details.csv'):
    """
    Fetches product details data from a CSV file.
    """
    if os.path.exists(file_path):
        df = pd.read_csv(file_path)
        df['expiry_date'] = pd.to_datetime(df['expiry_date'], format='%d/%m/%y')
    else:
        df = create_sample_dataset()
    return df

if __name__ == '__main__':
    df = fetch_product_data()
    print(df)
