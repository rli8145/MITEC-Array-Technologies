from fastapi import FastAPI, HTTPException
import pandas as pd
import numpy as np
from pydantic import BaseModel

app = FastAPI()

steel_types = []
df = pd.read_csv("")

dest = {}
dest.df = pd.DataFrame(dest)

source = {}
source.df = pd.DataFrame(source)

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


