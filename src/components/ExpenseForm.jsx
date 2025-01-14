import React, { useState } from "react";

const ExpenseForm = ({ onAddExpense }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food"); // Default category

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && amount && category) {
      const newExpense = {
        title,
        amount: parseFloat(amount),
        category,
      };

      // Pass new expense to the parent component
      onAddExpense(newExpense);

      // Reset form
      setTitle("");
      setAmount("");
      setCategory("Food");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-1/2 bg-white shadow-custom p-6 rounded-lg"
      >
        <h3 className="text-xl font-semibold mb-4">Add New Expense</h3>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Expense Name</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-700 py-3 rounded-md shadow-md"
        >
          Add Expense
        </button>
      </form>
    </>
  );
};

export default ExpenseForm;
