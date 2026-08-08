import { useState } from "react";

import { getAllConditions, getCondition } from "../data/knowledge";

import KnowledgeSearch from "../components/knowledge/KnowledgeSearch";
import KnowledgeSection from "../components/knowledge/KnowledgeSection";
import ConditionCard from "../components/knowledge/ConditionCard";
import ConditionViewer from "../components/knowledge/ConditionViewer";

export default function LearnPageV2() {
  const [selectedCondition, setSelectedCondition] = useState(null);

  const conditions = getAllConditions();

  function openCondition(condition) {
    setSelectedCondition(condition);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function closeCondition() {
    setSelectedCondition(null);
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
      <KnowledgeSearch onSelectCondition={openCondition} />

      <KnowledgeSection title="Popular Conditions">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {conditions.map((condition) => (
            <ConditionCard
              key={condition.id}
              condition={condition}
              onClick={openCondition}
            />
          ))}
        </div>
      </KnowledgeSection>
    </main>
  );
}
