import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice"

export const cartStore = configureStore({
    reducer:cartReducer
})