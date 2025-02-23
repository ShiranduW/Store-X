import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import cartReducer from "./features/cartSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import shopReducer from "./store/shopSlice";

import { Api } from "./api";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    [Api.reducerPath]: Api.reducer,
    shop: shopReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Api.middleware),
  devTools: true
});

setupListeners(store.dispatch);
