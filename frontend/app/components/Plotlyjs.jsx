"use client";
import { useEffect, useState } from "react";
import * as d3 from "d3";
import dynamic from 'next/dynamic';

// Dynamic import for Plotly - loads only on client side
const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => <div>Loading map...</div>
});

export default function PrecipMap() {
  const [data, setData] = useState(null);

  useEffect(() => {
    d3.csv("/dummydata.csv")
      .then((rows) => {
        console.log("CSV loaded:", rows);
        const get = (k) => rows.map((r) => Number(r[k]));

        setData([
          {
            type: "scattergeo",
            mode: "markers",
            lat: get("Lat"),
            lon: get("Lon"),
            text: rows.map(
              (r) => `${r.City}<br>Cost: $${r.SteelCost}<br>CO2: ${r.CO2Emission}`
            ),
            marker: {
				color: 'rgba(255, 199, 0, 0.8)',
				size: 10,
				line: {
				color: 'rgba(255, 135, 0, 0.8)',
				width: 1,}
				}
          }
        ]);
      });
  }, []);

  const handleClick = (event) => {
    if (event.points && event.points.length > 0) {
      const point = event.points[0];
      console.log(`You clicked on ${point.text}`);
    }
  };

  if (!data) return <div>Loading data...</div>;

  return (
    <Plot
      data={data}
      layout={{
        geo: {
          projection: { type: "equirectangular" },
          showcountries: true,
          showland: true,
          landcolor: "#f0f0f0",
        },
        dragmode: false,
        margin: { r: 0, t: 0, l: 0, b: 0 },
        height: 500,
      }}
      style={{ width: "100%", height: "500px" }}
      config={{ responsive: true }}
      onClick={handleClick}
    />
  );
}