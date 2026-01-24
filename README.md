# MITEC-Array-Technologies
MITEC Hackathon 2025 project for Array Technologies.

## Prompt
Create a tool addressing tradeoffs between cost and carbon emissions in the steel supply chain.

## Demo
https://drive.google.com/file/d/1ZzVplA4S4UbGyp0RlM4eqVAM4ZaH25QT/view?usp=drive_link

## What this project does
- Combines production emissions with estimated shipping and land transport costs.
- Filters viable origin countries based on user-inputted carbon and price targets.
- Returns the best route based on a weighted CO2 vs. cost score.
- Visualizes the results in a Next.js dashboard.

## Tech stack
- Frontend: Next.js + React, Chart.js, D3, Plotly
- Backend: FastAPI + Pandas + Plotly

## Repo structure
- `frontend`: Next.js app and dashboard UI
- `backend`: FastAPI API for route scoring and filtering
- `OptiCO2_pitch.pdf`: pitch deck

Diagram:
```text
.
├── backend
│   ├── __pycache__
│   ├── api_link.txt
│   ├── main.py
│   ├── main.pynb
│   ├── requirements.txt
│   └── runtime.txt
├── frontend
│   ├── app
│   ├── components
│   ├── lib
│   ├── public
│   ├── README.md
│   ├── filter.js
│   ├── package.json
│   └── ... (Next.js config files)
├── OptiCO2_pitch.pdf
├── README.md
├── package.json
└── package-lock.json
```

## Getting started
### Backend (FastAPI)
1) Install dependencies:
```bash
cd backend
pip install -r requirements.txt
```
2) Add `regional_steel_emissions.csv` to the repo root (see Sources).
3) Run the API:
```bash
cd backend
uvicorn main:app --reload
```

### Frontend (Next.js)
1) Install dependencies:
```bash
cd frontend
npm install
```
2) Start the dev server:
```bash
npm run dev
```
3) Open `http://localhost:3000/dashboard`.

## Sources
- https://worldsteel.org/data/world-steel-in-figures/world-steel-in-figures-2025/
- https://climatetrace.org/data (see `regional_steel_emissions.csv`)
- http://steelbenchmarker.com/history.pdf
