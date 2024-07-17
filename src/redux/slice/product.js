import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk('fetchProducts', async ()=>{
    const response = await fetch('http://localhost:5000/api/product/viewproducts');
    return response.json();
}) ;
const productSlice = createSlice({
    name: 'view_Products',

    initialState:{
        isLoading:false,
        data:null,
        isError:false,
    },
        extraReducers:(builder)=>{
        builder.addCase(fetchProducts.pending,(state,action)=>{
            state.isLoading = true;
            
        });
        builder.addCase(fetchProducts.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
            state.isError = false;
        });
        builder.addCase(fetchProducts.rejected,(state,action)=>{
           console.log('Error', action.payload);
            state.isError = true;
        });
    },
});

export default productSlice.reducer;