import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo_git.png';

export default function NavBar() {
  const { isAuthenticated, setIsAuthenticated,setUserRole, setUserId, userRole } = useAuth(); // Access userRole from AuthContext
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token'); // Clear stored token
    setUserRole(null);
    setUserId(null);
    navigate('/');
  };

  return (
      <nav className="bg-white text-black shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <img src={logo} alt="Logo" className="w-10 h-10 mr-2" />
                <span className="font-bold text-xl text-black">CakeIT</span>
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
                      {userRole === 'bakery' ? (
                          <>
                            <NavLink to="/home-bakery">Home</NavLink>
                            <NavLink to="/orders-bakery">Orders</NavLink>
                            <NavLink to="/add-product">Add Product</NavLink>
                            <NavLink to="/products-bakery">Products List</NavLink>
                          </>
                      ) : (
                          <>
                            <NavLink to="/home">Bakeries</NavLink>
                            <NavLink to="/cart">My Cart</NavLink>
                            <NavLink to="/profile">My Profile</NavLink>
                          </>
                      )}
                      <button
                          onClick={handleLogout}
                          className="text-black hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
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
          className="text-black hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
      >
        {children}
      </Link>
  );
}
