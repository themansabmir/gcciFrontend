import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addressUrl } from "../api/apiEndpoints";
import apiClient from '../api/axiosInstance'
import { toast } from "react-toastify";


export const createAddress = createAsyncThunk(
  "address/create",
  async (addressData, thunkAPI) => {
    try {
      const response = await apiClient.post(
        `${addressUrl}`,
        addressData
      ).then((res)=> res.data)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAddress = createAsyncThunk(
  "address/get",
  async (_, thunkAPI) => {
    try {
      const response = await apiClient.get(
        `${addressUrl}`
      ).then((res)=> res.data)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateAddress = createAsyncThunk(
  "address/update",
  async (addressData, thunkAPI) => {
    try {
      const response = await apiClient.put(
        `${addressUrl}`,
        addressData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/delete",
  async (addressId, thunkAPI) => {
    try {
      const response = await apiClient.delete(
        `${addressUrl}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


const initialState = {
  isLoading: false,
  error: null,
  addressData: [],
  response: "",
};


// Slice
const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Address
      .addCase(createAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload;
        toast.success("Added Successfully")
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload)
      })
      // Get Address
      .addCase(getAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressData = action.payload;
      })
      .addCase(getAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update Address
      .addCase(updateAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload;
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete Address
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload;
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default addressSlice.reducer;