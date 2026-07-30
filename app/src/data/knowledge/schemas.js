/**
 * SHE Knowledge Engine Schemas
 *
 * These are documentation templates describing the structure
 * each knowledge object should follow.
 */

export const ConditionSchema = {
  id: "",
  slug: "",
  title: "",
  category: "",

  readTime: 0,

  summary: "",

  quickFacts: [],

  symptoms: [],
  causes: [],
  riskFactors: [],

  diagnosis: [],
  treatments: [],

  selfCare: [],

  whenToSeeGP: [],
  emergencySigns: [],

  relatedSymptoms: [],
  relatedConditions: [],
  relatedTests: [],
  relatedTreatments: [],
  relatedServices: [],
  relatedProducts: [],

  sources: [],

  reviewed: "",
  version: 1
};

export const SymptomSchema = {
  id: "",
  slug: "",
  title: "",

  summary: "",

  possibleConditions: [],

  emergencySigns: [],

  whenToSeeGP: [],

  relatedServices: [],
  relatedProducts: [],
  relatedTests: [],

  sources: []
};

export const AnatomySchema = {
  id: "",
  slug: "",
  title: "",

  description: "",

  relatedConditions: [],
  relatedSymptoms: [],
  relatedTests: [],
  relatedServices: []
};

export const TestSchema = {
  id: "",
  slug: "",
  title: "",

  description: "",

  whyItsDone: [],

  preparation: [],

  results: [],

  relatedConditions: []
};

export const TreatmentSchema = {
  id: "",
  slug: "",
  title: "",

  type: "",

  description: "",

  benefits: [],
  risks: [],
  sideEffects: [],

  suitableFor: [],

  relatedConditions: []
};

export const LifeStageSchema = {
  id: "",
  slug: "",
  title: "",

  description: "",

  commonConditions: [],
  commonSymptoms: [],

  recommendedScreening: [],

  keyHealthChecks: []
};