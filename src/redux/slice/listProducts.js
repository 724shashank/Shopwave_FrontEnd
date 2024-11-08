import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../URLs";

export const listProducts = createAsyncThunk('listProduct', async (_,thunkAPI) => {
    const state = thunkAPI.getState();
    const authToken = state.login.data.authtoken;
    try {
      const response = await fetch(`${baseURL}/api/product/fetchproduct`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authtoken': authToken
        }
      });
      if (!response.ok) {
        throw new Error('Failed to Fetch the Listed Items');
      }
      return response.json();
    } catch (error) {
      console.error('Error in Fetching :', error);
      throw error;
    }
  });



  export const unList = createAsyncThunk('listedItem', async ({ productId },thunkAPI) => {
    const state = thunkAPI.getState();
    const authToken = state.login.data.authtoken;
    try {
      const response = await fetch(`${baseURL}/api/product/removeproduct/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'authtoken': authToken
        }
      });
      if (!response.ok) {
        throw new Error('Failed to remove the Listed Item');
      } 
      return response.json();
    } catch (error) {
      console.error('Error removing Listed item:', error);
      throw error;
    }
  });

  

const listproductSlice = createSlice({
    name: 'list_Products',

    initialState:{
        isLoading:false,
        data:[],
        isError:false,
    },
        extraReducers:(builder)=>{
        builder.addCase(listProducts.pending,(state,action)=>{
            state.isLoading = true;
            state.isError = false;
            
        });
        builder.addCase(listProducts.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
            state.isError = false;
        });
        builder.addCase(listProducts.rejected,(state,action)=>{
          state.isLoading = false;
          state.isError = true;
        });
        builder.addCase(unList.pending,(state,action)=>{
          state.isLoading = true;
          state.isError = false;
          
      });
      builder.addCase(unList.fulfilled,(state,action)=>{
          state.isLoading = false;
          state.data = action.payload;
          state.isError = false;
      });
      builder.addCase(unList.rejected,(state,action)=>{
        state.isLoading = false;
        state.isError = true;
      });
    },
});

export default listproductSlice.reducer;