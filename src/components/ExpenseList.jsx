import React from "react";

const ExpenseList = ({ expenses, onDelete }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Expense List</h2>
      {expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2 text-left">Title</th>
              <th className="border border-gray-300 p-2 text-left">Amount</th>
              <th className="border border-gray-300 p-2 text-left">Category</th>
              <th className="border border-gray-300 p-2 text-left">Date</th>
              <th className="border border-gray-300 p-2 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index} className="even:bg-gray-100">
                <td className="border border-gray-300 p-2">{expense.title}</td>
                <td className="border border-gray-300 p-2">
                  ${expense.amount}
                </td>
                <td className="border border-gray-300 p-2">
                  {expense.category}
                </td>
                <td className="border border-gray-300 p-2 text-gray-600">
                  {expense.date.split("T")[0]}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <button
                    onClick={() => onDelete(expense._id)}
                    className="bg-red-600 text-white py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExpenseList;
