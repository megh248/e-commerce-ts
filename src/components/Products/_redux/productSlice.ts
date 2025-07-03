import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../../types/Product";

export const productSlice = createSlice({
    name: "product",
    initialState: {
        products: Array<Product>
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload
        }
    }
});