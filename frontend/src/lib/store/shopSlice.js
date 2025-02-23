import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Create async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  "shop/fetchProducts",
  async ({ categoryId = 'all', sortBy = 'default' }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      if (categoryId !== 'all') {
        params.append('categoryId', categoryId);
      }
      if (sortBy !== 'default') {
        params.append('sortBy', sortBy === 'price-asc' ? 'asc' : 'desc');
      }
      
      const response = await fetch(`http://localhost:8000/api/products?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "shop/fetchCategories",
  async () => {
    const response = await fetch('http://localhost:8000/api/categories');
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return response.json();
  }
);

const initialState = {
  products: [],
  categories: [],
  loading: false,
  error: null,
  filters: {
    categoryId: 'all',
    sortBy: 'default'
  }
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  }
});

export const { setFilters } = shopSlice.actions;
export default shopSlice.reducer; 