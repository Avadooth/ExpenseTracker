import React from 'react';

const ExpenseList = ({ expenses, onDelete }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Expense List</h2>
      <ul className="space-y-2">
        {expenses.map((expense, index) => (
          <li
            key={index}
            className="p-4 border rounded flex justify-between items-center"
          >
            <div>
              <p className="font-bold">{expense.title}</p>
              <p>${expense.amount}</p>
              <p className="text-gray-600 text-sm">{expense.date}</p>
            </div>
            <button
              onClick={() => onDelete(index)}
              className="bg-red-600 text-white py-1 px-3 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
