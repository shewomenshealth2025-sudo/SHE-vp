const fertilitySources = [
  { title: "NHS — IVF", url: "https://www.nhs.uk/conditions/ivf/" },
  { title: "HSE — Fertility problems and treatments", url: "https://www2.hse.ie/conditions/fertility-problems-treatments/" },
];

const contraceptionSources = [
  { title: "NHS — Contraception", url: "https://www.nhs.uk/contraception/" },
  { title: "HSE — Contraception", url: "https://www2.hse.ie/conditions/contraception/" },
];

const eggFreezingOverride = {
  articleType: "procedure",
  readTime: 9,
  summary: "Egg freezing collects and vitrifies mature eggs for possible future IVF. It can preserve eggs at their current biological age, but it cannot guarantee a future pregnancy or live birth.",
  quickFacts: [
    "A cycle usually involves ovarian-reserve assessment, around 10–14 days of injections and monitoring, a precisely timed trigger and egg collection under sedation or pain relief.",
    "The number collected is not the number stored: only mature eggs are frozen, and later losses can occur during warming, fertilisation and embryo development.",
    "Age when the eggs are frozen and the number of mature eggs stored are central to realistic estimates, but no target number guarantees a baby.",
  ],
  symptoms: ["injection-site bruising", "temporary bloating", "pelvic discomfort after collection", "light spotting"],
  causes: [
    "Stimulation medicines recruit several follicles during one cycle; antagonist or agonist medicines help prevent ovulation before collection.",
    "Vitrification cools mature eggs rapidly with cryoprotectants to reduce damaging ice-crystal formation during storage.",
  ],
  riskFactors: [
    "PCOS, high AMH, a high follicle count or a previous excessive response can increase ovarian hyperstimulation syndrome risk.",
    "Lower ovarian reserve, increasing age, endometriosis or previous ovarian surgery may reduce the number of eggs collected, without proving natural pregnancy is impossible.",
  ],
  diagnosis: [
    "Before treatment, the clinic reviews reproductive goals, medical history, medicines and pregnancy safety, and may use AMH and antral follicle count to estimate likely response.",
    "Screening and consent should cover infection testing, storage duration and fees, future use, death or incapacity, donation or research, and what happens if contact is lost.",
  ],
  treatments: [
    "During stimulation, ultrasound and sometimes hormone blood tests guide dose changes and the timing of the final maturation trigger.",
    "Egg collection uses an ultrasound-guided needle; the laboratory identifies mature eggs, vitrifies them and provides a written storage report.",
  ],
  selfCare: [
    "Follow the clinic’s injection and trigger times exactly and contact the clinic rather than improvising after a missed or incorrect dose.",
    "Plan transport and recovery after sedation, and ask for a complete cost showing medicines, collection, annual storage and eventual IVF using the eggs.",
  ],
  whenToSeeGP: [
    "Ask for timely fertility-preservation advice before chemotherapy, pelvic radiotherapy, ovarian surgery or another treatment that may affect fertility.",
    "Discuss other health conditions, medicine interactions or emotional distress with the appropriate clinician alongside the fertility clinic.",
  ],
  emergencySigns: [
    "Contact the fertility clinic urgently for rapidly increasing bloating, reduced urination, severe or one-sided pain, fever, heavy bleeding, faintness or repeated vomiting.",
    "Call emergency services for severe breathing difficulty, chest pain, collapse or feeling acutely unwell.",
  ],
  sources: fertilitySources,
};

const symptomTitle = /\b(pain|bleeding|spotting|discharge|itching|swelling|bloating|fatigue|dizziness|headache|cramps?|symptoms?)\b/i;
const medicineTitle = /\b(pill|medicine|medication|drug|antibiotic|antidepressant|progesterone|oestrogen|estrogen|metformin|hrt|hormone therapy)\b/i;
const procedureTitle = /\b(surgery|procedure|operation|laparoscopy|hysteroscopy|scan|screening|test|testing|biopsy|retrieval|collection|transfer|ivf|icsi|freezing|injection|implant|coil|iud|abortion)\b/i;
const decisionTitle = /\b(choosing|choice|compare|comparison|versus| vs |should i|deciding|decision|options|costs?|funding|support|stopping|consent)\b/i;

function inferArticleType(condition) {
  const legacy = condition.articleType;
  if (legacy === "hospital-navigation") return "healthcare-navigation";
  if (legacy === "health-explainer") return "life-stage-explainer";
  if (legacy === "decision-support") return "decision-support";

  const category = String(condition.category || "").toLowerCase();
  const title = condition.title || "";
  if (/hospital|healthcare navigation/.test(category)) return "healthcare-navigation";
  if (/pregnancy options/.test(category) || decisionTitle.test(title)) return "decision-support";
  if (/pregnancy week|reproductive development|puberty/.test(category) || /\b(weeks pregnant|menarche|cycle phase|follicular phase|luteal phase|ovulation phase)\b/i.test(title)) return "life-stage-explainer";
  if (medicineTitle.test(title)) return "medicine";
  if (/fertility treatment|fertility preservation|abortion care|post-surgical/.test(category) || procedureTitle.test(title)) return "procedure";
  if (symptomTitle.test(title) && !/syndrome|disease|disorder|endometriosis|adenomyosis/i.test(title)) return "symptom";
  return "condition";
}

function sourcesFor(condition) {
  const category = String(condition.category || "").toLowerCase();
  if (/fertility|ivf|egg freezing|embryo|icsi|ovarian reserve/.test(`${category} ${condition.title}`.toLowerCase())) return fertilitySources;
  if (/contracep/.test(category)) return contraceptionSources;
  return condition.sources;
}

export function applyArticleEditorial(condition) {
  const override = condition.id === "egg-freezing" ? eggFreezingOverride : null;
  const merged = override ? { ...condition, ...override } : condition;
  return {
    ...merged,
    articleType: override?.articleType || inferArticleType(merged),
    sources: override?.sources || sourcesFor(merged),
  };
}

export const recognisedArticleTypes = [
  "condition",
  "symptom",
  "medicine",
  "procedure",
  "decision-support",
  "life-stage-explainer",
  "healthcare-navigation",
  "news",
];
