import {
  endometriosis,
  pcos,
  adenomyosis,
  fibroids,
  pmdd,
  pms,
  ovarianCysts,
  pelvicInflammatoryDisease,
  perimenopause,
  menopause,
  vaginismus,
  lupus,
  rheumatoidArthritis,
  hashimotosThyroiditis,
  hypothyroidism,
  migraine,
  ironDeficiencyAnaemia,
  osteoporosis,
  coeliacDisease,
} from "./conditions";

import { pelvicPain } from "./symptoms";
import { expandedConditions } from "./conditions/expandedConditions";
import { additionalConditions } from "./conditions/additionalConditions";
import { applyCauseRiskProfiles } from "./causeRiskProfiles";
import { nicheConditions } from "./conditions/nicheConditions";
import { categoryExpansionConditions } from "./conditions/categoryExpansionConditions";
import { abortionCareConditions } from "./conditions/abortionCareConditions";
import { pregnancyOptionsConditions } from "./conditions/pregnancyOptionsConditions";
import { hospitalNavigationConditions } from "./conditions/hospitalNavigationConditions";
import { autoimmuneConditions } from "./conditions/autoimmuneConditions";
import { ivfConditions } from "./conditions/ivfConditions";
import { fertilityPreservationConditions } from "./conditions/fertilityPreservationConditions";
import { missingTopicsConditions } from "./conditions/missingTopicsConditions";
import { relatedProductsFor } from "./productLinks";

const baseConditions = applyCauseRiskProfiles([
  endometriosis,
  pcos,
  adenomyosis,
  fibroids,
  pmdd,
  pms,
  ovarianCysts,
  pelvicInflammatoryDisease,
  perimenopause,
  menopause,
  vaginismus,
  lupus,
  rheumatoidArthritis,
  hashimotosThyroiditis,
  hypothyroidism,
  migraine,
  ironDeficiencyAnaemia,
  osteoporosis,
  coeliacDisease,
  ...expandedConditions,
  ...additionalConditions,
  ...nicheConditions,
  ...categoryExpansionConditions,
  ...abortionCareConditions,
  ...pregnancyOptionsConditions,
  ...hospitalNavigationConditions,
  ...autoimmuneConditions,
  ...ivfConditions,
  ...fertilityPreservationConditions,
  ...missingTopicsConditions,
]);

function relationshipScore(left, right) {
  if (left.id === right.id) return -1;
  const leftSymptoms = new Set((left.symptoms || []).map((item) => item.toLowerCase()));
  const sharedSymptoms = (right.symptoms || []).filter((item) => leftSymptoms.has(item.toLowerCase())).length;
  const sameFamily = categoryFamily(left.category) === categoryFamily(right.category) ? 1 : 0;
  return (left.category === right.category ? 3 : sameFamily) + sharedSymptoms * 2;
}

function categoryFamily(category = "") {
  const value = category.toLowerCase();
  if (/menstrual|gynaec|pelvic|fertility|contracep|sexual|vaginal|screen/.test(value)) return "reproductive";
  if (/pregnan|postpartum|menopause/.test(value)) return "life-stage";
  return "whole-health";
}

export const conditions = baseConditions.map((condition) => ({
  ...condition,
  relatedProductIds: relatedProductsFor(condition),
  relatedConditions: baseConditions
    .map((candidate) => ({ id: candidate.id, score: relationshipScore(condition, candidate) }))
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id))
    .slice(0, 5)
    .map((candidate) => candidate.id),
}));

export const symptoms = [
  pelvicPain,
];

export const conditionMap = Object.fromEntries(
  conditions.map((condition) => [condition.id, condition])
);

export const symptomMap = Object.fromEntries(
  symptoms.map((symptom) => [symptom.id, symptom])
);

export default {
  conditions,
  symptoms,
  conditionMap,
  symptomMap,
};
