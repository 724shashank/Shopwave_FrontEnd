import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const categoryProd = createAsyncThunk('categoryProd', async (category) => {
    const response = await fetch(`http://localhost:5000/api/product/categoryview/${category}`);
    return response.json();
});

const categorySlice = createSlice({
    name: 'categoryView',

    initialState: {
        isLoading: false,
        data: null,
        isError: false
    },

    extraReducers: (builder) => {
        
            builder.addCase(categoryProd.pending, (state, action) => {
                state.isLoading = true;
            })
            builder.addCase(categoryProd.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.isError = false
            })
            builder.addCase(categoryProd.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                console.error("Error", action.error);
            });
    },
});

export default categorySlice.reducer;
