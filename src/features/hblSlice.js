import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../api/axiosInstance";
import { hblUrl, hblbyShipmentUrl } from "../api/apiEndpoints";

export const createHbl = createAsyncThunk(
  "hblCreate",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post(hblUrl, data).then((res) => res.data);
      return res.data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const updateHbl = createAsyncThunk(
  "hbl/put",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.put(hblUrl, data).then((res) => res.data);
      return res.data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const hblbyShipment = createAsyncThunk(
  "hbl/byship",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api
        .post(hblbyShipmentUrl, data)
        .then((res) => res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  hblData: [],
  hblCreate: "",
  isLoading: "",
  isError: "",
  errorMsg: "",
};

const hblSlice = createSlice({
  name: "hblSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => [
    builder
      .addCase(createHbl.fulfilled, (state, action) => {
        state.hblCreate = action.payload;
        state.isLoading = false;
      })
      .addCase(createHbl.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(createHbl.rejected, (state, { payload }) => {
        state.isError = true;
        state.errorMsg = payload;
      }),

    builder
      .addCase(hblbyShipment.fulfilled, (state, action) => {
        state.hblData = action.payload;
        state.isLoading = false;
      })
      .addCase(hblbyShipment.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(hblbyShipment.rejected, (state, action) => {
        state.errorMsg = action.payload;
      }),
  ],
});

export default hblSlice.reducer;
