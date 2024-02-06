import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth.slice";
import layoutReducer from "./slice/layout.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    layout: layoutReducer,
  },
});

export default store;
