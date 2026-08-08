import { createServer } from "vite";

const server = await createServer({
  appType: "custom",
  logLevel: "error",
  server: { middlewareMode: true },
});

try {
  const knowledge = await server.ssrLoadModule("/src/knowledge/knowledgeBase.js");
  const search = await server.ssrLoadModule("/src/utils/learnSearch.js");
  const database = await server.ssrLoadModule("/src/data/knowledge/database.js");

  const guides = knowledge.knowledgeGuides;
  const conditions = database.conditions;
  const ids = new Set(guides.map((guide) => guide.id));

  assert(guides.length === 169, `Expected 169 Chat guides, received ${guides.length}`);
  assert(conditions.length === 169, `Expected 169 Learn conditions, received ${conditions.length}`);
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
  assert(conditions.every((condition) => condition.whenToSeeGP?.length >= 2), "Every guide needs clinical safety-netting");
  assert(conditions.every((condition) => condition.sources?.length >= 2), "Every guide needs NHS and HSE references");
  assert(conditions.every((condition) => condition.sources.every(isNhsOrHseSource)), "Every source must be an NHS or HSE website");

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
  ];

  for (const [query, expectedId] of retrievalCases) {
    const matches = search.retrieveKnowledge(query, { limit: 5, minimumScore: 1 });
    assert(matches.some(({ guide }) => guide.id === expectedId), `Chat retrieval missed ${expectedId}`);
  }

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
