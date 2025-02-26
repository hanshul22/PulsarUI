import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  fetchAdminCodesService, 
  fetchUserCodesService, 
  createCodeService, 
  deleteCodeService 
} from '../../services/codeService';
import toast from 'react-hot-toast';

// Async thunks
export const fetchAdminCodes = createAsyncThunk(
  'codes/fetchAdminCodes',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAdminCodesService();
    } catch (error) {
      toast.error('Failed to fetch admin codes');
      return rejectWithValue('Failed to fetch admin codes');
    }
  }
);

export const fetchUserCodes = createAsyncThunk(
  'codes/fetchUserCodes',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchUserCodesService();
    } catch (error) {
      toast.error('Failed to fetch user codes');
      return rejectWithValue('Failed to fetch user codes');
    }
  }
);

export const createUserCode = createAsyncThunk(
  'codes/createUserCode',
  async (formData, { rejectWithValue }) => {
    try {
      const result = await createCodeService(formData);
      toast.success('Code created successfully!');
      return result;
    } catch (error) {
      toast.error('Failed to create code');
      return rejectWithValue('Failed to create code');
    }
  }
);

export const deleteUserCode = createAsyncThunk(
  'codes/deleteUserCode',
  async (codeId, { rejectWithValue }) => {
    try {
      await deleteCodeService(codeId);
      toast.success('Code deleted successfully!');
      return codeId;
    } catch (error) {
      toast.error('Failed to delete code');
      return rejectWithValue('Failed to delete code');
    }
  }
);

const initialState = {
  adminCodes: [],
  userCodes: [],
  loading: false,
  error: null,
};

const codesSlice = createSlice({
  name: 'codes',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Admin Codes
      .addCase(fetchAdminCodes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminCodes.fulfilled, (state, action) => {
        state.loading = false;
        state.adminCodes = action.payload;
      })
      .addCase(fetchAdminCodes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // User Codes
      .addCase(fetchUserCodes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCodes.fulfilled, (state, action) => {
        state.loading = false;
        state.userCodes = action.payload;
      })
      .addCase(fetchUserCodes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create User Code
      .addCase(createUserCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUserCode.fulfilled, (state, action) => {
        state.loading = false;
        state.userCodes.push(action.payload);
      })
      .addCase(createUserCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete User Code
      .addCase(deleteUserCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserCode.fulfilled, (state, action) => {
        state.loading = false;
        state.userCodes = state.userCodes.filter(code => code._id !== action.payload);
      })
      .addCase(deleteUserCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = codesSlice.actions;

// Selectors
export const selectAdminCodes = (state) => state.codes.adminCodes;
export const selectUserCodes = (state) => state.codes.userCodes;
export const selectCodesLoading = (state) => state.codes.loading;
export const selectCodesError = (state) => state.codes.error;

export default codesSlice.reducer;