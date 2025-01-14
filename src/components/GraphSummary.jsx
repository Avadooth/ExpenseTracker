import { React, useEffect } from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  CategoryScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";

ChartJS.register(
  LineElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement
);

const GraphSummary = ({ data = [] }) => {
  console.log("expenses---->>>>", data);
  if (data.length === 0) {
    return <div>No expenses available</div>;
  }
  const lineChartData = {
    labels: data.map((exp) =>
      new Date(exp.date).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    ),
    datasets: [
      {
        label: "Expenses Over Time",
        data: data.map((exp) => exp.amount),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Expenses Over Time" },
    },
    scales: {
      x: { type: "category" },
      y: { type: "linear" },
    },
  };

  const categoryTotals = data.reduce((acc, expense) => {
    console.log("Category:", expense.category, "Amount:", expense.amount);
    if (expense.category && expense.amount) {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    }
    return acc;
  }, {});

  console.log("categoryTotals-------->>>>>", categoryTotals);

  const chartData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
      },
    ],
  };

  console.log("chartData-------->>>", chartData);

  useEffect(() => {
    return () => {
      Object.keys(ChartJS.instances).forEach((key) => {
        const chart = ChartJS.instances[key];
        if (chart) chart.destroy();
      });
    };
  }, []);

  return (
    <>
      <div className="flex pt-3">
        <div className="w-1/4 p-2 bg-white shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Pie Chart</h2>
          <Pie data={chartData} />
        </div>
        <div className="w-3/4 p-2 bg-white shadow-lg rounded-lg ml-4">
          <h2 className="text-lg font-semibold mb-2">Line Chart</h2>
          <Line data={lineChartData} options={options} />
        </div>
      </div>
    </>
  );
};

export default GraphSummary;
