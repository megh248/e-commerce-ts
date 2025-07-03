import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./components/Products/_redux/productSlice";

const store = configureStore({
    reducer:{
        product: productSlice.reducer,
    }
});
export type AppDispatch = typeof store.dispatch;

export default store;