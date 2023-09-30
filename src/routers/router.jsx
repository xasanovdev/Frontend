import { Route, Routes } from 'react-router-dom';
import Layout from '../layout/layout';
import EventCreate from '../pages/events/events-create';
import Home from '../pages/home/home';
import PasswordResetForm from '../pages/auth/change-password/change-password';
import Register from '../pages/auth/register/register';
import Login from '../pages/auth/login/login';
import { useSelector } from 'react-redux';
import NotFound from '../pages/auth/not-found/not-found';
import EventUpdate from '../pages/events/update-event';
import NotLogin from '../pages/auth/not-login/not-login';
import ReservationsCreate from '../pages/reservations/reservations-create';
import ReservationUpdate from '../pages/reservations/reservations-update';
import ReservationPayment from '../pages/reservations/reservation-payment';

export default function Routers() {
  const state = useSelector((state) => state.auth);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" index element={<Home />} />
          {state.status === 'succeeded' ? (
            <>
              <Route path="reset-password" element={<PasswordResetForm />} />
              <Route path="event-create" element={<EventCreate />} />
              <Route path="event/:id/update" element={<EventUpdate />} />
              <Route
                path="reservations/:id/create"
                element={<ReservationsCreate />}
              />

              <Route
                path="reservations/:id/update"
                element={<ReservationUpdate />}
              />
              <Route
                path="reservations/:id/pay"
                element={<ReservationPayment />}
              />
            </>
          ) : (
            <>
              <Route path="reset-password" element={<NotLogin />} />
              <Route path="event-create" element={<NotLogin />} />
              <Route path="event/:id/update" element={<NotLogin />} />
              <Route path="reservations/:id/create" element={<NotLogin />} />
              <Route path="reservations/:id/update" element={<NotLogin />} />
              <Route path="reservations/:id/pay" element={<NotLogin />} />
            </>
          )}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
