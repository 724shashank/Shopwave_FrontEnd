import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../URLs";

export const searchProducts = createAsyncThunk('searchProducts', async () => {
    console.log('API Request has started');
    
    const response = await fetch(`${baseURL}/api/searchProducts/results`);
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return response.json();
});

const searchSlice = createSlice({
    name: 'search_Products',
    initialState: {
        isLoading: false,
        data: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.isError = false;
            })
            .addCase(searchProducts.rejected, (state, action) => {
                console.error('Error:', action.error);
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export default searchSlice.reducer;
