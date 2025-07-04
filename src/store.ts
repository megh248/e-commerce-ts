import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./components/Products/_redux/productSlice";
import { cartSlice } from "./components/Cart/_redux/cartSlice";

const store = configureStore({
    reducer:{
        product: productSlice.reducer,
        cart: cartSlice.reducer,
    }
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;