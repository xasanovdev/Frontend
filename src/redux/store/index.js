import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import eventReducer from '../slices/eventSlices'; 
import resetReducer from '../slices/passwordResetSlice'; 
import reservationReducer from '../slices/reservationSlice'; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer, 
    passwordReset: resetReducer,
    reservations: reservationReducer
  },
  middleware: [...getDefaultMiddleware()],
});

export default store;
