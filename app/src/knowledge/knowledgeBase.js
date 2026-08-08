import {
  learnCategories as legacyCategories,
  learnGuides as legacyGuides,
} from "../data/learnContent";
import { conditions as canonicalConditions } from "../data/knowledge/database";
import { clinicalSourceMappings } from "./clinicalSources";
import { resolveSource } from "./sourceRegistry";

const REQUIRED_PUBLISHABLE_SECTIONS = [
  "overview",
  "symptoms",
  "assessment",
  "treatment",
  "seekHelp",
  "questions",
];

function normaliseArray(value) {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  if (!value) return [];

  return [value].filter(Boolean);
}

function deriveSymptoms(guide) {
  if (guide.symptoms?.length) return guide.symptoms;

  return normaliseArray(guide.tags)
    .filter((tag) => {
      const value = tag.toLowerCase();

      return ![
        guide.title.toLowerCase(),
        guide.categoryLabel?.toLowerCase(),
        "autoimmune",
        "fertility",
      ].includes(value);
    })
    .slice(0, 8);
}

function createGuideRecord(guide) {
  const mappedClinical = clinicalSourceMappings[guide.id];
  const guideSources = normaliseArray(guide.sources);
  const clinical = guideSources.length ? {
    status: guideSources.length ? "source-linked" : "content-draft",
    reviewedAt: guide.lastReviewed ?? guide.reviewed ?? null,
    nextReviewAt: null,
    reviewerStatus: guide.clinicalReviewer ?? "Clinical reviewer to be confirmed",
    sources: guideSources,
  } : mappedClinical ?? {
    status: "content-draft",
    reviewedAt: guide.lastReviewed ?? guide.reviewed ?? null,
    nextReviewAt: null,
    reviewerStatus: guide.clinicalReviewer ?? "Clinical reviewer to be confirmed",
    sources: [],
  };

  const record = {
    ...guide,

    contentVersion: guide.contentVersion ?? "1.0.0",

    overview: guide.overview ?? "",
    symptoms: deriveSymptoms(guide),
    causes: normaliseArray(guide.causes),
    riskFactors: normaliseArray(guide.riskFactors),

    assessment: normaliseArray(
      guide.assessment ?? guide.diagnosis,
    ),

    tests: normaliseArray(guide.tests),

    treatment: normaliseArray(
      guide.treatment ?? guide.treatments,
    ),

    livingWith: normaliseArray(guide.livingWith),

    seekHelp: normaliseArray(guide.seekHelp),

    urgentHelp: normaliseArray(guide.urgentHelp),

    questions: normaliseArray(guide.questions),

    keyPoints: normaliseArray(guide.keyPoints),

    relatedGuideIds: normaliseArray(guide.relatedGuideIds),

    evidence: {
      status: clinical.status,
      reviewedAt: clinical.reviewedAt,
      nextReviewAt: clinical.nextReviewAt,
      reviewerStatus: clinical.reviewerStatus,

      sources: clinical.sources.map((source) =>
        typeof source === "string" ? resolveSource(source) : source,
      ),
    },
  };

  const validation = validateKnowledgeGuide(record);

  return {
    ...record,

    publication: {
      ready: validation.ready,
      missingSections: validation.missingSections,
      issues: validation.issues,
    },
  };
}

export function validateKnowledgeGuide(guide) {
  const missingSections = REQUIRED_PUBLISHABLE_SECTIONS.filter(
    (section) => {
      const value = guide[section];

      if (Array.isArray(value)) {
        return value.length === 0;
      }

      return !value;
    },
  );

  const issues = [];

  if (!guide.evidence?.sources?.length) {
    issues.push("No official clinical sources attached");
  }

  if (!guide.evidence?.reviewedAt) {
    issues.push("No evidence-review date");
  }

  if (guide.evidence?.status !== "source-reviewed") {
    issues.push("Source review is incomplete");
  }

  if (missingSections.length > 0) {
    issues.push(
      `Missing required sections: ${missingSections.join(", ")}`,
    );
  }

  return {
    ready: issues.length === 0,
    missingSections,
    issues,
  };
}

export const learnCategories = legacyCategories;

const legacyById = new Map(legacyGuides.map((guide) => [guide.id, guide]));

function humanise(value = "") {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function conditionToGuide(condition) {
  const legacy = legacyById.get(condition.id) || {};
  const symptoms = normaliseArray(condition.symptoms);

  return {
    ...legacy,
    ...condition,
    categoryLabel: condition.category || legacy.categoryLabel || "Women’s health",
    summary: condition.summary || legacy.summary,
    overview: legacy.overview || condition.summary,
    tags: [
      condition.title,
      condition.category,
      ...symptoms,
      ...normaliseArray(legacy.tags),
    ].filter(Boolean),
    symptoms: symptoms.map(humanise),
    assessment: normaliseArray(condition.diagnosis).length
      ? condition.diagnosis
      : legacy.assessment,
    treatment: normaliseArray(condition.treatments).length
      ? condition.treatments
      : legacy.treatment,
    livingWith: normaliseArray(condition.selfCare).length
      ? condition.selfCare
      : legacy.livingWith,
    seekHelp: normaliseArray(condition.whenToSeeGP).length
      ? condition.whenToSeeGP
      : legacy.seekHelp,
    urgentHelp: normaliseArray(condition.emergencySigns).length
      ? condition.emergencySigns
      : [
          "Symptoms are sudden, severe or rapidly worsening.",
          "You have heavy bleeding with fainting, chest pain, breathing difficulty or feel seriously unwell.",
        ],
    keyPoints: normaliseArray(condition.quickFacts).length
      ? condition.quickFacts
      : legacy.keyPoints,
    questions: normaliseArray(legacy.questions).length
      ? legacy.questions
      : [
          `Could ${condition.title} explain my symptoms?`,
          "What assessment or tests may be appropriate?",
          "Which treatment options fit my circumstances?",
        ],
  };
}

function relationshipScore(left, right) {
  if (left.id === right.id) return -1;

  const leftSymptoms = new Set(normaliseArray(left.symptoms).map((item) => item.toLowerCase()));
  const sharedSymptoms = normaliseArray(right.symptoms).filter((item) =>
    leftSymptoms.has(item.toLowerCase()),
  ).length;
  const sameCategory = left.categoryLabel === right.categoryLabel
    ? 3
    : categoryFamily(left.categoryLabel) === categoryFamily(right.categoryLabel)
      ? 1
      : 0;

  return sameCategory + sharedSymptoms * 2;
}

function categoryFamily(category = "") {
  const value = category.toLowerCase();
  if (/menstrual|gynaec|pelvic|fertility|contracep|sexual|vaginal|screen/.test(value)) return "reproductive";
  if (/pregnan|postpartum|menopause/.test(value)) return "life-stage";
  return "whole-health";
}

const baseGuides = canonicalConditions.map(conditionToGuide).map(createGuideRecord);

export const knowledgeGuides = baseGuides.map((guide) => {
  const relatedGuideIds = baseGuides
    .map((candidate) => ({ id: candidate.id, score: relationshipScore(guide, candidate) }))
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id))
    .slice(0, 5)
    .map((candidate) => candidate.id);

  return {
    ...guide,
    relatedGuideIds,
    relatedConditions: relatedGuideIds,
  };
});

/*
  Backwards-compatible export so the current Learn, Chat,
  Symptoms and Body Explorer features can all consume the
  same knowledge source.
*/
export const learnGuides = knowledgeGuides;

export function getGuideById(id) {
  return knowledgeGuides.find((guide) => guide.id === id);
}

export function getCategoryById(id) {
  return learnCategories.find((category) => category.id === id);
}

export function getPublishableGuides() {
  return knowledgeGuides.filter(
    (guide) => guide.publication.ready,
  );
}

export function getDraftGuides() {
  return knowledgeGuides.filter(
    (guide) => !guide.publication.ready,
  );
}

export function getKnowledgeStats() {
  return {
    total: knowledgeGuides.length,

    sourceReviewed: knowledgeGuides.filter(
      (guide) =>
        guide.evidence.status === "source-reviewed",
    ).length,

    publicationReady: knowledgeGuides.filter(
      (guide) => guide.publication.ready,
    ).length,

    drafts: knowledgeGuides.filter(
      (guide) => !guide.publication.ready,
    ).length,
  };
}
