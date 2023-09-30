import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  newPassword: '',
  newPassword1: '',
  isLoading: false,
  error: null,
  message:null,
};
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
export const getPasswordResetData = createAsyncThunk(
  'passwordReset/getData',
  async (_, { rejectWithValue }) => {
    const csrfToken = getCookie('csrftoken');

    try {
      const response = await axios.get(
        'http://localhost:8000/user/reset_password/',
        {
          headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json', 
          },
          withCredentials: true, 
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data); 
    }
  }
);

export const resetPassword = createAsyncThunk(
  'passwordReset/resetPassword',
  async (passwordData, { rejectWithValue }) => {
    const csrfToken = getCookie('csrftoken');
    try {
      const response = await axios.put(
        'http://localhost:8000/user/reset_password/',
        passwordData,
        {
          headers: {
            'X-CSRFToken': csrfToken, 
          },
          withCredentials: true, 
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data); 
    }
  }
);

const passwordResetSlice = createSlice({
  name: 'passwordReset',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPasswordResetData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPasswordResetData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newPassword = action.payload.new_password;
        state.newPassword1 = action.payload.new_password1;
      })
      .addCase(getPasswordResetData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.message = null;
        state.error = action.payload.detail;
      });
  },
});

export default passwordResetSlice.reducer;
