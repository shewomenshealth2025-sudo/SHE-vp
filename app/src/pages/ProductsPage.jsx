import {
  ArrowLeft,
  ArrowRight,
  ArrowUpDown,
  Check,
  ChevronDown,
  ExternalLink,
  Heart,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  productCategories,
  productCount,
  products,
} from "../data/products";

const currencyFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  minimumFractionDigits: 2,
});

function loadSavedProducts() {
  try {
    return JSON.parse(localStorage.getItem("she-saved-products") || "[]");
  } catch {
    return [];
  }
}

function scoreStyle(score) {
  if (score >= 8.7) return "bg-emerald-50 text-emerald-700";
  if (score >= 8) return "bg-[#fff0f5] text-[#e93368]";
  if (score >= 7) return "bg-amber-50 text-amber-700";
  return "bg-stone-100 text-stone-600";
}

function ProductImage({ product, large = false }) {
  return (
    <div
      className={`relative overflow-hidden bg-[#fff6f8] ${
        large
          ? "aspect-[4/3] rounded-[28px]"
          : "aspect-[4/3] rounded-t-[22px]"
      }`}
    >
      <img
        src={product.image}
        alt={product.name}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

      <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/70 bg-white/90 font-semibold text-[#f43f72] shadow-sm backdrop-blur">
        {product.icon}
      </div>
    </div>
  );
}

function Rating({ product }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-stone-500">
      <Star size={13} className="fill-amber-400 text-amber-400" />
      <span className="font-medium text-stone-700">
        {product.rating.toFixed(1)}
      </span>
      <span>({product.reviews.toLocaleString("en-GB")})</span>
    </div>
  );
}

function CompactProductCard({
  product,
  saved,
  compareMode,
  compared,
  onSave,
  onOpen,
  onCompare,
}) {
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-[22px] border bg-white transition ${
        compared
          ? "border-[#f43f72] ring-2 ring-[#f43f72]/10"
          : "border-[#f1e1e6] hover:-translate-y-0.5 hover:border-[#efbdd0]"
      }`}
    >
      {compareMode && (
        <button
          type="button"
          onClick={() => onCompare(product)}
          className={`absolute left-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border shadow-sm backdrop-blur ${
            compared
              ? "border-[#f43f72] bg-[#f43f72] text-white"
              : "border-white/80 bg-white/90 text-stone-500"
          }`}
          aria-label={`Compare ${product.name}`}
        >
          {compared ? <Check size={16} /> : <ArrowUpDown size={15} />}
        </button>
      )}

      <button
        type="button"
        onClick={() => onSave(product.id)}
        className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white/90 text-stone-500 shadow-sm backdrop-blur hover:text-[#f43f72]"
        aria-label={`Save ${product.name}`}
      >
        <Heart
          size={16}
          className={saved ? "fill-current text-[#f43f72]" : ""}
        />
      </button>

      <button type="button" onClick={() => onOpen(product)}>
        <ProductImage product={product} />
      </button>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-stone-400">
            {product.brand}
          </p>

          <Rating product={product} />
        </div>

        <button
          type="button"
          onClick={() => onOpen(product)}
          className="mt-2 text-left"
        >
          <h3 className="line-clamp-2 text-[16px] font-semibold leading-5 text-[#211d1f] transition group-hover:text-[#e93368]">
            {product.name}
          </h3>
        </button>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            <p className="text-[10px] text-stone-400">From</p>
            <p className="mt-0.5 text-lg font-semibold text-[#211d1f]">
              {currencyFormatter.format(product.price)}
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${scoreStyle(
              product.score,
            )}`}
          >
            SHE {product.score.toFixed(1)}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onOpen(product)}
          className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#211d1f] px-4 py-3 text-sm font-medium text-white transition hover:bg-black"
        >
          View product
          <ArrowRight size={15} />
        </button>
      </div>
    </article>
  );
}

function CollectionSection({
  title,
  description,
  products: sectionProducts,
  onViewAll,
  cardProps,
}) {
  if (!sectionProducts.length) return null;

  return (
    <section className="mt-14">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-[#211d1f]">
            {title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-stone-500">
            {description}
          </p>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="hidden items-center gap-2 text-sm font-medium text-[#e93368] sm:flex"
        >
          View all
          <ArrowRight size={15} />
        </button>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {sectionProducts.slice(0, 4).map((product) => (
          <CompactProductCard
            key={product.id}
            product={product}
            {...cardProps(product)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onViewAll}
        className="mt-5 flex items-center gap-2 text-sm font-medium text-[#e93368] sm:hidden"
      >
        View all
        <ArrowRight size={15} />
      </button>
    </section>
  );
}

function CategoryTile({ category, count, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex min-h-[150px] flex-col justify-between rounded-[22px] border border-[#f1e1e6] bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-[#efbdd0] hover:shadow-[0_14px_35px_rgba(52,35,41,0.05)]"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff0f5] text-lg font-semibold text-[#f43f72]">
          {category.icon}
        </div>

        <ArrowRight
          size={17}
          className="text-stone-300 transition group-hover:translate-x-1 group-hover:text-[#f43f72]"
        />
      </div>

      <div>
        <h3 className="font-semibold text-[#211d1f]">{category.name}</h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-stone-500">
          {category.description}
        </p>
        <p className="mt-3 text-xs font-medium text-[#e93368]">
          {count} products
        </p>
      </div>
    </button>
  );
}

function DetailModal({
  product,
  saved,
  compared,
  onClose,
  onSave,
  onCompare,
}) {
  const [tab, setTab] = useState("Overview");

  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const tabs = ["Overview", "Evidence", "Safety", "Retailers"];

  return (
    <div className="fixed inset-0 z-[1000] flex items-end justify-center bg-black/35 p-0 backdrop-blur-sm md:items-center md:p-6">
      <div className="max-h-[94vh] w-full max-w-5xl overflow-y-auto rounded-t-[30px] bg-white shadow-2xl md:rounded-[30px]">
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-stone-100 bg-white/95 px-5 py-4 backdrop-blur md:px-8">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900"
          >
            <ArrowLeft size={17} />
            Back
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-stone-600"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid gap-9 p-5 md:grid-cols-[0.88fr_1.12fr] md:p-8">
          <ProductImage product={product} large />

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-400">
              {product.brand}
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#211d1f]">
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Rating product={product} />

              <span
                className={`rounded-full px-3 py-1.5 text-xs font-semibold ${scoreStyle(
                  product.score,
                )}`}
              >
                SHE Score {product.score.toFixed(1)}
              </span>
            </div>

            <p className="mt-5 text-base leading-7 text-stone-600">
              {product.description}
            </p>

            <div className="mt-6 flex items-end justify-between rounded-2xl bg-[#fff7f9] p-5">
              <div>
                <p className="text-xs text-stone-400">Price from</p>
                <p className="mt-1 text-3xl font-semibold text-[#211d1f]">
                  {currencyFormatter.format(product.price)}
                </p>
              </div>

              <span className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-stone-500">
                {product.category}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => onSave(product.id)}
                className="flex items-center justify-center gap-2 rounded-xl border border-[#efc7d4] px-4 py-3 text-sm font-medium text-[#e93368]"
              >
                <Heart
                  size={17}
                  className={saved ? "fill-current" : ""}
                />
                {saved ? "Saved" : "Save"}
              </button>

              <button
                type="button"
                onClick={() => onCompare(product)}
                className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium ${
                  compared
                    ? "bg-[#fff0f5] text-[#e93368]"
                    : "bg-[#211d1f] text-white"
                }`}
              >
                <ArrowUpDown size={16} />
                {compared ? "Selected" : "Compare"}
              </button>
            </div>

            <div className="mt-8 flex gap-6 overflow-x-auto border-b border-stone-100">
              {tabs.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setTab(item)}
                  className={`border-b-2 pb-3 text-sm font-medium ${
                    tab === item
                      ? "border-[#f43f72] text-[#e93368]"
                      : "border-transparent text-stone-400"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="pt-6">
              {tab === "Overview" && (
                <div className="space-y-4">
                  <InformationBlock
                    title="Who it may suit"
                    text={product.suitableFor}
                  />
                  <InformationBlock
                    title="Who it may not suit"
                    text={product.notFor}
                  />
                  <InformationBlock
                    title="How to use it"
                    text={product.howToUse}
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <ListBlock title="What we like" items={product.pros} />
                    <ListBlock
                      title="Things to consider"
                      items={product.cons}
                      neutral
                    />
                  </div>
                </div>
              )}

              {tab === "Evidence" && (
                <InformationBlock
                  title="What the evidence says"
                  text={product.evidence}
                />
              )}

              {tab === "Safety" && (
                <InformationBlock
                  title="Safety considerations"
                  text={product.safety}
                />
              )}

              {tab === "Retailers" && (
                <div className="space-y-3">
                  {product.retailers.map((retailer) => (
                    <button
                      key={retailer}
                      type="button"
                      className="flex w-full items-center justify-between rounded-2xl border border-stone-200 px-5 py-4 text-left transition hover:border-[#efbdd0] hover:bg-[#fff8fa]"
                    >
                      <div>
                        <p className="font-medium text-[#211d1f]">
                          {retailer}
                        </p>
                        <p className="mt-1 text-xs text-stone-400">
                          Check current price and availability
                        </p>
                      </div>
                      <ExternalLink size={17} className="text-stone-400" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-stone-100 bg-[#fffafa] px-5 py-5 text-xs leading-5 text-stone-500 md:px-8">
          SHE provides general product information, not individual
          medical advice. Prices and availability shown in this MVP
          require confirmation with the retailer.
        </div>
      </div>
    </div>
  );
}

function InformationBlock({ title, text }) {
  return (
    <div className="rounded-2xl border border-stone-100 p-5">
      <h3 className="font-semibold text-[#211d1f]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-stone-600">{text}</p>
    </div>
  );
}

function ListBlock({ title, items, neutral = false }) {
  return (
    <div className="rounded-2xl bg-stone-50 p-5">
      <h3 className="font-semibold text-[#211d1f]">{title}</h3>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-start gap-2.5 text-sm leading-5 text-stone-600"
          >
            {neutral ? (
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-stone-400" />
            ) : (
              <Check
                size={15}
                className="mt-0.5 shrink-0 text-emerald-600"
              />
            )}
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompareBar({ selected, onClear, onOpen, onRemove }) {
  if (!selected.length) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-[900] w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 rounded-[22px] border border-[#efc7d4] bg-white p-4 shadow-[0_18px_60px_rgba(49,30,37,0.16)]">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-[#211d1f]">
            {selected.length} product{selected.length === 1 ? "" : "s"} selected
          </p>
          <p className="mt-1 text-xs text-stone-400">
            Select up to three products.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {selected.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => onOpen(product)}
              className="flex items-center gap-2 rounded-full bg-stone-100 px-3 py-2 text-xs font-medium"
            >
              <span className="max-w-32 truncate">{product.name}</span>
              <X
                size={13}
                onClick={(event) => {
                  event.stopPropagation();
                  onRemove(product.id);
                }}
              />
            </button>
          ))}

          <button
            type="button"
            onClick={onClear}
            className="px-2 text-xs text-stone-400"
          >
            Clear
          </button>

          <button
            type="button"
            disabled={selected.length < 2}
            className="rounded-xl bg-[#211d1f] px-4 py-2.5 text-sm font-medium text-white disabled:opacity-40"
          >
            Compare
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [view, setView] = useState("landing");
  const [activeCategory, setActiveCategory] = useState("All");
  const [collectionTitle, setCollectionTitle] = useState("");
  const [collectionIds, setCollectionIds] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Recommended");
  const [showFilters, setShowFilters] = useState(false);
  const [minimumScore, setMinimumScore] = useState(0);
  const [maxPrice, setMaxPrice] = useState(300);
  const [reusableOnly, setReusableOnly] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const [savedIds, setSavedIds] = useState(loadSavedProducts);
  const [compareMode, setCompareMode] = useState(false);
  const [compareIds, setCompareIds] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [savedOnly, setSavedOnly] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      "she-saved-products",
      JSON.stringify(savedIds),
    );
  }, [savedIds]);

  const recommended = useMemo(
    () =>
      [...products]
        .filter((product) => product.featured)
        .sort((a, b) => b.score - a.score),
    [],
  );

  const bestValue = useMemo(
    () =>
      [...products]
        .filter((product) => product.price <= 15)
        .sort((a, b) => b.score - a.score),
    [],
  );

  const mostReviewed = useMemo(
    () => [...products].sort((a, b) => b.reviews - a.reviews),
    [],
  );

  const reusableProducts = useMemo(
    () =>
      [...products]
        .filter((product) => product.reusable)
        .sort((a, b) => b.score - a.score),
    [],
  );

  const newest = useMemo(
    () =>
      [...products]
        .filter((product) => product.newProduct)
        .sort((a, b) => b.score - a.score),
    [],
  );

  const browsingProducts = useMemo(() => {
    const term = search.trim().toLowerCase();

    const result = products.filter((product) => {
      const inCollection =
        !collectionIds || collectionIds.includes(product.id);

      const inCategory =
        activeCategory === "All" ||
        product.category === activeCategory;

      const matchesSearch =
        !term ||
        [
          product.name,
          product.brand,
          product.category,
          product.description,
          product.badge,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(term);

      const matchesSaved =
        !savedOnly || savedIds.includes(product.id);

      return (
        inCollection &&
        inCategory &&
        matchesSearch &&
        matchesSaved &&
        product.score >= minimumScore &&
        product.price <= maxPrice &&
        (!reusableOnly || product.reusable)
      );
    });

    return [...result].sort((a, b) => {
      if (sort === "Highest SHE Score") return b.score - a.score;
      if (sort === "Most reviewed") return b.reviews - a.reviews;
      if (sort === "Price: low to high") return a.price - b.price;
      if (sort === "Price: high to low") return b.price - a.price;

      return (
        Number(b.featured) - Number(a.featured) ||
        b.score - a.score
      );
    });
  }, [
    activeCategory,
    collectionIds,
    maxPrice,
    minimumScore,
    reusableOnly,
    savedIds,
    savedOnly,
    search,
    sort,
  ]);

  const comparedProducts = compareIds
    .map((id) => products.find((product) => product.id === id))
    .filter(Boolean);

  function toggleSaved(id) {
    setSavedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  function toggleCompare(product) {
    setCompareIds((current) => {
      if (current.includes(product.id)) {
        return current.filter((id) => id !== product.id);
      }

      if (current.length >= 3) {
        return [...current.slice(1), product.id];
      }

      return [...current, product.id];
    });
  }

  function resetBrowseState() {
    setSearch("");
    setMinimumScore(0);
    setMaxPrice(300);
    setReusableOnly(false);
    setSavedOnly(false);
    setSort("Recommended");
    setVisibleCount(12);
  }

  function openCategory(category) {
    resetBrowseState();
    setCollectionIds(null);
    setCollectionTitle("");
    setActiveCategory(category);
    setView("browse");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openCollection(title, items) {
    resetBrowseState();
    setActiveCategory("All");
    setCollectionTitle(title);
    setCollectionIds(items.map((product) => product.id));
    setView("browse");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openAllProducts() {
    resetBrowseState();
    setCollectionIds(null);
    setCollectionTitle("");
    setActiveCategory("All");
    setView("browse");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cardProps(product) {
    return {
      saved: savedIds.includes(product.id),
      compared: compareIds.includes(product.id),
      compareMode,
      onSave: toggleSaved,
      onOpen: setSelectedProduct,
      onCompare: toggleCompare,
    };
  }

  if (view === "browse") {
    const pageTitle =
      collectionTitle ||
      (activeCategory === "All"
        ? savedOnly
          ? "Saved products"
          : "All products"
        : activeCategory);

    const pageDescription = collectionTitle
      ? "A focused selection from the SHE product library."
      : activeCategory === "All"
        ? "Browse the complete SHE product library."
        : productCategories.find(
              (category) => category.name === activeCategory,
            )?.description;

    return (
      <div className="min-h-screen bg-[#fffdfd] text-[#211d1f]">
        <main className="mx-auto max-w-[1420px] px-5 pb-32 pt-8 sm:px-8 lg:px-12">
          <button
            type="button"
            onClick={() => {
              setView("landing");
              setCompareMode(false);
              setCompareIds([]);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-[#211d1f]"
          >
            <ArrowLeft size={17} />
            Back to SHE Finds
          </button>

          <div className="mt-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-medium text-[#f43f72]">
                SHE Finds
              </p>
              <h1 className="mt-2 text-4xl font-semibold tracking-[-0.035em] md:text-5xl">
                {pageTitle}
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-stone-500">
                {pageDescription}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setCompareMode((value) => !value)}
                className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium ${
                  compareMode
                    ? "border-[#f43f72] bg-[#fff0f5] text-[#e93368]"
                    : "border-stone-200 bg-white text-stone-600"
                }`}
              >
                <ArrowUpDown size={16} />
                Compare mode
              </button>

              <button
                type="button"
                onClick={() => setSavedOnly((value) => !value)}
                className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium ${
                  savedOnly
                    ? "border-[#f43f72] bg-[#fff0f5] text-[#e93368]"
                    : "border-stone-200 bg-white text-stone-600"
                }`}
              >
                <Heart
                  size={16}
                  className={savedOnly ? "fill-current" : ""}
                />
                Saved
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-3 lg:grid-cols-[1fr_auto_auto]">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
              />
              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setVisibleCount(12);
                }}
                placeholder="Search this collection..."
                className="h-12 w-full rounded-xl border border-stone-200 bg-white pl-12 pr-4 text-sm outline-none focus:border-[#efbdd0]"
              />
            </div>

            <button
              type="button"
              onClick={() => setShowFilters((value) => !value)}
              className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium ${
                showFilters
                  ? "border-[#f43f72] bg-[#fff0f5] text-[#e93368]"
                  : "border-stone-200 bg-white text-stone-600"
              }`}
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>

            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-600 outline-none"
            >
              <option>Recommended</option>
              <option>Highest SHE Score</option>
              <option>Most reviewed</option>
              <option>Price: low to high</option>
              <option>Price: high to low</option>
            </select>
          </div>

          {!collectionIds && (
            <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
              {["All", ...productCategories.map((item) => item.name)].map(
                (item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setActiveCategory(item);
                      setVisibleCount(12);
                    }}
                    className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm ${
                      activeCategory === item
                        ? "border-[#211d1f] bg-[#211d1f] text-white"
                        : "border-stone-200 bg-white text-stone-600"
                    }`}
                  >
                    {item}
                  </button>
                ),
              )}
            </div>
          )}

          {showFilters && (
            <div className="mt-5 grid gap-5 rounded-[22px] border border-[#f1e1e6] bg-white p-5 md:grid-cols-3">
              <label>
                <span className="text-sm font-medium">
                  Maximum price: {currencyFormatter.format(maxPrice)}
                </span>
                <input
                  type="range"
                  min="5"
                  max="300"
                  step="5"
                  value={maxPrice}
                  onChange={(event) => {
                    setMaxPrice(Number(event.target.value));
                    setVisibleCount(12);
                  }}
                  className="mt-4 w-full accent-[#f43f72]"
                />
              </label>

              <label>
                <span className="text-sm font-medium">
                  Minimum SHE Score
                </span>
                <select
                  value={minimumScore}
                  onChange={(event) => {
                    setMinimumScore(Number(event.target.value));
                    setVisibleCount(12);
                  }}
                  className="mt-3 w-full rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none"
                >
                  <option value="0">Any score</option>
                  <option value="7">7.0 and above</option>
                  <option value="8">8.0 and above</option>
                  <option value="8.5">8.5 and above</option>
                </select>
              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-stone-50 px-4 py-3">
                <input
                  type="checkbox"
                  checked={reusableOnly}
                  onChange={(event) => {
                    setReusableOnly(event.target.checked);
                    setVisibleCount(12);
                  }}
                  className="h-4 w-4 accent-[#f43f72]"
                />
                <div>
                  <p className="text-sm font-medium">
                    Reusable products only
                  </p>
                  <p className="mt-1 text-xs text-stone-400">
                    Hide single-use options
                  </p>
                </div>
              </label>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between">
            <p className="text-sm text-stone-500">
              {browsingProducts.length} products
            </p>

            {compareMode && (
              <p className="text-xs font-medium text-[#e93368]">
                Select up to three products
              </p>
            )}
          </div>

          {browsingProducts.length ? (
            <>
              <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {browsingProducts
                  .slice(0, visibleCount)
                  .map((product) => (
                    <CompactProductCard
                      key={product.id}
                      product={product}
                      {...cardProps(product)}
                    />
                  ))}
              </div>

              {visibleCount < browsingProducts.length && (
                <div className="mt-9 text-center">
                  <button
                    type="button"
                    onClick={() =>
                      setVisibleCount((current) => current + 12)
                    }
                    className="rounded-xl border border-stone-200 bg-white px-6 py-3 text-sm font-medium text-stone-700 transition hover:border-[#efbdd0]"
                  >
                    Load more
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="mt-8 rounded-[24px] border border-dashed border-stone-200 py-20 text-center">
              <Search size={26} className="mx-auto text-stone-300" />
              <h3 className="mt-4 font-semibold">No products found</h3>
              <p className="mt-2 text-sm text-stone-500">
                Try changing your search or filters.
              </p>
            </div>
          )}
        </main>

        {selectedProduct && (
          <DetailModal
            product={selectedProduct}
            saved={savedIds.includes(selectedProduct.id)}
            compared={compareIds.includes(selectedProduct.id)}
            onClose={() => setSelectedProduct(null)}
            onSave={toggleSaved}
            onCompare={toggleCompare}
          />
        )}

        <CompareBar
          selected={comparedProducts}
          onClear={() => setCompareIds([])}
          onOpen={setSelectedProduct}
          onRemove={(id) =>
            setCompareIds((current) =>
              current.filter((item) => item !== id),
            )
          }
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffdfd] text-[#211d1f]">
      <main className="mx-auto max-w-[1420px] px-5 pb-24 pt-8 sm:px-8 lg:px-12">
        <header className="rounded-[30px] border border-[#f1dce3] bg-gradient-to-br from-[#fff8fa] via-white to-[#fff2f6] px-6 py-8 md:px-9 md:py-10">
          <div className="grid gap-8 xl:grid-cols-[1fr_290px] xl:items-end">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#f43f72] shadow-sm">
                <Sparkles size={21} />
              </div>

              <p className="mt-5 text-sm font-medium text-[#f43f72]">
                SHE Finds
              </p>

              <h1 className="mt-2 max-w-3xl text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
                Find the right product for you
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
                Research and compare women’s-health products without
                feeling overwhelmed.
              </p>

              <div className="relative mt-6 max-w-3xl">
                <Search
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                />
                <input
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    if (event.target.value.trim()) {
                      setView("browse");
                      setActiveCategory("All");
                      setCollectionIds(null);
                      setCollectionTitle("");
                    }
                  }}
                  placeholder="Search products, brands or health needs..."
                  className="h-14 w-full rounded-2xl border border-[#ead8de] bg-white pl-12 pr-4 text-sm shadow-sm outline-none focus:border-[#efbdd0]"
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-stone-500">
                <span>{productCount} reviewed products</span>
                <span>Evidence-aware explanations</span>
                <span>Compare before buying</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  openAllProducts();
                  setSavedOnly(true);
                }}
                className="rounded-[20px] border border-white bg-white/80 p-5 text-left shadow-sm transition hover:border-[#efbdd0]"
              >
                <Heart size={19} className="text-[#f43f72]" />
                <p className="mt-6 text-xs text-stone-500">
                  Saved products
                </p>
                <p className="mt-1 text-2xl font-semibold">
                  {savedIds.length}
                </p>
              </button>

              <button
                type="button"
                onClick={openAllProducts}
                className="rounded-[20px] border border-white bg-white/80 p-5 text-left shadow-sm transition hover:border-[#efbdd0]"
              >
                <Sparkles size={19} className="text-[#f43f72]" />
                <p className="mt-6 text-xs text-stone-500">
                  Product library
                </p>
                <p className="mt-1 text-2xl font-semibold">
                  {productCount}
                </p>
              </button>
            </div>
          </div>
        </header>

        <section className="mt-12">
          <p className="text-sm font-medium text-[#f43f72]">
            Shop by need
          </p>
          <div className="mt-2 flex items-end justify-between gap-5">
            <h2 className="text-3xl font-semibold tracking-tight">
              What are you looking for?
            </h2>
            <button
              type="button"
              onClick={openAllProducts}
              className="hidden items-center gap-2 text-sm font-medium text-[#e93368] sm:flex"
            >
              Browse all
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {productCategories.map((category) => (
              <CategoryTile
                key={category.name}
                category={category}
                count={
                  products.filter(
                    (product) => product.category === category.name,
                  ).length
                }
                onClick={() => openCategory(category.name)}
              />
            ))}
          </div>
        </section>

        <CollectionSection
          title="SHE recommends"
          description="Strong all-round choices across evidence, usability and practicality."
          products={recommended}
          onViewAll={() =>
            openCollection("SHE recommends", recommended)
          }
          cardProps={cardProps}
        />

        <CollectionSection
          title="Best value"
          description="Highly rated products costing £15 or less."
          products={bestValue}
          onViewAll={() => openCollection("Best value", bestValue)}
          cardProps={cardProps}
        />

        <CollectionSection
          title="Most reviewed"
          description="Products with the largest number of customer ratings."
          products={mostReviewed}
          onViewAll={() =>
            openCollection("Most reviewed", mostReviewed)
          }
          cardProps={cardProps}
        />

        <CollectionSection
          title="Reusable options"
          description="Longer-lasting products designed to reduce repeat purchases."
          products={reusableProducts}
          onViewAll={() =>
            openCollection("Reusable options", reusableProducts)
          }
          cardProps={cardProps}
        />

        {newest.length > 0 && (
          <CollectionSection
            title="Recently added"
            description="New additions to the SHE product library."
            products={newest}
            onViewAll={() =>
              openCollection("Recently added", newest)
            }
            cardProps={cardProps}
          />
        )}

        <section className="mt-14 rounded-[24px] border border-[#f1e1e6] bg-[#fff8fa] p-6 md:p-8">
          <div className="flex gap-4">
            <ShieldCheck
              size={21}
              className="mt-0.5 shrink-0 text-[#f43f72]"
            />
            <div>
              <h2 className="font-semibold text-[#211d1f]">
                Research before you buy
              </h2>
              <p className="mt-2 max-w-4xl text-sm leading-6 text-stone-600">
                SHE Scores are editorial comparison tools rather than
                medical endorsements. Product pages explain suitability,
                evidence limitations, safety considerations and practical
                trade-offs.
              </p>
            </div>
          </div>
        </section>
      </main>

      {selectedProduct && (
        <DetailModal
          product={selectedProduct}
          saved={savedIds.includes(selectedProduct.id)}
          compared={compareIds.includes(selectedProduct.id)}
          onClose={() => setSelectedProduct(null)}
          onSave={toggleSaved}
          onCompare={toggleCompare}
        />
      )}
    </div>
  );
}
