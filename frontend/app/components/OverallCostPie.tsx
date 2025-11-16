'use client';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the required elements
ChartJS.register(ArcElement, Tooltip, Legend);

const OverallCostPie = () => {
  
  const data = 
   { labels: ["Land-Costs", "Sea-Costs", "Base Cost", "Taxes and Regulatory Fees"],
    datasets: [
      {
        data: [100, 200, 300, 150 ],
        backgroundColor: ['#90e0ef', '#0077b6', '#1985a1', '#284b63 '],
      }
    ]}

  

  return (
    <div className="p-2">
      
      <Pie data={data} />
      <h1>Overall Cost</h1>
    </div>
  );
};

export default OverallCostPie;