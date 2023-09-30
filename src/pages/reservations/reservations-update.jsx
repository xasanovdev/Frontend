import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateReservation,
  updateReservationLocally,
} from '../../redux/slices/reservationSlice';
import { useParams } from 'react-router-dom';

const ReservationUpdate = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const reservations = useSelector((state) => state.reservations);
  const reservation = reservations.reservations.find(
    (reservation) => reservation.id === +params.id
  );

  const [formData, setFormData] = useState({
    id: +reservation.id,
    event: +reservation.event,
    number_of_tickets: +reservation.number_of_tickets,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateReservation(formData))
      .then(() => {
        // dispatch(updateReservationLocally(formData));
        console.log('Reservation updated successfully');
      })
      .catch((error) => {
        console.error('Error updating reservation:', error);
      });
  };

  return (
    <div className="max-w-md w-full h-[calc(100vh-140px)] flex items-center mx-auto mt-8 p-6 ">
      <div className="w-full">
        <h2 className="text-center text-2xl font-semibold mb-4">
          Update Reservation
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="event"
              className="block text-sm font-medium text-gray-600"
            >
              Event:
            </label>
            <input
              type="text"
              id="event"
              name="event"
              value={formData.event}
              onChange={handleChange}
              className="mt-1 p-2 w-full rounded border border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="number_of_tickets"
              className="block text-sm font-medium text-gray-600"
            >
              Number of Tickets:
            </label>
            <input
              type="number"
              id="number_of_tickets"
              name="number_of_tickets"
              value={formData.number_of_tickets}
              onChange={handleChange}
              className="mt-1 p-2 w-full rounded border border-gray-300"
            />
          </div>
          <button
            type="submit"
            className="font-sans text-center w-full bg-black text-white hover:bg-gray-800 hover:text-white py-2 px-8 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
          >
            Update Reservation
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReservationUpdate;
