import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Product } from "../../../types/Product";

// --- Product State ---
interface ProductState {
    products: Product[];
}

const initialState: ProductState = {
    products: [],
};

// Some sample products to seed the app for first-time users
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Sample Product 1',
    description: 'Description for product 1',
    price: 19.99,
    imageUrl: 'https://cdn.thewirecutter.com/wp-content/media/2024/11/cheapgaminglaptops-2048px-7981.jpg',
  },
  {
    id: '2',
    name: 'Sample Product 2',
    description: 'Description for product 2',
    price: 29.99,
    imageUrl: 'https://cdn.thewirecutter.com/wp-content/media/2024/11/cheapgaminglaptops-2048px-7981.jpg',
  },
  // Add more products as needed
];

// --- LocalStorage helpers ---
const LOCAL_STORAGE_KEY = 'products';

// Load products from localStorage, or return [] if not found
function loadProductsFromStorage(): Product[] {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (data) {
    try {
      return JSON.parse(data) as Product[];
    } catch {
      return [];
    }
  }
  return [];
}

// Save products to localStorage
function saveProductsToStorage(products: Product[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
}

// --- Thunks ---
// Fetch products from localStorage, or seed with mock data if empty
export const getProducts = createAsyncThunk<Product[]>(
  'product/getProducts',
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const stored = loadProductsFromStorage();
    if (stored.length > 0) {
      return stored;
    }
    // If nothing in storage, seed with mockProducts and save
    saveProductsToStorage(mockProducts);
    return mockProducts;
  }
);

// --- Slice ---
export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        // Replace all products (rarely used)
        setProducts: (state, action) => {
            state.products = action.payload as Product[];
            saveProductsToStorage(state.products);
        },
        // Add a new product
        addProduct: (state, action) => {
            state.products.push(action.payload as Product);
            saveProductsToStorage(state.products);
        },
        // Remove a product by id
        removeProduct: (state, action) => {
            const id = action.payload as string;
            state.products = state.products.filter(product => product.id !== id);
            saveProductsToStorage(state.products);
        },
        // Update a product by id
        updateProduct: (state, action) => {
            const updated = action.payload as Product;
            const index = state.products.findIndex(product => product.id === updated.id);
            if (index !== -1) {
                state.products[index] = updated;
                saveProductsToStorage(state.products);
            }
        },
        // Remove all products
        clearProducts: (state) => {
            state.products = [];
            saveProductsToStorage([]);
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

export default productSlice.reducer;