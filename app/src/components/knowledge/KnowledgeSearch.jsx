import { useState } from "react";
import { searchKnowledge } from "../../data/knowledge";

export default function KnowledgeSearch({ onSelectCondition }) {
  const [query, setQuery] = useState("");

  const results = query.trim()
    ? searchKnowledge(query)
    : [];

  function selectResult(result) {
    if (result.type === "condition" && onSelectCondition) {
      onSelectCondition(result.data);
      setQuery("");
    }
  }

  return (
    <section className="mb-12">
      <h1 className="mb-4 text-5xl font-bold text-gray-900">
        Learn
      </h1>

      <p className="mb-8 text-lg text-gray-600">
        Explore trusted, evidence-based women&apos;s health information.
      </p>

      <div className="relative">
        <input
          type="search"
          placeholder="Search conditions, symptoms and topics..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full rounded-2xl border-2 border-pink-400 bg-white px-6 py-5 text-lg outline-none transition focus:border-pink-500 focus:ring-4 focus:ring-pink-100"
        />

        {query.trim() && (
          <div className="absolute left-0 right-0 top-full z-20 mt-3 max-h-96 overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-xl">
            {results.length === 0 ? (
              <div className="p-6 text-gray-500">
                No results found for “{query}”.
              </div>
            ) : (
              results.map((result) => (
                <button
                  type="button"
                  key={`${result.type}-${result.id}`}
                  onClick={() => selectResult(result)}
                  className="block w-full border-b border-gray-100 p-5 text-left transition last:border-b-0 hover:bg-pink-50"
                >
                  <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-pink-600">
                    {result.type}
                  </div>

                  <div className="font-semibold text-gray-900">
                    {result.title}
                  </div>

                  <div className="mt-1 line-clamp-2 text-sm text-gray-600">
                    {result.summary}
                  </div>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}