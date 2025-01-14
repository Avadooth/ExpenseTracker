import React, { useState, useEffect } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import api from "../api";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
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
      setExpenses(data);
      
    } catch (error) {
      console.error("Error fetching expenses:", error.message);
    }
  };

  const handleDelete = async (id) => {
    console.log("deleteID----->>>>", id);

    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
        const idToDelete = String(id);
        const response = await fetch(
          "http://localhost:8000/api/expense/deleteExpense",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
            body: JSON.stringify({ idToDelete }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete expense");
        }
        console.log("Expense deleted successfully");

        // Refresh the list to ensure consistency with the backend
        fetchExpenses();
      } catch (error) {
        console.error("Error deleting expense", error);
        // Optionally show error feedback to the user
        alert("Failed to delete expense. Please try again.");
      }
    }
  };
  const handleAddExpense = async (expense) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      console.log("handleAddExpense_Token---->>>", token);
      console.log("handleAddExpense_expense---->>>", expense);

      if (!token) {
        throw new Error("No token found. Please log in again.");
      }
      if (!expense.title || !expense.amount || !expense.category) {
        throw new Error("Missing required fields: title, amount, or category.");
      }

      const response = await fetch(
        "http://localhost:8000/api/expense/addexpense",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
          body: JSON.stringify(expense),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Expense added:", data);

      fetchExpenses(); // Refresh the list of expenses after adding a new one
    } catch (error) {
      console.error("Error adding expense:", error.message);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <ExpenseForm onAddExpense={handleAddExpense} />
      <ExpenseList expenses={expenses} onDelete={handleDelete} />
    </div>
  );
};

export default Dashboard;
