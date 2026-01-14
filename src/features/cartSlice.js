import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart: JSON.parse(localStorage.getItem("cart") || "[]")
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cart.find(item => item.id === action.payload.id)
            if (existingItem) {
                existingItem.qty += 1;
            } else {
                state.cart?.push({ ...action.payload, qty: 1 });
            }
            localStorage.setItem("cart", JSON.stringify(state.cart))
        },
        removeToCart: (state, action) => {
            state.cart = state.cart.filter((el) => el.id !== action.payload.id)
            localStorage.setItem("cart", JSON.stringify(state.cart))
        },
        updateQty: (state, action) => {
            const item = state.cart.find((el) => el.id === action.payload.id);
            if (item) {
                item.qty = action.payload.qty;
            }
            localStorage.setItem("cart", JSON.stringify(state.cart))
        }
    }
})

export const { addToCart, removeToCart, updateQty } = cartSlice.actions;
export default cartSlice.reducer;