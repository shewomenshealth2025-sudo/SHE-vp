import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bookmark,
  Check,
  ChevronRight,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";
import {
  productCategories,
  products,
} from "../data/products";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [savedProducts, setSavedProducts] = useState([]);

  const filteredProducts = useMemo(() => {
    const searchText = search.toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchText) ||
        product.description.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText);

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  function toggleSaved(productId) {
    setSavedProducts((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-5 pb-32 pt-8 md:px-8 lg:px-12">
      <section className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-50 text-[#f43f72]">
            <ShoppingBag size={24} />
          </div>

          <p className="mt-5 text-sm font-medium text-[#f43f72]">
            SHE Finds
          </p>

          <h2 className="mt-2 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            Products, explained clearly
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-7 text-stone-500 md:text-lg">
            Compare women’s health products through effectiveness, comfort,
            ease of use and accessibility.
          </p>
        </div>

        <div className="rounded-2xl border border-pink-100 bg-white px-5 py-4 shadow-sm">
          <p className="text-sm text-stone-500">Saved products</p>
          <p className="mt-1 text-2xl font-semibold text-[#f43f72]">
            {savedProducts.length}
          </p>
        </div>
      </section>

      <section className="mt-9">
        <label className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-pink-200 focus-within:ring-4 focus-within:ring-pink-50">
          <Search size={20} className="text-stone-400" />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products or categories..."
            className="w-full bg-transparent text-base outline-none placeholder:text-stone-400"
          />
        </label>

        <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2">
          <div className="mr-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-500">
            <SlidersHorizontal size={16} />
          </div>

          {productCategories.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setCategory(option)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${
                category === option
                  ? "bg-[#241f20] font-medium text-white"
                  : "border border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.map((product, index) => {
          const Icon = product.icon;
          const saved = savedProducts.includes(product.id);

          return (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className="group flex flex-col rounded-[30px] border border-pink-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-50 to-rose-100 text-[#f43f72]">
                  <Icon size={30} />
                </div>

                <button
                  type="button"
                  onClick={() => toggleSaved(product.id)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
                    saved
                      ? "bg-[#f43f72] text-white"
                      : "bg-stone-50 text-stone-500 hover:bg-pink-50"
                  }`}
                  aria-label="Save product"
                >
                  <Bookmark
                    size={18}
                    fill={saved ? "currentColor" : "none"}
                  />
                </button>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-medium text-[#f43f72]">
                  {product.badge}
                </span>

                <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
                  {product.category}
                </span>
              </div>

              <h3 className="mt-4 text-xl font-semibold">
                {product.name}
              </h3>

              <p className="mt-2 text-sm leading-6 text-stone-500">
                {product.description}
              </p>

              <div className="mt-5 rounded-2xl bg-[#fff9fa] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-stone-400">
                      SHE Score
                    </p>

                    <p className="mt-1 text-3xl font-semibold">
                      {product.score}
                      <span className="text-base text-stone-400">/100</span>
                    </p>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#f43f72] shadow-sm">
                    <Star size={21} fill="currentColor" />
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <RatingBar
                  label="Effectiveness"
                  value={product.effectiveness}
                />
                <RatingBar label="Comfort" value={product.comfort} />
                <RatingBar label="Ease of use" value={product.ease} />
                <RatingBar
                  label="Accessibility"
                  value={product.accessibility}
                />
              </div>

              <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                <div>
                  <p className="text-xs text-stone-400">Typical price</p>
                  <p className="mt-1 text-lg font-semibold">
                    {product.price}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProduct(product)}
                  className="flex items-center gap-2 rounded-full bg-[#241f20] px-4 py-2 text-sm font-medium text-white transition hover:bg-black"
                >
                  View details
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.article>
          );
        })}
      </section>

      {filteredProducts.length === 0 && (
        <div className="mt-10 rounded-3xl border border-dashed border-pink-200 bg-pink-50/40 p-10 text-center">
          <ShoppingBag
            size={35}
            className="mx-auto text-[#f43f72]"
          />
          <h3 className="mt-4 text-lg font-semibold">
            No products found
          </h3>
          <p className="mt-2 text-sm text-stone-500">
            Try another product name or category.
          </p>
        </div>
      )}

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            saved={savedProducts.includes(selectedProduct.id)}
            toggleSaved={() => toggleSaved(selectedProduct.id)}
            close={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

function RatingBar({ label, value }) {
  const percentage = `${(value / 5) * 100}%`;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-stone-500">{label}</span>
        <span className="font-medium">{value}/5</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-pink-50">
        <div
          className="h-full rounded-full bg-[#f43f72]"
          style={{ width: percentage }}
        />
      </div>
    </div>
  );
}

function ProductModal({
  product,
  saved,
  toggleSaved,
  close,
}) {
  const Icon = product.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/25 p-0 backdrop-blur-sm md:items-center md:p-6"
      onClick={close}
    >
      <motion.article
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        onClick={(event) => event.stopPropagation()}
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-[32px] bg-white p-6 shadow-2xl md:rounded-[32px] md:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-50 text-[#f43f72]">
            <Icon size={30} />
          </div>

          <button
            type="button"
            onClick={close}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition hover:bg-stone-200"
          >
            <X size={19} />
          </button>
        </div>

        <p className="mt-6 text-sm font-medium text-[#f43f72]">
          {product.category}
        </p>

        <h2 className="mt-2 text-3xl font-semibold">
          {product.name}
        </h2>

        <p className="mt-3 leading-7 text-stone-500">
          {product.description}
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-pink-50 p-5">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#f43f72]">
              SHE Score
            </p>
            <p className="mt-2 text-4xl font-semibold">
              {product.score}
              <span className="text-lg text-stone-400">/100</span>
            </p>
          </div>

          <div className="rounded-2xl bg-stone-50 p-5">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-stone-400">
              Evidence
            </p>
            <p className="mt-2 text-lg font-semibold">
              {product.evidence}
            </p>
          </div>
        </div>

        <div className="mt-7 grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="font-semibold">What users may value</h3>

            <div className="mt-3 space-y-3">
              {product.pros.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 text-sm text-stone-600"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-700">
                    <Check size={13} />
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Things to consider</h3>

            <div className="mt-3 space-y-3">
              {product.considerations.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 text-sm text-stone-600"
                >
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-pink-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-7 flex flex-col justify-between gap-4 border-t border-stone-100 pt-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs text-stone-400">Typical price</p>
            <p className="mt-1 text-2xl font-semibold">
              {product.price}
            </p>
          </div>

          <button
            type="button"
            onClick={toggleSaved}
            className={`flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition ${
              saved
                ? "bg-[#f43f72] text-white"
                : "border border-pink-200 bg-white text-[#f43f72] hover:bg-pink-50"
            }`}
          >
            <Bookmark
              size={18}
              fill={saved ? "currentColor" : "none"}
            />
            {saved ? "Saved" : "Save product"}
          </button>
        </div>

        <div className="mt-6 rounded-2xl bg-stone-50 p-4 text-xs leading-5 text-stone-500">
          Product information is provided for comparison and education. SHE
          does not endorse a specific retailer or replace professional medical
          advice.
        </div>
      </motion.article>
    </motion.div>
  );
}
