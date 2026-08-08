import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { getAllConditions, getCondition, searchKnowledge } from "../data/knowledge";

import KnowledgeSearch from "../components/knowledge/KnowledgeSearch";
import KnowledgeSection from "../components/knowledge/KnowledgeSection";
import ConditionCard from "../components/knowledge/ConditionCard";
import ConditionViewer from "../components/knowledge/ConditionViewer";

export default function LearnPageV2() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const selectedCondition = getCondition(searchParams.get("article"));

  const conditions = getAllConditions();
  const results = useMemo(() => query.trim() ? searchKnowledge(query) : [], [query]);

  function updateQuery(value) {
    setSearchParams(value.trim() ? { q: value } : {}, { replace: true });
  }

  function openCondition(condition) {
    setSearchParams({ article: condition.id });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function closeCondition() {
    setSearchParams({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (selectedCondition) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-12">
        <ConditionViewer
          condition={selectedCondition}
          onBack={closeCondition}
          onSelectRelated={(id) => {
            const related = getCondition(id);
            if (related) openCondition(related);
          }}
        />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <KnowledgeSearch query={query} onQueryChange={updateQuery} resultCount={results.length} />

      {query.trim() ? (
        <KnowledgeSection title={`Search results for “${query.trim()}”`}>
          {results.length ? <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {results.map((result) => (
              <div key={result.id} className="relative">
                <ConditionCard condition={result.data} onClick={openCondition} />
                <div className="pointer-events-none absolute bottom-5 left-6 right-6 flex flex-wrap gap-1.5">
                  {result.matchedIn.slice(0, 3).map((label) => <span key={label} className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-500">{label}</span>)}
                </div>
              </div>
            ))}
          </div> : <div className="rounded-3xl border border-gray-200 bg-gray-50 p-8"><h2 className="text-xl font-semibold text-gray-900">No close matches yet</h2><p className="mt-2 text-gray-600">Try a symptom, condition, life stage or phrase such as “pain when standing”, “luteal phase” or “20 weeks pregnant”.</p></div>}
        </KnowledgeSection>
      ) : <KnowledgeSection title="Explore all topics">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {conditions.slice(0, 24).map((condition) => (
            <ConditionCard
              key={condition.id}
              condition={condition}
              onClick={openCondition}
            />
          ))}
        </div>
      </KnowledgeSection>}
    </main>
  );
}
