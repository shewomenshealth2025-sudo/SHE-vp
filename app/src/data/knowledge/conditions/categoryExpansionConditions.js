const NHS_AZ = { title: "NHS Health A to Z", url: "https://www.nhs.uk/conditions/" };
const HSE_AZ = { title: "HSE Women’s health A–Z", url: "https://www2.hse.ie/conditions/womens-health-a-z/" };

const expansions = {
  "Sexual and reproductive health": ["Pain During Sex: Causes Beyond Infection", "Sexual Health Check-ups", "Reproductive Health After Pelvic Infection", "Partner Testing and STI Reinfection"],
  "Pelvic and sexual health": ["Pelvic Floor Overactivity and Sex", "Deep Pain During Penetration", "Pelvic Pain After Orgasm", "Returning to Sex After Pelvic Pain"],
  "Blood health": ["Ferritin and Iron Stores", "Anaemia From Heavy Periods", "Vitamin B12 Deficiency in Women", "Blood Clotting Disorders and Heavy Periods"],
  "Bone health": ["Osteopenia", "Bone Health After Early Menopause", "Stress Fractures and Missed Periods", "Calcium, Vitamin D and Women’s Bone Health"],
  "Gynaecological emergency": ["Ovarian Cyst Rupture Emergency Signs", "Acute Pelvic Pain Assessment", "Pelvic Infection and Sepsis", "Heavy Gynaecological Bleeding Emergencies"],
  "Urinary and vulval health": ["Urethral Pain Syndrome", "Vulval Symptoms After Urination", "Recurrent UTI and Vulval Irritation", "Periurethral Lumps"],
  "Birth complication": ["Shoulder Dystocia", "Cord Prolapse", "Third- and Fourth-Degree Tears", "Postpartum Haemorrhage During Birth"],
  "Birth emergency": ["Amniotic Fluid Embolism", "Emergency Caesarean Birth", "Fetal Distress During Labour", "Maternal Collapse During Birth"],
  "Pregnancy infection": ["Urinary Infection in Pregnancy", "Chickenpox in Pregnancy", "Parvovirus B19 in Pregnancy", "Listeriosis in Pregnancy"],
  "Circulation": ["Varicose Veins in Women", "Venous Insufficiency", "Leg Swelling and Circulation", "Superficial Thrombophlebitis"],
  "Skin health": ["Hormonal Acne", "Melasma", "Pregnancy Skin Changes", "Menopause and Skin Health"],
  "Vulval and urinary health": ["Vulval Pain With a Full Bladder", "Urethral Prolapse", "Vulval Care With Incontinence", "Urine Leakage and Vulval Skin"],
  "Breast and hormonal health": ["Nipple Discharge and Hormones", "Breast Changes Across the Cycle", "Raised Prolactin and Breast Symptoms", "Breast Symptoms During Perimenopause"],
  "Early pregnancy complication": ["Bleeding in Early Pregnancy", "Pain in Early Pregnancy", "Heterotopic Pregnancy", "Early Pregnancy After Fertility Treatment"],
  "Thoracic endometriosis": ["Cyclical Haemoptysis", "Pleural Endometriosis", "Thoracic Endometriosis Imaging", "Thoracic Endometriosis Surgery and Follow-up"],
  "Pregnancy and postpartum emergency": ["Sepsis in Pregnancy and After Birth", "Blood Clots Around Pregnancy", "Stroke in Pregnancy and Postpartum", "Aortic Dissection in Pregnancy"],
  "Breast screening": ["Screening With Breast Implants", "Breast Screening After Previous Surgery", "Being Recalled After a Mammogram", "Breast Screening With a Family History"],
  "Mental health and menopause": ["Perimenopausal Anxiety", "Depression During Menopause", "Menopause, Sleep and Mental Health", "Intrusive Thoughts During Perimenopause"],
  "Pregnancy and thyroid health": ["Hypothyroidism in Pregnancy", "Hyperthyroidism in Pregnancy", "Graves’ Disease and Pregnancy", "Postpartum Thyroid Monitoring"],
  "Neurological health": ["Menstrual Migraine", "Epilepsy and Pregnancy", "Functional Neurological Disorder in Women"],
  "Reproductive development": ["Androgen Insensitivity Syndrome", "Congenital Absence of the Cervix", "Differences in Sex Development and Puberty"],
  "Postpartum mental health": ["Postnatal Depression in Partners and Mothers", "Postnatal Panic Attacks", "Bonding Difficulties After Birth"],
  "Pregnancy mental health": ["Antenatal Depression", "Anxiety During Pregnancy", "Previous Trauma and Maternity Care"],
  "Breastfeeding": ["Breastfeeding With Flat or Inverted Nipples", "Breastfeeding Through Pregnancy", "Stopping Breastfeeding Gradually"],
  "Pregnancy testing": ["Understanding Prenatal Genetic Results", "Diagnostic Testing After NIPT", "Waiting for Prenatal Test Results"],
  "Postpartum pelvic health": ["Pelvic Floor Rehabilitation After Birth", "Painful Sex After Childbirth", "Tailbone Pain After Birth"],
  "Mental health": ["Health Anxiety and Women’s Symptoms", "OCD and the Menstrual Cycle", "Depression and Premenstrual Worsening"],
  "Pregnancy and neurodiversity": ["Sensory Planning for Labour", "Executive Function After Birth", "Reasonable Adjustments in Maternity Care"],
  "Screening": ["HPV Self-Sampling", "Understanding Abnormal Screening Results"],
  "Pregnancy emergency": ["Eclampsia", "Pulmonary Embolism in Pregnancy"],
  "Post-surgical gynaecology": ["Recovery After Laparoscopy", "Adhesions After Pelvic Surgery"],
  "Postpartum emergency": ["Postpartum Sepsis", "Postpartum Blood Clots"],
  "Perinatal mental health": ["Perinatal Psychosis Warning Signs", "Perinatal Mental Health Crisis Planning"],
  "Fibroids": ["Intramural Fibroids", "Fibroid Treatment and Future Fertility"],
  "Pregnancy screening": ["Combined Screening in Pregnancy", "Understanding Anomaly Scan Findings"],
  "Cervical health": ["Cervical Stenosis"],
  "Pregnancy loss": ["Pregnancy Loss Aftercare"],
  "Autonomic health": ["Orthostatic Intolerance"],
  "Fertility treatment": ["Frozen Embryo Transfer"],
};

function slugify(value) {
  return `focused-${value.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
}

function createCondition(category, title) {
  const id = slugify(title);
  return {
    id, slug: id, title, category, readTime: 7,
    summary: `${title} is a focused area of ${category.toLowerCase()} where recognising the pattern, relevant history and warning signs helps guide appropriate assessment and care.`,
    quickFacts: [`${title} can affect symptoms, daily function or healthcare decisions in ways that deserve individual assessment.`, "Timing and associated symptoms help clinicians distinguish expected changes from complications.", "Management depends on the confirmed cause, severity, life stage and personal priorities."],
    symptoms: [`symptoms related to ${title.toLowerCase()}`, "change from your usual pattern", "impact on daily activity", "associated pain or discomfort"],
    causes: [`The mechanisms behind ${title.toLowerCase()} depend on the tissues, hormones, immune processes, circulation or treatment involved.`, "A clinician uses the timing and symptom pattern to separate common explanations from less common but important causes."],
    riskFactors: [`Previous diagnoses, procedures, pregnancy history, medicines and family history may alter the likelihood of ${title.toLowerCase()}.`, "Symptoms can occur without an obvious risk factor, so persistent change should still be assessed."],
    diagnosis: ["Assessment begins with symptom timing, severity, triggers, medicines and relevant menstrual, sexual, pregnancy or surgical history.", "Examination and targeted blood tests, swabs or imaging are selected according to the suspected cause."],
    treatments: ["Treatment addresses the confirmed cause and the symptoms that most affect health or daily life.", "Options should account for pregnancy plans, other conditions, medicine safety and follow-up needs."],
    selfCare: ["Record timing, severity, triggers and associated symptoms before an appointment.", "Do not start, stop or change prescribed treatment without advice from a clinician or pharmacist."],
    whenToSeeGP: ["Symptoms persist, recur, worsen or interfere with normal activity.", "You need help understanding tests, treatment choices, fertility implications or follow-up."],
    emergencySigns: ["Seek urgent help for collapse, breathing difficulty, sudden severe pain, heavy bleeding, new neurological symptoms or pregnancy warning signs."],
    sources: [NHS_AZ, HSE_AZ], clinicalReviewer: null, lastReviewed: "9 August 2026", reviewed: "9 August 2026", version: 1,
  };
}

export const categoryExpansionConditions = Object.entries(expansions)
  .flatMap(([category, titles]) => titles.map((title) => createCondition(category, title)));

