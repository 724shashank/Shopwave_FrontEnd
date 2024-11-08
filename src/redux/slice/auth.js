import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../URLs";
export const authentication = createAsyncThunk( "login", async (credentials)=>{ 
    
 try{
    const response = await fetch(`${baseURL}/api/auth/login`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json',

        },
        body:JSON.stringify(credentials)
    })
    if (!response.ok) {
        throw new Error("Failed to login");
      }

      return response.json();
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }
);


const LoginSlice = createSlice({
    name:'login',
    initialState:{
        isLoading:false,
        data:[false],
        isError:false,
    },
    reducers: {
        logout: (state) => {
          state.data = [{'success':false}];
        },
      },
    extraReducers:(builder)=>{
builder
.addCase(authentication.pending, (state,action)=>{
state.isLoading = true;
state.isError= false;
})
.addCase(authentication.fulfilled, (state,action)=>{
state.isLoading = false;
state.data = action.payload;
state.isError= false;
})
.addCase(authentication.rejected, (state,action)=>{
    state.isLoading = false;
    state.data = action.payload;
    state.isError= true;
})
    }
});

export const { logout } = LoginSlice.actions;

export default LoginSlice.reducer;