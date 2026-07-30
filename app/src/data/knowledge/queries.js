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

  const search = query.toLowerCase().trim();

  const results = [];

  // Search Conditions
  conditions.forEach(condition => {
    const searchable = [
      condition.title,
      condition.summary,
      ...(condition.quickFacts || [])
    ]
      .join(" ")
      .toLowerCase();

    if (searchable.includes(search)) {
      results.push({
        type: "condition",
        id: condition.id,
        title: condition.title,
        summary: condition.summary,
        data: condition,
      });
    }
  });

  // Search Symptoms
  symptoms.forEach(symptom => {
    const searchable = [
      symptom.title,
      symptom.summary,
    ]
      .join(" ")
      .toLowerCase();

    if (searchable.includes(search)) {
      results.push({
        type: "symptom",
        id: symptom.id,
        title: symptom.title,
        summary: symptom.summary,
        data: symptom,
      });
    }
  });

  return results.sort((a, b) =>
    a.title.localeCompare(b.title)
  );
}