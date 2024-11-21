import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

export default function AddBakeryPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        location: '',
        description: '',
        rating: '',
        image: null, // Field for the image file
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            image: e.target.files[0], // Capture the file object
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        try {
            const response = await fetch('http://localhost:5001/api/bakery_auth/register_bakery', {
                method: 'POST',
                body: formDataToSend,
            });

            if (response.ok) {
                const data = await response.json();
                alert('Bakery added successfully!');
                console.log('Added bakery:', data);
            } else {
                alert('Failed to add bakery');
                console.error('Error adding bakery:', await response.json());
            }
        } catch (err) {
            console.error('Error submitting form:', err);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Add a New Bakery</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="location" className="block text-sm font-medium">Location:</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label htmlFor="rating" className="block text-sm font-medium">Rating:</label>
                    <input
                        type="number"
                        id="rating"
                        name="rating"
                        step="0.1"
                        value={formData.rating}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label htmlFor="image" className="block text-sm font-medium">Image:</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Add Bakery
                </button>
                <button
                    className="text-sm text-black hover:text-gray-200 transition-colors"
                    onClick={() => navigate('/login-bakery')}
                >
                    Sign in
                </button>
            </form>
        </div>
    );
}