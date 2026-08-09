import {
  conditions,
  symptoms,
  conditionMap,
  symptomMap,
} from "./database";

/**
 * -----------------------------
 * Basic Getters
 * -----------------------------
 */

export function getCondition(id) {
  return conditionMap[id] ?? null;
}

export function getSymptom(id) {
  return symptomMap[id] ?? null;
}

export function getAllConditions() {
  return conditions;
}

export function getAllSymptoms() {
  return symptoms;
}

/**
 * -----------------------------
 * Relationships
 * -----------------------------
 */

export function getSymptomsForCondition(conditionId) {
  const condition = getCondition(conditionId);

  if (!condition) return [];

  return condition.symptoms
    .map(getSymptom)
    .filter(Boolean);
}

export function getConditionsForSymptom(symptomId) {
  return conditions.filter(condition =>
    condition.symptoms.includes(symptomId)
  );
}

/**
 * -----------------------------
 * Universal Search
 * -----------------------------
 */

export function searchKnowledge(query) {
  if (!query?.trim()) return [];
  const phrase = normaliseSearch(query);
  const tokens = [...new Set([...tokeniseSearch(query), ...expandedSearchTerms(phrase)])];
  const direct = conditions
    .map((condition) => scoreCondition(condition, phrase, tokens))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));

  const resultsById = new Map(direct.map((result) => [result.id, result]));

  direct.slice(0, 12).forEach((result) => {
    (result.data.relatedConditions || []).forEach((relatedId) => {
      if (resultsById.has(relatedId)) return;
      const related = conditionMap[relatedId];
      if (!related) return;
      resultsById.set(relatedId, {
        type: "condition",
        id: related.id,
        title: related.title,
        summary: related.summary,
        data: related,
        score: Math.max(1, result.score * 0.12),
        matchedIn: [`Related to ${result.title}`],
        relationOnly: true,
      });
    });
  });

  const ranked = [...resultsById.values()].sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
  const exact = [];
  const close = [];
  const broader = [];
  const closeThreshold = (ranked[0]?.score || 0) * 0.55;

  ranked.forEach((result) => {
    const title = normaliseSearch(result.title);
    const allTermsInTitle = tokens.length > 0 && tokens.every((token) => title.includes(token));
    if (!result.relationOnly && title === phrase) exact.push({ ...result, tier: "exact" });
    else if (!result.relationOnly && (title.includes(phrase) || allTermsInTitle || result.score >= closeThreshold)) close.push({ ...result, tier: "close" });
    else broader.push({ ...result, tier: "broader" });
  });

  return [
    ...exact.slice(0, 3),
    ...close.slice(0, 12),
    ...broader.slice(0, 6),
  ];
}

const SEARCH_STOP_WORDS = new Set(["a", "an", "and", "are", "for", "how", "i", "in", "is", "it", "of", "on", "the", "to", "what", "with"]);

function expandedSearchTerms(phrase) {
  if (phrase.includes("cycle stage")) return ["follicular", "ovulation", "luteal"];
  if (phrase.includes("egg freezing")) return ["vitrification", "oocyte"];
  return [];
}

function normaliseSearch(value = "") {
  return value.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
}

function tokeniseSearch(value) {
  return normaliseSearch(value).split(" ").filter((token) => (token.length > 2 || /^\d+$/.test(token)) && !SEARCH_STOP_WORDS.has(token));
}

function fieldText(items) {
  return normaliseSearch((items || []).join(" ").replaceAll("-", " "));
}

function scoreCondition(condition, phrase, tokens) {
  const fields = {
    title: normaliseSearch(condition.title),
    category: normaliseSearch(condition.category),
    summary: normaliseSearch(condition.summary),
    symptoms: fieldText(condition.symptoms),
    facts: fieldText(condition.quickFacts),
    causes: fieldText(condition.causes),
    risks: fieldText(condition.riskFactors),
    assessment: fieldText(condition.diagnosis),
    treatment: fieldText(condition.treatments),
    selfCare: fieldText(condition.selfCare),
  };
  let score = 0;
  const matchedIn = new Set();
  const add = (field, label, weight) => {
    if (fields[field].includes(phrase)) { score += weight * 2; matchedIn.add(label); }
    tokens.forEach((token) => {
      if (fields[field].includes(token)) { score += weight; matchedIn.add(label); }
    });
  };
  add("title", "Title", 18);
  add("symptoms", "Symptoms", 10);
  add("category", "Category", 8);
  add("summary", "Overview", 7);
  add("facts", "Key facts", 5);
  add("causes", "Possible causes", 4);
  add("risks", "Risk factors", 4);
  add("assessment", "Assessment", 3);
  add("treatment", "Treatment", 3);
  add("selfCare", "Self-care", 2);
  return { type: "condition", id: condition.id, title: condition.title, summary: condition.summary, data: condition, score, matchedIn: [...matchedIn], relationOnly: false };
}
