import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../URLs";

export const fetchUser = createAsyncThunk('fetchUser', async (_,thunkAPI)=>{
  const state = thunkAPI.getState();
  const authToken = state.login.data.authtoken;
    const response = await fetch(`${baseURL}/api/auth/getuser`,{
      method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authtoken': authToken
        }
    });
    return response.json();
  }) ;


const UserDetailSlice = createSlice({
  name: 'userDetail',
  initialState: {
    isLoading: false,
    data:{},
    isError: false,
  },
  reducers: {
    clearDetails: (state) => {
      state.data = { }; // Clear the User Details
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload; // Update state with fetched user data
        state.isError = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true; // Handle error state
      });
  }
});
export const { clearDetails } = UserDetailSlice.actions;
export default UserDetailSlice.reducer;
