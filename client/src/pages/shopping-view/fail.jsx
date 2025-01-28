import React from 'react';
import { useNavigate } from 'react-router-dom';

const FailPage = () => {
  const navigate = useNavigate();

  const handleReturnToCheckout = () => {
    navigate('/shop/checkout');
  };

  return (
    <div className="flex items-center  w-[120rem] justify-center min-h-screen bg-red-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="text-6xl text-red-600 mb-4">❌</div>
        <h1 className="text-3xl font-semibold text-red-600 mb-4">Payment Failed</h1>
        <p className="text-lg text-gray-700 mb-6">
          Unfortunately, your payment could not be processed. Please try again later.
        </p>
        <button
          onClick={handleReturnToCheckout}
          className="px-6 py-2 bg-red-600 text-white text-lg rounded-md hover:bg-red-700 transition duration-300"
        >
          Return to Checkout
        </button>
      </div>
    </div>
  );
};

export default FailPage;
