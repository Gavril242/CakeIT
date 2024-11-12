import React from 'react';
import { useNavigate } from 'react-router-dom';
import bakeries from '../data/bakeryData'; // Correct import

function HomePage() {
  const navigate = useNavigate();

  console.log('bakeries:', bakeries); // Debugging line

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Bakeries</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {bakeries.map((bakery) => (
          <div key={bakery.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={bakery.imageUrl}
              alt={bakery.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{bakery.name}</h2>
              <p className="text-gray-600">{bakery.description}</p>
              <button
                onClick={() => navigate(`/bakery-details/${bakery.id}`)}
                className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
