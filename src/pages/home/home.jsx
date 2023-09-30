import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Title from '../../components/title/title';
import EventDetails from '../../components/event-details/event-details';
import { getEvents } from '../../redux/slices/eventSlices';
import { useEffect } from 'react';
import { getAllReservations } from '../../redux/slices/reservationSlice';
import ReservationDetails from '../../components/reservation-details/reservation-details';

export default function Home() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);
  const { events } = useSelector((state) => state.events);
  const { reservations } = useSelector((state) => state.reservations);
  console.log(reservations);
  useEffect(() => {
    dispatch(getAllReservations());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch, state.status]);

  return state.status === 'succeeded' ? (
    <>
      <div className="">
        <div>
          <div className="flex items-center justify-between py-4">
            <Title title="Your Events" />
            <Link to="/event-create">
              <button className="font-sans text-center bg-black text-white hover:bg-gray-800 hover:text-white py-2 px-8 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600">
                Let&apos;s Create
              </button>
            </Link>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            {events?.length !== 0 ? (
              events?.map((event) => {
                return <EventDetails key={event.id} {...event} />;
              })
            ) : (
              <p className="text-center text-gray-500 text-xl mt-4">
                {events?.length === 0
                  ? 'There are no events, but you can be the first to create an event :)'
                  : 'Loading events...'}
              </p>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between py-4">
            <Title title="Your Reservations" />
            <button className="font-sans text-center bg-black text-white hover:bg-gray-800 hover:text-white py-2 px-8 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600">
              Let&apos;s Create
            </button>
          </div>
          <div className="">
            <ReservationDetails reservations={reservations} />
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="flex-1 hero__section">
        <div className="max-h-screen">
          <h1 className="text-[30px] md:text-[50px] lg:text-[70px] mt-[100px] flex items-center justify-center flex-col h-100 font-bold text-center">
            Your daily events <br />{' '}
            <span className="font-thin logo text-[40px] md:text-[60px] lg:text-[80px]">
              <span className="text-red-600">B</span>ooklisT Ap
              <span className="text-red-600">p</span>
            </span>
          </h1>
          <p className="w-1/2 m-auto font-serif text-slate-500 text-[1rem] md:text-[1.5rem] text-center mt-4">
            Service for buying tickets or selling tickets for various events.
          </p>
          <div className="text-center mt-5">
            <Link to={'/register'}>
              <button className="m-auto font-serif text-center bg-black text-white hover:bg-gray-800 hover:text-white py-2 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600">
                Let&apos;s Buy
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="py-12">
        <div className="flex items-center justify-between py-4">
          <Title title="Events" />
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          {events?.length !== 0 ? (
            events?.map((event) => {
              return <EventDetails key={event.id} {...event} />;
            })
          ) : (
            <p className="text-center text-gray-500 text-xl mt-4">
              {events?.length === 0
                ? 'There are no events, but you can be the first to create an event :)'
                : 'Loading events...'}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
