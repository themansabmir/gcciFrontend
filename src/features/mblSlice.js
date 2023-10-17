import {
  createAsyncThunk,
  createDraftSafeSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { mblUrl, mblbyID, mblbyShipmentid } from "../api/apiEndpoints";
import api from "../api/axiosInstance";

export const createMBL = createAsyncThunk(
  "mbl/create",
  async (mblData, thunkApi) => {
    try {
      console.log(mblData)
      let response = ""
      console.log(mblData?._id)
      if (mblData._id) {



response = await api.put(mblUrl, mblData).then((res) => res.data);
      } else {

        response = await api.post(mblUrl, mblData).then((res) => res.data);
      }
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

export const getMBLbyid = createAsyncThunk(
  "mblbyId",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post(mblbyID, data).then((res) => res.data);

      return res.data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const getMBLbyShipmentId = createAsyncThunk(
  "mblbyshipment",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post(mblbyShipmentid, data).then((res) => res.data);
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
  singleMBL: "",
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

    builder
      .addCase(getMBLbyid.fulfilled, (state, action) => {
        state.singleMBL = action.payload;
        state.isLoading = false;
      })
      .addCase(getMBLbyid.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMBLbyid.rejected, (state, action) => {
        state.error = action.payload;
      });

    builder.addCase(getMBLbyShipmentId.fulfilled, (state, action) => {
      state.singleMBL = action.payload;
    });
  },
});

export const shipmentData = (state) => state?.mbl?.mblData;
export const singleMBL = (state) => state?.mbl?.singleMBL;

export default mblSlice.reducer;
