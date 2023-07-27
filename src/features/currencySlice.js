import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../api/axiosInstance";
import { currencyUrl } from "../api/apiEndpoints";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: "",
  currencyData: [],
  response: null,
};

// Async thunk for creating a currency
export const createCurrency = createAsyncThunk(
  "currencySlice/createCurrency",
  async (currencyData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(currencyUrl, currencyData).then((res)=> res.data); // Replace '/api/createCurrency' with your actual API endpoint for creating a currency
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for getting currencies
export const getCurrencies = createAsyncThunk(
  "currencySlice/getCurrencies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(currencyUrl).then((res)=>res.data); // Replace '/api/getCurrencies' with your actual API endpoint for fetching currencies
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const currencySlice = createSlice({
  name: "currencySlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle the pending, fulfilled, and rejected states for createCurrency
    builder
      .addCase(createCurrency.pending, (state) => {
        state.isLoading = true;
        state.error = "";
        state.response = null;
      })
      .addCase(createCurrency.fulfilled, (state, action) => {
        state.isLoading = false;
          state.response = [action.payload, ...state.currencyData]

          toast.success("Currency Added")
      })
      .addCase(createCurrency.rejected, (state, action) => {
        state.isLoading = false;
          state.error = action.payload || "Error creating currency.";

          toast.error(action.payload)
      });

    // Handle the pending, fulfilled, and rejected states for getCurrencies
    builder
      .addCase(getCurrencies.pending, (state) => {
        state.isLoading = true;
        state.error = "";
        state.currencyData = [];
      })
      .addCase(getCurrencies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currencyData = action.payload;
      })
      .addCase(getCurrencies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Error fetching currencies.";
      });
  },
});

export default currencySlice.reducer;
