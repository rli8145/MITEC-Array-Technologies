'use client';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the required elements
ChartJS.register(ArcElement, Tooltip, Legend);

const OverallCostPie = ({data}) => {

  const carbon = data?.best_country?.Carbon;



  const carbonData = 
   { labels: ["Production Emissions", "Sea Emissions", "Land Emissions",],
    datasets: [
      {
        data: carbon ? [
          carbon[0] || 0,  // Production with fallback to 0
          carbon[1] || 0,  // Sea with fallback to 0  
          carbon[2] || 0   // Land with fallback to 0
        ] : [1, 1, 1], // Default data if carbon is undefined
        backgroundColor: ['#90e0ef', '#0077b6', '#1985a1'],
        borderColor: ['#90e0ef', '#0077b6', '#1985a1'],
        borderWidth: 2,
      }
    ]}

  

  return (
    <div className="p-2">
      
      <Pie data={carbonData} />
      <h1 className="text-center font-bold mt-2">
        Total Carbon: {data?.best_country?.Total_carbon?.toFixed(2) || 'N/A'} kg
      </h1>
      <p className="text-sm text-gray-600 text-center">
        Sea Distance: {data?.best_country?.Sea_distance?.toFixed(0) || 'N/A'} km
      </p>
    </div>
  );
};

export default OverallCostPie;