import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingBag, FaCheck } from "react-icons/fa";
import Status from "../components/Status";
import useCatalog from "../components/useCatalog";
import { addToCart } from "../store/cartSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const { items } = useCatalog();
  const dispatch = useDispatch();
  const p = items.find((x) => x.id === Number(id));
  const inCart = useSelector((s) => s.cart.items.some((i) => i.id === Number(id)));

  return (
    <div className="details bleed">
      <Status>
        {!p ? (
          <div className="state">We couldn’t find that product. <Link to="/">Back to home</Link></div>
        ) : (
          <div className="wrap-s">
            <div className="gcard">
              <div className="gtile"><img src={p.image} alt={p.title} /></div>
              <span className="gprice">${p.price.toFixed(2)}</span>
              <span className="gcat">{p.category}</span>
              <h1 className="gtitle">{p.title}</h1>
              <button className="btn-black" onClick={() => dispatch(addToCart(p))}>
                {inCart ? "Add another" : "Add to cart"} {inCart ? <FaCheck /> : <FaShoppingBag />}
              </button>
            </div>
            <p className="gdesc">{p.description}</p>
          </div>
        )}
      </Status>
    </div>
  );
}
