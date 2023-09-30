import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { payForReservation } from '../../redux/slices/reservationSlice';

const ReservationPayment = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [paymentData, setPaymentData] = useState({ amount: '' });

  const reservations = useSelector((state) => state.reservations);
  const reservation = reservations.reservations.find(
    (reservation) => reservation.id === +params.id
  );
  console.log(reservation);

  const handlePayment = () => {
    dispatch(payForReservation({ reservationId: reservation.id, paymentData }))
      .then(() => {
        console.log('Payment successful');
      })
      .catch((error) => {
        console.error('Payment failed:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  return (
    <div className="bg-white h-[calc(100vh-140px)] p-4 rounded flex items-center justify-center">
      <div className="max-w-lg w-full">
        <h2 className="text-2xl text-center font-semibold mb-4">Payment Details</h2>
        <div className="mb-4">
          <input
            type="number"
            id="amount"
            name="amount"
            onChange={handleChange}
            placeholder="Payment Amount:"
            value={paymentData.amount || ''}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          onClick={handlePayment}
          className="font-sans w-full text-center bg-black text-white hover:bg-gray-800 hover:text-white py-2 px-8 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default ReservationPayment;
