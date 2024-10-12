import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ElevatorState } from '../interfaces/elevatorInterface';

const API_URL = 'http://localhost:3001/elevator';

export const callElevator = createAsyncThunk(
  'elevator/call',
  async (floor: number) => {
    const response = await axios.post<{ message: string }>(`${API_URL}/call/${floor}`);
    return response.data;
  }
);

export const getStatus = createAsyncThunk(
  'elevator/status',
  async () => {
    const response = await axios.get<ElevatorState>(`${API_URL}/status`);
    return response.data;
  }
);

const initialState: ElevatorState = {
  currentFloor: 1,
  isMoving: false,
  isDoorOpen: false,
  pendingRequests: [],
  direction: 'inmovil',
  status: 'inmovil',
  error: null,
};

const elevatorSlice = createSlice({
  name: 'elevator',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getStatus.fulfilled, (state, action: PayloadAction<ElevatorState>) => {
        return { ...state, ...action.payload, status: 'succeeded' };
      })
      .addCase(getStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default elevatorSlice.reducer;