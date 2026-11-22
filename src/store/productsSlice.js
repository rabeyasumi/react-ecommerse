import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API = "https://fakestoreapi.com/products";

export const fetchProducts = createAsyncThunk("products/fetch", async (_, { rejectWithValue }) => {
  try {
    const [p, c] = await Promise.all([fetch(API), fetch(`${API}/categories`)]);
    if (!p.ok || !c.ok) throw new Error(`Server returned ${p.ok ? c.status : p.status}`);
    return { items: await p.json(), categories: await c.json() };
  } catch (e) {
    return rejectWithValue(e.message || "Network error");
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState: { items: [], categories: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchProducts.pending, (s) => { s.status = "loading"; s.error = null; })
      .addCase(fetchProducts.fulfilled, (s, { payload }) => { s.status = "succeeded"; s.items = payload.items; s.categories = payload.categories; })
      .addCase(fetchProducts.rejected, (s, { payload }) => { s.status = "failed"; s.error = payload || "Something went wrong"; });
  },
});
export default productsSlice.reducer;
