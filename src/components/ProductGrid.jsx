import ProductCard from "./ProductCard";
import Status from "./Status";

export default function ProductGrid({ items }) {
  return (
    <Status>
      {items.length === 0 ? (
        <div className="state">No products found here yet. Try another search or category.</div>
      ) : (
        <div className="grid">{items.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      )}
    </Status>
  );
}
