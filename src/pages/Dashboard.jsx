import React, { useState, useEffect } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import api from '../api';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const response = await api.get('/expenses');
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      fetchExpenses();
    } catch (error) {
      console.error('Error deleting expense', error);
    }
  };

  const handleAddExpense = async (expense) => {
    try {
      await api.post('/expenses', expense);
      fetchExpenses();
    } catch (error) {
      console.error('Error adding expense', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <ExpenseForm onSubmit={handleAddExpense} />
      <ExpenseList expenses={expenses} onDelete={handleDelete} />
    </div>
  );
};

export default Dashboard;
