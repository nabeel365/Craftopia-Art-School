import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img
        className="w-auto h-64 mb-8"
        src="https://wpklik.com/wp-content/uploads/2019/03/A-404-Page-Best-Practices-and-Design-Inspiration.jpg"
        alt="404 Page Not Found"
      />
      <h1 className="text-4xl font-bold mb-4">Oops! Page not found</h1>
      <p className="text-gray-500 mb-8">The page you're looking for does not exist.</p>
      <Link
        to="/"
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Error;
