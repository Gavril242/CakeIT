// src/pages/BakeryDetailsPage.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import bakeries from '../data/bakeryData';

function BakeryDetailsPage() {
  const { bakeryId } = useParams();
  const navigate = useNavigate();

  // Find the bakery that matches the bakeryId
  const bakery = bakeries.find((b) => b.id === parseInt(bakeryId));

  if (!bakery) {
    return <p>Bakery not found.</p>;
  }

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const totalStars = 5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`}>&#9733;</span>); // Full star
    }

    if (halfStar) {
      stars.push(<span key="half">&#9734;</span>); // Half star
    }

    for (let i = stars.length; i < totalStars; i++) {
      stars.push(<span key={`empty-${i}`}>&#9734;</span>); // Empty star
    }

    return stars;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Bakery Description */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{bakery.name}</h1>
        <p className="text-gray-700">{bakery.description}</p>
        {/* Rating */}
        <div className="mt-4 flex items-center">
          <div className="text-yellow-500 text-xl">
            {renderStars(bakery.rating)}
          </div>
          <span className="ml-2 text-gray-600">({bakery.rating} out of 5)</span>
        </div>
      </div>

      {/* Products List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {bakery.products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Order Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => navigate('/custom-order')}
          className="bg-purple-600 text-white py-3 px-6 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Custom Order
        </button>
      </div>
    </div>
  );
}

export default BakeryDetailsPage;
