import { useDispatch } from 'react-redux';
import { cancelReservation } from '../../redux/slices/reservationSlice';
import { useNavigate } from 'react-router-dom';

const ReservationList = ({ reservation, eventWithReservation }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    dispatch(cancelReservation(reservation.id))
      .then(() => {
        console.log('Reservation canceled successfully');
      })
      .catch((error) => {
        console.error('Error canceling reservation:', error);
      });
  };
  return (
    <>
      <li
        key={reservation.id}
        className="mb-4 relative list-none border p-4 rounded-lg"
      >
        <div className="">
          <div className="text-black text-2xl font-semibold">
            <span className="font-semibold">Event Name:</span>{' '}
            {eventWithReservation.name}
          </div>
          <img
            src={eventWithReservation.thumbnail}
            alt="Dasturlash olamiga sayohat qiling."
            className="mt-4 w-full rounded-md h-48 object-cover"
          ></img>
          <div className="text-lg mt-2 text-green-600">
            <span className="font-semibold">Number of Tickets:</span>{' '}
            {reservation.number_of_tickets}
          </div>
          <div className="text-lg  text-black">
            <span className="font-semibold">Topic:</span>{' '}
            {eventWithReservation.topic}
          </div>
          <div className="text-lg  text-black">
            <span className="font-semibold">Place:</span>{' '}
            {eventWithReservation.place}
          </div>
          <div className="text-lg  text-black">
            <span className="font-semibold">Date:</span>{' '}
            {eventWithReservation.date.substring(0, 10)}
          </div>
        </div>
        <div
          className={`${
            reservation.status === 'Confirmed'
              ? 'bg-green-100 text-green-600'
              : 'bg-orange-100 text-orange-600'
          } absolute right-0 top-24 sm:top-16 text-lg mt-2 py-2 px-4 rounded-md`}
        >
          <span className="font-semibold">Status:</span> {reservation.status}
        </div>

        <div className="flex gap-4 mt-4 justify-between">
          <button
            className="bg-red-500 flex-1 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleDeleteClick}
          >
            Delete
          </button>
          <button
            className="bg-green-600 flex-1 text-white px-4 py-2 rounded hover:bg-black"
            onClick={() => navigate(`/reservations/${reservation.id}/pay`)}
          >
            Pay
          </button>
          <button
            className="bg-black flex-1 text-white px-4 py-2 rounded hover:bg-slate-900"
            onClick={() => navigate(`/reservations/${reservation.id}/update`)}
          >
            Update
          </button>
        </div>
      </li>
    </>
  );
};

export default ReservationList;
