// FakeStore API has only 4 categories, so the shop's sub-categories are matched by keywords.
const txt = (p) => `${p.title} ${p.description}`.toLowerCase();
const m = (re, cat) => (p) => (!cat || p.category === cat) && re.test(txt(p));
const MEN = "men's clothing";
const WOMEN = "women's clothing";

const watch = m(/watch/);
const wallet = m(/wallet/);
const winterW = m(/jacket|coat|winter|windbreaker/, WOMEN);
const bag = m(/\bbags?\b|backpack/);
const cap = m(/\bcaps?\b|\bhats?\b/);
const shoe = m(/shoe|sneaker|boot/);

export const MENU = {
  mens: {
    label: "Men's",
    subs: [
      { key: "all", label: "All", test: (p) => p.category === MEN || watch(p) || wallet(p) },
      { key: "winter", label: "Winter", test: m(/jacket|coat|fleece|winter/, MEN) },
      { key: "shirt", label: "Shirt", test: m(/shirt|tee/, MEN) },
      { key: "watch", label: "Watch", test: watch },
      { key: "wallet", label: "Wallet", test: wallet },
    ],
  },
  womens: {
    label: "Women's",
    subs: [
      { key: "all", label: "All", test: (p) => p.category === WOMEN || p.category === "jewelery" },
      { key: "winter", label: "Winter", test: winterW },
      { key: "tops", label: "Tops", test: (p) => p.category === WOMEN && !winterW(p) && /top|tee|shirt|sleeve|blouse/.test(txt(p)) },
      { key: "elegant", label: "Elegant", test: (p) => p.category === "jewelery" || (p.category === WOMEN && /dress|elegant|lace|gold|silver|rose/.test(txt(p))) },
    ],
  },
  onsale: {
    label: "On Sale",
    subs: [
      { key: "all", label: "All", test: (p) => bag(p) || cap(p) || shoe(p) },
      { key: "bag", label: "Bag", test: bag },
      { key: "cap", label: "Cap", test: cap },
      { key: "shoe", label: "Shoe", test: shoe },
    ],
  },
};
