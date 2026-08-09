import { createServer } from "vite";

const GENERIC_CAUSE_PATTERNS = [
  "varies with life stage",
  "depend on the clinical pattern",
  "Possible causes depend on",
];

const GENERIC_RISK_PATTERNS = [
  "Relevant factors are assessed",
  "can change the likelihood and urgency",
  "help identify which personal or family-history factors",
];

const server = await createServer({
  appType: "custom",
  logLevel: "error",
  server: { middlewareMode: true },
});

try {
  const knowledge = await server.ssrLoadModule("/src/knowledge/knowledgeBase.js");
  const search = await server.ssrLoadModule("/src/utils/learnSearch.js");
  const database = await server.ssrLoadModule("/src/data/knowledge/database.js");
  const productData = await server.ssrLoadModule("/src/data/products.js");
  const chat = await server.ssrLoadModule("/src/utils/chatEngine.js");
  const learnQueries = await server.ssrLoadModule("/src/data/knowledge/queries.js");
  const gpQuestionSupport = await server.ssrLoadModule("/src/utils/gpQuestions.js");

  const guides = knowledge.knowledgeGuides;
  const conditions = database.conditions;
  const productIds = new Set(productData.products.map((product) => product.id));
  const ids = new Set(guides.map((guide) => guide.id));

  assert(guides.length === 406, `Expected 406 Chat guides, received ${guides.length}`);
  assert(conditions.length === 406, `Expected 406 Learn conditions, received ${conditions.length}`);
  assert(ids.size === guides.length, "Guide IDs must be unique");
  assert(conditions.every((condition) => ids.has(condition.id)), "Learn and Chat IDs must match");
  assert(guides.every((guide) => guide.evidence?.sources?.length > 0), "Every guide needs sources");
  assert(guides.every((guide) => guide.urgentHelp?.length > 0), "Every guide needs urgent-help guidance");
  assert(guides.every((guide) => guide.relatedGuideIds?.length > 0), "Every guide needs relationships");
  assert(guides.every((guide) => guide.relatedGuideIds.every((id) => ids.has(id))), "Relationships must resolve");
  assert(conditions.every((condition) => condition.summary?.length >= 80), "Every guide needs a substantial topic summary");
  assert(conditions.every((condition) => condition.quickFacts?.length >= 3), "Every guide needs at least 3 topic facts");
  assert(conditions.every((condition) => condition.diagnosis?.length >= 2), "Every guide needs detailed assessment guidance");
  assert(conditions.every((condition) => condition.treatments?.length >= 2), "Every guide needs detailed management guidance");
  assert(conditions.every((condition) => condition.selfCare?.length >= 2), "Every guide needs actionable self-management guidance");
  assert(conditions.every((condition) => condition.causes?.length >= 2), "Every guide needs at least 2 topic-specific cause or mechanism points");
  assert(conditions.every((condition) => condition.riskFactors?.length >= 2), "Every guide needs at least 2 topic-specific risk-factor points");
  assert(
    conditions.every((condition) => condition.causes.every((item) =>
      !GENERIC_CAUSE_PATTERNS.some((pattern) => item.includes(pattern)),
    )),
    "Generic cause copy is not allowed",
  );
  assert(
    conditions.every((condition) => condition.riskFactors.every((item) =>
      !GENERIC_RISK_PATTERNS.some((pattern) => item.includes(pattern)),
    )),
    "Generic risk-factor copy is not allowed",
  );
  assert(conditions.every((condition) => condition.whenToSeeGP?.length >= 2), "Every guide needs clinical safety-netting");
  assert(
    conditions.every((condition) => {
      const questions = gpQuestionSupport.getGpQuestions(condition);
      return questions.length >= 5 && questions.every((question) => question.endsWith("?"));
    }),
    "Every guide needs at least five relevant GP questions",
  );
  assert(conditions.every((condition) => condition.sources?.length >= 2), "Every guide needs NHS and HSE references");
  assert(conditions.every((condition) => condition.sources.every(isNhsOrHseSource)), "Every source must be an NHS or HSE website");
  const linkedProductIds = new Set(conditions.flatMap((condition) => condition.relatedProductIds || []));
  assert(linkedProductIds.size > 0, "Relevant guides should link to products");
  assert([...linkedProductIds].every((id) => productIds.has(id)), "Every related product link must resolve");
  assert(conditions.some((condition) => !condition.relatedProductIds?.length), "Product links must remain selective");

  const retrievalCases = [
    ["sudden pain and vomiting ovarian torsion", "ovarian-torsion"],
    ["low mood after birth postnatal depression", "postnatal-depression"],
    ["bleeding after menopause", "postmenopausal-bleeding"],
    ["could I have chlamydia", "chlamydia"],
    ["irregular periods PMOS PCOS", "pcos"],
    ["intense itching on palms and soles while pregnant", "pregnancy-itching"],
    ["one leg swollen and breathless after giving birth", "postpartum-blood-clot"],
    ["painless sore and rash on palms", "syphilis"],
    ["bladder bulge and cannot empty fully", "cystocele"],
    ["heart races when I stand up dizzy", "pots"],
    ["what is happening at 20 weeks pregnant", "pregnancy-week-20"],
    ["first period menarche puberty", "menarche"],
    ["follicular phase before ovulation", "follicular-phase"],
    ["hair shedding after giving birth", "postpartum-hair-loss"],
    ["white nipple spot burning when feeding", "milk-bleb"],
    ["period has not started delayed puberty", "delayed-puberty"],
    ["what happens at 2 weeks pregnant", "pregnancy-week-2"],
  ];

  for (const [query, expectedId] of retrievalCases) {
    const matches = search.retrieveKnowledge(query, { limit: 5, minimumScore: 1 });
    assert(matches.some(({ guide }) => guide.id === expectedId), `Chat retrieval missed ${expectedId}`);
  }

  const definitionAnswer = chat.generateSHEMessage({ message: "What is POTS?", conversation: [] });
  assert(definitionAnswer.includes("POTS causes an excessive sustained heart-rate rise"), "Chat must answer definition questions from Learn");
  assert(definitionAnswer.includes("How it is assessed"), "Definition answers must use detailed Learn sections");

  const describedSymptoms = chat.generateSHEMessage({ message: "My heart races when I stand and I feel faint", conversation: [] });
  assert(describedSymptoms.includes("overlaps most closely"), "Chat must interpret symptom descriptions");
  assert(describedSymptoms.includes("Postural Orthostatic Tachycardia Syndrome"), "Chat symptom interpretation should retrieve POTS");
  assert(describedSymptoms.includes("not a diagnosis"), "Chat interpretation must state its limits");

  const unclearAnswer = chat.generateSHEMessage({ message: "purple bananas orbit quietly", conversation: [] });
  assert(unclearAnswer.includes("can’t confidently match"), "Chat must state when it cannot interpret a description");

  const followUpConversation = [
    { role: "user", text: "What is adenomyosis?" },
    { role: "she", text: "Adenomyosis information" },
    { role: "user", text: "What causes it?" },
  ];
  const followUpAnswer = chat.generateSHEMessage({ message: "What causes it?", conversation: followUpConversation });
  assert(followUpAnswer.includes("Possible causes and mechanisms"), "Chat must understand conversational follow-ups");
  assert(followUpAnswer.includes("muscular wall of the womb"), "Follow-up answers must retain the previous topic");

  const potsSearch = learnQueries.searchKnowledge("POTS");
  assert(potsSearch[0]?.id === "pots", "Learn search must rank an exact condition first");
  assert(potsSearch.some((result) => result.id === "dysautonomia"), "Learn search must include related articles");
  const cycleSearch = learnQueries.searchKnowledge("cycle stage");
  assert(cycleSearch.some((result) => result.id === "follicular-phase"), "Learn search must search across article content");
  assert(cycleSearch.some((result) => result.id === "luteal-phase"), "Learn search must return all relevant cycle-stage articles");

  console.log(`Knowledge integration valid: ${guides.length} unified guides, ${guides.reduce((sum, guide) => sum + guide.relatedGuideIds.length, 0)} relationships.`);
} finally {
  await server.close();
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function isNhsOrHseSource(source) {
  try {
    const host = new URL(source.url).hostname;
    return host === "nhs.uk" || host.endsWith(".nhs.uk") || host === "hse.ie" || host.endsWith(".hse.ie");
  } catch {
    return false;
  }
}
