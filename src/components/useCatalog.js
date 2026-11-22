import { useSelector } from "react-redux";
export default function useCatalog() {
  return useSelector((s) => s.products);
}
