// components/SimplePieChart.tsx
'use client';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the required elements
ChartJS.register(ArcElement, Tooltip, Legend);

const SourcesofCarbon = () => {
  

  const data = {
    labels: ['Methane', 'CO2', 'Tons of H2O used'],
    datasets: [
      {
        data: [30, 50, 20],
        backgroundColor: ["#8d99ae", "#edf2f4", '#2b2d42'],
      },
    ],
  };

  return (
    <div className="p-2">
      
      <Pie data={data} />
      <h1>Composition of Emissions</h1>
    </div>
  );
};

export default SourcesofCarbon;