import { Search, X } from "lucide-react";

export default function KnowledgeSearch({ query, onQueryChange, resultCount }) {

  return (
    <section className="mb-12">
      <h1 className="mb-4 text-5xl font-bold text-gray-900">
        Learn
      </h1>

      <p className="mb-8 text-lg text-gray-600">
        Explore trusted, evidence-based women&apos;s health information.
      </p>

      <div className="relative">
        <Search className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-pink-500" size={22} />
        <input
          type="search"
          placeholder="Search conditions, symptoms and topics..."
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          className="w-full rounded-2xl border-2 border-pink-400 bg-white py-5 pl-14 pr-14 text-lg outline-none transition focus:border-pink-500 focus:ring-4 focus:ring-pink-100"
        />
        {query && <button type="button" onClick={() => onQueryChange("")} aria-label="Clear search" className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-gray-400 hover:bg-pink-50 hover:text-pink-700"><X size={19} /></button>}
      </div>
      {query.trim() && <p className="mt-3 text-sm text-gray-500" aria-live="polite">Showing {resultCount} prioritised {resultCount === 1 ? "guide" : "guides"}: exact matches first, then closely related reading.</p>}
    </section>
  );
}
