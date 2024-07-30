import { createSlice } from "@reduxjs/toolkit";

const configslice=createSlice({
    name:"config",
    initialState:{
        signin:false,
    },
    reducers:{
        setpage:(state)=>{
            state.signin= !state.signin;
        },
    }
    
});
export const{setpage}=configslice.actions;
export default configslice.reducer