import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
   approvalURL: null,
   isLoading: false,
   orderId: null,
}

export const createNewOrder = createAsyncThunk('/orders/createNewOrder', async (orderData) => {
    const response = await axios.post('http://localhost:3000/api/shop/order/create', orderData)

    return response.data
})

const shoppingOrderSlice = createSlice({
    name: 'shoppingOrderSlice',
    initialState,
    reducers: {},
       
    extraReducers: (builder) => {
        builder.addCase(createNewOrder.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createNewOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            // FIXED: Removed the broken action.payload.data.approvalURL property assignment line
            state.orderId = action.payload?.orderId || null; 
        })
        .addCase(createNewOrder.rejected, (state) => {
            state.isLoading = false;
            state.approvalURL = null;
            state.orderId = null;
        })
    }
})

export default shoppingOrderSlice.reducer;
