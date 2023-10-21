import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";
import { updateTaskUrl } from "../api/apiEndpoints";

export const updateTask = createAsyncThunk(
  "task/put",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.put(updateTaskUrl, data).then((res) => res.data);

      return res.data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const tasksByShipmentId = createAsyncThunk(
  "tasks/shipid",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api
        .post("api/taskbyshipment", data)
        .then((res) => res.data);
      return res.data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

const initialState = {
  taskData: [],
  isLoading: false,
  isError: false,
  response:""
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(tasksByShipmentId.fulfilled, (state, action) => {
        state.taskData = action.payload;
        state.isLoading = false;
      })
      .addCase(tasksByShipmentId.pending, (state, action) => {
        state.isLoading = true;
      });

    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.response= action.payload
      state.taskData = [...state.taskData].map((item) => {
        if (item._id === action.payload._id) return action.payload
        return item
      })
    })
  },
});


export const tasks = state => state?.task?.taskData
export const loader= state=> state?.task?.isLoading

export default taskSlice.reducer;
