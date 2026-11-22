import { useDispatch } from "react-redux";
import { fetchProducts } from "../store/productsSlice";
import useCatalog from "./useCatalog";

// Shows loading / error UI, renders children once products are loaded.
export default function Status({ children }) {
  const { status, error } = useCatalog();
  const dispatch = useDispatch();
  if (status === "idle" || status === "loading")
    return <div className="state" role="status"><div className="spinner" />Loading products…</div>;
  if (status === "failed")
    return (
      <div className="state" role="alert">
        <p>We couldn’t load the products ({error}). Check your connection and try again.</p>
        <button className="btn" onClick={() => dispatch(fetchProducts())}>Try again</button>
      </div>
    );
  return children;
}
