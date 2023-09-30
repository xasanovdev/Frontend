// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData) => {
    const csrfToken = getCookie('csrftoken');
    const response = await axios.post(
      'http://localhost:8000/user/registration/',
      userData,
      {
        headers: {
          'X-CSRFToken': csrfToken, 
        },
        withCredentials: true, 
      }
    );

    if (!response.data || response.status !== 200) {
      throw new Error('Registration failed');
    }
    console.log(response);
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials) => {
    const csrfToken = getCookie('csrftoken');
    const response = await axios.post(
      'http://localhost:8000/user/login/',
      credentials,
      {
        headers: {
          'X-CSRFToken': csrfToken, 
        },
        withCredentials: true, 
      }
    );
    return response.data;
  }
);
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    username: null,
    password: null,
    error: null,
    status: 'idle',
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'idle';
        state.user = null;
        state.error = null;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
  },
});

export const { setUsername, setPassword } = authSlice.actions;

export default authSlice.reducer;
