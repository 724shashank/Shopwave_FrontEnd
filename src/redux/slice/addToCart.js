import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0YjljYjg5ODE4MDkzYzZjZWU3ZjA5In0sImlhdCI6MTcxNjIzMTM1Mn0.C9CJw5NYJAnNsBH81R7-yOxWwNZXDPXCg7DO67N-sMc";

export const addToCart = createAsyncThunk('cart/addToCart', async ({ productId, quantity }) => {
  try {
    const response = await fetch(`http://localhost:5000/api/cart/addtocart/${productId}/${quantity}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authtoken': `${authToken}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to add item to cart');
    }
    return response.json();
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
});

export const remove = createAsyncThunk('removeItem', async ({productId}) => {
  try {
    const response = await fetch(`http://localhost:5000/api/cart/removeitem/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authtoken': `${authToken}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to Remove the item from cart');
    }
    return response.json();
  } catch (error) {
    console.error('Error in Removing item from cart:', error);
    throw error;
  }
});


const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    isLoading: false,
    data: [],
    isError: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.isError = false;
      })
      .addCase(addToCart.rejected, (state) => {
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
      });
  }

});

export default CartSlice.reducer;
