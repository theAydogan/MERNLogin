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
    <div className="flex items-center justify-center min-h-screen">
      <form className="w-80 p-6 rounded-lg bg-white shadow-lg" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-6 text-center font-bold">Login</h2>
        
        {/* Username input field */}
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 p-2 border rounded"
          value={formData.username}
          onChange={(e) => setFormData({...formData, username: e.target.value})}
          required
        />
        
        {/* Password input field */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-2 border rounded"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required
          minLength={6}
        />
        
        {/* Submit button */}
        <button 
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sign In
        </button>

        {/* Sign up link section */}
        <div className="mt-4 text-center">
          <p className="text-gray-600">Don't have an account?</p>
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login; 