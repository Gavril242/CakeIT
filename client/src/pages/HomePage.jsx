import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();
    const [bakeries, setBakeries] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch bakeries from the backend
    useEffect(() => {
        const fetchBakeries = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/bakeries'); // Replace with your backend endpoint
                const data = await response.json();
                setBakeries(data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching bakeries:', err);
                setLoading(false);
            }
        };

        fetchBakeries();
    }, []);

    if (loading) {
        return <p className="text-white">Loading bakeries...</p>;
    }

    if (bakeries.length === 0) {
        return <p className="text-white">No bakeries available.</p>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-white">Our Bakeries</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {bakeries.map((bakery) => (
                    <div
                        key={bakery._id}
                        className="bg-black border border-white rounded-lg overflow-hidden"
                    >
                        <img
                            src={bakery.imageUrl}
                            alt={bakery.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2 text-white">
                                {bakery.name}
                            </h2>
                            <p className="text-gray-300">{bakery.description}</p>
                            <button
                                onClick={() => navigate(`/bakery-details/${bakery._id}`)}
                                className="mt-4 bg-white text-black py-2 px-4 rounded-md hover:bg-gray-200"
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