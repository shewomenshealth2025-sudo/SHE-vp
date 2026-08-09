const sources = [
  { title: "NHS — Pregnancy and your choices", url: "https://www.nhs.uk/pregnancy/support/teenage-pregnancy/" },
  { title: "NHS pregnancy advisory service — Positive pregnancy choices", url: "https://www.uhbristol.nhs.uk/patients-and-visitors/your-hospitals/other-services-in-bristol/pregnancy-advisory-service-%E2%80%93-abortion-care/i%27ve-had-a-positive-pregnancy-test-what-are-my-choices/" },
  { title: "HSE — Abortion care and pregnancy support", url: "https://www2.hse.ie/conditions/abortion/" },
];

const specs = [
  ["unplanned-pregnancy-options", "Unplanned Pregnancy: Understanding Your Options", "After a positive pregnancy test, the main paths are continuing the pregnancy and parenting, continuing the pregnancy and exploring adoption, or ending the pregnancy through abortion care."],
  ["continuing-pregnancy-parenting", "Continuing a Pregnancy and Parenting", "Someone considering parenting can begin antenatal care while exploring practical, financial, housing, relationship, education, employment and childcare support."],
  ["adoption-after-unplanned-pregnancy", "Considering Adoption After an Unplanned Pregnancy", "Adoption involves continuing the pregnancy and giving birth before a legal process transfers parental rights and responsibilities to adoptive parents."],
  ["birth-parent-adoption-process", "The Adoption Process for a Birth Parent", "The adoption process involves specialist social-work advice, careful planning, consent and legal safeguards, with exact steps differing across Northern Ireland, Ireland and Great Britain."],
  ["adoption-contact-birth-family", "Adoption and Future Contact With Birth Family", "Contact arrangements after adoption can range from indirect updates to agreed direct contact, depending on the legal plan and the child’s best interests."],
  ["fostering-vs-adoption-pregnancy-options", "Fostering vs Adoption: The Important Difference", "Adoption permanently transfers legal parenthood, while fostering usually provides temporary or longer-term care without automatically ending the birth parents’ legal relationship."],
  ["fostering-not-direct-pregnancy-alternative", "Is Fostering a Pregnancy Option?", "Fostering is generally a child-welfare placement arranged when a child cannot safely live at home, rather than a straightforward permanent alternative chosen during pregnancy."],
  ["kinship-care-after-birth", "Kinship Care and Family Support", "Kinship care means a relative or trusted connected person helps care for a child, with informal and legal arrangements carrying different responsibilities, support and safeguards."],
  ["pregnancy-options-counselling", "Non-Directive Pregnancy Options Counselling", "Pregnancy-options counselling should provide accurate information and space to consider values, safety and circumstances without pressuring someone toward parenting, adoption or abortion."],
  ["antenatal-care-while-deciding", "Antenatal Care While You Are Deciding", "A person can seek confidential pregnancy advice and begin time-sensitive health care while still considering their options; accessing information does not commit them to one path."],
  ["pregnancy-decision-coercion", "Pressure, Coercion and Pregnancy Decisions", "A pregnancy decision should be voluntary: pressure, threats, reproductive control or fear about a partner or family member should be disclosed to a trusted professional for confidential support."],
  ["practical-support-to-continue-pregnancy", "Practical Support When Continuing a Pregnancy", "Concerns about money, housing, work, study, immigration, childcare or safety deserve practical advice so a decision is not made without understanding available support."],
];

function createGuide([id, title, summary]) {
  return {
    id, slug: id, title, category: "Pregnancy options and support", readTime: 8, summary,
    quickFacts: [summary, "No option should be presented as the expected or morally preferred choice.", "Legal processes and available services vary by location, so current local advice is essential."],
    symptoms: ["unexpected positive pregnancy test", "uncertainty about pregnancy options", "practical or emotional pressure", "need for confidential information"],
    causes: ["People consider pregnancy options for many personal, medical, financial, family, safety and life-course reasons.", "Good support explores the person’s priorities and circumstances without assuming why the pregnancy is difficult or unexpected."],
    riskFactors: ["Time pressure, misinformation, coercion, unsafe relationships and lack of practical support can undermine informed decision-making.", "Age, disability, immigration status or financial difficulty should not be used to pressure someone toward a particular outcome."],
    diagnosis: ["A pregnancy test and, when needed, clinical assessment establish pregnancy timing and identify urgent symptoms such as ectopic-pregnancy warning signs.", "Options support should separately assess safety, coercion, emotional wellbeing and immediate practical needs."],
    treatments: ["Support may involve antenatal care and parenting services, specialist adoption advice, or medical or surgical abortion care.", "Fostering and kinship care require separate social-care assessment and should not be described as equivalent to adoption."],
    selfCare: ["Write down what matters most to you and which questions need factual answers before making a decision.", "Use a regulated healthcare, maternity or social-care service rather than an organisation that hides its position or pressures you."],
    whenToSeeGP: ["You have a positive pregnancy test and want confidential information about available care.", "You feel pressured, unsafe, unable to decide or need urgent practical or emotional support."],
    emergencySigns: ["Seek urgent medical help for severe one-sided pain, shoulder-tip pain, collapse, very heavy bleeding or serious illness in pregnancy."],
    sources, clinicalReviewer: null, lastReviewed: "9 August 2026", reviewed: "9 August 2026", version: 1,
  };
}

export const pregnancyOptionsConditions = specs.map(createGuide);

