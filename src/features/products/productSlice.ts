import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Product {
 id: number;
 title: string;
 price: number;
 category: string;
 description: string;
 image: string;
 rating?: {
  rate: number;
  count: number;
 };
}

interface ProductState {
 items: Product[];
 currentProduct: Product | null;
 status: 'idle' | 'loading' | 'succeeded' | 'failed';
 error: string | null;
}

const initialState: ProductState = {
 items: [],
 currentProduct: null,
 status: 'idle',
 error: null,
};

// Async Thunks
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
 const response = await fetch('https://fakestoreapi.com/products');
 if (!response.ok) throw new Error('Failed to fetch products');
 return (await response.json()) as Product[];
});

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id: string) => {
 const response = await fetch(`https://fakestoreapi.com/products/${id}`);
 if (!response.ok) throw new Error('Failed to fetch product');
 return (await response.json()) as Product;
});

export const updateProduct = createAsyncThunk(
 'products/updateProduct',
 async ({ id, ...patch }: Partial<Product> & { id: number }) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
   method: 'PUT',
   headers: { 'Content-Type': 'application/json' },
   body: JSON.stringify(patch),
  });
  if (!response.ok) throw new Error('Failed to update product');
  return (await response.json()) as Product;
 }
);

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id: number) => {
 const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
  method: 'DELETE',
 });
 if (!response.ok) throw new Error('Failed to delete product');
 return id;
});

const productSlice = createSlice({
 name: 'products',
 initialState,
 reducers: {
  clearCurrentProduct: (state) => {
   state.currentProduct = null;
  },
 },
 extraReducers: (builder) => {
  builder
   // Fetch Products
   .addCase(fetchProducts.pending, (state) => {
    state.status = 'loading';
   })
   .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
    state.status = 'succeeded';
    state.items = action.payload;
   })
   .addCase(fetchProducts.rejected, (state, action) => {
    state.status = 'failed';
    state.error = action.error.message || 'Something went wrong';
   })
   // Fetch Product by ID
   .addCase(fetchProductById.pending, (state) => {
    state.status = 'loading';
   })
   .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
    state.status = 'succeeded';
    state.currentProduct = action.payload;
   })
   .addCase(fetchProductById.rejected, (state, action) => {
    state.status = 'failed';
    state.error = action.error.message || 'Something went wrong';
   })
   // Update Product
   .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
    const index = state.items.findIndex((p) => p.id === action.payload.id);
    if (index !== -1) {
     // Merge existing item with updated fields
     state.items[index] = { ...state.items[index], ...action.payload };
    }
    if (state.currentProduct?.id === action.payload.id) {
     // Merge current product with updated fields
     state.currentProduct = { ...state.currentProduct, ...action.payload };
    }
   })
   // Delete Product
   .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
    state.items = state.items.filter((p) => p.id !== action.payload);
    if (state.currentProduct?.id === action.payload) {
     state.currentProduct = null;
    }
   });
 },
});

export const { clearCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
