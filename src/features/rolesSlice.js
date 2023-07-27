import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";

import { roles } from "../api/apiEndpoints";
import { toast } from "react-toastify";




export const createRole = createAsyncThunk('role/create', async (rolesData, thunkApi) => {
    try {
        console.log(rolesData)
        return  await api.post(roles, rolesData).then(res=> res.data)
    } catch (error) {
return thunkApi.rejectWithValue(error.message)
    }
})

export const getRoles = createAsyncThunk('role/get', async (data="",thunkApi) => {
try {
    const response = await api.get(roles).then(res => res.data.data)
    return response
} catch (error) {

    return thunkApi.rejectWithValue(error.message)
}
})



const initialState = {
    isLoading: false,
    error: '',
    rolesData: [],
    response:''

}

const roleSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createRole.fulfilled, (state, action) => {
            state.rolesData = [action.payload, ...state.rolesData]
            toast.success('Role added')

        }).addCase(createRole.rejected, (state, action) => {
            state.error= action.payload
        }).addCase(createRole.pending, (state, action) => {
            state.isLoading= true
        })

        builder.addCase(getRoles.fulfilled, (state, action) => {
            state.rolesData = action.payload

        }).addCase(getRoles.rejected, (state, action) => {
            state.error= action.payload
        }).addCase(getRoles.pending, (state, action) => {
            state.isLoading= true
        })

    }
})

export default roleSlice.reducer