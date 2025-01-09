import React from 'react';
import { Bar } from 'react-chartjs-2';

const GraphSummary = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Expenses',
        data: data.values,
        backgroundColor: '#4c8bf5',
        borderColor: '#4c8bf5',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Expenses Overview</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default GraphSummary;
