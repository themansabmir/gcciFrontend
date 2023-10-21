import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../api/axiosInstance";
import { shipmentBytype } from "../api/apiEndpoints";


export const getShipmentByType = createAsyncThunk(
  "shipment/get",
  async (data, rejectWithValue) => {
    try {
      const res = await api.post(shipmentBytype, data).then((res) => res.data);
      return res.data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const createShipment = createAsyncThunk(
  "shipment/create ",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("api/shipment", data).then((res) => res.data);
      return res.data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isLoading: false,
  isError: false,
  errorResponse: "",
  createShipment: "",
  getShipment: "",
  deleteShipment: "",
  updateShipment: "",
};

const shipmentSlice = createSlice({
  name: "shipment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getShipmentByType.fulfilled, (state, action) => {
      state.getShipment = action.payload;
    });
  },
});

export const shipmentData = (state) => state?.shipment?.getShipment;

export default shipmentSlice.reducer;
