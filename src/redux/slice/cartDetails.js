import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../URLs";  
// Async thunks
export const cartDetail = createAsyncThunk('cartDetail', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const authToken = state.login.data.authtoken;
  try {
    const response = await fetch(`${baseURL}/api/cart/cartDetails`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authtoken': authToken
      }
    });
    if (!response.ok) {
      throw new Error('Failed to Cart Details');
    }
    return await response.json();
  } catch (error) {
    console.error('Error Fetching cart', error);
    throw error;
  }
});

export const remove = createAsyncThunk('removeItem', async ({ productId }, thunkAPI) => {
    const state = thunkAPI.getState();
    const authToken = state.login.data.authtoken;
    try {
      const response = await fetch(`${baseURL}/api/cart/removeitem/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'authtoken': authToken
        }
      });
      if (!response.ok) {
        throw new Error('Failed to remove the item from cart');
      }
      return await response.json();
    } catch (error) {
      console.error('Error removing item from cart:', error);
      throw error;
    }
  });
  
  export const orderHistory = createAsyncThunk('orderHistory', async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const authToken = state.login.data.authtoken;
    try {
      const response = await fetch(`${baseURL}/api/orders/checkout`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'authtoken': authToken
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to place the order');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error placing order:', error);
      throw error;
    }
  });
  

// Slice

const CartDetailSlice = createSlice({
  name: 'cartDetail',
  initialState: {
    isLoading: false,
    data: { items: [], totalPrice: 0 },
    isError: false,
  },
  reducers: {
    clearCart: (state) => {
      state.data = { items: [], totalPrice: 0 }; // Clear the cart
    },
  },
  extraReducers: (builder) => {
    builder
   
      .addCase(cartDetail.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(cartDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.isError = false;
      })
      .addCase(cartDetail.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(remove.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(remove.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.isError = false;
      })
      .addCase(remove.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(orderHistory.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(orderHistory.fulfilled, (state) => {
        state.isLoading = false;
        state.data = { items: [], totalPrice: 0 }; // Clear the cart after order is placed
        state.isError = false;
      })
      .addCase(orderHistory.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
    }
});


export const { clearCart } = CartDetailSlice.actions;
export default CartDetailSlice.reducer;
