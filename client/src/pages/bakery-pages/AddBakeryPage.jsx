import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddBakeryPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        location: '',
        description: '',
        rating: '',
        image: null, // File for the image
    });

    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    // Update the document title
    useEffect(() => {
        document.title = 'Create Bakery Account';
    }, []);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === 'password') {
            validatePassword(value);
        }
    };

    // Handle file field change for image upload
    const handleFileChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            image: e.target.files[0], // File object
        }));
    };

    // Validate password strength
    const validatePassword = (password) => {
        const regex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!regex.test(password)) {
            setPasswordError(
                'Password must be at least 8 characters long and include at least one special character (!@#$%^&*).'
            );
        } else {
            setPasswordError('');
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prevent submission if password is invalid
        if (passwordError) {
            alert('Please fix password issues before submitting.');
            return;
        }

        // Create form data for API submission
        const formDataToSend = new FormData();
        formDataToSend.append('role', 'bakery');
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('password', formData.password);
        formDataToSend.append('location', formData.location);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('rating', formData.rating);
        if (formData.image) {
            formDataToSend.append('image', formData.image); // Append the file
        }

        try {
            console.log('Submitting data:', Object.fromEntries(formDataToSend)); // Debugging

            const response = await fetch('http://192.168.1.96:5001/api/auth/register', {
                method: 'POST',
                body: formDataToSend, // Use FormData object
            });

            const data = await response.json();

            if (response.ok) {
                alert('Bakery account created successfully!');
                navigate('/login-bakery'); // Redirect to login
            } else {
                alert(data.message || 'Failed to create bakery account.');
                console.error('API error:', data);
            }
        } catch (err) {
            console.error('Error submitting form:', err);
            alert('An error occurred while registering the bakery. Please try again.');
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage: 'url("https://source.unsplash.com/1600x900/?bakery")',
            }}
        >
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Create a Bakery Account
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Bakery Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                            placeholder="Enter your bakery name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                            placeholder="Create a strong password"
                            required
                        />
                        {passwordError && (
                            <p className="mt-1 text-sm text-red-500">{passwordError}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                            Location:
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                            placeholder="Enter your bakery location"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description:
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                            placeholder="Describe your bakery"
                        />
                    </div>
                    <div>
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                            Initial Rating (Optional):
                        </label>
                        <input
                            type="number"
                            id="rating"
                            name="rating"
                            step="0.1"
                            value={formData.rating}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                            placeholder="Give an initial rating (e.g., 4.5)"
                        />
                    </div>
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                            Upload Bakery Image:
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                        Create Account
                    </button>
                    <button
                        type="button"
                        className="w-full text-black hover:text-gray-800 mt-4"
                        onClick={() => navigate('/login-bakery')}
                    >
                        Already have an account? Sign in
                    </button>
                </form>
            </div>
        </div>
    );
}
