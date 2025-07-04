import { createSlice } from "@reduxjs/toolkit";
import type { CartItem } from "../../../types/Cart";

interface CartState {
    cartItems: CartItem[];
    totalAmount: number;
    totalQuantity: number;
}

const initialState: CartState = {
    cartItems: [],
    totalAmount: 0,
    totalQuantity: 0,
};

const calculateTotals = (cartItems: CartItem[]) => {
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    return { totalAmount, totalQuantity };
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload as CartItem;
            const existing = state.cartItems.find(i => i.id === item.id);
            if (existing) {
                existing.quantity += item.quantity;
            } else {
                state.cartItems.push({ ...item });
            }
            const totals = calculateTotals(state.cartItems);
            state.totalAmount = totals.totalAmount;
            state.totalQuantity = totals.totalQuantity;
        },
        removeFromCart: (state, action) => {
            const id = action.payload as string;
            state.cartItems = state.cartItems.filter(item => item.id !== id);
            const totals = calculateTotals(state.cartItems);
            state.totalAmount = totals.totalAmount;
            state.totalQuantity = totals.totalQuantity;
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.totalAmount = 0;
            state.totalQuantity = 0;
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload as { id: string; quantity: number };
            const item = state.cartItems.find(i => i.id === id);
            if (item) {
                item.quantity = quantity;
            }
            const totals = calculateTotals(state.cartItems);
            state.totalAmount = totals.totalAmount;
            state.totalQuantity = totals.totalQuantity;
        },
        setCartItems: (state, action) => {
            state.cartItems = action.payload as CartItem[];
            const totals = calculateTotals(state.cartItems);
            state.totalAmount = totals.totalAmount;
            state.totalQuantity = totals.totalQuantity;
        },
    },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity, setCartItems } = cartSlice.actions;