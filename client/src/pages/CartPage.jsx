// src/pages/CartPage.jsx
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
        {
          id: 101,
          title: 'Chocolate Fudge Cake',
          price: 20.0,
          quantity: 1,
        },
        {
          id: 102,
          title: 'Blueberry Muffins',
          price: 5.0,
          quantity: 2,
        },
      ],
    },
    {
      bakeryId: 2,
      bakeryName: 'Artisan Breads Co.',
      transportCost: 7.5,
      products: [
        {
          id: 201,
          title: 'Sourdough Bread',
          price: 8.0,
          quantity: 1,
        },
        {
          id: 202,
          title: 'Baguette',
          price: 3.5,
          quantity: 3,
        },
      ],
    },
    // Add more bakeries and products as needed
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {bakeryTotals.map((bakery) => (
        <div key={bakery.bakeryId} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{bakery.bakeryName}</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Product</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Total</th>
              </tr>
            </thead>
            <tbody>
              {bakery.products.map((product) => (
                <tr key={product.id}>
                  <td className="py-2 px-4 border-b">{product.title}</td>
                  <td className="py-2 px-4 border-b">${product.price.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b">{product.quantity}</td>
                  <td className="py-2 px-4 border-b">
                    ${(product.price * product.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
              {/* Transport Cost */}
              <tr>
                <td className="py-2 px-4 border-b">Transport Cost</td>
                <td className="py-2 px-4 border-b"></td>
                <td className="py-2 px-4 border-b"></td>
                <td className="py-2 px-4 border-b">
                  ${bakery.transportCost.toFixed(2)}
                </td>
              </tr>
              {/* Subtotal */}
              <tr>
                <td className="py-2 px-4 font-semibold">Subtotal</td>
                <td className="py-2 px-4"></td>
                <td className="py-2 px-4"></td>
                <td className="py-2 px-4 font-semibold">
                  ${bakery.bakeryTotal.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}

      {/* Overall Total */}
      <div className="text-right">
        <h3 className="text-2xl font-bold">
          Total: ${overallTotal.toFixed(2)}
        </h3>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={() => navigate('/bakery-details')}
          className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300"
        >
          Continue Shopping
        </button>
        <button
          onClick={() => alert('Proceeding to checkout...')}
          className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartPage;
