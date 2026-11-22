import { createSlice } from "@reduxjs/toolkit";

const load = () => {
  try { return JSON.parse(localStorage.getItem("velora-cart")) || []; } catch { return []; }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: load() },
  reducers: {
    addToCart(state, { payload: p }) {
      const found = state.items.find((i) => i.id === p.id);
      if (found) found.quantity += 1;
      else state.items.push({ id: p.id, title: p.title, price: p.price, image: p.image, category: p.category, quantity: 1 });
    },
    removeFromCart(state, { payload: id }) {
      state.items = state.items.filter((i) => i.id !== id);
    },
    increaseQuantity(state, { payload: id }) {
      const item = state.items.find((i) => i.id === id);
      if (item) item.quantity += 1;
    },
    decreaseQuantity(state, { payload: id }) {
      const item = state.items.find((i) => i.id === id);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    clearCart(state) { state.items = []; },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export const selectCount = (s) => s.cart.items.reduce((n, i) => n + i.quantity, 0);
export const selectSubtotal = (s) => s.cart.items.reduce((n, i) => n + i.price * i.quantity, 0);
export default cartSlice.reducer;
