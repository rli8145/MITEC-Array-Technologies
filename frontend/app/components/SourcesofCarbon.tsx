  // components/SimplePieChart.tsx
  "use client";
  import React from "react";
  import { Pie } from "react-chartjs-2";
  import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

  // Register the required elements
  ChartJS.register(ArcElement, Tooltip, Legend);

  const SourcesofCarbon = ({ data }) => {
    const carbon = data?.best_country?.Carbon;

    const carbonData = {
      labels: ["Production Emissions", "Sea Emissions", "Land Emissions"],
      datasets: [
        {
          data: carbon
            ? [
                carbon[0] || 0, // Production with fallback to 0
                carbon[1] || 0, // Sea with fallback to 0
                carbon[2] || 0, // Land with fallback to 0
              ]
            : [1, 1, 1], // Default data if carbon is undefined
          backgroundColor: ["#c6ac8f", "#4c5c68 ", "#46494c"],
        },
      ],
    };
    return (
      <div className="p-2">
        <Pie data={carbonData} />
        <h1 className="text-center font-bold mt-2">
          Total Carbon Emissions:  {""}
          {data?.best_country?.Total_carbon?.toFixed(2) || "N/A"} 
          &nbsp;
            tCO<sub>2</sub> / Ton
        </h1>
      </div>
    );
  };

  export default SourcesofCarbon;
