import React, { useState, useEffect } from 'react';
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
  const [phone, setPhoneNumber] = useState('');
  const [address, setDeliveryAddress] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    document.title = 'Sign Up';
  }, []);

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

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (passwordError) {
      alert('Please fix password issues before submitting.');
      return;
    }

    if (!firstName || !lastName || !username || !email || !password || !confirmPassword || !phone || !address) {
      alert('Please fill in all the required fields.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const userData = {
      firstName,
      lastName,
      username,
      email,
      password,
      phone,
      address,
      role: 'client',
    };

    try {
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful!');
        setIsAuthenticated(true);
        navigate('/home');
      } else {
        alert(data.message || 'Registration failed!');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      alert('An error occurred while registering. Please try again.');
    }
  };

  return (
      <div
          className="min-h-screen flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://source.unsplash.com/1600x900/?baking")',
          }}
      >
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Create an Account</h1>
          <form className="space-y-6" onSubmit={handleSignUp}>
            <div className="space-y-4">
              <input
                  id="firstname"
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
              />
              <input
                  id="lastname"
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
              />
              <input
                  id="username"
                  type="text"
                  placeholder="Username"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
              />
              <input
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />
              <input
                  id="phone"
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                  value={phone}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
              />
              <input
                  id="address"
                  type="text"
                  placeholder="Delivery Address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                  value={address}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  required
              />
              <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                  }}
                  required
              />
              {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
              <input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
              />
            </div>
            <button
                type="submit"
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{' '}
            <button
                onClick={() => navigate('/login')}
                className="text-black hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
  );
}
