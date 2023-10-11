import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../api/axiosInstance";
import { hblUrl } from "../api/apiEndpoints";

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
  ],
});

export default hblSlice.reducer;
