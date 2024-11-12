import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src="https://private-user-images.githubusercontent.com/100515565/381999913-d5de7150-46e2-446b-b9d2-5af983e66480.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzE0NDgyNDMsIm5iZiI6MTczMTQ0Nzk0MywicGF0aCI6Ii8xMDA1MTU1NjUvMzgxOTk5OTEzLWQ1ZGU3MTUwLTQ2ZTItNDQ2Yi1iOWQyLTVhZjk4M2U2NjQ4MC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQxMTEyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MTExMlQyMTQ1NDNaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT05MzY3YjkxOGJhMzU3ZWMxOTBkMWQ3OGY5ZTNiMGVlMDExY2JlOGMyZWQwZWQ3N2JhYjUzZWE4ZWUxYTJhMzQ5JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.pM5dZ01gnM-bY2FA_DPQNqYTc2YI38nrjYvvfFGvJqU"
                alt="Cake Logo"
                className="w-10 h-10 mr-2"
              />
              <span className="font-bold text-xl">CakeIT</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {!isAuthenticated ? (
                <>
                  <NavLink to="/">Welcome</NavLink>
                  <NavLink to="/login">Login</NavLink>
                  <NavLink to="/signup">Sign Up</NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/home">Home</NavLink>
                  <NavLink to="/bakery-details">Bakery Details</NavLink>
                  <NavLink to="/cart">Cart</NavLink>
                  <NavLink to="/profile">My Profile</NavLink>
                  <button
                    onClick={handleLogout}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
    >
      {children}
    </Link>
  );
}