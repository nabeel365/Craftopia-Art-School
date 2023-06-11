import React, { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import axios from 'axios';

const AddAClass = () => {
  const { user } = useContext(AuthContext);
  console.log(user.email);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const classData = {
      name: e.target.elements.className.value,
      image: e.target.elements.classImage.files[0],
      instructor: user.displayName,
      email: user.email,
      available_seats: parseInt(e.target.elements.available_seats.value),
      price: parseFloat(e.target.elements.price.value),
    };

    try {
      await axios.post('http://localhost:5000/classes', classData);

      e.target.reset();
      
    } catch (error) {
      console.error('Error saving class data:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add a Class</h1>
      <form
        className="w-full max-w-md bg-white rounded-lg shadow-md px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        {/* Form fields */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="class-name">
            Class Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="class-name"
            type="text"
            placeholder="Enter class name"
            name='className'
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="class-image">
            Class Image
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="class-image"
            type="file"
            accept="image/*"
            name='classImage'
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="instructor-name">
            Instructor Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="instructor-name"
            type="text"
            value={user.displayName}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="instructor-email">
            Instructor Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="instructor-email"
            type="email"
            value={user.email}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="available-seats">
            Available Seats
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="available-seats"
            type="number"
            placeholder="Enter available seats"
            name='available_seats'
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="number"
            placeholder="Enter price"
            name='price'
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAClass;
