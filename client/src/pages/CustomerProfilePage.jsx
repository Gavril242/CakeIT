import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CustomerProfilePage() {
    const navigate = useNavigate();
    const [showUploadModal, setShowUploadModal] = useState(false);

    const handleImageClick = () => {
        setShowUploadModal(true);
    };

    const handleCloseModal = () => {
        setShowUploadModal(false);
    };

    return (
        <div className="min-h-screen  text-white p-8">
            <h1 className="text-4xl font-bold mb-8">Customer Profile</h1>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/2 space-y-4">
                    <button 
                        className="w-full py-2 px-4 bg-white text-black rounded hover:bg-gray-200 transition duration-300"
                        onClick={() => console.log('View Orders clicked')}
                    >
                        View Orders
                    </button>
                    <button 
                        className="w-full py-2 px-4 bg-white text-black rounded hover:bg-gray-200 transition duration-300"
                        onClick={() => console.log('Profile Settings clicked')}
                    >
                        Profile Settings
                    </button>
                </div>
                <div className="w-full md:w-1/2 space-y-4">
                    <div className="flex items-center space-x-4">
                        <div 
                            className="w-32 h-32 bg-gray-700 rounded-full overflow-hidden cursor-pointer"
                            onClick={handleImageClick}
                        >
                            <img 
                                src="/placeholder.svg?height=128&width=128" 
                                alt="Profile" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold">John Doe</h2>
                            <p className="text-gray-400">Account #12345</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p><strong>Address:</strong> 123 Main St, Anytown, USA</p>
                        <p><strong>Email:</strong> john.doe@example.com</p>
                        <p><strong>Phone:</strong> (555) 123-4567</p>
                    </div>
                    <button 
                        className="py-2 px-4 bg-black text-red-400 border border-red-400 rounded hover:bg-red-400 hover:text-black transition duration-300"
                        onClick={() => console.log('Delete Account clicked')}
                    >
                        Delete Account
                    </button>
                </div>
            </div>

            {showUploadModal && (
                <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center">
                    <div className="bg-black p-8 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Upload New Profile Picture</h2>
                        <input type="file" accept="image/*" className="mb-4 text-white" />
                        <div className="flex justify-end space-x-4">
                            <button 
                                className="py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-700 transition duration-300"
                                onClick={handleCloseModal}
                            >
                                Cancel
                            </button>
                            <button 
                                className="py-2 px-4 bg-white text-black rounded hover:bg-gray-200 transition duration-300"
                                onClick={handleCloseModal}
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}