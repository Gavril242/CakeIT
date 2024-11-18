import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import bakeries from '../data/bakeryData';

function BakeryDetailsPage() {
  const { bakeryId } = useParams();
  const navigate = useNavigate();
  const [isLeaving, setIsLeaving] = useState(false);

  // Move useSpring hooks to the top level of the component
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 300, friction: 10 },
  });

  const buttonProps = useSpring({
    scale: 1,
    config: { tension: 300, friction: 10 },
  });

  // Find the bakery that matches the bakeryId
  const bakery = bakeries.find((b) => b.id === parseInt(bakeryId));

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const totalStars = 5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="text-yellow-500">&#9733;</span>); // Full star
    }

    if (halfStar) {
      stars.push(<span key="half" className="text-yellow-500">&#9734;</span>); // Half star
    }

    for (let i = stars.length; i < totalStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">&#9734;</span>); // Empty star
    }

    return stars;
  };

  const handleCustomOrder = () => {
    setIsLeaving(true);
    setTimeout(() => {
      navigate('/custom-order');
    }, 300);
  };

  if (!bakery) {
    return <p className="text-center text-2xl text-white mt-8">Bakery not found.</p>;
  }

  return (
    <animated.div style={fadeIn} className="min-h-screen bg-gradient-to-b from-white-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-white hover:text-white-800 transition-colors duration-200 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Bakeries
        </button>

        {/* Bakery Description */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4 text-white">{bakery.name}</h1>
          <p className="text-xl text-white mb-4">{bakery.description}</p>
          {/* Rating */}
          <div className="flex items-center">
            <div className="text-2xl mr-2">
              {renderStars(bakery.rating)}
            </div>
            <span className="text-gray-600 text-lg">({bakery.rating} out of 5)</span>
          </div>
        </div>

        {/* Products List */}
        {/* Products List */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
  {bakery.products.map((product, index) => (
    <animated.div key={product.id} style={{ ...fadeIn, delay: 100 * (index + 1) }}>
      <div
        className="bg-black rounded-xl shadow-lg overflow-hidden transform transition-all duration-200 hover:scale-105"
        style={{
          border: '10px solid rgba(255, 255, 255, 0.2)', // Faint white border
          boxShadow: '0 4px 20px rgba(255, 255, 255, 0.1)', // Smooth fading glow
        }}
      >
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-2 text-white">{product.title}</h2>
          <p className="text-gray-300">{product.description}</p>
        </div>
      </div>
    </animated.div>
  ))}
</div>


        {/* Custom Order Button */}
        <div className="flex justify-center">
  <animated.button
    style={buttonProps}
    onClick={handleCustomOrder}
    onMouseEnter={() => buttonProps.scale.start(1.05)}
    onMouseLeave={() => buttonProps.scale.start(1)}
    className="bg-white text-black py-4 px-8 rounded-full text-lg font-semibold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
  >
    Place a Custom Order
  </animated.button>
</div>

      </div>
    </animated.div>
  );
}

export default BakeryDetailsPage;