import React from 'react';

function CarList({ cars, handleDeleteCar, handleUpdateCar }) {
    const getRowKey = (car, index) => {
        if (car._id) {
            return car._id;
        }
        return index;
    };

    return (
        <div className="max-w-[1200px] mx-auto px-4">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Car Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Model
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Color
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map((car, index) => (
                            <tr key={getRowKey(car, index)} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {car.carName}
                                </th>
                                <td className="px-6 py-4">
                                    {car.carModel}
                                </td>
                                <td className="px-6 py-4">
                                    {car.carColor}
                                </td>
                                <td className="px-6 py-4 flex gap-2">
                                    <button 
                                        onClick={() => handleUpdateCar(car)}
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteCar(car._id)}
                                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CarList;