import React, { useEffect, useState } from 'react';
import { Zoom } from 'react-awesome-reveal';
import { Link } from 'react-router-dom';
// import useInstructors from '../../Hooks/useInstructors';

const InstructorsPage = () => {
  // const [isInstructor] = useInstructors();
  // console.log(isInstructor);

  const [instructors, setInstructors] = useState([]);

  console.log(instructors);

  useEffect(() => {
    fetch('https://art-server-two.vercel.app/users/instructor')
      .then(response => response.json())
      .then(data => setInstructors(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {instructors.map((instructor) => (
      <Zoom>

        <div key={instructor._id} className="bg-white rounded-lg shadow-lg p-4">
          <img src={instructor.image} alt={instructor.name} className="w-40 h-40 object-cover rounded-md mb-4" />
          <h2 className="text-lg font-semibold">Name: {instructor.name}</h2>
          <p className="text-gray-600 mb-2">Email: <span className="text-blue-500">{instructor.email}</span></p>
          {instructor.num_classes_taken && (
            <p className="text-gray-600 mb-2">Number of Classes taken: <strong>{instructor.num_classes_taken}</strong> </p>
          )}
          {instructor.classes_taken && (
            <p className="text-gray-600 mb-2">
              Classes taken: <span className="text-green-500">{instructor.classes_taken.join(', ')}</span>
            </p>
          )}
          <Link to={`classes/${instructor._id}`} className="text-blue-500 hover:underline">
            <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
              See Classes
            </button>
          </Link>
        </div>
      </Zoom>

      ))}

    </div>
  );
};

export default InstructorsPage;


