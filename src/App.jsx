import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./store/productsSlice";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Category from "./pages/Category";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

export default function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  useEffect(() => { dispatch(fetchProducts()); }, [dispatch]);
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:main" element={<Category />} />
        <Route path="/category/:main/:sub" element={<Category />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<p className="wrap state">Page not found.</p>} />
      </Routes>
    </>
  );
}
