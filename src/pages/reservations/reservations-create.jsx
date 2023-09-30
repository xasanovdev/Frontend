// ReservationForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createReservation } from '../../redux/slices/reservationSlice';

function ReservationsCreate() {
  const dispatch = useDispatch();
    const params = useParams();
    console.log(params);
  const [formData, setFormData] = useState({
    event: +params.id,
    number_of_tickets: 0,
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createReservation(formData));
  };

  return (
    <div className="h-[calc(100vh-140px)] flex items-center justify-center">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">
          Create Reservation
        </h2>
        <form onSubmit={handleSubmit} className="bg-white p-4 mx-auto">
          <div className="mb-4">
            <input
              type="number"
              id="number_of_tickets"
              name="number_of_tickets"
              placeholder="Number of Tickets"
              value={formData.number_of_tickets}
              onChange={handleInputChange}
              className="w-full mt-4 p-2 border border-black rounded focus:outline-none focus:ring focus:border-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white rounded p-2 hover:bg-red-600 focus:ring"
          >
            Create Reservation
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReservationsCreate;
