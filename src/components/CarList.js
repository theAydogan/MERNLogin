import React from 'react';

function CarList({ cars }) {
    return (
        <div className="w-full max-w-[1600px] px-4 mx-auto">
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Car Name</th>
                        <th className="border border-gray-300 p-2">Model</th>
                        <th className="border border-gray-300 p-2">Color</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map((car, index) => (
                        <tr key={car._id || index}>
                            <td className="border border-gray-300 p-2">{car.carName}</td>
                            <td className="border border-gray-300 p-2">{car.carModel}</td>
                            <td className="border border-gray-300 p-2">{car.carColor}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CarList;