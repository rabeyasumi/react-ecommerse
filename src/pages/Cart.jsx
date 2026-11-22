import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { clearCart, decreaseQuantity, increaseQuantity, removeFromCart, selectCount, selectSubtotal } from "../store/cartSlice";

const money = (n) => `$${n.toFixed(2)}`;

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.cart.items);
  const count = useSelector(selectCount);
  const subtotal = useSelector(selectSubtotal);
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(false);
  const [note, setNote] = useState("");

  const discount = applied ? subtotal * 0.1 : 0;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + tax;

  const apply = () => {
    const ok = code.trim().toUpperCase() === "VELORA10";
    setApplied(ok);
    setNote(ok ? "Coupon VELORA10 applied: 10% off." : "That coupon code isn’t valid.");
  };
  const remove = (id) => { if (window.confirm("Remove this item from your cart?")) dispatch(removeFromCart(id)); };
  const checkout = () => { alert("Thank you! Your order has been placed."); dispatch(clearCart()); };

  if (items.length === 0)
    return (
      <main className="wrap section">
        <div className="panel empty">
          <h1 className="h2">Your cart is empty</h1>
          <p>Add something you love and it will show up here.</p>
          <Link to="/" className="btn">Continue shopping</Link>
        </div>
      </main>
    );

  return (
    <main className="wrap section cart">
      <section className="panel">
        <p className="crumb"><Link to="/">Home</Link> / <b>Shopping Cart</b></p>
        <h1 className="h2 left">Your Shopping Cart</h1>
        <p className="muted">Make sure everything looks right before checkout.</p>
        <ul className="clist">
          {items.map((i) => (
            <li className="citem" key={i.id}>
              <div className="ctile"><img src={i.image} alt={i.title} /></div>
              <div className="cinfo">
                <h3>{i.title}</h3>
                <small>{i.category}</small>
                <div className="crow">
                  <div className="qty">
                    <button aria-label="Decrease quantity" disabled={i.quantity === 1} onClick={() => dispatch(decreaseQuantity(i.id))}><FaMinus /></button>
                    <span>{i.quantity}</span>
                    <button aria-label="Increase quantity" onClick={() => dispatch(increaseQuantity(i.id))}><FaPlus /></button>
                  </div>
                  <button className="rm" onClick={() => remove(i.id)}><FaTrash /> Remove</button>
                </div>
              </div>
              <div className="cprice"><span>{money(i.price)} each</span><strong>{money(i.price * i.quantity)}</strong></div>
            </li>
          ))}
        </ul>
        <div className="cfoot">
          <button className="btn-black" onClick={() => { if (window.confirm("Clear all items from your cart?")) dispatch(clearCart()); }}>Clear cart</button>
        </div>
      </section>

      <aside className="panel summary">
        <div className="srow head"><h2>Order summary</h2><span>{count} items</span></div>
        <div className="srow"><span>Subtotal</span><span>{money(subtotal)}</span></div>
        <div className="srow"><span>Shipping</span><span>Free</span></div>
        <div className="srow"><span>Tax (8%)</span><span>{money(tax)}</span></div>
        {applied && <div className="srow green"><span>Coupon (VELORA10)</span><span>− {money(discount)}</span></div>}
        <div className="srow total"><span>Total</span><span>{money(total)}</span></div>
        <div className="coupon">
          <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Coupon code" aria-label="Coupon code" />
          <button className="btn-black" onClick={apply}>Apply</button>
        </div>
        {note && <p className={`note ${applied ? "green" : "red"}`} role="status">{note}</p>}
        <button className="btn-black wide" onClick={checkout}>Checkout</button>
        <Link to="/" className="cont">Continue shopping</Link>
      </aside>
    </main>
  );
}
