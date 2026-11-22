import { useMemo, useState } from "react";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import useCatalog from "../components/useCatalog";

export default function Home() {
  const { items, categories } = useCatalog();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [sort, setSort] = useState("none");

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    let r = items.filter((p) => p.title.toLowerCase().includes(term) && (cat === "all" || p.category === cat));
    if (sort === "asc") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "desc") r = [...r].sort((a, b) => b.price - a.price);
    return r;
  }, [items, q, cat, sort]);

  return (
    <>
      <Hero />
      <main className="wrap section">
        <h2 className="h2">New Arrivals</h2>
        <div className="toolbar">
          <input type="search" placeholder="Search products by name" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search products" />
          <select value={cat} onChange={(e) => setCat(e.target.value)} aria-label="Filter by category">
            <option value="all">All categories</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort by price">
            <option value="none">Sort by price</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
        <ProductGrid items={list} />
      </main>
    </>
  );
}
