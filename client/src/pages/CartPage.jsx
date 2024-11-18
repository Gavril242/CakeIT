import React from 'react';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const navigate = useNavigate();

  // Hardcoded cart data
  const cartItems = [
    {
      bakeryId: 1,
      bakeryName: 'Sweet Delights Bakery',
      transportCost: 5.0,
      products: [
        { id: 101, title: 'Chocolate Fudge Cake', price: 20.0, quantity: 1 },
        { id: 102, title: 'Blueberry Muffins', price: 5.0, quantity: 2 },
      ],
    },
    {
      bakeryId: 2,
      bakeryName: 'Artisan Breads Co.',
      transportCost: 7.5,
      products: [
        { id: 201, title: 'Sourdough Bread', price: 8.0, quantity: 1 },
        { id: 202, title: 'Baguette', price: 3.5, quantity: 3 },
      ],
    },
  ];

  // Calculate total cost per bakery and overall total
  const calculateTotals = () => {
    let overallTotal = 0;
    const bakeryTotals = cartItems.map((bakery) => {
      const productsTotal = bakery.products.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
      );
      const bakeryTotal = productsTotal + bakery.transportCost;
      overallTotal += bakeryTotal;
      return {
        ...bakery,
        productsTotal,
        bakeryTotal,
      };
    });
    return { bakeryTotals, overallTotal };
  };

  const { bakeryTotals, overallTotal } = calculateTotals();

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Your Cart
        </h1>

        {bakeryTotals.map((bakery) => (
          <div key={bakery.bakeryId} className="mb-8 bg-gray-900 rounded-lg overflow-hidden shadow-lg">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4">{bakery.bakeryName}</h2>
              <div className="space-y-4">
                {bakery.products.map((product) => (
                  <div key={product.id} className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{product.title}</h3>
                      <p className="text-sm text-gray-400">Quantity: {product.quantity}</p>
                    </div>
                    <p className="font-semibold">${(product.price * product.quantity).toFixed(2)}</p>
                  </div>
                ))}
                <div className="border-t border-gray-700 my-4"></div>
                <div className="flex justify-between items-center text-sm">
                  <p className="text-gray-400">Transport Cost</p>
                  <p>${bakery.transportCost.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 p-4">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold">Subtotal</h4>
                <p className="text-lg font-bold">${bakery.bakeryTotal.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
          <div className="p-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Total</h3>
              <p className="text-3xl font-bold">${overallTotal.toFixed(2)}</p>
            </div>
          </div>
          <div className="bg-gray-800 p-4 flex justify-between">
            <button
              onClick={() => navigate('/bakery-details')}
              className="bg-transparent text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Continue Shopping
            </button>
            <button
              onClick={() => alert('Proceeding to checkout...')}
              className=" text-white px-4 py-2 rounded hover:bg-black transition duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
              </svg>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;