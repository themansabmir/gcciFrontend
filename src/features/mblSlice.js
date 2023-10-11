import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../api/axiosInstance";
import { mblUrl } from "../api/apiEndpoints";
import { useSelector } from "react-redux";

export const createMBL = createAsyncThunk(
  "mbl/create",
  async (mblData, thunkApi) => {
    try {
      const response = await api.post(mblUrl, mblData).then((res) => res.data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getAllMBL = createAsyncThunk(
  "allMBL",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.get(mblUrl, data).then((res) => res.data);
      return res.data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isLoading: false,
  error: "",
  mblData: [],
  respone: "",
};

const mblSlice = createSlice({
  name: "mbl",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createMBL.fulfilled, (state, action) => {
        state.respone = action.payload;
        toast.success("MBL Created");
      })
      .addCase(createMBL.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(action.payload || " Error while creating MBL ");
      });

    builder
      .addCase(getAllMBL.fulfilled, (state, { payload }) => {
        state.mblData = payload;
        state.isLoading = false;
      })
      .addCase(getAllMBL.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMBL.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});


export const shipmentData = state=> state?.mbl?.mblData

export default mblSlice.reducer;
