/**
 * Dashboard Component
 * 
 * Protected component that displays user information and logout functionality.
 * Only accessible to authenticated users.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';  // Add useSelector
import { logout } from '../redux/authSlice';  // Import logout action

function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // Get user data from Redux store instead of localStorage
    const user = useSelector((state) => state.auth.user);

    /**
     * Handle user logout
     * Dispatches logout action and redirects to login page
     */
    const handleLogout = () => {
        dispatch(logout());  // This will clear both Redux state and localStorage
        navigate('/');
    }

    return (
        <div>
            <h2 className='text-2xl font-bold text-center mb-4 text-white'>
                Welcome to the Dashboard {user.username}
            </h2>
            <button 
                onClick={handleLogout} 
                className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mx-auto block'
            >
                Logout
            </button>
        </div>
    );
}

export default Dashboard;