"use client";
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the required elements
ChartJS.register(ArcElement, Tooltip, Legend);

const OverallCostPie = ({ data }) => {
  const costs = data?.best_country?.Costs;

  const carbonData = {
    labels: ["Production", "Tarrifs", "Sea", "Land"],
    datasets: [
      {
        data: costs
          ? [
              costs[0] || 0, // Production with fallback to 0
              costs[1] || 0, // Sea with fallback to 0
              costs[2] || 0,
              costs[3] || 0,
            ]
          : [1, 1, 1], // Default data if carbon is undefined
        backgroundColor: ["#c9ada7", "#8d99ae", "#d9d9d9", "#e5e5e5"],
        border: 0
      },
    ],
  };

  return (
    <div className="p-2">
      <Pie data={carbonData} />
      <h1 className="text-center font-bold mt-2">
        Total Price: ${data?.best_country?.Total_cost?.toFixed(2) || "N/A"} /
        Ton
      </h1>
    </div>
  );
};

export default OverallCostPie;
