import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";
import { createInsight } from "../api/apiEndpoints";

export const createInsights = createAsyncThunk(
  "insight/add",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post(createInsight, data).then((res) => res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  insightByDate: "",
  insightByCustomer: "",
  insightByPorts: "",
  insightData: "",
  isLoading: "",
  isError: "",
  errorMsg: "",
};

const insightSlice = createSlice({
  name: "insights",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createInsights.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createInsights.rejected, (state, action) => {
        state.errorMsg = action.payload;
      })
      .addCase(createInsights.fulfilled, (state, action) => {
        state.insightData = action.payload;
        state.isLoading = false;
      });
  },
});

export default insightSlice.reducer;
