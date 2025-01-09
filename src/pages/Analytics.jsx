import React, { useEffect, useState } from 'react';
import Graphs from '../components/Graphs';
import api from '../api';

const Analytics = () => {
  const [expenseData, setExpenseData] = useState([]);

  const fetchAnalytics = async () => {
    try {
      const response = await api.get('/analytics');
      setExpenseData(response.data);
    } catch (error) {
      console.error('Error fetching analytics', error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold">Expense Analytics</h2>
      <Graphs data={expenseData} />
    </div>
  );
};

export default Analytics;
