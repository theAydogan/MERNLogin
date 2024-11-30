import React, { useState, useEffect } from 'react';

function CarList() {
    const [cars, setCars] = useState([]);  // Store all cars

    // Fetch cars when component mounts
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch('http://localhost:3000/cars/list');
                const data = await response.json();
                setCars(data);  // Store cars in state
            } catch (error) {
                console.error('Error fetching cars:', error);
            }
        };

        fetchCars();
    }, []);  // Empty array means run once when component mounts

    return (
        <div>
            <table className='table table-striped table-bordered bg-white rounded shadow-sm w-100 mx-auto p-3'>
                <thead>
                    <tr>
                        <th className='font-weight-bold text-center'>Car Name</th>
                        <th className='font-weight-bold text-center'>Car Model</th>
                        <th className='font-weight-bold text-center'>Car Color</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map((car, index) => (
                        <tr key={car._id || index}>
                            <td>{car.carName}</td>
                            <td>{car.carModel}</td>
                            <td>{car.carColor}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CarList;