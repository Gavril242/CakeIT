import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function CustomerProfilePage() {
    const navigate = useNavigate();
    const { userId } = useAuth(); // Get userId from AuthContext
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');

                // Fetch user data
                const userResponse = await fetch(`http://localhost:5001/api/clients/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!userResponse.ok) throw new Error('Failed to fetch user data');
                const userData = await userResponse.json();
                setUser(userData);

                // Fetch orders
                const ordersResponse = await fetch('http://localhost:5001/api/orders/client', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!ordersResponse.ok) throw new Error('Failed to fetch orders');
                const ordersData = await ordersResponse.json();
                setOrders(ordersData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchData();
        }
    }, [userId]);

    if (loading) return <div className="text-center py-8">Loading...</div>;
    if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

    return (
        <div className="min-h-screen bg-white text-black p-8">
            <h1 className="text-3xl font-bold mb-6">Customer Profile</h1>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/3 bg-gray-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Profile Details</h2>
                    <div className="space-y-2">
                        <p>
                            <strong>First Name:</strong> {user.firstName}
                        </p>
                        <p>
                            <strong>Last Name:</strong> {user.lastName}
                        </p>
                        <p>
                            <strong>Email:</strong> {user.email}
                        </p>
                        <p>
                            <strong>Phone:</strong> {user.phone}
                        </p>
                        <p>
                            <strong>Address:</strong> {user.address}
                        </p>
                    </div>
                </div>
                <div className="w-full md:w-2/3 bg-gray-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Past Orders</h2>
                    {orders.length > 0 ? (
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2">Order ID</th>
                                <th className="border border-gray-300 px-4 py-2">Date</th>
                                <th className="border border-gray-300 px-4 py-2">Total (RON)</th>
                                <th className="border border-gray-300 px-4 py-2">Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map((order) => (
                                <tr
                                    key={order._id}
                                    className="hover:bg-gray-100 cursor-pointer"
                                    onClick={() => navigate(`/order/${order._id}`)}
                                >
                                    <td className="border border-gray-300 px-4 py-2 text-center">{order._id}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{new Date(order.orderDate).toLocaleDateString()}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{order.totalPrice.toFixed(2)} RON</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{order.status}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center text-gray-600">You have no past orders.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
