import { useState } from "react";
import {
  BookOpen,
  Search,
  ScanSearch,
} from "lucide-react";
import LearnPage from "./LearnPage";
import SymptomsPage from "./SymptomsPage";
import BodyExplorerPage from "./BodyExplorerPage";

const tabs = [
  {
    id: "learn",
    label: "Learn",
    icon: BookOpen,
  },
  {
    id: "symptoms",
    label: "Symptoms",
    icon: Search,
  },
  {
    id: "body",
    label: "Body Explorer",
    icon: ScanSearch,
  },
];

export default function SHEIntelligencePage({
  onOpenChat,
}) {
  const [section, setSection] = useState("learn");

  function openGuide(guide) {
    window.localStorage.setItem(
      "she-intelligence-guide-target",
      JSON.stringify({
        id: guide.id,
        title: guide.title,
      }),
    );

    setSection("learn");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function openSymptoms(symptom = null) {
    if (symptom) {
      window.localStorage.setItem(
        "she-intelligence-symptom-target",
        JSON.stringify(symptom),
      );
    }

    setSection("symptoms");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div>
      <div className="sticky top-0 z-30 border-b border-stone-100 bg-white/95 px-4 py-3 backdrop-blur-xl md:px-8">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSection(tab.id)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition ${
                  section === tab.id
                    ? "bg-[#241f20] text-white"
                    : "bg-stone-100 text-stone-600 hover:bg-pink-50 hover:text-[#f43f72]"
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {section === "learn" && <LearnPage />}

      {section === "symptoms" && (
        <SymptomsPage
          onOpenGuide={openGuide}
          onAskChat={onOpenChat}
        />
      )}

      {section === "body" && (
        <BodyExplorerPage
          onOpenGuide={openGuide}
          onOpenSymptoms={openSymptoms}
        />
      )}
    </div>
  );
}
