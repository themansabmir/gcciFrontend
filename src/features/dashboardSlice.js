import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";

import { shipmentBydate } from "../api/apiEndpoints";

export const getShipmentsbyDate = createAsyncThunk(
  "shipments/bydate",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post(shipmentBydate, data).then((res) => res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
      
    }
  }
);

const initialState = {
  data: "",
  isLoading: false,
  isError: false,
  response: "",
};
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getShipmentsbyDate.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(getShipmentsbyDate.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getShipmentsbyDate.rejected, (state, action) => {
        state.isError = action.payload;
      });
  },
});

export const shipmentsByDate = (state) => state.dashboard.data;

export default dashboardSlice.reducer;
