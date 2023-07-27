import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../api/axiosInstance";
import {toast} from 'react-toastify'

import { portUrl } from "../api/apiEndpoints";

export const createPort = createAsyncThunk(
  "portSlice/createPort",
  async (portData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(portUrl, portData).then((res)=> res.data) // Replace '/api/createPort' with your actual API endpoint for creating a port
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for getting ports
export const getPorts = createAsyncThunk(
  "portSlice/getPorts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(portUrl).then((res)=> res.data); // Replace '/api/getPorts' with your actual API endpoint for fetching ports
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const initialState = {
  isLoading: false,
  error: "",
  portData: [],
  response: null,
};

const portSlice = createSlice({
  name: "portSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle the pending, fulfilled, and rejected states for createPort
    builder
      .addCase(createPort.pending, (state) => {
        state.isLoading = true;
        state.error = "";
        state.response = null;
      })
      .addCase(createPort.fulfilled, (state, action) => {
          state.isLoading = false;
          state.response = action.payload
        state.portData = [action.payload, ...state.portData]
toast.success('New Port Added')

      })
      .addCase(createPort.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Error creating port.";
        toast.error(action.payload)
      });

    // Handle the pending, fulfilled, and rejected states for getPorts
    builder
      .addCase(getPorts.pending, (state) => {
        state.isLoading = true;
        state.error = "";
        state.portData = [];
      })
      .addCase(getPorts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.portData = action.payload;
      })
      .addCase(getPorts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Error fetching ports.";
      });
  },
});

export default portSlice.reducer;
