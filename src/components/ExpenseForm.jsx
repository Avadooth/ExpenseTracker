import React, { useState } from 'react';

const ExpenseForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, amount });
    setName('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Add New Expense</h3>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Expense Name</label>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Amount</label>
        <input
          type="number"
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-md shadow-md hover:bg-blue-700 transition-all duration-300"
      >
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
