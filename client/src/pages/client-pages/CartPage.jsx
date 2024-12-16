import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart } = useCart();

  // Predefined transport cost value
  const predefinedTransportCost = 5.0; // Set a default transport cost here

  // Calculate total cost per bakery and overall total
  const calculateTotals = () => {
    let overallTotal = 0;
    const bakeryTotals = cart.map((bakery) => {
      const productsTotal = bakery.products.reduce(
          (sum, product) =>
              sum + (product.price || 0) * (product.quantity || 1), // Default price to 0 and quantity to 1
          0
      );
      const transportCost = predefinedTransportCost; // Use predefined value
      const bakeryTotal = productsTotal + transportCost;
      overallTotal += bakeryTotal;
      return {
        ...bakery,
        productsTotal,
        transportCost, // Explicitly include transport cost
        bakeryTotal,
      };
    });
    return { bakeryTotals, overallTotal };
  };

  const { bakeryTotals, overallTotal } = calculateTotals();

  return (
      <div className="min-h-screen bg-white text-black p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 flex items-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mr-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
              <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Your Cart
          </h1>

          {bakeryTotals.length > 0 ? (
              bakeryTotals.map((bakery) => (
                  <div
                      key={bakery.bakeryId}
                      className="mb-8 bg-gray-100 rounded-lg overflow-hidden shadow-lg"
                  >
                    <div className="p-6">
                      <h2 className="text-2xl font-semibold mb-4">
                        {bakery.bakeryName}
                      </h2>
                      <div className="space-y-4">
                        {bakery.products.map((product) => (
                            <div
                                key={product.id}
                                className="flex justify-between items-center"
                            >
                              <div>
                                <h3 className="font-medium">{product.name}</h3>
                                <p className="text-sm text-gray-600">
                                  Quantity: {product.quantity || 1}
                                </p>
                              </div>
                              <div className="flex items-center gap-4">
                                <p className="font-semibold">
                                  RON {((product.price || 0) * (product.quantity || 1)).toFixed(2)}
                                </p>
                                <button
                                    className="text-red-500 hover:text-red-400"
                                    onClick={() =>
                                        removeFromCart(product.id, bakery.bakeryId)
                                    }
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                        ))}
                        <div className="border-t border-gray-300 my-4"></div>
                        <div className="flex justify-between items-center text-sm">
                          <p className="text-gray-600">Transport Cost</p>
                          <p>RON {predefinedTransportCost.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-200 p-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-lg font-semibold">Subtotal</h4>
                        <p className="text-lg font-bold">
                          RON {bakery.bakeryTotal.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
              ))
          ) : (
              <p className="text-center text-gray-600">
                Your cart is empty. Add some delicious items!
              </p>
          )}

          {bakeryTotals.length > 0 && (
              <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold">Total</h3>
                    <p className="text-3xl font-bold">RON {overallTotal.toFixed(2)}</p>
                  </div>
                </div>
                <div className="bg-gray-200 p-4 flex justify-between">
                  <button
                      onClick={() => navigate('/home')}
                      className="bg-transparent text-black border border-black px-4 py-2 rounded hover:bg-black hover:text-white transition duration-300"
                  >
                    Continue Shopping
                  </button>
                  <button
                      onClick={() => alert('Proceeding to checkout...')}
                      className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-300"
                  >
                    Checkout
                  </button>
                </div>
              </div>
          )}
        </div>
      </div>
  );
}

export default CartPage;
