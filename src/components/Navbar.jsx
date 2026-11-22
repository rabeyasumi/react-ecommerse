import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaHome, FaMale, FaFemale, FaTag, FaShoppingCart, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";
import { selectCount } from "../store/cartSlice";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const count = useSelector(selectCount);
  const close = () => setOpen(false);
  return (
    <header className="nav">
      <Link to="/" className="logo" onClick={close}>
        Velora.
      </Link>
      <nav className={`nav-links${open ? " open" : ""}`} aria-label="Main">
        <NavLink to="/" end onClick={close}><FaHome /> Home</NavLink>
        <NavLink to="/category/mens" onClick={close}><FaMale /> Men's</NavLink>
        <NavLink to="/category/womens" onClick={close}><FaFemale /> Women's</NavLink>
        <NavLink to="/category/onsale" onClick={close}><FaTag /> On Sale</NavLink>
      </nav>
      <div className="nav-right">
        <Link to="/cart" className="cart-link" aria-label={`Cart, ${count} items`}>
          <FaShoppingCart />
          {count > 0 && <span className="badge">{count}</span>}
        </Link>
        <a href="mailto:hello@velora.shop" aria-label="Email us"><FaEnvelope /></a>
        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  );
}
