import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {toast} from 'react-toastify'
import api from "../api/axiosInstance";
import { mblUrl } from "../api/apiEndpoints";

export const createMBL = createAsyncThunk('mbl/create', async (mblData, thunkApi) => {
    try {
        const response = await api.post(mblUrl, mblData).then(res => res.data)
        return response
    } catch (error) {
return thunkApi.rejectWithValue(error.message)
    }
})

const initialState = {
    isLoading: false,
    error: "",
    mblData: [],
    respone:""
}

const mblSlice = createSlice({
    name: "mbl",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createMBL.fulfilled, (state, action) => {
            state.respone = action.payload
            toast.success("MBL Created")

        }).addCase(createMBL.rejected, (state, action) => {
            state.error = action.payload
            toast.error(action.payload ||" Error while creating MBL ")
        })
    }
})


export default mblSlice.reducer