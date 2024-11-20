import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Link } from 'react-router-dom';
import NavBar from './components/NavBar';
import AddBakeryPage from "./pages/AddBakeryPage";
import HomePage from './pages/HomePage';
import BakeryDetailsPage from './pages/BakeryDetailsPage';
import CartPage from './pages/CartPage';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import CustomerProfilePage from './pages/CustomerProfilePage';
import CustomOrderPage from './pages/CustomOrderPage';
import ProtectedRoute from './components/ProtectedRoute';
import ParticlesBackground from './components/ParticlesBackground';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
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
        <Route
            path="/add-bakeries"
            element={
                <ProtectedRoute>
                    <AddBakeryPage/>
                </ProtectedRoute>
            }
        />
      {/* Add a catch-all route for 404 pages */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <ParticlesBackground />
      <div className="flex flex-col min-h-screen relative z-10">
        <NavBar />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <footer className="py-4 text-center  text-white">
          <p>&copy; 2024 Bakery Connect. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

// NotFoundPage component
function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="text-blue-400 hover:underline">
        Go back to home
      </Link>
    </div>
  );
}
