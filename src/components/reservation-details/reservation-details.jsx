import { useDispatch, useSelector } from 'react-redux';
import ReservationList from './reservation-list';

const ReservationDetails = ({ reservations }) => {
  const { events } = useSelector((state) => state);

  const eventsWithReservations = events.events?.filter((event) =>
    reservations.some((reservation) => event.id === reservation.event)
  );
  console.log(eventsWithReservations);
  return (
    <div className="bg-white">
      {eventsWithReservations?.map((eventWithReservation) => (
        <div key={eventWithReservation.id}>
          <ul className="list-disc list-inside">
            {reservations?.map((reservation) => (
              <ReservationList
                key={reservation.id}
                reservation={reservation}
                eventWithReservation={eventWithReservation}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ReservationDetails;
