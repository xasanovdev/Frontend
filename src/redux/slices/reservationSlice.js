import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  reservationPayment: {
    id: 0,
    event: 0,
    number_of_tickets: 0,
    status: 'Pending',
    message: '',
  },
  reservations: [],
  status: 'idle',
  error: null,
};

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export const createReservation = createAsyncThunk(
  'reservations/createReservation',
  async (reservationData, { rejectWithValue }) => {
    try {
      const csrfToken = getCookie('csrftoken');
      const response = await axios.post(
        'http://localhost:8000/reservations/create/',
        reservationData,
        {
          headers: {
            'X-CSRFToken': csrfToken, 
          },
          withCredentials: true, 
        }
      );

      if (response.status !== 201) {
        throw new Error('Failed to create reservation');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllReservations = createAsyncThunk(
  'reservations/fetchAllReservations',
  async (_, { rejectWithValue }) => {
    const csrfToken = getCookie('csrftoken');
    try {
      const response = await axios.get(
        'http://localhost:8000/reservations/all/',
        {
          headers: {
            'X-CSRFToken': csrfToken, 
          },
          withCredentials: true, 
        }
      );

      if (response.status !== 200) {
        throw new Error('Failed to fetch reservations');
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const cancelReservation = createAsyncThunk(
  'reservations/cancelReservation',
  async (reservationId, { rejectWithValue }) => {
    try {
      const csrfToken = getCookie('csrftoken'); 
      const response = await axios.delete(
        `http://localhost:8000/reservations/${reservationId}/cancel/`,
        {
          headers: {
            'X-CSRFToken': csrfToken, 
          },
          withCredentials: true, 
        }
      );

      if (response.status !== 204) {
        throw new Error('Failed to cancel reservation');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateReservation = createAsyncThunk(
  'reservations/updateReservation',
  async ({ id, event, number_of_tickets }, { rejectWithValue }) => {
    try {
      const csrfToken = getCookie('csrftoken');
      const response = await axios.put(
        `http://localhost:8000/reservations/${id}/update/`,
        { event, number_of_tickets },
        {
          headers: {
            'X-CSRFToken': csrfToken,
          },
          withCredentials: true,
        }
      );

      if (response.status !== 200) {
        throw new Error('Failed to update reservation');
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const payForReservation = createAsyncThunk(
  'reservations/payForReservation',
  async ({ reservationId, paymentData }, { rejectWithValue }) => {
    try {
      const csrfToken = getCookie('csrftoken');
      const response = await axios.patch(
        `http://localhost:8000/reservations/${reservationId}/pay/`,
        paymentData,
        {
          headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json',
          },
          withCredentials: true, 
        }
      );

      if (response.status !== 200) {
        throw new Error('Payment failed');
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    updateReservationLocally: (state, action) => {
      const { id, event, number_of_tickets } = action.payload;
      const reservationToUpdate = state.reservations.find(
        (reservation) => reservation.id === id
      );

      if (reservationToUpdate) {
        reservationToUpdate.event = event;
        reservationToUpdate.number_of_tickets = number_of_tickets;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReservation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reservations.push(action.payload);
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getAllReservations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllReservations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reservations = action.payload;
      })
      .addCase(getAllReservations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(cancelReservation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reservations = state.reservations
          .filter((reservation) => reservation.id !== action.meta.arg)
          .addCase(updateReservation.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.reservations.push(action.payload);
            state.error = null;
          });
      })
      .addCase(payForReservation.pending, (state) => {
        state.reservationPayment.status = 'loading';
      })
      .addCase(payForReservation.fulfilled, (state, action) => {
        state.reservationPayment.status = 'succeeded';
        state.reservationPayment.message = action.payload;
      })
      .addCase(payForReservation.rejected, (state, action) => {
        state.reservationPayment.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { updateReservationLocally } = reservationsSlice.actions;

export default reservationsSlice.reducer;
