import { useState } from "react";
import { searchKnowledge } from "../../data/knowledge";

export default function KnowledgeSearch() {
  const [query, setQuery] = useState("");

  const results = query
    ? searchKnowledge(query)
    : [];

  return (
    <section className="mb-12">

      <h1 className="text-5xl font-bold mb-4">
        Learn
      </h1>

      <p className="text-gray-600 text-lg mb-8">
        Explore trusted, evidence-based women's health information.
      </p>

      <input
        type="text"
        placeholder="Search women's health..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-2xl border border-gray-300 px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
      />

      {query && (
        <div className="mt-6 rounded-2xl border bg-white">

          {results.length === 0 && (
            <div className="p-6 text-gray-500">
              No results found.
            </div>
          )}

          {results.map(result => (
            <div
              key={`${result.type}-${result.id}`}
              className="border-b last:border-b-0 p-5 hover:bg-gray-50 cursor-pointer"
            >
              <div className="text-xs uppercase text-pink-600 font-semibold mb-1">
                {result.type}
              </div>

              <div className="font-semibold">
                {result.title}
              </div>

              <div className="text-sm text-gray-600 mt-1">
                {result.summary}
              </div>
            </div>
          ))}

        </div>
      )}

    </section>
  );
}