import React, { useState, useEffect } from 'react';

function OrderListPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const bakeryId = useState(); // Replace with the actual logged-in bakery's ID

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/orders/${bakeryId}`);
                const data = await response.json();
                setOrders(data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching orders:', err);
                setLoading(false);
            }
        };

        fetchOrders();
    }, [bakeryId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-700 text-xl">Loading orders...</p>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-700 text-xl">No orders available.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-8 py-12">
            <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">Orders for Your Bakery</h1>

            {/* Orders List */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {orders.map((order) => (
                    <div
                        key={order._id}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg"
                    >
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Order #{order._id}</h2>
                            <p className="text-gray-600 mb-2">
                                <strong>Client:</strong> {order.clientId.name} ({order.clientId.email})
                            </p>
                            <p className="text-gray-600 mb-2">
                                <strong>Status:</strong> {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </p>
                            <p className="text-gray-600 mb-2">
                                <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
                            </p>
                            <p className="text-gray-600 mb-2">
                                <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}
                            </p>
                            <p className="text-gray-600 mb-2">
                                <strong>Pickup Option:</strong> {order.pickupOption.replace('-', ' ')}
                            </p>

                            {/* Products List */}
                            <h3 className="text-xl font-bold mt-4 mb-2">Products:</h3>
                            <ul className="list-disc pl-6">
                                {order.products.map((product) => (
                                    <li key={product.productId._id} className="text-gray-600">
                                        {product.productId.name} (x{product.quantity})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OrderListPage;
