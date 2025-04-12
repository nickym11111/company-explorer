import os
import pandas as pd
from sqlalchemy import create_engine, Column, Integer, String, Text, Float, ForeignKey, DateTime
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
import sqlite3
from datetime import datetime

DATABASE_URL = "sqlite:///./companies.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False}) # connects to local SQLite file
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine) # factory for database sessions

Base = declarative_base()

# gives connection to DB
def get_db(): 
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    Base.metadata.create_all(bind=engine)
    
    # check if companies table has rows
    conn = sqlite3.connect("companies.db")
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM companies")
    count = cursor.fetchone()[0]
    conn.close()
    
    if count == 0:
        import_data_from_csv()

def import_data_from_csv():
    if not os.path.exists("companies.csv"):
        print("CSV file not found")
        return
    
    df = pd.read_csv("companies.csv")
    # normalize names
    df.columns = [col.lower().replace(' ', '_') for col in df.columns]
    
    column_mapping = {
        'entity_id': 'entity_id',
        'name': 'name',
        'domain': 'domain',
        'headcount': 'headcount',
        'year_founded': 'year_founded',
        'hq_location': 'hq_location',
        'description': 'description',
        'linkedin_url': 'linkedin_url',
        'headcount_change_3m': 'headcount_change_3m',
        'headcount_change_6m': 'headcount_change_6m',
        'headcount_change_1y': 'headcount_change_1y',
        'keywords': 'keywords'
    }
    
    # get only columns that are in my csv
    columns_to_use = [col for col in column_mapping.keys() if col in df.columns]
    df = df[columns_to_use]
    
    # rename columns based on my mapping
    df.rename(columns={col: column_mapping[col] for col in columns_to_use}, inplace=True)
    
    # make a database connection
    conn = sqlite3.connect("companies.db")
    
    # Write to the database
    df.to_sql("companies", conn, if_exists="append", index=False)
    conn.close()
    
    print(f"Imported {len(df)} companies from CSV")