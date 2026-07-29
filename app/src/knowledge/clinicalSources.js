export const clinicalSourceMappings = {
  endometriosis: {
    status: "source-reviewed",
    reviewedAt: "2026-07-29",
    nextReviewAt: "2027-01-29",
    reviewerStatus: "Clinical review required before public launch",

    sources: [
      {
        id: "nhs-endometriosis",
        organisationId: "nhs",
        title: "Endometriosis",
        url: "https://www.nhs.uk/conditions/endometriosis/",
        contentRole: [
          "overview",
          "symptoms",
          "diagnosis",
          "treatment",
          "when-to-seek-help",
        ],
      },
      {
        id: "hse-endometriosis-overview",
        organisationId: "hse",
        title: "Endometriosis — overview",
        url: "https://www2.hse.ie/conditions/endometriosis/",
        contentRole: [
          "overview",
          "living-with",
          "care-navigation",
        ],
      },
      {
        id: "hse-endometriosis-symptoms",
        organisationId: "hse",
        title: "Endometriosis symptoms",
        url: "https://www2.hse.ie/conditions/endometriosis/symptoms/",
        contentRole: ["symptoms", "when-to-seek-help"],
      },
      {
        id: "hse-endometriosis-diagnosis",
        organisationId: "hse",
        title: "Endometriosis diagnosis",
        url: "https://www2.hse.ie/conditions/endometriosis/diagnosis/",
        contentRole: ["diagnosis", "tests", "referral"],
      },
      {
        id: "hse-endometriosis-treatment",
        organisationId: "hse",
        title: "Endometriosis treatment",
        url: "https://www2.hse.ie/conditions/endometriosis/treatment/",
        contentRole: ["treatment", "management"],
      },
      {
        id: "nice-endometriosis",
        organisationId: "nice",
        title: "Endometriosis: diagnosis and management",
        url: "https://www.nice.org.uk/guidance/ng73",
        contentRole: [
          "clinical-guidance",
          "diagnosis",
          "referral",
          "management",
        ],
      },
      {
        id: "rcog-endometriosis",
        organisationId: "rcog",
        title: "Endometriosis patient information",
        url: "https://www.rcog.org.uk/for-the-public/browse-our-patient-information/endometriosis/",
        contentRole: [
          "patient-information",
          "diagnosis",
          "treatment",
          "shared-decision-making",
        ],
      },
    ],
  },

  pots: {
    status: "source-reviewed",
    reviewedAt: "2026-07-29",
    nextReviewAt: "2027-01-29",
    reviewerStatus: "Clinical review required before public launch",

    sources: [
      {
        id: "nhs-pots",
        organisationId: "nhs",
        title: "Postural tachycardia syndrome (PoTS)",
        url: "https://www.nhs.uk/conditions/postural-tachycardia-syndrome/",
        contentRole: [
          "overview",
          "symptoms",
          "diagnosis",
          "management",
          "when-to-seek-help",
        ],
      },
      {
        id: "nice-blackouts-assessment",
        organisationId: "nice",
        title: "Blackouts and syncope — assessment",
        url: "https://cks.nice.org.uk/topics/blackouts-syncope/diagnosis/assessment/",
        contentRole: [
          "differential-diagnosis",
          "orthostatic-assessment",
          "clinical-safety",
        ],
      },
    ],
  },
};
