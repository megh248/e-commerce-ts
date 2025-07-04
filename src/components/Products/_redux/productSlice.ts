import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Product } from "../../../types/Product";

interface ProductState {
    products: Product[];
}

const initialState: ProductState = {
    products: [],
};

// Mock data (copied from productActions.ts)
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Sample Product 1',
    description: 'Description for product 1',
    price: 19.99,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    name: 'Sample Product 2',
    description: 'Description for product 2',
    price: 29.99,
    imageUrl: 'https://via.placeholder.com/150',
  },
  // Add more products as needed
];

// Async thunk for fetching products
export const getProducts = createAsyncThunk<Product[]>(
  'product/getProducts',
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [...mockProducts,...initialState.products];
  }
);

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload as Product[];
        },
        addProduct: (state, action) => {
            state.products.push(action.payload as Product);
        },
        removeProduct: (state, action) => {
            const id = action.payload as string;
            state.products = state.products.filter(product => product.id !== id);
        },
        updateProduct: (state, action) => {
            const updated = action.payload as Product;
            const index = state.products.findIndex(product => product.id === updated.id);
            if (index !== -1) {
                state.products[index] = updated;
            }
        },
        clearProducts: (state) => {
            state.products = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                // Optionally set a loading flag
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state) => {
                // Optionally set an error flag
            });
    },
});

export const { setProducts, addProduct, removeProduct, updateProduct, clearProducts } = productSlice.actions;