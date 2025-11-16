from fastapi import FastAPI, HTTPException
import pandas as pd
from pydantic import BaseModel
import math

app = FastAPI()

# CO2 emission and steel quantity by country
countries = ["CHN", "IND", "JPN", "RUS", "TUR", "BRA", "ITA", "DEU", "GBR"]
raw = pd.read_csv("regional_steel_emissions.csv")[["iso3_country", "emissions_quantity"]]
processed = raw.loc[raw["iso3_country"].isin(countries)].groupby("iso3_country").mean() / 1e6
processed["steel_quantity"] = [1005.1, 149.4, 84.0, 71.0, 36.9, 20.0, 37.2, 4.0] 

# origin DataFrame
def co2perton(country):
    return processed.loc[country, "emissions_quantity"] / processed.loc[country, "steel_quantity"]
origin = {
    "CHN": [["China Baowu Steel Group", "HBIS Group (Hesteel)", "Shagang Group"], (38.97, 117.78), [co2perton("CHN")], [470, 235]],
    "IND": [["JSW Steel", "Tata Steel", "SAIL (Steel Authority of India)"], (20.25, 86.67), [co2perton("IND")], [600, 300]],
    "JPN": [["Nippon Steel", "JFE Steel", "Kobe Steel"], (35.63, 139.77), [co2perton("JPN")], [525, 262.5]],
    "RUS": [["NLMK (Novolipetsk Steel)", "MMK (Magnitogorsk Iron & Steel Works)", "Severstal"], (44.74, 37.78), [co2perton("RUS")], [700, 350]],
    "TUR": [["Erdemir", "İsdemir", "Tosyali Holding"], (38.42, 27.13), [co2perton("TUR")], [705, 352.5]],
    "BRA": [["Gerdau", "CSN (Companhia Siderúrgica Nacional)", "Usiminas"], (-23.95, -46.35), [co2perton("BRA")], [650, 325]],
    "ITA": [["ArcelorMittal Italia", "Thyssenkrupp Acciai Speciali Terni"], (44.40, 8.92), [co2perton("ITA")], [700, 350]],
    "DEU": [["ThyssenKrupp Steel Europe", "Salzgitter AG", "ArcelorMittal Germany"], (53.55, 10.00), [co2perton("DEU")], [670, 335]],
    "GBR": [["British Steel", "Celsa Steel UK", "Liberty Steel Group"], (53.65, 0.22), [co2perton("GBR")], [750, 187.5]]
}
origin_df = pd.DataFrame.from_dict(origin, 
                                   orient="index", 
                                   columns=["Companies", "Origin_port", "Carbon", "Costs"])

# destination DataFrame
dest = { 
    "Los Angeles": [(33.74, -118.27), 0],
    "Chicago": [(41.89, -87.61), 0],
    "New York": [(40.67, -74.04), 0],
    "Dallas": [(29.73, -95.27), 380], 
    "Houston": [(29.73, -95.27), 0] ,  
    "Detroit": [(42.33, -83.04),0] ,  
    "Minneapolis": [(46.78, -92.11), 246], 
    "Boston": [(42.37, -71.04), 0],
    "Seattle": [(47.61, -122.35), 0],
    "Philadelphia": [(39.95, -75.16), 0],
    "San Jose": [(37.80, -122.29), 66],  
    "Atlanta": [(32.10, -81.10), 397],  
    "San Francisco": [(37.80, -122.29), 0],
    "Cleveland": [(41.48, -81.67), 0],  
    "Portland": [(43.66, -70.25), 0],
    "Milwaukee": [(43.07, -87.96), 0],   
    "Phoenix": [(33.74, -118.27), 595],  
    "St. Louis": [(38.62, -90.20), 0],  
    "Cincinnati": [(39.10, -84.54), 0],  
    "San Diego": [(32.83, -117.12), 0],
    "Grand Rapids": [(42.33, -83.04), 251], 
    "Indianapolis": [(40.67, -74.04), 1132],  
    "Pittsburgh": [(40.44, -79.98), 0],    
    "Kansas City": [(39.12, -94.55), 0],   
    "Memphis": [(35.10, -90.10), 0], 
    "Albuquerque": [(33.74, -118.27), 1259] # example for Array Technologies
}
dest_df = pd.DataFrame.from_dict(dest, 
                                 orient="index", 
                                 columns=["Dest_port", "Land_distance"])

# estimate shipping distance using Haversine formula
def haversine(y1, x1, y2, x2):
    R = 6371.0

    # Convert degrees to radians
    phi1 = math.radians(y1)
    phi2 = math.radians(y2)
    delta_phi = math.radians(y2 - y1)
    delta_lambda = math.radians(x2 - x1)

    # Haversine formula
    a = math.sin(delta_phi / 2)**2 + \
        math.cos(phi1) * math.cos(phi2) * math.sin(delta_lambda / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    distance = R * c
    return distance

# final DataFrame indexed by Origin, Destination. 
# Columns: Companies, Origin_port, Dest_port, Land_distance, Sea_distance, Carbon [Production, Sea, Land], Costs [Production, Tariffs, Sea, Land], Total_cost, Final_cost
o = origin_df.reset_index().rename(columns={"index": "Origin"})
d = dest_df.reset_index().rename(columns={"index": "Destination"})
final = o.merge(d, how="cross")

final["Sea_distance"]= final.apply(lambda row: 
                                   haversine(row["Origin_port"][0], row["Origin_port"][1], row["Port"][0], row["Port"][1]), axis=1)
final["Costs"] = final.apply(lambda row: row["Costs"] 
                             + [0.0025 * row["Sea_distance"], 0.16 * row["Land_distance"]], axis=1)
final["Carbon"] = final.apply(lambda row: row["Carbon"] 
                              + [8 * row["Sea_distance"], 18 * row["Land_distance"]], axis=1)
final["Total_carbon"] = final["Carbon"].apply(sum)
final["Total_cost"] = final["Costs"].apply(sum)
final = final.set_index(["Origin", "Destination"])

#*******************************************

class InputData(BaseModel):
    Destination: str
    CO2_target: float
    price_target: float
    CO2_weight: float

@app.post("/routes")
def get_routes(data: InputData):
    valid = final[
        (final["Destination"] == data.Destination) &
        (final["Total_carbon"] <= data.CO2_target) &
        (final["Total_cost"] <= data.price_target)]

    if valid.empty:
        raise HTTPException(status_code=400, 
                            detail="No countries satisfy the given targets. Please relax your targets and try again.")
    
    # Compute weighted score
    valid = valid.copy()
    valid["score"] = valid["Total_carbon"] * data.CO2_weight + valid["Total_cost"] * (1 - data.CO2_weight)
    best = valid.loc[valid["score"].idxmin()]
    
    return {
        "valid_countries": valid.reset_index()["Origin"].tolist(),
        "best_country": best.to_dict()
    }