import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../../../types/Product';

// Mock data
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

export const fetchProducts = createAsyncThunk<Product[]>(
  'product/fetchProducts',
  async () => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockProducts;
  }
);

