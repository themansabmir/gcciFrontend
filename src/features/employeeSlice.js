import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";
import { act } from "react-dom/test-utils";

const createUrl = "api/employee";

// create employees
export const createEmployee = createAsyncThunk(
  "employee/create",
  async (employeeData, thunkAPI) => {
    try {
      const response = await api
        .post(createUrl, employeeData)
        .then((res) => res.data);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// get all employees
export const getAllEmployee = createAsyncThunk(
  "employee/get",
  async (thunkApi) => {
    try {
      const response = await api.get(createUrl).then((res) => res.data.data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const loginEmployee = createAsyncThunk(
  "employee/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("api/login", data).then((res) => res.data);

      localStorage.setItem("adminToken" , res.token)
      return res.token;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isLoading: false,
  error: null,
  getEmployee: [],
  createResponse: "",
  updateResponse: "",
  token: localStorage.getItem('adminToken'),
};

const employeeSlice = createSlice({
  name: "employee/slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.createResponse = action.payload;
        state.getEmployee = [action.payload, ...state.getEmployee];
      })
      .addCase(getAllEmployee.fulfilled, (state, action) => {
        state.getEmployee = action.payload;
      })
      .addCase(getAllEmployee.rejected, (state, action) => {
        state.error = action.payload;
      });

    builder.addCase(loginEmployee.fulfilled, (state, action) => {
      state.token = action.payload;
    }).addCase(loginEmployee.pending, (state, action) => {
      state.isLoading = true
    }).addCase(loginEmployee.rejected, (state, action) => {
      state.error= action.payload
    })
  },
});


export const adminToken  = state => state.employee.token
export default employeeSlice.reducer;
