import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Circle,
  Clock3,
} from "lucide-react";
import {
  bodyAreas,
  symptomGroups,
} from "../data/symptomContent";
import { retrieveKnowledge } from "../utils/learnSearch";

const positions = {
  head: {
    top: "8%",
    left: "50%",
  },
  chest: {
    top: "29%",
    left: "50%",
  },
  abdomen: {
    top: "45%",
    left: "50%",
  },
  pelvis: {
    top: "59%",
    left: "50%",
  },
  joints: {
    top: "45%",
    left: "24%",
  },
  whole: {
    top: "78%",
    left: "50%",
  },
};

export default function BodyExplorerPage({
  onOpenGuide,
  onOpenSymptoms,
}) {
  const [selectedArea, setSelectedArea] = useState("pelvis");

  const area = bodyAreas.find((item) => item.id === selectedArea);
  const groups = symptomGroups.filter(
    (group) => group.bodyArea === selectedArea,
  );

  const searchText = groups
    .flatMap((group) =>
      group.symptoms.map((symptom) => symptom.searchTerms),
    )
    .join(" ");

  const guides = useMemo(() => {
    return retrieveKnowledge(searchText, {
      limit: 4,
      minimumScore: 4,
    });
  }, [searchText]);

  return (
    <div className="mx-auto w-full max-w-7xl px-5 pb-32 pt-8 md:px-8 lg:px-12">
      <section className="rounded-[36px] border border-pink-100 bg-gradient-to-br from-[#fff7fa] via-white to-[#fff0f5] p-7 md:p-11">
        <p className="text-sm font-semibold text-[#f43f72]">
          Visual Learning
        </p>

        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
          Explore health information
          <span className="block text-[#f43f72]">
            by body area.
          </span>
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-7 text-stone-600">
          Select a body area to see related symptoms and education
          guides. This is a navigation tool rather than a diagnostic body
          map.
        </p>
      </section>

      <section className="mt-10 grid gap-7 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[32px] border border-stone-100 bg-white p-6 shadow-sm">
          <div className="relative mx-auto h-[590px] max-w-[330px]">
            <div className="absolute left-1/2 top-8 h-20 w-20 -translate-x-1/2 rounded-full border-2 border-pink-200 bg-pink-50" />

            <div className="absolute left-1/2 top-28 h-[330px] w-[150px] -translate-x-1/2 rounded-[65px] border-2 border-pink-200 bg-pink-50/60" />

            <div className="absolute left-[52px] top-36 h-[285px] w-12 rotate-[8deg] rounded-full border-2 border-pink-200 bg-pink-50/60" />

            <div className="absolute right-[52px] top-36 h-[285px] w-12 -rotate-[8deg] rounded-full border-2 border-pink-200 bg-pink-50/60" />

            <div className="absolute bottom-10 left-[102px] h-[190px] w-12 rotate-[3deg] rounded-full border-2 border-pink-200 bg-pink-50/60" />

            <div className="absolute bottom-10 right-[102px] h-[190px] w-12 -rotate-[3deg] rounded-full border-2 border-pink-200 bg-pink-50/60" />

            {bodyAreas.map((item) => {
              const position = positions[item.id];

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedArea(item.id)}
                  style={{
                    top: position.top,
                    left: position.left,
                  }}
                  className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white shadow-lg transition ${
                    selectedArea === item.id
                      ? "h-9 w-9 bg-[#f43f72]"
                      : "h-7 w-7 bg-[#241f20] hover:scale-110"
                  }`}
                  aria-label={item.label}
                />
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {bodyAreas.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedArea(item.id)}
                className={`rounded-2xl px-3 py-3 text-left text-sm ${
                  selectedArea === item.id
                    ? "bg-[#241f20] text-white"
                    : "bg-stone-50 text-stone-600"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={selectedArea}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[32px] border border-stone-100 bg-white p-7 shadow-sm md:p-9"
        >
          <p className="text-sm font-medium text-[#f43f72]">
            Selected body area
          </p>

          <h2 className="mt-2 text-3xl font-semibold">
            {area?.label}
          </h2>

          <p className="mt-3 text-sm leading-6 text-stone-500">
            {area?.description}
          </p>

          <div className="mt-7">
            <h3 className="font-semibold">
              Symptoms you can explore
            </h3>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {groups.flatMap((group) =>
                group.symptoms.map((symptom) => (
                  <button
                    key={symptom.id}
                    type="button"
                    onClick={() => onOpenSymptoms?.(symptom)}
                    className="flex items-center justify-between rounded-2xl bg-pink-50 px-4 py-4 text-left text-sm text-[#241f20]"
                  >
                    <span className="flex items-center gap-2">
                      <Circle
                        size={8}
                        fill="currentColor"
                        className="text-[#f43f72]"
                      />
                      {symptom.name}
                    </span>

                    <ChevronRight size={16} />
                  </button>
                )),
              )}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold">
              Related SHE Learn guides
            </h3>

            <div className="mt-4 space-y-3">
              {guides.map(({ guide }) => (
                <button
                  key={guide.id}
                  type="button"
                  onClick={() => onOpenGuide?.(guide)}
                  className="flex w-full items-center justify-between gap-4 rounded-2xl border border-stone-100 p-4 text-left transition hover:border-pink-200"
                >
                  <div>
                    <p className="font-medium">{guide.title}</p>

                    <p className="mt-1 flex items-center gap-1.5 text-xs text-stone-500">
                      <Clock3 size={13} />
                      {guide.readTime} min · {guide.categoryLabel}
                    </p>
                  </div>

                  <ChevronRight
                    size={18}
                    className="shrink-0 text-stone-400"
                  />
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenSymptoms?.()}
            className="mt-8 flex items-center gap-2 rounded-full bg-[#241f20] px-5 py-3 text-sm font-medium text-white"
          >
            Open full Symptoms Hub
            <ArrowRight size={16} />
          </button>
        </motion.div>
      </section>

      <div className="mt-10 rounded-3xl bg-stone-50 px-6 py-5 text-xs leading-5 text-stone-500">
        This visual is a simple navigation aid. It is not an anatomical
        assessment tool and cannot determine the cause of symptoms.
      </div>
    </div>
  );
}
