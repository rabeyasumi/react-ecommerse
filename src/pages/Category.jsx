import { Navigate, NavLink, useParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import useCatalog from "../components/useCatalog";
import { MENU } from "../catalog";

export default function Category() {
  const { main, sub = "all" } = useParams();
  const { items } = useCatalog();
  const cfg = MENU[main];
  if (!cfg) return <Navigate to="/" replace />;
  const current = cfg.subs.find((s) => s.key === sub) || cfg.subs[0];
  const list = items.filter(current.test);

  return (
    <main className="wrap cat">
      <aside className="cat-side">
        <h1 className="cat-title">/ {cfg.label}</h1>
        <ul>
          {cfg.subs.map((s) => (
            <li key={s.key}>
              <NavLink end to={s.key === "all" ? `/category/${main}` : `/category/${main}/${s.key}`} className={s.key === current.key ? "active" : ""}>
                {s.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
      <section><ProductGrid items={list} /></section>
    </main>
  );
}
