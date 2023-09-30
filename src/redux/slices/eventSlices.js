import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  events: null,
  isLoading: false,
  error: null,
};

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export const createEvent = createAsyncThunk(
  'events/create',
  async (formData) => {
    const csrfToken = getCookie('csrftoken');


    const response = await axios.post(
      'http://localhost:8000/events/create/',
      formData,
      {
        headers: {
          'X-CSRFToken': csrfToken, 
          'Content-Type': 'multipart/form-data', 
        },
        withCredentials: true, 
      }
    );

    if (!response.ok) {
      const errorData = await response.data;
      throw new Error(errorData.message);
    }

    const eventData1 = response.data;
    return eventData1;
  }
);

export const getEvents = createAsyncThunk(
  'events/get',
  async (_, rejectWithValue) => {
    const csrfToken = getCookie('csrftoken');
    try {
      const response = await axios.get('http://localhost:8000/events/all/', {
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (response.status !== 200) {
        throw new Error('Failed to fetch');
      }
      const eventData = response.data;
      return eventData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteEvent = createAsyncThunk(
  'events/delete',
  async (eventId) => {
    const csrfToken = getCookie('csrftoken');
    try {
      const response = await axios.delete(
        `http://localhost:8000/events/${eventId}/delete/`,
        {
          headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      if (response.status !== 204) {
        throw new Error('Failed to delete event');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const updateEventPut = createAsyncThunk(
  'events/updatePut',
  async ({ eventId, eventData }) => {
    const csrfToken = getCookie('csrftoken');
    try {
      const response = await axios.put(
        `http://localhost:8000/events/${+eventId}/update/`,
        eventData,
        {
          headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );
      if (response.status !== 200) {
        throw new Error('Failed to update event using PUT');
      }
      const updatedEvent = response.data;
      return updatedEvent;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const updateEventPatch = createAsyncThunk(
  'events/updatePatch',
  async ({ eventId, eventData }) => {
    const csrfToken = getCookie('csrftoken');
    try {
      const response = await axios.patch(
        `http://localhost:8000/events/${+eventId}/update/`,
        eventData,
        {
          headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );
      if (response.status !== 200) {
        throw new Error('Failed to update event using PATCH');
      }
      const updatedEvent = response.data;
      return updatedEvent;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = action.payload;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getEvents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = action.payload;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteEvent.fulfilled, () => {
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateEventPut.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateEventPut.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = state.events.map((event) =>
          event.id === action.payload.id ? action.payload : event
        );
      })
      .addCase(updateEventPut.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateEventPatch.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateEventPatch.fulfilled, (state, action) => {
        state.isLoading = false;
        // Update the state with the updated event received in the payload
        state.events = state.events.map((event) =>
          event.id === action.payload.id ? action.payload : event
        );
      })
      .addCase(updateEventPatch.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default eventSlice.reducer;
