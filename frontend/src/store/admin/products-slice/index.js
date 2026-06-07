import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; // FIX: Added createAsyncThunk import
import axios from "axios"; // FIX: Added axios import

// FIX: Fixed the spelling typo from intialState to initialState
const initialState = {
  isLoading: false,
  productList: [],
};

// FIX: Added 'async' keyword and fixed axios brackets syntax
export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/products/add`,
      formData,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    return result?.data;
  }
); // FIX: Added missing closing bracket

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchallproducts",
  async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/products/get`,
      
    );
    return result?.data;
  }
);

export const editProduct = createAsyncThunk(
  "/products/editproduct",
  async ({id,formData}) => {
    const result = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteproduct",
  async (id) => {
    const result = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/admin/products/delete/${id}`,
      
    );
    return result?.data;
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState, // Matches variable name perfectly now
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;

    }).addCase(fetchAllProducts.fulfilled, (state, action) => {
        console.log(action.payload.result);
        state.isLoading = false;
        state.productList = action.payload.data;
    }).addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
    })
  },
});

export default AdminProductsSlice.reducer; // FIX: Added export statement so your Redux store can register it
