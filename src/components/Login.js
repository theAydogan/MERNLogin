/**
 * Login Component
 * 
 * This component handles user login functionality. It includes:
 * - A form for username and password input
 * - Redux integration for state management
 * - Navigation to dashboard on successful login
 * - Error handling for failed login attempts
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';      // Used for navigation between pages
import { useDispatch, useSelector } from 'react-redux';           // Used to send actions to Redux store
import { loginSuccess } from '../redux/authSlice';   // Redux action for successful login

function Login() {
  // Hooks for navigation and Redux
  const navigate = useNavigate();    // Hook to programmatically navigate pages
  const dispatch = useDispatch();    // Hook to dispatch actions to Redux
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if(user){
      navigate('/dashboard');
    }
  }, [navigate, user]);

  // State to store form data (username and password)
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  /**
   * Handle form submission
   * @param {Event} e - Form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission behavior
    
    try {
      // Send login request to backend
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        dispatch(loginSuccess(data.user));  // Update Redux state with user data
        navigate('/dashboard');             // Redirect to dashboard
      } else {
        alert(data.message);               // Show error message
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error logging in');
    }
  };

  // Component UI
  return (
    <div className="relative min-h-screen flex">
      {/* Left half - purple with wave */}
      <div className="w-3/5 relative">
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-purple-800" />
            <img 
              src="/images/Alfa-HotWheels.png" 
              alt="Alfa Hot Wheels"
              className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
            />
            {/* Wave overlay */}
            <svg
              className="absolute bottom-0 w-full"
              preserveAspectRatio="none"
              viewBox="0 0 200 100"
              xmlns="http://www.w3.org/2000/svg"
              style={{ zIndex: 20 }}
            >
              <path
                d="M0 50 
                   Q 25 45, 50 50 
                   T 100 50
                   Q 125 45, 150 50
                   T 200 50
                   L 200 100 
                   L 0 100 Z"
                fill="white"
              />
            </svg>
            
          </div>
        </div>
      </div>

      {/* Right half - white background with form */}
      <div className="w-2/5 bg-white flex items-center justify-center z-4 shadow-[-20px_0_30px_-15px_rgba(0,0,0,0.3)] h-screen">
        <div className="w-2/3 p-8">
          {/* Welcome message section */}
          <div className="mb-16 text-center">
            <h1 className="mb-6 text-4xl font-extrabold text-gray-900 md:text-6xl lg:text-7xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
                Hot Wheels
              </span>
              <br />
              <span>Car Inventory System</span>
            </h1>
            <p className="text-xl font-normal text-gray-500 lg:text-2xl">
              Please enter your details to access the garage.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Username input field */}
            <div className="relative">
              <input
                type="text"
                placeholder="Username"
                className="w-full p-3 border-b border-purple-800 bg-transparent focus:outline-none text-gray-800 placeholder-gray-500 transition-all duration-300 focus:border-b-2"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                required
              />
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-800 transition-all duration-300 group-focus-within:w-full" />
            </div>
            
            {/* Password input field */}
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border-b border-purple-800 bg-transparent focus:outline-none text-gray-800 placeholder-gray-500 transition-all duration-300 focus:border-b-2"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                minLength={6}
              />
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-800 transition-all duration-300 group-focus-within:w-full" />
            </div>
            
            {/* Submit button */}
            <button 
              type="submit"
              className="w-full p-3 bg-purple-800 text-white rounded-lg hover:bg-purple-900 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Sign In
            </button>

            {/* Sign up link section */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-2">Don't have an account?</p>
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="text-purple-800 hover:text-purple-900 font-semibold transition-colors duration-300 hover:underline underline-offset-4"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login; 