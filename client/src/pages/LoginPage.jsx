import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsAuthenticated(true);
      navigate('/home');
    } else {
      alert('Please enter both email and password.');
    }
  };

  return (
    <div className="min-h-screen  text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Welcome back to our bakery community
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-3 py-2  rounded-md border border-gray-700 focus:border-white focus:ring-2 focus:ring-white text-black placeholder-gray-400"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full px-3 py-2  rounded-md border border-gray-700 focus:border-white focus:ring-2 focus:ring-white text-black placeholder-gray-400"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-white text-gray-950 rounded-md font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-gray-950"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="font-medium text-white hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}