import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEvent } from '../../redux/slices/eventSlices';
import { Link, useNavigate } from 'react-router-dom';

const EventDetails = ({
  id,
  name,
  topic,
  date,
  place,
  number_of_seats,
  ticket_price,
  currency,
  guests,
  thumbnail,
  description,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const state = useSelector((state) => state.auth);
  const [error, setError] = useState('');

  const handleDeleteClick = () => {
    dispatch(deleteEvent(id))
      .unwrap()
      .then(() => {
        console.log('Event deleted successfully.');
      })
      .catch((error) => {
        console.error('Error deleting event:', error);
        setError('You cannot delete another user event');
      });
  };
  return (
    <div className="w-full md:basis-[calc(50%-8px)] bg-white shadow-md border p-4 rounded-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-2">{name}</h2>
        <p className="text-gray-500">{topic}</p>
      </div>
      <img
        src={thumbnail}
        alt={name}
        className="w-full rounded-md h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-gray-500">{date}</p>
          <p className="text-gray-500 text-right">{place}</p>
        </div>
        <p className="text-black mb-2">{description}</p>
        <div className="flex justify-between items-center">
          <div className="text-green-500 text-lg font-semibold">
            Seats: {number_of_seats}
          </div>
          <div className="text-blue-500 text-lg font-semibold">
            {currency} {ticket_price}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Guests</h3>
          <ul>
            {guests?.map((guest) => (
              <li key={guest.id} className="text-gray-700">
                {guest.name}
              </li>
            ))}
          </ul>
        </div>
        {error && (
          <center className="bg-red-100 text-red-600 py-2">{error}</center>
        )}
        <div className="mt-4">
          {state.status === 'succeeded' ? (
            <>
              <div className="flex gap-4 justify-between">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={handleDeleteClick}
                >
                  Delete
                </button>
                <button
                  className="bg-green-600 flex-1 text-white px-4 py-2 rounded hover:bg-black"
                  onClick={() => navigate(`/reservations/${id}/create`)}
                >
                  Reserve
                </button>
                <button
                  className="bg-black flex-1 text-white px-4 py-2 rounded hover:bg-slate-900"
                  onClick={() => navigate(`/event/${id}/update`)}
                >
                  Update
                </button>
              </div>
            </>
          ) : (
            <Link to="/register">
              <button className="bg-black w-full flex-1 text-white px-4 py-2 rounded hover:bg-red-600">
                Let&apos;s buy
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
