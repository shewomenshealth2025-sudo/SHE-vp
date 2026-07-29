import {
  learnCategories as legacyCategories,
  learnGuides as legacyGuides,
} from "../data/learnContent";
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
  const clinical = clinicalSourceMappings[guide.id] ?? {
    status: "content-draft",
    reviewedAt: null,
    nextReviewAt: null,
    reviewerStatus:
      "Sources and clinical review required before public launch",
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

      sources: clinical.sources.map(resolveSource),
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

export const knowledgeGuides = legacyGuides.map(createGuideRecord);

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
