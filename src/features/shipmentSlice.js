// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import api from "../api/axiosInstance";

// export const createShipment = createAsyncThunk(
//   "shipment/create",
//   async (shipmentData, thunkApi) => {
//     try {
//       // console.log(shipmentData);
//       const response = await axios
//         .post("api/shipment", shipmentData)
//         .then((res) => res.data)
//         .catch((err) => err);
//       return response;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );

// const initialState = {
//   isLoading: false,
//   isError: false,
//   errorResponse: "",
//   createShipment: "",
//   getShipment: "",
//   deleteShipment: "",
//   updateShipment: "",
// };

// const shipmentSlice = createSlice({
//   name: "shipment",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(createShipment.fulfilled, (state, action) => {
//       console.log(action.payload);
//       state.createShipment = action.payload;
//       // state.getShipment = [action.payload, ...state.getShipment];
//     });
//   },
// });

// export default shipmentSlice.reducer;
