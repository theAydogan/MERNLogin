/**
 * Dashboard Component
 * 
 * Protected component that displays user information and logout functionality.
 * Only accessible to authenticated users.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';  // Add useSelector
import { logout } from '../redux/authSlice';  // Import logout action
import Modal from './Modal';    
import CarList from './CarList';

function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [carName, setCarName] = useState('');
    const [carModel, setCarModel] = useState('');
    const [carColor, setCarColor] = useState('');
    const [cars, setCars] = useState([]);
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        fetchCars();
    }, []);

    const handleLogout = () => {
        dispatch(logout());  // This will clear both Redux state and localStorage
        navigate('/');
    }

    const fetchCars = async () => {
        try {
            const response = await fetch('http://localhost:3000/cars/list');
            const data = await response.json();
            setCars(data);
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };

    const handleAddCar = () => {
        setIsModalOpen(true);
    }

    const handleAddCarSubmit = async () => {
        try {
            const response = await fetch('http://localhost:3000/cars/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    carName,
                    carModel,
                    carColor
                })
            });

            if (response.ok) {
                await fetchCars();  // Fetch updated list
                
                setCarName('');
                setCarModel('');
                setCarColor('');
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error('Error adding car:', error);
        }
    };

    return (
        <div className='flex flex-col items-center pt-10 w-full'>
            <h2 className='text-5xl font-bold text-center mb-8 text-white'>
                Welcome to the Dashboard {user.username}
            </h2>
            
            <div className="mt-20 w-full">
                <CarList cars={cars} />
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div>
                    <h3 className='text-lg font-bold mb-4'>Add Car</h3>
                    <form className='flex flex-col gap-4 items-center justify-center border-2 border-gray-300 rounded-md p-4 w-full'>
                        <input className='border-2 border-gray-300 rounded-md p-2 w-full' type="text" name='carName' id='carName' value={carName} onChange={(e) => setCarName(e.target.value)} placeholder='Car Name' />
                        <input className='border-2 border-gray-300 rounded-md p-2 w-full' type="text" name='carModel' id='carModel' value={carModel} onChange={(e) => setCarModel(e.target.value)} placeholder='Car Model' />
                        <input className='border-2 border-gray-300 rounded-md p-2 w-full' type="text" name='carColor' id='carColor' value={carColor} onChange={(e) => setCarColor(e.target.value)} placeholder='Car Color' />
                        <label className='text-black hidden' id='successMessage'>Successfully added car: {carName}</label>
                    </form>
                    <button onClick={handleAddCarSubmit} className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mx-auto block mt-4'>Add Car</button>
                    <button onClick={() => setIsModalOpen(false)} className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mx-auto block mt-4'>Close</button>
                </div>
            </Modal>

            <div className='flex flex-col items-center justify-center'>
                <button onClick={handleAddCar} className='bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mx-auto block mt-4'>Add Car</button>
            </div>
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