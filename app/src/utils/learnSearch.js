import { learnGuides } from "../knowledge/knowledgeBase.js";

const STOP_WORDS = new Set([
  "a",
  "about",
  "am",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "because",
  "been",
  "but",
  "can",
  "could",
  "do",
  "does",
  "for",
  "from",
  "have",
  "having",
  "how",
  "i",
  "in",
  "is",
  "it",
  "me",
  "my",
  "of",
  "on",
  "or",
  "should",
  "that",
  "the",
  "these",
  "this",
  "to",
  "what",
  "when",
  "why",
  "with",
]);

const PHRASE_EXPANSIONS = {
  "heart racing": ["palpitations", "tachycardia", "POTS"],
  "racing heart": ["palpitations", "tachycardia", "POTS"],
  "when i stand": ["standing", "orthostatic", "POTS", "dizziness"],
  "standing up": ["standing", "orthostatic", "POTS", "dizziness"],
  "feel faint": ["fainting", "dizziness", "POTS", "iron deficiency"],
  "nearly faint": ["fainting", "dizziness", "POTS"],
  "brain fog": ["cognitive", "fatigue", "POTS", "ME", "CFS"],
  "painful periods": ["endometriosis", "adenomyosis", "pelvic pain"],
  "bad periods": ["painful periods", "heavy periods", "endometriosis"],
  "heavy bleeding": ["heavy periods", "iron deficiency", "adenomyosis", "fibroids"],
  "very tired": ["fatigue", "iron deficiency", "thyroid", "autoimmune"],
  "always tired": ["fatigue", "iron deficiency", "thyroid", "autoimmune"],
  "joint pain": ["lupus", "rheumatoid arthritis", "Sjögren"],
  "dry eyes": ["Sjögren", "autoimmune"],
  "dry mouth": ["Sjögren", "autoimmune"],
  "cold all the time": ["thyroid", "Hashimoto", "iron deficiency"],
  "trying to conceive": ["fertility", "PCOS", "ovulation"],
  "irregular cycle": ["irregular periods", "PCOS", "perimenopause"],
};

const SYNONYM_GROUPS = [
  ["tired", "fatigue", "exhausted", "weakness", "low energy"],
  ["dizzy", "dizziness", "lightheaded", "faint", "fainting"],
  ["palpitations", "heart racing", "racing heart", "tachycardia"],
  ["period pain", "painful periods", "cramps", "cramping"],
  ["heavy periods", "heavy bleeding", "flooding"],
  ["stomach", "abdominal", "abdomen", "digestive"],
  ["brain fog", "concentration", "cognitive"],
  ["pins and needles", "numbness", "tingling", "altered sensation"],
  ["rash", "skin rash", "skin changes"],
  ["swollen joints", "joint swelling", "inflammation"],
  ["hot flushes", "hot flashes", "temperature changes"],
];

function normalise(value = "") {
  return value
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9\s/-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenise(value = "") {
  return normalise(value)
    .split(" ")
    .filter((token) => (/^\d+$/.test(token) || token.length > 2) && !STOP_WORDS.has(token));
}

function expandQuery(query) {
  const normalised = normalise(query);
  const expanded = new Set(tokenise(normalised));

  Object.entries(PHRASE_EXPANSIONS).forEach(([phrase, additions]) => {
    if (normalised.includes(normalise(phrase))) {
      additions.forEach((addition) => {
        tokenise(addition).forEach((token) => expanded.add(token));
      });
    }
  });

  SYNONYM_GROUPS.forEach((group) => {
    const groupTokens = group.flatMap(tokenise);
    const matchesGroup = groupTokens.some((token) => expanded.has(token));

    if (matchesGroup) {
      groupTokens.forEach((token) => expanded.add(token));
    }
  });

  return [...expanded];
}

function createSearchFields(guide) {
  return {
    title: normalise(`${guide.title} ${guide.subtitle || ""}`),
    tags: normalise((guide.tags || []).join(" ")),
    summary: normalise(guide.summary),
    overview: normalise(guide.overview),
    category: normalise(guide.categoryLabel),
    keyPoints: normalise((guide.keyPoints || []).join(" ")),
    seekHelp: normalise((guide.seekHelp || []).join(" ")),
    questions: normalise((guide.questions || []).join(" ")),
  };
}

function phraseMatchScore(query, fields) {
  const normalisedQuery = normalise(query);
  let score = 0;

  if (!normalisedQuery) return score;

  if (fields.title.includes(normalisedQuery)) score += 24;
  if (fields.tags.includes(normalisedQuery)) score += 16;
  if (fields.summary.includes(normalisedQuery)) score += 10;
  if (fields.overview.includes(normalisedQuery)) score += 8;
  if (fields.keyPoints.includes(normalisedQuery)) score += 6;

  return score;
}

export function scoreGuide(query, guide) {
  const fields = createSearchFields(guide);
  const tokens = expandQuery(query);

  let score = phraseMatchScore(query, fields);
  const matches = [];

  tokens.forEach((token) => {
    let tokenScore = 0;

    if (fields.title.includes(token)) tokenScore += 12;
    if (fields.tags.includes(token)) tokenScore += 9;
    if (fields.category.includes(token)) tokenScore += 6;
    if (fields.summary.includes(token)) tokenScore += 5;
    if (fields.overview.includes(token)) tokenScore += 4;
    if (fields.keyPoints.includes(token)) tokenScore += 4;
    if (fields.seekHelp.includes(token)) tokenScore += 3;
    if (fields.questions.includes(token)) tokenScore += 2;

    if (tokenScore > 0) {
      matches.push(token);
      score += tokenScore;
    }
  });

  if (matches.length >= 2) score += 8;
  if (matches.length >= 3) score += 10;

  return {
    guide,
    score,
    matches: [...new Set(matches)],
  };
}

export function retrieveKnowledge(
  query,
  {
    limit = 4,
    minimumScore = 5,
    category = null,
  } = {},
) {
  const ranked = learnGuides
    .filter((guide) => !category || guide.category === category)
    .map((guide) => scoreGuide(query, guide))
    .filter((result) => result.score >= minimumScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return ranked;
}

export function searchGuides(query, options = {}) {
  return retrieveKnowledge(query, options).map((result) => result.guide);
}

export function getGuideSearchText(guide) {
  return [
    guide.title,
    guide.subtitle,
    guide.categoryLabel,
    guide.summary,
    guide.overview,
    ...(guide.tags || []),
    ...(guide.keyPoints || []),
    ...(guide.seekHelp || []),
    ...(guide.questions || []),
  ]
    .filter(Boolean)
    .join(" ");
}
