import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productsReducer from "./productsSlice";

export const store = configureStore({ reducer: { cart: cartReducer, products: productsReducer } });

store.subscribe(() => {
  try { localStorage.setItem("velora-cart", JSON.stringify(store.getState().cart.items)); } catch { /* storage unavailable */ }
});
