export const symptomGroups = [
  {
    id: "head-neurological",
    name: "Head & neurological",
    bodyArea: "head",
    icon: "Brain",
    description:
      "Headaches, cognitive symptoms, sensation changes and balance.",
    symptoms: [
      {
        id: "migraine-headache",
        name: "Headache or migraine",
        searchTerms: "headache migraine aura nausea hormones",
      },
      {
        id: "brain-fog",
        name: "Brain fog",
        searchTerms: "brain fog concentration cognitive fatigue POTS ME CFS",
      },
      {
        id: "numbness-tingling",
        name: "Numbness or tingling",
        searchTerms:
          "numbness tingling altered sensation multiple sclerosis neurological",
      },
      {
        id: "vision-changes",
        name: "Vision changes",
        searchTerms: "vision visual changes migraine multiple sclerosis",
      },
    ],
  },
  {
    id: "heart-circulation",
    name: "Heart & circulation",
    bodyArea: "chest",
    icon: "Activity",
    description:
      "Dizziness, fainting, palpitations and symptoms related to standing.",
    symptoms: [
      {
        id: "dizziness-standing",
        name: "Dizziness when standing",
        searchTerms:
          "dizziness standing orthostatic POTS fainting heart racing",
      },
      {
        id: "palpitations",
        name: "Heart racing or palpitations",
        searchTerms:
          "heart racing palpitations tachycardia POTS iron deficiency",
      },
      {
        id: "fainting",
        name: "Fainting or near-fainting",
        searchTerms: "fainting dizziness POTS low blood pressure",
      },
      {
        id: "breathlessness",
        name: "Breathlessness",
        searchTerms:
          "breathlessness iron deficiency anaemia weakness heart",
      },
    ],
  },
  {
    id: "pelvis-periods",
    name: "Pelvis & periods",
    bodyArea: "pelvis",
    icon: "Flower2",
    description:
      "Period pain, pelvic pain, bleeding and reproductive symptoms.",
    symptoms: [
      {
        id: "painful-periods",
        name: "Painful periods",
        searchTerms:
          "painful periods cramping pelvic pain endometriosis adenomyosis",
      },
      {
        id: "heavy-periods",
        name: "Heavy bleeding",
        searchTerms:
          "heavy periods bleeding iron deficiency adenomyosis fibroids",
      },
      {
        id: "persistent-pelvic-pain",
        name: "Persistent pelvic pain",
        searchTerms:
          "pelvic pain endometriosis adenomyosis fibroids",
      },
      {
        id: "irregular-periods",
        name: "Irregular or absent periods",
        searchTerms:
          "irregular periods absent periods PCOS PMOS perimenopause ovulation",
      },
      {
        id: "pain-during-sex",
        name: "Pain during sex",
        searchTerms: "pain during sex pelvic pain endometriosis",
      },
    ],
  },
  {
    id: "joints-immune",
    name: "Joints & immune health",
    bodyArea: "joints",
    icon: "ShieldPlus",
    description:
      "Joint pain, swelling, rashes, dryness and immune-related symptoms.",
    symptoms: [
      {
        id: "joint-pain",
        name: "Joint pain or stiffness",
        searchTerms:
          "joint pain stiffness lupus rheumatoid arthritis Sjögren autoimmune",
      },
      {
        id: "joint-swelling",
        name: "Joint swelling",
        searchTerms:
          "joint swelling inflammation rheumatoid arthritis autoimmune",
      },
      {
        id: "rash",
        name: "Unexplained rashes",
        searchTerms: "rash skin rash lupus autoimmune",
      },
      {
        id: "dryness",
        name: "Persistent dry eyes or mouth",
        searchTerms: "dry eyes dry mouth Sjögren autoimmune",
      },
    ],
  },
  {
    id: "whole-body",
    name: "Whole-body symptoms",
    bodyArea: "whole",
    icon: "HeartPulse",
    description:
      "Fatigue, temperature changes, weakness and widespread symptoms.",
    symptoms: [
      {
        id: "fatigue",
        name: "Persistent fatigue",
        searchTerms:
          "fatigue tired exhausted iron deficiency thyroid autoimmune lupus POTS ME CFS",
      },
      {
        id: "cold",
        name: "Feeling unusually cold",
        searchTerms:
          "cold thyroid Hashimoto iron deficiency fatigue",
      },
      {
        id: "weakness",
        name: "Weakness or low energy",
        searchTerms:
          "weakness fatigue iron deficiency autoimmune thyroid",
      },
      {
        id: "post-exertional",
        name: "Symptoms worsening after activity",
        searchTerms:
          "post exertional worsening activity ME CFS fatigue POTS",
      },
    ],
  },
  {
    id: "digestive",
    name: "Digestive health",
    bodyArea: "abdomen",
    icon: "Stethoscope",
    description:
      "Bloating, digestive symptoms and possible nutrition problems.",
    symptoms: [
      {
        id: "bloating",
        name: "Persistent bloating",
        searchTerms:
          "bloating digestive coeliac pelvic pain endometriosis",
      },
      {
        id: "digestive-changes",
        name: "Persistent digestive changes",
        searchTerms:
          "digestive coeliac gluten bloating iron deficiency",
      },
      {
        id: "nutrient-deficiency",
        name: "Unexplained nutrient deficiencies",
        searchTerms:
          "iron deficiency coeliac absorption fatigue anaemia",
      },
    ],
  },
];

export const bodyAreas = [
  {
    id: "head",
    label: "Head",
    description: "Headache, vision, sensation and concentration",
  },
  {
    id: "chest",
    label: "Chest & heart",
    description: "Heart rate, dizziness, fainting and breathlessness",
  },
  {
    id: "abdomen",
    label: "Abdomen",
    description: "Digestion, bloating and nutrient absorption",
  },
  {
    id: "pelvis",
    label: "Pelvis",
    description: "Periods, bleeding, pelvic pain and fertility",
  },
  {
    id: "joints",
    label: "Joints",
    description: "Pain, stiffness, swelling and inflammation",
  },
  {
    id: "whole",
    label: "Whole body",
    description: "Fatigue, weakness and widespread symptoms",
  },
];

export function getSymptomById(id) {
  for (const group of symptomGroups) {
    const symptom = group.symptoms.find((item) => item.id === id);

    if (symptom) {
      return {
        ...symptom,
        group,
      };
    }
  }

  return null;
}
