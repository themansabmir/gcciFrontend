import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";

import { customerUrl } from "../api/apiEndpoints";







export const createCustomer = createAsyncThunk(
  "customer/create",
    async (customerData, thunkAPI) => {
    try {
      const response = await api
        .post(customerUrl, customerData)
        .then((res) => res.data);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCustomer = createAsyncThunk('customer/get', async (_, thunkApi) => {
    try {
        const response = await api.get(customerUrl).then((res) => res.data)
        return response.data
    } catch (error) {
return thunkApi.rejectWithValue(error.message)
    }
})

export const searchCustomer = createAsyncThunk("customer/search", async (data, thunkApi) => {
  try {
    const response = await api.get(`${ customerUrl }/?q=${data}`).then((res) => res.data);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

const initialState = {
    isLoading: "",
    error: "",
    customerData: [],
    response:""
}

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCustomer.fulfilled, (state, action) => {
            state.customerData= action.payload
        }).addCase(getCustomer.rejected, (state, action) => {
            state.error= action.payload
        })

      builder.addCase(searchCustomer.fulfilled, (state, action) => {
        state.customerData = action.payload
      })
    }
})


export const customersData = (state) => state?.customer?.customerData;

export default customerSlice.reducer