import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";
import { createInsight, getinsightByPorts } from "../api/apiEndpoints";
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

export const getInsightByPortsData = createAsyncThunk(
  "insight/get",
  async (data, rejectWithValue) => {
    try {
      const { customerId, originPortCode, destinationPortCode } = data;

      const [originData, destData, journeyData] = await Promise.all([
        api
          .post(getinsightByPorts, {
            customerId: customerId,
            originPortCode: originPortCode,
          })
          .then((res) => res.data),
        api
          .post(getinsightByPorts, {
            customerId: customerId,
            destinationPortCode: destinationPortCode,
          })
          .then((res) => res.data),
        api
          .post(getinsightByPorts, {
            customerId: customerId,
            originPortCode: originPortCode,

            destinationPortCode: destinationPortCode,
          })
          .then((res) => res.data),
      ]);

      return {
        originData: originData.data,
        destinationData: destData.data,
        journeyData: journeyData.data,
      };
    } catch (error) {
      return rejectWithValue(error)
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

    builder.addCase(getInsightByPortsData.fulfilled, (state, action) => {
      state.insightData = action.payload;
    });
  },
});

export const originData = (state) => state?.insight?.insightData?.originData;
export const destinationData = (state) =>
  state?.insight?.insightData?.destinationData;
export const journeyData = (state) => state?.insight?.insightData?.journeyData;

export default insightSlice.reducer;
