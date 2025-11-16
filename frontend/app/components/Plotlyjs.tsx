"use client";
import { useEffect, useState } from "react";
import * as d3 from "d3";
import dynamic from "next/dynamic";
import { getDisplayName } from "next/dist/shared/lib/utils";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <div>Loading map...</div>,
});

interface PrecipMapProps {
  queryResult?: number[]; // optional, initially undefined
}

export default function PrecipMap({ queryResult }: PrecipMapProps) {
  const [data, setData] = useState<any[] | null>(null);

  useEffect(() => {
    // Load the CSV first
    d3.csv("/dummydata.csv").then((rows) => {
      const csvTrace = {
        type: "scattergeo",
        mode: "markers",
        lat: rows.map((r) => Number(r.Lat)),
        lon: rows.map((r) => Number(r.Lon)),
        text: rows.map(
          (r) => `${r.City}<br>Cost: $${r.SteelCost}<br>CO2: ${r.CO2Emission}`
        ),
        marker: {
          color: "rgba(255, 199, 0, 0.8)",
          size: 10,
          line: { color: "rgba(255, 135, 0, 0.8)", width: 1 },
        },
      };

      const traces = [csvTrace];

      if (queryResult && queryResult.length >= 2) {
        traces.push({
          type: "scattergeo",
          mode: "markers",
          lat: [queryResult[0]], 
          lon: [queryResult[1]], 
          text: ["Best Country"],
          marker: {
            color: "rgba(0, 200, 0, 0.8)",
            size: 12,
            line: { color: "rgba(0, 100, 0, 0.8)", width: 1 },
          },
        });
      }

      setData(traces); // set all traces at once
    });
  }, [queryResult]); // re-run whenever queryResult changes

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
        margin: { r: 0, t: 0, l: 0, b: 0 },
        height: 520,
        width: 1000,
        dragmode: false,
        showlegend: false, 
      }}
      style={{ width: "100%", height: "100%" }}
      config={{ responsive: true }}
    />
  );
}
