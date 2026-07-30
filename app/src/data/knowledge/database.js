import { endometriosis } from "./conditions";
import { pelvicPain } from "./symptoms";

export const conditions = [
  endometriosis,
];

export const symptoms = [
  pelvicPain,
];
export const conditionMap = Object.fromEntries(
  conditions.map(condition => [condition.id, condition])
);

export const symptomMap = Object.fromEntries(
  symptoms.map(symptom => [symptom.id, symptom])
);export default {
  conditions,
  symptoms,
  conditionMap,
  symptomMap,
};