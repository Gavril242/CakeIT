import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Connect with
            <br />
            Bakeries
          </h1>
          <p className="text-gray-400 max-w-[600px] mx-auto">
            Explore bakeries, view products, and place custom orders.
          </p>
        </div>

        {/* Main Image */}
        <div className="relative w-full max-w-[600px] aspect-square mb-8">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent z-10" />
          <img
            src="https://private-user-images.githubusercontent.com/100515565/381999913-d5de7150-46e2-446b-b9d2-5af983e66480.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzE0NDgyNDMsIm5iZiI6MTczMTQ0Nzk0MywicGF0aCI6Ii8xMDA1MTU1NjUvMzgxOTk5OTEzLWQ1ZGU3MTUwLTQ2ZTItNDQ2Yi1iOWQyLTVhZjk4M2U2NjQ4MC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQxMTEyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MTExMlQyMTQ1NDNaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT05MzY3YjkxOGJhMzU3ZWMxOTBkMWQ3OGY5ZTNiMGVlMDExY2JlOGMyZWQwZWQ3N2JhYjUzZWE4ZWUxYTJhMzQ5JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.pM5dZ01gnM-bY2FA_DPQNqYTc2YI38nrjYvvfFGvJqU"
            alt="Bakery showcase"
            className="object-cover rounded-xl w-full h-full"
          />
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-[600px] space-y-4">
          <button 
            className="w-full h-14 text-lg font-medium rounded-xl bg-white text-gray-950 hover:bg-gray-200 transition-colors"
            onClick={() => navigate('/signup')}
          >
            Get Started
          </button>
          
          <div className="flex items-center justify-between px-4">
            <button 
              className="text-sm text-gray-400 hover:text-white transition-colors"
              onClick={() => navigate('/home')}
            >
              Check out more bakeries
            </button>
            <button 
              className="text-sm font-medium hover:text-gray-200 transition-colors"
              onClick={() => navigate('/login')}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}