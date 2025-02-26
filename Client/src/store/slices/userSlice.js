import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginService, registerService, logoutService } from '../../services/authService';
import toast from 'react-hot-toast';

// Helper function to safely parse JSON
const safeJSONParse = (str) => {
  try {
    return str ? JSON.parse(str) : null;
  } catch (err) {
    return null;
  }
};

// Get stored data safely
const storedUser = safeJSONParse(localStorage.getItem('user'));
const storedToken = localStorage.getItem('token');

// Initial state with safe values
const initialState = {
  user: storedUser,
  token: storedToken,
  loading: false,
  error: null,
};

// Async thunks
export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const result = await loginService(credentials);
      toast.success('Login successful!');
      return result;
    } catch (error) {
      toast.error(error.message || 'Login failed');
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, { rejectWithValue }) => {
    try {
      const result = await registerService(userData);
      toast.success('Registration successful!');
      return result;
    } catch (error) {
      toast.error(error.message || 'Registration failed');
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutService();
      toast.success('Logged out successfully');
      return null;
    } catch (error) {
      toast.error('Logout failed');
      return rejectWithValue('Logout failed');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout cases
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Still clear the state even if API call fails
        state.user = null;
        state.token = null;
      });
  },
});

export const { clearError } = userSlice.actions;

// Selectors
export const selectUser = (state) => state.user.user;
export const selectToken = (state) => state.user.token;
export const selectIsAuthenticated = (state) => !!state.user.token;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;

export default userSlice.reducer;