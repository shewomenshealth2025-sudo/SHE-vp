import {
  getAllConditions,
} from "../data/knowledge";

import KnowledgeSearch from "../components/knowledge/KnowledgeSearch";
import KnowledgeSection from "../components/knowledge/KnowledgeSection";
import ConditionCard from "../components/knowledge/ConditionCard";

export default function LearnPage() {

  const conditions = getAllConditions();

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">

      <KnowledgeSearch />

      <KnowledgeSection title="Popular Conditions">

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {conditions.map(condition => (
            <ConditionCard
              key={condition.id}
              condition={condition}
            />
          ))}

        </div>

      </KnowledgeSection>

    </main>
  );
}