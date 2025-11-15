from fastapi import FastAPI, HTTPException
import pandas as pd
import numpy as np
from pydantic import BaseModel

app = FastAPI()

df = pd.read_csv("")

dest = {
    "Los Angeles": ["Los Angeles", 0],
    "Chicago": ["Chicago", 0],
    "New York": ["New York & New Jersey", 0],
    "Dallas": ["Houston", 239], 
    "Houston": ["Houston", 0] ,  
    "Detroit": ["Detroit",0] ,  
    "Minneapolis": ["Duluth", 154], 
    "Boston": ["Boston", 0],
    "Seattle": ["Seattle", 0],
    "Philadelphia": ["Philadelphia", 0],
    "San Jose": ["Oakland", 41],  
    "Atlanta": ["Savannah", 248],  
    "San Francisco": ["Oakland", 0],
    "Cleveland": ["Cleveland", 0],  
    "Portland": ["Portland", 0],
    "Milwaukee": ["Milwaukee", 0],   
    "Phoenix": ["Los Angeles", 372],  
    "St. Louis": ["St. Louis", 0],  
    "Cincinnati": ["Cincinnati", 0],  
    "San Diego": ["San Diego", 0],
    "Grand Rapids": ["Detroit", 157], 
    "Indianapolis": ["New York & New Jersey", 708],  
    "Pittsburgh": ["Pittsburgh", 0],    
    "Kansas City": ["Kansas City", 0],   
    "Memphis": ["Memphis", 0], 
    "Albuquerque": ["Los Angeles", 787] # example for Array Technologies
}

dest.df = pd.DataFrame(dest)



# return satisfactory cities given constraints
def satisfy(CO2_cap, price_cap, time_cap, steel_type):
    good_cities = []
    return good_cities

def weighted_sum(cities, CO2_weight, price_weight):
    score = cities["CO2_emissions"] * CO2_weight + cities["price"] * price_weight
    return score

# return optimal city given weights
def optimize(CO2_weight, price_weight):
    res = None
    for city in :
        if 

class InputData(BaseModel):
    CO2_cap: float
    price_cap: float
    time_cap: int 
    steel_type: int
    CO2_weiht: float
    price_weight: float

@app.get("/")
def root():
    return {}

@app.post("/cities")

@app.post("/routes")

@app.get("/routes")


