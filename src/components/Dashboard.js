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
import VerticalMenu from './VerticalMenu';  // Import the new component


function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [carName, setCarName] = useState('');
    const [carModel, setCarModel] = useState('');
    const [carColor, setCarColor] = useState('');
    const [cars, setCars] = useState([]);
    const user = useSelector((state) => state.auth.user);
    const [editingCar, setEditingCar] = useState(null);

    useEffect(() => {
        fetchCars();
    }, []);

    const handleLogout = () => {
        dispatch(logout());  // This will clear both Redux state and localStorage
        navigate('/');
    }

    const handleDeleteCar = async (id) => {
        try {
            await fetch(`http://localhost:3000/cars/delete/${id}`, { method: 'DELETE' });
            await fetchCars();
        } catch (error) {
            console.error('Error deleting car:', error);
        }
    };

    const handleUpdateCar = (car) => {
        setEditingCar(car);  // Store the car being edited
        setCarName(car.carName);  // Pre-fill form
        setCarModel(car.carModel);
        setCarColor(car.carColor);
        setIsModalOpen(true);
    };

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
                await fetchCars();
            }
        } catch (error) {
            console.error('Error adding car:', error);
        }
    };

    const handleSubmit = async () => {
        try {
            if (editingCar) {
                // Update existing car
                const response = await fetch(`http://localhost:3000/cars/update/${editingCar._id}`, {
                    method: 'PUT',
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
                    await fetchCars();
                }
            } else {
                // Add new car
                await handleAddCarSubmit();
            }

            setEditingCar(null);  // Clear editing state
            setCarName('');
            setCarModel('');
            setCarColor('');
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const getButtonText = () => {
        if (editingCar) {
            return 'Update Car';
        }
        return 'Add Car';
    };

    const getModalTitle = () => {
        if (editingCar) {
            return 'Update Car';
        }
        return 'Add Car';
    };

    return (
        <div className='flex min-h-screen' style={{ backgroundColor: '#0C0C11' }}>
            {/* Vertical Menu */}
            <VerticalMenu onLogout={handleLogout} username={user.username} />
            {/* Main Content */}
            <div className='flex-grow flex flex-col'>
                <div className=' w-full h-1/3 pl-4 pr-4 pt-4' style={{ backgroundColor: '#0C0C11' }}>
                    <div className='w-full h-full' style={{ backgroundColor: '#181828' }}>
                        <h1>Top div</h1>
                    </div>

                </div>
                <div className='flex flex-row flex-grow'>
                    <div className='flex flex-col w-1/2 h-full p-4' style={{ backgroundColor: '#0C0C11' }}>
                        <div className='flex flex-col bg-green-500 w-full h-full' style={{ backgroundColor: '#181828' }}>
                            <h1>Feed</h1>
                        </div>
                    </div>
                    {/* Car List */}
                    <div className='flex-grow flex flex-col items-center w-1/2 h-full' style={{ backgroundColor: '#0C0C11' }}>
                        <div className="p-4 m-4 w-full h-full" style={{ backgroundColor: '#181828' }}>
                            <h1 className='text-white text-2xl font-bold mb-4 text-center'>Car List</h1>
                            <CarList cars={cars} handleDeleteCar={handleDeleteCar} handleUpdateCar={handleUpdateCar} />
                            <div className='flex flex-col items-center justify-center'>
                                <button onClick={handleAddCar} className='bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mx-auto block mt-4'>Add Car</button>
                            </div>
                        </div>
                        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                            <div>
                                <h3 className='text-lg font-bold mb-4'>
                                    {getModalTitle()}
                                </h3>
                                <form className='flex flex-col gap-4 items-center justify-center border-2 border-gray-300 rounded-md p-4 w-full'>
                                    <input className='border-2 border-gray-300 rounded-md p-2 w-full' type="text" name='carName' id='carName' value={carName} onChange={(e) => setCarName(e.target.value)} placeholder='Car Name' />
                                    <input className='border-2 border-gray-300 rounded-md p-2 w-full' type="text" name='carModel' id='carModel' value={carModel} onChange={(e) => setCarModel(e.target.value)} placeholder='Car Model' />
                                    <input className='border-2 border-gray-300 rounded-md p-2 w-full' type="text" name='carColor' id='carColor' value={carColor} onChange={(e) => setCarColor(e.target.value)} placeholder='Car Color' />
                                    <label className='text-black hidden' id='successMessage'>Successfully added car: {carName}</label>
                                </form>
                                <button
                                    onClick={handleSubmit}
                                    className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mx-auto block mt-4'
                                >
                                    {getButtonText()}
                                </button>
                                <button onClick={() => {
                                    setIsModalOpen(false);
                                    setEditingCar(null);
                                    setCarName('');
                                    setCarModel('');
                                    setCarColor('');
                                }} className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mx-auto block mt-4'>
                                    Close
                                </button>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;