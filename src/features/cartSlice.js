import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart: JSON.parse(localStorage.getItem("cart") || "[]"),
    heart: JSON.parse(localStorage.getItem("heart") || "[]")
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
                state.cart.push({ ...action.payload, qty: 1 });
            }
            localStorage.setItem("cart", JSON.stringify(state.cart))
        },
        removeToCart: (state, action) => {
            state.cart = state.cart.filter((el) => el.id !== action.payload.id)
            localStorage.setItem("cart", JSON.stringify(state.cart))
        },

        addToHeart: (state, action) => {
            const exists = state.heart.find(item => item.id === action.payload.id)
            if (!exists) {
                state.heart.push(action.payload);
                localStorage.setItem("heart", JSON.stringify(state.heart))
            }
        },
        removeToHeart: (state, action) => {
            state.heart = state.heart.filter((el) => el.id !== action.payload.id)
            localStorage.setItem("heart", JSON.stringify(state.heart))
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

export const { addToCart, removeToCart, updateQty, addToHeart, removeToHeart } = cartSlice.actions;
export default cartSlice.reducer;