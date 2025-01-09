import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white shadow-lg p-4 mt-8 rounded-lg">
      <div className="container mx-auto text-center text-gray-600">
        <p>&copy; {new Date().getFullYear()} ExpenseTracker. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
