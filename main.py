from fastapi import FastAPI, HTTPException
import pandas as pd
import numpy as np
from pydantic import BaseModel
import math

app = FastAPI()

# CO2 emission and steel quantity by country
countries = ["CHN", "IND", "JPN", "USA", "RUS", "TUR", "BRA", "ITA", "DEU", "GBR"]
raw = pd.read_csv("regional_steel_emissions.csv")[["iso3_country", "emissions_quantity"]]
processed = raw.loc[raw["iso3_country"].isin(countries)].groupby("iso3_country").mean() / 1e6
processed["steel_quantity"] = [1005.1, 149.4, 84.0, 79.5, 71.0, 36.9, 33.8, 20.0, 37.2, 4.0] 

def co2perton(country):
    return processed.loc[country, "emissions_quantity"] / processed.loc[country, "steel_quantity"]
# df of [companies operating, origin port coords, co2 (ton/ton), steel cost ($/ton), tariff]
origin = {
    "CHN": [["China Baowu Steel Group", "HBIS Group (Hesteel)", "Shagang Group"], (38.97, 117.78), co2perton("CHN"), 0.5*co2perton("CHN")],
    "IND": [["JSW Steel", "Tata Steel", "SAIL (Steel Authority of India)"], (20.25, 86.67), co2perton("IND"), 0.5*co2perton("IND")],
    "JPN": [["Nippon Steel", "JFE Steel", "Kobe Steel"], (35.63, 139.77), co2perton("JPN"), 0.5*co2perton("JPN")],
    #"USA": [["Nucor", "United States Steel (U.S. Steel)", "Steel Dynamics"], 
    "RUS": [["NLMK (Novolipetsk Steel)", "MMK (Magnitogorsk Iron & Steel Works)", "Severstal"], (44.74, 37.78), co2perton("RUS"), 0.5*co2perton("RUS")],
    "TUR": [["Erdemir", "İsdemir", "Tosyali Holding"], (38.42, 27.13), co2perton("TUR"), 0.5*co2perton("TUR")],
    "BRA": [["Gerdau", "CSN (Companhia Siderúrgica Nacional)", "Usiminas"], (-23.95, -46.35), co2perton("BRA"), 0.5*co2perton("BRA")],
    "ITA": [["ArcelorMittal Italia", "Thyssenkrupp Acciai Speciali Terni"], (44.40, 8.92), co2perton("ITA"), 0.5*co2perton("ITA")],
    "DEU": [["ThyssenKrupp Steel Europe", "Salzgitter AG", "ArcelorMittal Germany"], (53.55, 10.00), co2perton("DEU"), 0.5*co2perton("DEU")],
    "GBR": [["British Steel", "Celsa Steel UK", "Liberty Steel Group"], (53.65, 0.22), co2perton("GBR"), 0.25*co2perton("GBR")]
}
origin_df = pd.DataFrame.from_dict(origin, 
                                   orient="index", 
                                   columns=["Companies", "Origin_port", "CO2_emissions_ton_per_ton", "Steel_cost_per_ton", "Tariff_cost"])

# df of [coords of port, dist to port]
dest = { 
    "Los Angeles": [(33.74, -118.27), 0],
    "Chicago": [(41.89, -87.61), 0],
    "New York": [(40.67, -74.04), 0],
    "Dallas": [(29.73, -95.27), 239], 
    "Houston": [(29.73, -95.27), 0] ,  
    "Detroit": [(42.33, -83.04),0] ,  
    "Minneapolis": [(46.78, -92.11), 154], 
    "Boston": [(42.37, -71.04), 0],
    "Seattle": [(47.61, -122.35), 0],
    "Philadelphia": [(39.95, -75.16), 0],
    "San Jose": [(37.80, -122.29), 41],  
    "Atlanta": [(32.10, -81.10), 248],  
    "San Francisco": [(37.80, -122.29), 0],
    "Cleveland": [(41.48, -81.67), 0],  
    "Portland": [(43.66, -70.25), 0],
    "Milwaukee": [(43.07, -87.96), 0],   
    "Phoenix": [(33.74, -118.27), 372],  
    "St. Louis": [(38.62, -90.20), 0],  
    "Cincinnati": [(39.10, -84.54), 0],  
    "San Diego": [(32.83, -117.12), 0],
    "Grand Rapids": [(42.33, -83.04), 157], 
    "Indianapolis": [(40.67, -74.04), 708],  
    "Pittsburgh": [(40.44, -79.98), 0],    
    "Kansas City": [(39.12, -94.55), 0],   
    "Memphis": [(35.10, -90.10), 0], 
    "Albuquerque": [(33.74, -118.27), 787] # example for Array Technologies
}

dest_df = pd.DataFrame.from_dict(dest, 
                                 orient="index", 
                                 columns=["Port", "Distance_miles"])

# estimate port to port shipping distance using Haversine formula
def haversine(y1, x1, y2, x2):
    R = 6371.0

    # Convert degrees to radians
    phi1 = math.radians(y2)
    phi2 = math.radians(y2)
    delta_phi = math.radians(y2 - y1)
    delta_lambda = math.radians(x2 - x1)

    # Haversine formula
    a = math.sin(delta_phi / 2)**2 + \
        math.cos(phi1) * math.cos(phi2) * math.sin(delta_lambda / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    distance = R * c
    return distance

# df of origin, destination pairs
o = origin_df.reset_index().rename(columns={"index": "origin"})
d = dest_df.reset_index().rename(columns={"index": "destination"})
pairs = o.merge(d, how="cross")
pairs["Costs"] = [[] for _ in range(len(pairs))]
pairs["CO2_list"] = [[] for _ in range(len(pairs))]
pairs = pairs.set_index(["origin", "destination"])


# return satisfactory sources given constraints
def satisfy(CO2_target, price_target):
    good_src = []
    return good_src

#weighted sum 
def weighted_sum(cities, CO2_weight):
    score = cities["CO2_emissions"] * CO2_weight + cities["price"] * (1 - CO2_weight)
    return score

class InputData(BaseModel):
    CO2_target: float
    price_target: float
   # time_cap: int 
   # steel_type: int #index
    CO2_weight: float

@app.get("/")
def root():
    return {}

@app.post("/cities")

@app.post("/routes", response_model=dict)
def get_routes(data: InputData):


@app.get("/routes")
