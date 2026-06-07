import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  addressList: [], // Unified key matches your Address.jsx component perfectly!
};

export const addNewAddress = createAsyncThunk(
  "address/addNewAddress", // Removed the root-level forward slash
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/shop/address/add`,
        formData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAllAddresses = createAsyncThunk(
  "address/fetchAllAddresses",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shop/address/get/${userId}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// FIX 1: Corrected naming from 'editaAddress' to 'editAddress' to match your components import statement
export const editAddress = createAsyncThunk(
  "address/editAddress",
  async ({ userId, addressId, formData }, thunkAPI) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/shop/address/update/${userId}/${addressId}`,
        formData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async ({ userId, addressId }, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/shop/address/delete/${userId}/${addressId}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add New Address Handlers
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
      })
      
      // Fetch All Addresses Handlers
      .addCase(fetchAllAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload?.data || [];
      })
      .addCase(fetchAllAddresses.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      })
      
      // FIX 2: Added missing lifecycle handlers for Address Modifications
      .addCase(editAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editAddress.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(editAddress.rejected, (state) => {
        state.isLoading = false;
      })
      
      // FIX 3: Added missing lifecycle handlers for Address Deletions
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAddress.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteAddress.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default addressSlice.reducer;
