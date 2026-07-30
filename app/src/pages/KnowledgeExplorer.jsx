import { useState } from "react";

import {
  getAllConditions,
  getAllSymptoms,
  searchKnowledge,
} from "../data/knowledge";

export default function KnowledgeExplorer() {
  const [query, setQuery] = useState("");

  const conditions = getAllConditions();
  const symptoms = getAllSymptoms();

  const results = query
    ? searchKnowledge(query)
    : [];

  return (
    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        SHE Knowledge Explorer
      </h1>

      <input
        className="w-full border rounded-lg p-4 mb-8"
        placeholder="Search the knowledge engine..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && (
        <>
          <h2 className="text-2xl font-semibold mb-4">
            Search Results ({results.length})
          </h2>

          <div className="space-y-3 mb-12">
            {results.map(result => (
              <div
                key={`${result.type}-${result.id}`}
                className="border rounded-lg p-4"
              >
                <div className="text-sm text-pink-600 uppercase">
                  {result.type}
                </div>

                <h3 className="font-bold">
                  {result.title}
                </h3>

                <p className="text-gray-600">
                  {result.summary}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="grid md:grid-cols-2 gap-8">

        <section>

          <h2 className="text-2xl font-semibold mb-4">
            Conditions ({conditions.length})
          </h2>

          {conditions.map(condition => (
            <div
              key={condition.id}
              className="border rounded-lg p-4 mb-3"
            >
              <h3 className="font-bold">
                {condition.title}
              </h3>

              <p className="text-gray-600">
                {condition.summary}
              </p>
            </div>
          ))}

        </section>

        <section>

          <h2 className="text-2xl font-semibold mb-4">
            Symptoms ({symptoms.length})
          </h2>

          {symptoms.map(symptom => (
            <div
              key={symptom.id}
              className="border rounded-lg p-4 mb-3"
            >
              <h3 className="font-bold">
                {symptom.title}
              </h3>

              <p className="text-gray-600">
                {symptom.summary}
              </p>
            </div>
          ))}

        </section>

      </div>

    </div>
  );
}
