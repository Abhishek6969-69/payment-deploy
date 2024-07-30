import { configureStore } from "@reduxjs/toolkit";

import  configReducer from "./configslice"
const appstore=configureStore({
    reducer:{
     
      config:configReducer,
    }
})
export default appstore;