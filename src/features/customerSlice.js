import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";

import { customerGetAll, customerUrl, getallCustomerTypesAPI } from "../api/apiEndpoints";

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

export const getCustomer = createAsyncThunk(
  "customer/get",
  async (_, thunkApi) => {
    try {
      const response = await api.get(customerUrl).then((res) => res.data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const customerType = createAsyncThunk(
  "customerType/getall",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api
        .post(getallCustomerTypesAPI)
        .then((res) => res.data);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchCustomer = createAsyncThunk(
  "customer/search",
  async (data, thunkApi) => {
    try {
      const response = await api
        .post(`${customerGetAll}`, data)
        .then((res) => res);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const createCustomerType = createAsyncThunk(
  "customertype/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api
        .post("/customertype/create", data)
        .then((res) => res.data);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  isLoading: "",
  error: "",
  customerData: [],
  customerType: [],
  response: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomer.fulfilled, (state, action) => {
        state.customerData = action.payload;
      })
      .addCase(getCustomer.rejected, (state, action) => {
        state.error = action.payload;
      });

    builder.addCase(searchCustomer.fulfilled, (state, action) => {
      state.customerData = action.payload;
    });
    builder.addCase(customerType.fulfilled, (state, action) => {
      state.customerType = action.payload;
    });
    builder.addCase(createCustomerType.fulfilled, (state, action) => {

      state.customerType.push(action.payload)
    }
    );
  },
});

export const customersData = (state) => state?.customer?.customerData;
export const customerTypeData = (state) => state?.customer?.customerType;
export default customerSlice.reducer;
