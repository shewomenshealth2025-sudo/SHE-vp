import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Brain,
  ChevronRight,
  Clock3,
  Flower2,
  HeartPulse,
  Search,
  ShieldPlus,
  Stethoscope,
  X,
} from "lucide-react";
import { symptomGroups } from "../data/symptomContent";
import { retrieveKnowledge } from "../utils/learnSearch";

const iconMap = {
  Activity,
  Brain,
  Flower2,
  HeartPulse,
  ShieldPlus,
  Stethoscope,
};

export default function SymptomsPage({
  onOpenGuide,
  onAskChat,
}) {
  const [query, setQuery] = useState("");
  const [selectedSymptom, setSelectedSymptom] = useState(null);

  const activeSearch = selectedSymptom?.searchTerms || query;

  const matches = useMemo(() => {
    if (!activeSearch.trim()) return [];

    return retrieveKnowledge(activeSearch, {
      limit: 6,
      minimumScore: 4,
    });
  }, [activeSearch]);

  function selectSymptom(symptom) {
    setSelectedSymptom(symptom);
    setQuery("");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function clearSelection() {
    setSelectedSymptom(null);
    setQuery("");
  }

  const heading = selectedSymptom
    ? selectedSymptom.name
    : query
      ? `Results for “${query}”`
      : "Explore symptoms";

  return (
    <div className="mx-auto w-full max-w-7xl px-5 pb-32 pt-8 md:px-8 lg:px-12">
      <section className="overflow-hidden rounded-[36px] border border-pink-100 bg-gradient-to-br from-[#fff7fa] via-white to-[#fff1f5] p-7 md:p-11">
        <p className="text-sm font-semibold text-[#f43f72]">
          SHE Symptoms
        </p>

        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-[#241f20] md:text-6xl">
          Start with how you feel,
          <span className="block text-[#f43f72]">
            not a diagnosis.
          </span>
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-7 text-stone-600">
          Search a symptom or select one below to explore relevant
          educational guides, appointment questions and care information.
        </p>

        <label className="mt-8 flex max-w-2xl items-center gap-3 rounded-2xl border border-pink-100 bg-white px-5 py-4 shadow-sm focus-within:border-pink-300 focus-within:ring-4 focus-within:ring-pink-100">
          <Search size={21} className="text-[#f43f72]" />

          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSelectedSymptom(null);
            }}
            placeholder="Search fatigue, joint pain, dizziness..."
            className="w-full bg-transparent outline-none placeholder:text-stone-400"
          />

          {(query || selectedSymptom) && (
            <button
              type="button"
              onClick={clearSelection}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-500"
            >
              <X size={15} />
            </button>
          )}
        </label>
      </section>

      {(query || selectedSymptom) && (
        <section className="mt-10">
          <p className="text-sm font-medium text-[#f43f72]">
            Educational matches
          </p>

          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            {heading}
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-500">
            These matches show conditions and guides that discuss similar
            symptoms. They do not indicate that you have any of these
            conditions.
          </p>

          {matches.length > 0 ? (
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {matches.map(({ guide, matches: terms }, index) => (
                <motion.article
                  key={guide.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="flex flex-col rounded-[28px] border border-stone-100 bg-white p-6 shadow-sm"
                >
                  <p className="text-xs font-medium text-[#f43f72]">
                    {guide.categoryLabel}
                  </p>

                  <h3 className="mt-2 text-xl font-semibold">
                    {guide.title}
                  </h3>

                  {guide.subtitle && (
                    <p className="mt-1 text-xs text-stone-400">
                      {guide.subtitle}
                    </p>
                  )}

                  <p className="mt-3 flex-1 text-sm leading-6 text-stone-500">
                    {guide.summary}
                  </p>

                  {terms.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {terms.slice(0, 4).map((term) => (
                        <span
                          key={term}
                          className="rounded-full bg-pink-50 px-2.5 py-1 text-xs text-[#f43f72]"
                        >
                          {term}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-5 flex items-center gap-2 text-xs text-stone-500">
                    <Clock3 size={14} />
                    {guide.readTime} minute guide
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenGuide?.(guide)}
                    className="mt-5 flex items-center justify-between rounded-2xl bg-[#241f20] px-4 py-3 text-sm font-medium text-white"
                  >
                    View in SHE Learn
                    <ChevronRight size={17} />
                  </button>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-[28px] border border-dashed border-pink-200 bg-pink-50/50 p-10 text-center">
              <Search
                size={30}
                className="mx-auto text-[#f43f72]"
              />

              <h3 className="mt-4 font-semibold">
                No strong match yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-stone-500">
                Try a broader phrase or ask SHE Chat with more detail
                about when the symptom happens.
              </p>
            </div>
          )}

          <div className="mt-6 rounded-[28px] bg-[#241f20] p-6 text-white">
            <p className="text-sm text-white/65">
              Need help describing the symptom?
            </p>

            <h3 className="mt-2 text-xl font-semibold">
              Ask SHE to organise your question
            </h3>

            <button
              type="button"
              onClick={() =>
                onAskChat?.(
                  selectedSymptom
                    ? `Help me understand and prepare questions about ${selectedSymptom.name.toLowerCase()}.`
                    : query,
                )
              }
              className="mt-5 flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-[#241f20]"
            >
              Continue in Chat
              <ArrowRight size={16} />
            </button>
          </div>
        </section>
      )}

      {!query && !selectedSymptom && (
        <section className="mt-12">
          <p className="text-sm font-medium text-[#f43f72]">
            Browse by symptom group
          </p>

          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            What are you experiencing?
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {symptomGroups.map((group, index) => {
              const Icon = iconMap[group.icon] || HeartPulse;

              return (
                <motion.article
                  key={group.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="rounded-[28px] border border-stone-100 bg-white p-6 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-50 text-[#f43f72]">
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold">
                    {group.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-stone-500">
                    {group.description}
                  </p>

                  <div className="mt-5 space-y-2">
                    {group.symptoms.map((symptom) => (
                      <button
                        key={symptom.id}
                        type="button"
                        onClick={() => selectSymptom(symptom)}
                        className="flex w-full items-center justify-between rounded-2xl bg-stone-50 px-4 py-3 text-left text-sm transition hover:bg-pink-50 hover:text-[#f43f72]"
                      >
                        {symptom.name}
                        <ChevronRight size={16} />
                      </button>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>
      )}

      <div className="mt-12 rounded-3xl bg-stone-50 px-6 py-5 text-xs leading-5 text-stone-500">
        The Symptoms Hub supports education and appointment preparation.
        It cannot diagnose symptoms. Seek urgent medical help for sudden,
        severe or life-threatening symptoms.
      </div>
    </div>
  );
}
