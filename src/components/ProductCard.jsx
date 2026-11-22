import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaCheck } from "react-icons/fa";
import { addToCart } from "../store/cartSlice";

export default function ProductCard({ p }) {
  const dispatch = useDispatch();
  const inCart = useSelector((s) => s.cart.items.some((i) => i.id === p.id));
  return (
    <article className="pcard">
      <div className="ptile">
        <Link to={`/product/${p.id}`} aria-label={p.title}><img src={p.image} alt={p.title} loading="lazy" /></Link>
        <button className={`padd${inCart ? " on" : ""}`} aria-label={`Add ${p.title} to cart`} title="Add to cart" onClick={() => dispatch(addToCart(p))}>
          {inCart ? <FaCheck /> : <FaPlus />}
        </button>
      </div>
      <Link to={`/product/${p.id}`}><h3 className="ptitle">{p.title}</h3></Link>
      <p className="pcat">{p.category}</p>
      <p className="pprice">${p.price.toFixed(2)}</p>
    </article>
  );
}
