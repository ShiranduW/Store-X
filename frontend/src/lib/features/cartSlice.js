import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    error: null
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(i => i._id === item._id);
      
      if (existingItem) {
        if (existingItem.quantity >= item.stockQuantity) {
          state.error = "Cannot add more items than available in stock";
          return;
        }
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      state.error = null;
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const foundItem = state.items.find(item => item._id === productId);
      if (foundItem) {
        if (foundItem.quantity > 1) {
          foundItem.quantity -= 1;
        } else {
          state.items = state.items.filter(item => item._id !== productId);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.error = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
