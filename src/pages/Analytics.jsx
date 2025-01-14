import React, { useEffect, useState } from "react";
import RecentTransactions from "../components/RecentTransactions";
import GraphSummary from "../components/GraphSummary";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const Analytics = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchExpenses = async () => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please log in again.");
      }

      // Send the fetch request with Authorization header
      const response = await fetch(
        "http://localhost:8000/api/expense/getexpense",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check if response is okay
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse and set the data
      const data = await response.json();
      setExpenseData(data);

      console.log("data_Analytics----------->>>>>", data);
    } catch (error) {
      console.error("Error fetching expenses:", error.message);
      alert("Failed to fetch expenses. Please try again later.");
    }
  };
  useEffect(() => {
    fetchExpenses();
  }, []);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleAddExpenseClick = () => {
    navigate("/dashboard"); // Redirect to the dashboard page
  };
  const totalSpent = () => {
    return expenseData.reduce((total, item) => total + (item.amount || 0), 0);
  };

  const downloadReport = async (type) => {
    console.log("clicked");
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      const response = await fetch(`http://localhost:8000/api/reports/download?type=${type}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // JWT token for authorization
        },
      });

      console.log("response------->>>", response);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Create a download link and trigger it
      const blob = await response.blob(); // Convert response to a Blob
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `expense_report.${type}`); // Set file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
      setError("Error downloading the report. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="flex justify-between items-center">
  <h1 className="text-3xl font-semibold text-gray-800 mb-6">
    Welcome Back!
  </h1>
  <button
    className="download-btn bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
    onClick={() => downloadReport("pdf")}
    disabled={loading}
  >
    {loading ? "Downloading PDF..." : "Download PDF Report"}
  </button>
</div>

      {expenseData.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>No expenses found.</p>
          <button
            onClick={handleAddExpenseClick}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
          >
            Go to Dashboard and Add Expense
          </button>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-3 gap-6">
            {/* Total Amount Spent */}
            <div className="col-span-1 bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Total Amount Spent</h2>
              <p className="text-3xl font-bold text-primary">
                ${totalSpent().toFixed(2)}{" "}
              </p>
            </div>
          </div>
          {/* Graph Summary */}
          <div className="col-span-2">
            <GraphSummary data={expenseData} />
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Recent 10 Transactions
            </h2>
            <RecentTransactions transactions={expenseData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
