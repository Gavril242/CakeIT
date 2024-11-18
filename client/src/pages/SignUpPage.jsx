import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignUpPage() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    if (firstName && lastName && username && email && password && confirmPassword && phoneNumber) {
      if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
      }
      const userData = { firstName, lastName, username, email, password, phoneNumber };
      console.log('User Data:', userData);
      setIsAuthenticated(true);
      navigate('/home');
    } else {
      alert('Please fill in all the required fields.');
    }
  };

  return (
    <div className="min-h-screen  text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Join our community of bakery enthusiasts
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
          <div className="space-y-4">
            <input
              id="first-name"
              name="firstName"
              type="text"
              required
              className="w-full px-3 py-2  rounded-md border border-gray-700 focus:border-white focus:ring-2 focus:ring-white text-black placeholder-gray-400"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              id="last-name"
              name="lastName"
              type="text"
              required
              className="w-full px-3 py-2  rounded-md border border-gray-700 focus:border-white focus:ring-2 focus:ring-white text-black placeholder-gray-400"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              id="username"
              name="username"
              type="text"
              required
              className="w-full px-3 py-2  rounded-md border border-gray-700 focus:border-white focus:ring-2 focus:ring-white text-black placeholder-gray-400"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-3 py-2  rounded-md border border-gray-700 focus:border-white focus:ring-2 focus:ring-white text-black placeholder-gray-400"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              id="phone-number"
              name="phoneNumber"
              type="tel"
              required
              className="w-full px-3 py-2  rounded-md border border-gray-700 focus:border-white focus:ring-2 focus:ring-white text-black placeholder-gray-400"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="w-full px-3 py-2  rounded-md border border-gray-700 focus:border-white focus:ring-2 focus:ring-white text-black placeholder-gray-400"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              className="w-full px-3 py-2  rounded-md border border-gray-700 focus:border-white focus:ring-2 focus:ring-white text-black placeholder-gray-400"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-white text-gray-950 rounded-md font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-gray-950"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-gray-400">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="font-medium text-white hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}