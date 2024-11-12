// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import HomePage from './pages/HomePage.jsx';
import BakeryDetailsPage from './pages/BakeryDetailsPage.jsx';
import CartPage from './pages/CartPage.jsx';
import WelcomePage from './pages/WelcomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import CustomerProfilePage from './pages/CustomerProfilePage.jsx';
import CustomOrderPage from './pages/CustomOrderPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() { 
  return (
    <Router>
      <NavBar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bakery-details/:bakeryId"
          element={
            <ProtectedRoute>
              <BakeryDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/custom-order"
          element={
            <ProtectedRoute>
              <CustomOrderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <CustomerProfilePage />
            </ProtectedRoute>
          }
        />
        {/* Additional routes */}
      </Routes>
    </Router>
  );
}

export default App;
