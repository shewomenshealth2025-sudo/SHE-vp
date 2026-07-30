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
} from "./conditions";

import { pelvicPain } from "./symptoms";

export const conditions = [
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
];

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