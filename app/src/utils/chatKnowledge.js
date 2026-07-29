import { retrieveKnowledge } from "./learnSearch";

const EMERGENCY_PATTERNS = [
  {
    terms: [
      "chest pain",
      "cant breathe",
      "cannot breathe",
      "difficulty breathing",
      "severe breathlessness",
    ],
    message:
      "Chest pain or significant breathing difficulty can require urgent medical assessment.",
  },
  {
    terms: [
      "passed out",
      "unconscious",
      "fainted and hit",
      "collapse",
    ],
    message:
      "Loss of consciousness, collapse or injury after fainting can require urgent medical assessment.",
  },
  {
    terms: [
      "sudden weakness",
      "face drooping",
      "slurred speech",
      "sudden vision loss",
    ],
    message:
      "Sudden weakness, speech changes or vision loss can be signs of a medical emergency.",
  },
  {
    terms: [
      "bleeding through",
      "soaking a pad every hour",
      "soaking pads every hour",
      "very heavy bleeding",
    ],
    message:
      "Very heavy bleeding, particularly with weakness, faintness or breathlessness, can require urgent assessment.",
  },
  {
    terms: [
      "worst headache",
      "sudden severe headache",
      "thunderclap headache",
    ],
    message:
      "A sudden or exceptionally severe headache requires urgent medical assessment.",
  },
];

const INTENT_PATTERNS = {
  clinicianQuestions: [
    "what should i ask",
    "questions for my gp",
    "questions to ask",
    "ask my doctor",
    "prepare for appointment",
    "appointment questions",
  ],
  compare: [
    "difference between",
    "compare",
    "versus",
    " vs ",
    "how is",
  ],
  definition: [
    "what is",
    "what are",
    "explain",
    "tell me about",
  ],
};

function normalise(value = "") {
  return value.toLowerCase().replace(/[’']/g, "").trim();
}

function detectsIntent(query, patterns) {
  const text = normalise(query);
  return patterns.some((pattern) => text.includes(pattern));
}

function detectUrgentWarning(query) {
  const text = normalise(query);

  return EMERGENCY_PATTERNS.find((pattern) =>
    pattern.terms.some((term) => text.includes(term)),
  );
}

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function buildSymptoms(matches) {
  return unique(
    matches.flatMap(({ guide }) =>
      (guide.tags || []).filter(
        (tag) =>
          !tag.toLowerCase().includes(guide.title.toLowerCase()) &&
          !["autoimmune", "fertility", "thyroid"].includes(
            tag.toLowerCase(),
          ),
      ),
    ),
  ).slice(0, 7);
}

function buildQuestions(matches) {
  return unique(
    matches.flatMap(({ guide }) => guide.questions || []),
  ).slice(0, 5);
}

function buildSeekHelp(matches) {
  return unique(
    matches.flatMap(({ guide }) => guide.seekHelp || []),
  ).slice(0, 4);
}

function buildComparison(matches) {
  return matches.slice(0, 2).map(({ guide }) => ({
    title: guide.title,
    text: guide.overview,
    keyPoints: (guide.keyPoints || []).slice(0, 3),
  }));
}

export function buildGroundedResponse(query) {
  const matches = retrieveKnowledge(query, {
    limit: 4,
    minimumScore: 5,
  });

  const urgentWarning = detectUrgentWarning(query);

  if (matches.length === 0) {
    return {
      id: `she-${Date.now()}`,
      role: "assistant",
      type: "knowledge",
      title: "I do not have enough information in the SHE library yet",
      introduction:
        "I could not find a strong match in the current SHE Learn content. Try describing the main symptom, when it happens, how long it has been present and what makes it better or worse.",
      sections: [
        {
          title: "Useful details to include",
          items: [
            "The main symptom and where you feel it",
            "When it started and how often it happens",
            "Whether it relates to standing, eating, periods, sleep or activity",
            "Any bleeding, pain, fever, breathlessness or fainting",
            "Medication, pregnancy or existing health conditions",
          ],
        },
      ],
      relatedGuides: [],
      disclaimer:
        "SHE provides general educational information and cannot diagnose a condition.",
      urgentWarning: urgentWarning?.message || null,
      confidence: "low",
    };
  }

  const isQuestionIntent = detectsIntent(
    query,
    INTENT_PATTERNS.clinicianQuestions,
  );

  const isComparisonIntent = detectsIntent(
    query,
    INTENT_PATTERNS.compare,
  );

  const isDefinitionIntent = detectsIntent(
    query,
    INTENT_PATTERNS.definition,
  );

  const primary = matches[0].guide;
  const symptoms = buildSymptoms(matches);
  const questions = buildQuestions(matches);
  const seekHelp = buildSeekHelp(matches);

  const sections = [];

  if (isComparisonIntent && matches.length >= 2) {
    sections.push({
      title: "How the leading matches differ",
      comparisons: buildComparison(matches),
    });
  } else if (isDefinitionIntent) {
    sections.push({
      title: `About ${primary.title}`,
      text: primary.overview,
    });

    sections.push({
      title: "Key things to know",
      items: (primary.keyPoints || []).slice(0, 5),
    });
  } else {
    sections.push({
      title: "Symptoms and patterns discussed in the SHE library",
      items: symptoms,
    });

    sections.push({
      title: "Conditions worth reading about",
      items: matches.slice(0, 4).map(({ guide }) => {
        return `${guide.title}: ${guide.summary}`;
      }),
    });
  }

  if (isQuestionIntent || questions.length > 0) {
    sections.push({
      title: "Questions you could ask a clinician",
      items: questions,
    });
  }

  if (seekHelp.length > 0) {
    sections.push({
      title: "Seek medical advice when",
      items: seekHelp,
    });
  }

  return {
    id: `she-${Date.now()}`,
    role: "assistant",
    type: "knowledge",
    title: isComparisonIntent
      ? "Here is a grounded comparison from SHE Learn"
      : isDefinitionIntent
        ? `Understanding ${primary.title}`
        : "Several SHE guides may be relevant",
    introduction: isDefinitionIntent
      ? primary.summary
      : "Based on the words and symptoms in your question, these are the strongest matches in the current SHE education library. They are possibilities to explore, not diagnoses.",
    sections,
    relatedGuides: matches.map(({ guide, score, matches: terms }) => ({
      id: guide.id,
      title: guide.title,
      subtitle: guide.subtitle || "",
      category: guide.categoryLabel,
      summary: guide.summary,
      readTime: guide.readTime,
      score,
      matchedTerms: terms,
    })),
    disclaimer:
      "This response is grounded in SHE Learn content and provides general educational information. It does not diagnose a condition or replace medical advice.",
    urgentWarning: urgentWarning?.message || null,
    confidence:
      matches[0].score >= 40
        ? "strong"
        : matches[0].score >= 20
          ? "moderate"
          : "limited",
  };
}

export function getSuggestedChatPrompts() {
  return [
    "Why do I feel dizzy and get a racing heart when I stand?",
    "What autoimmune conditions can cause fatigue and joint pain?",
    "What should I ask my GP about painful periods?",
    "What is the difference between endometriosis and adenomyosis?",
    "Could heavy periods be linked to iron deficiency?",
    "Explain POTS in simple terms",
  ];
}
