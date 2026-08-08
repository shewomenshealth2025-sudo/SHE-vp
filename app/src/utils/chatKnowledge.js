import { retrieveKnowledge } from "./learnSearch";

const EMERGENCY_PATTERNS = [
  { terms: ["chest pain", "cant breathe", "cannot breathe", "difficulty breathing", "severe breathlessness"], message: "Chest pain or significant breathing difficulty can require urgent medical assessment." },
  { terms: ["passed out", "unconscious", "collapse"], message: "Loss of consciousness or collapse can require urgent medical assessment." },
  { terms: ["sudden weakness", "face drooping", "slurred speech", "sudden vision loss"], message: "Sudden weakness, speech changes or vision loss can be signs of a medical emergency." },
  { terms: ["soaking a pad every hour", "soaking pads every hour", "very heavy bleeding"], message: "Very heavy bleeding, particularly with weakness, faintness or breathlessness, can require urgent assessment." },
  { terms: ["worst headache", "sudden severe headache", "thunderclap headache"], message: "A sudden or exceptionally severe headache requires urgent medical assessment." },
];

const normalise = (value = "") => value.toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, " ").trim();
const unique = (items) => [...new Set(items.filter(Boolean))];

function detectUrgentWarning(query) {
  const text = normalise(query);
  return EMERGENCY_PATTERNS.find(({ terms }) => terms.some((term) => text.includes(term)));
}

function detectQuestionFocus(query) {
  const text = normalise(query);
  if (/\b(cause|causes|caused by|why does|why do)\b/.test(text)) return "causes";
  if (/\b(risk|risk factor|more likely)\b/.test(text)) return "risks";
  if (/\b(symptom|signs|feel like|look like)\b/.test(text)) return "symptoms";
  if (/\b(diagnos|test|assessment|check for)\b/.test(text)) return "assessment";
  if (/\b(treat|treatment|manage|help with|what can i do)\b/.test(text)) return "treatment";
  if (/\b(difference between|compare|versus| vs )\b/.test(text)) return "comparison";
  if (/\b(ask my|ask a|appointment|questions for)\b/.test(text)) return "clinician-questions";
  if (/\b(what is|what are|define|explain|tell me about)\b/.test(text)) return "definition";
  return "description";
}

function looksPersonal(query) {
  return /\b(i have|i get|i feel|i keep|ive had|i've had|my |when i|for the past|happens to me)\b/.test(normalise(query));
}

function readableSymptoms(guide) {
  return unique((guide.symptoms || []).map((item) => String(item).replaceAll("-", " "))).slice(0, 7);
}

function confidenceFor(matches) {
  if (!matches.length) return "low";
  const first = matches[0].score;
  const margin = first - (matches[1]?.score || 0);
  if (first >= 42 && margin >= 6) return "strong";
  if (first >= 22) return "moderate";
  return "low";
}

function relatedGuides(matches) {
  return matches.slice(0, 4).map(({ guide, score, matches: terms }) => ({
    id: guide.id,
    title: guide.title,
    category: guide.categoryLabel,
    summary: guide.summary,
    readTime: guide.readTime,
    score,
    matchedTerms: terms,
  }));
}

function lowConfidenceResponse(urgentWarning) {
  return {
    id: `she-${Date.now()}`,
    role: "assistant",
    type: "knowledge",
    title: "I can’t confidently match that description yet",
    introduction: "I do not have enough specific information to interpret what you mean without guessing.",
    sections: [{
      title: "Tell me a little more",
      items: [
        "What is the main symptom and where do you feel it?",
        "When did it start, how often does it happen and how severe is it?",
        "Does it relate to standing, meals, periods, pregnancy, sex, sleep or activity?",
        "Are there other symptoms such as bleeding, fever, fainting, breathlessness, discharge, bowel or bladder changes?",
      ],
    }],
    relatedGuides: [],
    urgentWarning: urgentWarning?.message || null,
    disclaimer: "SHE can interpret patterns in its Learn library, but it cannot diagnose a condition.",
    confidence: "low",
  };
}

function definitionSections(guide, focus) {
  const sectionMap = {
    causes: [{ title: "Possible causes and mechanisms", items: guide.causes }],
    risks: [{ title: "Risk factors", items: guide.riskFactors }],
    symptoms: [{ title: "Symptoms and patterns", items: readableSymptoms(guide) }],
    assessment: [{ title: "How it is assessed", items: guide.assessment }],
    treatment: [{ title: "Treatment and management", items: guide.treatment }],
    "clinician-questions": [{ title: "Questions to ask a clinician", items: guide.questions }],
  };
  if (sectionMap[focus]) return sectionMap[focus];
  return [
    { title: "What it can involve", items: readableSymptoms(guide) },
    { title: "Possible causes and mechanisms", items: (guide.causes || []).slice(0, 3) },
    { title: "How it is assessed", items: (guide.assessment || []).slice(0, 3) },
    { title: "Treatment and management", items: (guide.treatment || []).slice(0, 3) },
  ];
}

function buildComparison(matches) {
  return matches.slice(0, 2).map(({ guide }) => ({
    title: guide.title,
    text: guide.summary,
    keyPoints: [
      ...(guide.symptoms || []).slice(0, 3).map((item) => String(item).replaceAll("-", " ")),
      ...(guide.assessment || []).slice(0, 1),
    ],
  }));
}

export function buildGroundedResponse(query) {
  const focus = detectQuestionFocus(query);
  const matches = retrieveKnowledge(query, { limit: 6, minimumScore: 5 });
  const urgentWarning = detectUrgentWarning(query);
  const confidence = confidenceFor(matches);

  if (!matches.length || confidence === "low") return lowConfidenceResponse(urgentWarning);

  const primary = matches[0].guide;
  const personal = looksPersonal(query) || focus === "description";
  const sections = [];
  let title;
  let introduction;

  if (focus === "comparison" && matches.length >= 2) {
    title = `Comparing ${matches[0].guide.title} and ${matches[1].guide.title}`;
    introduction = "These topics can overlap, but their typical pattern and assessment differ.";
    sections.push({ title: "How they differ", comparisons: buildComparison(matches) });
  } else if (!personal) {
    title = focus === "definition" ? `What is ${primary.title}?` : primary.title;
    introduction = primary.summary || primary.overview;
    sections.push(...definitionSections(primary, focus));
  } else {
    const alternatives = matches.slice(1, 3).map(({ guide }) => guide.title);
    title = "What your description may overlap with";
    introduction = `What you described overlaps most closely with the SHE Learn guide on ${primary.title}. This is a pattern match, not a diagnosis${alternatives.length ? `; ${alternatives.join(" and ")} also share some features` : ""}.`;
    sections.push({
      title: `Why ${primary.title} may be relevant`,
      items: [
        ...readableSymptoms(primary).slice(0, 5),
        ...(primary.keyPoints || []).slice(0, 2),
      ],
    });
    sections.push({ title: "What a clinician may assess", items: (primary.assessment || []).slice(0, 4) });
    sections.push({ title: "Useful details to track", items: ["When symptoms happen and what triggers them", "How long they last and how much they affect normal activity", "Associated bleeding, pain, heart-rate, bowel, bladder, skin, cycle or pregnancy changes", "Medicines, recent illness and existing diagnoses"] });
  }

  const seekHelp = unique([...(primary.seekHelp || []), ...(primary.urgentHelp || [])]).slice(0, 4);
  if (seekHelp.length) sections.push({ title: "When to seek medical help", items: seekHelp });

  return {
    id: `she-${Date.now()}`,
    role: "assistant",
    type: "knowledge",
    title,
    introduction,
    sections,
    relatedGuides: relatedGuides(matches),
    urgentWarning: urgentWarning?.message || null,
    disclaimer: "This answer is generated only from SHE Learn content. It provides educational pattern interpretation and does not diagnose a condition.",
    confidence,
  };
}

export function getSuggestedChatPrompts() {
  return [
    "What is POTS?",
    "My heart races when I stand and I feel faint — what could this pattern relate to?",
    "What causes adenomyosis?",
    "What is the difference between endometriosis and adenomyosis?",
    "What should I ask my GP about painful periods?",
    "What happens at 20 weeks pregnant?",
  ];
}
