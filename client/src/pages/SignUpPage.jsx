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
  const [phone, setPhoneNumber] = useState('');
  const [address, setDeliveryAddress] = useState('');
  const handleSignUp = async (e) => {
    e.preventDefault();

    console.log("Form submitted"); // Log when the form is submitted

    if (firstName && lastName && username && email && password && confirmPassword && phone && address) {
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        console.log("Password mismatch"); // Log if passwords don't match
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
      };

      console.log("User data being sent:", userData); // Log user data before the request

      try {
        const response = await fetch("http://localhost:5001/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        console.log("Response received:", response); // Log the entire response object

        const data = await response.json();
        console.log("Response JSON data:", data); // Log the JSON response from the server

        if (response.ok) {
          alert("Registration successful!");
          console.log("Registration successful:", data); // Log success message and data
          setIsAuthenticated(true); // Optional: mark as authenticated
          navigate("/home"); // Redirect to home page
        } else {
          alert(data.message || "Registration failed!");
          console.log("Registration failed:", data.message || "Unknown error"); // Log failure reason
        }
      } catch (error) {
        console.error("Error during fetch:", error); // Log the fetch error
        alert("An error occurred while registering. Please try again.");
      }
    } else {
      alert("Please fill in all the required fields.");
      console.log("Form validation failed: missing fields"); // Log missing fields case
    }
  };

  return (
    <div className="min-h-screen  text-black flex items-center justify-center px-4">
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
              id="firstname"
              name="firstName"
              type="text"
              required
              className="w-full px-3 py-2  rounded-md border border-gray-700 focus:border-white focus:ring-2 focus:ring-white text-black placeholder-gray-400"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              id="lastname"
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
              id="email"
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
              id="phone"
              name="phone"
              type="tel"
              required
              className="w-full px-3 py-2  rounded-md border border-gray-700 focus:border-white focus:ring-2 focus:ring-white text-black placeholder-gray-400"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
                id="address"
                name="address"
                type="address"
                autoComplete="address"
                required
                className="w-full px-3 py-2  rounded-md border border-gray-700 focus:border-white focus:ring-2 focus:ring-white text-black placeholder-gray-400"
                placeholder="Delivery Address"
                value={address}
                onChange={(e) => setDeliveryAddress(e.target.value)}
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
            className="w-full py-2 px-4 bg-black text-white rounded-md font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-gray-950"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-gray-400">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="font-medium text-black hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}