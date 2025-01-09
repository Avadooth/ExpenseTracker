import React from 'react';
import RecentTransactions from '../components/RecentTransactions';
import GraphSummary from '../components/GraphSummary';

const Home = ({ transactions, graphData }) => {
  const totalSpent = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Welcome Back!</h1>
      <div className="grid grid-cols-3 gap-6">
        {/* Total Amount Spent */}
        <div className="col-span-1 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Total Amount Spent</h2>
          <p className="text-3xl font-bold text-primary">${totalSpent.toFixed(2)}</p>
        </div>

        {/* Graph Summary */}
        <div className="col-span-2">
          <GraphSummary data={graphData} />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Transactions</h2>
        <RecentTransactions transactions={transactions} />
      </div>
    </div>
  );
};

export default Home;
