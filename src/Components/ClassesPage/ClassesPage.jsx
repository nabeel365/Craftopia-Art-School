import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import useClasses from '../../Hooks/useClasses';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import { Slide } from 'react-awesome-reveal';
import useInstructors from '../../Hooks/useInstructors';
import useAdmin from '../../Hooks/useAdmin';

const ClassesPage = () => {
    const { user } = useContext(AuthContext);
    const [classes] = useClasses();
    const [isInstructor] = useInstructors();
    const [isAdmin] = useAdmin();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/login';
    const [selectedClass, setSelectedClass] = useState(null); // For modal handling
    const [formData, setFormData] = useState({
        name: '',
        fatherName: '',
        phone: '',
        email: '',
        address: '',
        idProof: null,
        photo: null,
    });

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name } = e.target;
        setFormData({ ...formData, [name]: e.target.files[0] });
    };

    const handleSelect = () => {
        if (!user) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You need to login first to select a class!',
            });
            navigate(from, { replace: true });
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formPayload = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formPayload.append(key, value);
        });
        formPayload.append('classId', selectedClass);

        try {
            // Store in 'applications'
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/applications`, {
                method: 'POST',
                body: formPayload,
            });

            if (response.ok) {
                // Store in 'selected-classes'
                const selectedClassData = classes.find((c) => c._id === selectedClass);
                await fetch(`${import.meta.env.VITE_BACKEND_URL}/selected-classes`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: selectedClassData.name,
                        instructor: selectedClassData.instructor,
                        price: selectedClassData.price,
                        image: selectedClassData.image,
                        email: user.email,
                    }),
                });

                Swal.fire('Success', 'Class selected successfully!', 'success');
                setSelectedClass(null); // Close modal
            } else {
                throw new Error('Failed to submit the form.');
            }
        } catch (error) {
            Swal.fire('Error', error.message, 'error');
        }
    };

    return (
        <div className="bg-[#F6F6F2] py-10 px-5 md:px-20">
            {/* Page Header */}
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-[#2b6777]">Courses</h1>
                <p className="text-[#388087] mt-2 text-lg">
                    Choose from our wide range of classes and enhance your skills.
                </p>
            </div>

            {/* Classes List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.map((classItem) => (
                    <Slide key={classItem._id}>
                        <div
                            className={`rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 ${
                                classItem.available_seats === 0 ? 'opacity-50 bg-gray-200' : 'bg-[#BADFE7]'
                            }`}
                        >
                            <img
                                src={classItem.image}
                                alt={classItem.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-[#2b6777] mb-2">
                                    {classItem.name}
                                </h3>
                                <p className="text-[#388087] mb-2">
                                    <strong>Instructor:</strong> {classItem.instructor}
                                </p>
                                <p className="text-[#2b6777] mb-2">
                                    <strong>Available Seats:</strong> {classItem.available_seats}
                                </p>
                                <p className="text-[#388087] mb-4">
                                    <strong>Price:</strong> ₹ {classItem.price}
                                </p>
                                {!user ? (
                                    <button
                                        disabled={classItem.available_seats === 0}
                                        className="bg-[#2b6777] hover:bg-[#388087] text-white font-bold py-2 px-4 rounded"
                                        onClick={handleSelect}
                                    >
                                        Login to Select
                                    </button>
                                ) : (
                                    <button
                                        disabled={
                                            classItem.available_seats === 0 ||
                                            isAdmin.admin ||
                                            isInstructor.instructor
                                        }
                                        className="bg-[#2b6777] hover:bg-[#388087] text-white font-bold py-2 px-4 rounded"
                                        onClick={() => setSelectedClass(classItem._id)}
                                    >
                                        Select Course
                                    </button>
                                )}
                            </div>
                        </div>
                    </Slide>
                ))}
            </div>

            {/* Modal */}
            {selectedClass && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                    <form
                        className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-3/5 lg:w-2/5 max-h-[90vh] overflow-y-auto"
                        onSubmit={handleFormSubmit}
                    >
                        <h2 className="text-2xl font-bold text-[#2b6777] mb-4 text-center">
                            Fill up the form to continue
                        </h2>
                        <div className="space-y-4">
                            {[
                                { label: "Full Name", name: "name" },
                                { label: "Father's Name", name: "fatherName" },
                                { label: "Email", name: "email" },
                                { label: "Phone Number", name: "phone" },
                                { label: "Full Address", name: "address", type: "textarea" },
                            ].map(({ label, name, type }) => (
                                <div key={name}>
                                    <label className="text-[#2b6777] font-semibold block">{label}</label>
                                    {type === "textarea" ? (
                                        <textarea
                                            name={name}
                                            value={formData[name]}
                                            onChange={handleFormChange}
                                            className="w-full border border-[#388087] rounded-lg p-2 bg-[#F6F6F2]"
                                            required
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            name={name}
                                            value={formData[name]}
                                            onChange={handleFormChange}
                                            className="w-full border border-[#388087] rounded-lg p-2 bg-[#F6F6F2]"
                                            required
                                        />
                                    )}
                                </div>
                            ))}
                            <div>
                                <label className="text-[#2b6777] font-semibold block">
                                    ID Proof (HS Admit Card, Aadhar, PAN)
                                </label>
                                <input
                                    type="file"
                                    name="idProof"
                                    onChange={handleFileChange}
                                    className="w-full border border-[#388087] rounded-lg p-2 bg-[#F6F6F2]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-[#2b6777] font-semibold block">Passport Size Photo</label>
                                <input
                                    type="file"
                                    name="photo"
                                    onChange={handleFileChange}
                                    className="w-full border border-[#388087] rounded-lg p-2 bg-[#F6F6F2]"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex justify-between">
                            <button
                                type="submit"
                                className="bg-[#2b6777] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#388087]"
                            >
                                Submit
                            </button>
                            <button
                                type="button"
                                className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600"
                                onClick={() => setSelectedClass(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ClassesPage;
