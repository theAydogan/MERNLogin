import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        console.log('Success:', data);
        navigate('/login');
      } else {
        console.error('Error:', data);
        alert(data.message);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error: ' + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form className="w-80 p-6 rounded-lg bg-white shadow-lg" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-6 text-center font-bold">Sign Up</h2>
        
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 p-2 border rounded"
          value={formData.username}
          onChange={(e) => setFormData({...formData, username: e.target.value})}
          required
          minLength={3}
        />
        
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
        
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required
          minLength={6}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full mb-6 p-2 border rounded"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
          required
          minLength={6}
        />
        
        <button 
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sign Up
        </button>

        <div className="mt-4 text-center">
          <p className="text-gray-600">Already have an account?</p>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp; 