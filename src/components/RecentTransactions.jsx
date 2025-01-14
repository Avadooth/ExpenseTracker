import React from 'react';

const RecentTransactions = ({ transactions }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <table className="w-full table-auto">
        <thead>
          <tr className="text-left text-gray-600">
            <th className="p-3">Date</th>
            <th className="p-3">Description</th>
            <th className="p-3">Category</th>
            <th className="p-3">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr
              key={index}
              className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : ''}`}
            >
              <td className="p-3">{transaction.date.split("T")[0]}</td>
              <td className="p-3">{transaction.title}</td>
              <td className="p-3">{transaction.category}</td>
              <td className="p-3 text-primary font-semibold">
                ${transaction.amount.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTransactions;
