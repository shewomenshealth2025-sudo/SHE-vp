const SOURCES = {
  nhs: { title: "NHS Health A to Z", url: "https://www.nhs.uk/conditions/" },
  periods: { title: "NHS — Periods", url: "https://www.nhs.uk/conditions/periods/" },
  pregnancy: { title: "NHS — Pregnancy guide", url: "https://www.nhs.uk/pregnancy/" },
  menopause: { title: "NHS — Menopause and perimenopause", url: "https://www.nhs.uk/conditions/menopause-and-perimenopause/" },
  hse: { title: "HSE — Women’s health A–Z", url: "https://www2.hse.ie/conditions/womens-health-a-z/" },
  hsePregnancy: { title: "HSE — Pregnancy and birth", url: "https://www2.hse.ie/pregnancy-birth/" },
  hseSexual: { title: "HSE — Sexual health", url: "https://www2.hse.ie/conditions/sexual-health/" },
};

const specs = [
  ["period-pain", "Period Pain", "Menstrual health", "Cramping around a period is common, but pain that disrupts normal life deserves assessment.", ["painful-periods", "pelvic-pain", "nausea"], "Sudden severe pain, fainting or pain with a possible pregnancy.", "periods"],
  ["irregular-periods", "Irregular Periods", "Menstrual health", "Cycle length can vary, but persistent changes may relate to pregnancy, stress, hormones, medicines or health conditions.", ["irregular-periods", "missed-periods", "unexpected-bleeding"], "Very heavy bleeding, severe pain, fainting or suspected pregnancy complications.", "periods"],
  ["missed-periods", "Missed or Late Periods", "Menstrual health", "A late period has many possible causes, including pregnancy, stress, weight change, exercise, perimenopause and PCOS.", ["missed-periods", "cycle-changes", "pelvic-pain"], "Severe one-sided pain, shoulder-tip pain, dizziness or bleeding with a possible pregnancy.", "periods"],
  ["bleeding-between-periods", "Bleeding Between Periods", "Menstrual health", "Bleeding between periods should be discussed with a clinician, particularly when it is new or recurring.", ["unexpected-bleeding", "pelvic-pain", "bleeding-after-sex"], "Heavy bleeding with weakness, fainting, severe pain or pregnancy.", "nhs"],
  ["bleeding-after-sex", "Bleeding After Sex", "Menstrual health", "Post-coital bleeding can have several causes and should be assessed if it persists or recurs.", ["bleeding-after-sex", "vaginal-dryness", "pelvic-pain"], "Heavy bleeding, severe pain, faintness or symptoms after sexual assault.", "nhs"],
  ["periods-starting", "Starting Periods", "Menstrual health", "A practical guide to early cycles, period products and changes that deserve support.", ["first-period", "irregular-periods", "period-pain"], "Bleeding that soaks products rapidly with dizziness or fainting.", "periods"],
  ["period-diarrhoea", "Bowel Changes Around Periods", "Menstrual health", "Hormonal changes can affect the bowel, but severe cyclical symptoms may need investigation.", ["diarrhoea", "constipation", "pelvic-pain"], "Blood in stool, black stool, severe dehydration or sudden intense abdominal pain.", "nhs"],
  ["menstrual-migraine", "Menstrual Migraine", "Menstrual health", "Migraine attacks can cluster before or during periods and benefit from pattern tracking and tailored treatment.", ["migraine", "nausea", "light-sensitivity"], "A sudden worst-ever headache, weakness, confusion, seizure or loss of vision.", "nhs"],

  ["ovarian-torsion", "Ovarian Torsion", "Gynaecological", "Ovarian torsion is twisting of an ovary and is a time-sensitive medical emergency.", ["sudden-pelvic-pain", "nausea", "vomiting"], "Sudden severe one-sided pelvic pain, especially with vomiting, requires emergency assessment.", "nhs"],
  ["ectopic-pregnancy", "Ectopic Pregnancy", "Gynaecological", "An ectopic pregnancy develops outside the uterus and can become life-threatening if it ruptures.", ["one-sided-pain", "vaginal-bleeding", "shoulder-tip-pain"], "Call emergency services for severe pain, collapse, fainting or shoulder-tip pain with possible pregnancy.", "pregnancy"],
  ["vulvodynia", "Vulvodynia", "Gynaecological", "Vulvodynia is persistent vulval pain without a single clear cause and often needs multidisciplinary care.", ["vulval-pain", "burning", "pain-during-sex"], "Sudden swelling, severe infection symptoms, inability to pass urine or rapidly worsening pain.", "nhs"],
  ["bartholins-cyst", "Bartholin’s Cyst", "Gynaecological", "A blocked Bartholin’s gland can form a lump near the vaginal opening and may become infected.", ["vulval-lump", "pain", "swelling"], "Rapidly increasing pain, fever, spreading redness or feeling very unwell.", "nhs"],
  ["uterine-polyps", "Uterine Polyps", "Gynaecological", "Uterine polyps are growths from the womb lining that can contribute to irregular or heavy bleeding.", ["heavy-periods", "unexpected-bleeding", "bleeding-after-menopause"], "Heavy bleeding with faintness, chest pain or shortness of breath.", "nice"],
  ["endometrial-hyperplasia", "Endometrial Hyperplasia", "Gynaecological", "Endometrial hyperplasia is thickening of the womb lining that requires assessment and follow-up.", ["unexpected-bleeding", "heavy-periods", "bleeding-after-menopause"], "Uncontrolled bleeding, fainting or severe worsening pelvic pain.", "nice"],
  ["pelvic-organ-prolapse", "Pelvic Organ Prolapse", "Pelvic health", "Prolapse occurs when pelvic organs descend and may cause pressure, a bulge or bladder and bowel symptoms.", ["vaginal-bulge", "pelvic-pressure", "bladder-symptoms"], "Inability to pass urine, severe pain or tissue that becomes dark, injured or cannot be reduced.", "nhs"],
  ["pelvic-floor-dysfunction", "Pelvic Floor Dysfunction", "Pelvic health", "Pelvic-floor muscles can be weak, overactive or poorly coordinated, affecting bladder, bowel, pain and sexual function.", ["pelvic-pain", "bladder-leaks", "constipation"], "New loss of bladder or bowel control with numbness or leg weakness.", "nhs"],

  ["ovulation", "Understanding Ovulation", "Fertility", "Ovulation timing varies and apps or tests can estimate a fertile window without confirming fertility.", ["cycle-changes", "ovulation-pain", "cervical-mucus"], "Severe one-sided pain, fainting or symptoms of ectopic pregnancy.", "periods"],
  ["ovulation-pain", "Ovulation Pain", "Fertility", "Some people notice brief one-sided pain around ovulation, but persistent or severe pain needs assessment.", ["one-sided-pain", "pelvic-pain", "spotting"], "Sudden severe pain, vomiting, faintness or possible pregnancy.", "nhs"],
  ["infertility-basics", "Understanding Infertility", "Fertility", "Fertility difficulties can affect either partner and assessment considers timing, ovulation, sperm, anatomy and health history.", ["difficulty-conceiving", "irregular-periods"], "Severe pelvic pain, heavy bleeding or acute testicular pain in a partner.", "who"],
  ["fertility-tests", "Fertility Tests Explained", "Fertility", "Fertility assessment may include history, blood tests, ultrasound, tubal assessment and semen analysis.", ["difficulty-conceiving", "irregular-periods"], "Severe pain, fever or heavy bleeding after an investigation.", "nice"],
  ["egg-freezing", "Egg Freezing", "Fertility", "Egg freezing involves ovarian stimulation and egg collection for possible future fertility treatment.", ["fertility-planning"], "Breathing difficulty, severe bloating, reduced urination or severe pain during stimulation.", "nice"],
  ["contraceptive-pill", "Combined Contraceptive Pill", "Contraception", "The combined pill prevents pregnancy and can affect bleeding, pain and some hormone-related symptoms.", ["contraception", "bleeding-changes"], "Chest pain, breathlessness, coughing blood, one-sided leg swelling, weakness or sudden severe headache.", "nhs"],
  ["progestogen-only-pill", "Progestogen-Only Pill", "Contraception", "The progestogen-only pill prevents pregnancy and commonly changes bleeding patterns.", ["contraception", "irregular-bleeding"], "Severe abdominal pain with a positive pregnancy test or symptoms of ectopic pregnancy.", "nhs"],
  ["iud-ius", "IUD and IUS Contraception", "Contraception", "Intrauterine contraception offers long-acting pregnancy prevention, with copper and hormonal options.", ["contraception", "bleeding-changes", "cramping"], "Severe pain, fever, heavy bleeding, pregnancy symptoms or inability to feel threads with pain.", "nhs"],

  ["early-pregnancy", "Early Pregnancy", "Pregnancy", "Early pregnancy can bring physical and emotional changes, and knowing warning signs helps people seek timely care.", ["missed-period", "nausea", "breast-tenderness"], "Heavy bleeding, severe one-sided pain, shoulder-tip pain, fainting or breathing difficulty.", "pregnancy"],
  ["morning-sickness", "Nausea and Vomiting in Pregnancy", "Pregnancy", "Pregnancy sickness is common, but severe vomiting can cause dehydration and require treatment.", ["nausea", "vomiting", "food-aversions"], "Unable to keep fluids down, very dark urine, fainting, confusion or vomiting blood.", "pregnancy"],
  ["hyperemesis-gravidarum", "Hyperemesis Gravidarum", "Pregnancy", "Hyperemesis gravidarum is severe pregnancy sickness that can cause dehydration, weight loss and electrolyte problems.", ["severe-vomiting", "dehydration", "weight-loss"], "Inability to drink, fainting, confusion, no urine, blood in vomit or severe weakness.", "pregnancy"],
  ["gestational-diabetes", "Gestational Diabetes", "Pregnancy", "Gestational diabetes is high blood glucose first recognised during pregnancy and is managed with monitoring and care planning.", ["increased-thirst", "frequent-urination"], "Very high glucose with vomiting, deep breathing, confusion or reduced fetal movement.", "pregnancy"],
  ["pre-eclampsia", "Pre-Eclampsia", "Pregnancy", "Pre-eclampsia involves high blood pressure and other organ changes during or shortly after pregnancy.", ["severe-headache", "vision-changes", "upper-abdominal-pain"], "Severe headache, vision changes, sudden swelling, upper abdominal pain, breathing difficulty or reduced fetal movement.", "pregnancy"],
  ["pelvic-girdle-pain", "Pelvic Girdle Pain in Pregnancy", "Pregnancy", "Pregnancy-related pelvic girdle pain affects joints and movement but does not usually harm the baby.", ["pelvic-pain", "back-pain", "pain-walking"], "New numbness, weakness, loss of bladder control, fever or signs of labour.", "pregnancy"],
  ["postnatal-depression", "Postnatal Depression", "Postpartum", "Postnatal depression is a treatable mental health condition that can develop after birth.", ["low-mood", "anxiety", "loss-of-interest"], "Thoughts of suicide, harming yourself or the baby, severe confusion, hallucinations or unusual beliefs.", "pregnancy"],
  ["mastitis", "Mastitis", "Postpartum", "Mastitis causes breast inflammation, often during breastfeeding, and may need antibiotics.", ["breast-pain", "redness", "fever"], "Rapidly worsening illness, sepsis symptoms, severe weakness or a painful swelling suggesting an abscess.", "nhs"],

  ["hot-flushes", "Hot Flushes and Night Sweats", "Menopause", "Temperature symptoms are common in menopause and can affect sleep, work and quality of life.", ["hot-flushes", "night-sweats", "sleep-problems"], "Chest pain, fainting, severe breathlessness or night sweats with unexplained weight loss.", "menopause"],
  ["vaginal-dryness", "Vaginal Dryness", "Menopause", "Vaginal dryness can occur at menopause and other times, affecting comfort, sex and urinary symptoms.", ["vaginal-dryness", "pain-during-sex", "urinary-symptoms"], "Heavy bleeding, severe pelvic pain, fever or inability to pass urine.", "menopause"],
  ["menopause-sleep", "Sleep Changes in Menopause", "Menopause", "Hormonal changes, hot flushes, mood and other health factors can all disrupt sleep around menopause.", ["insomnia", "night-sweats", "fatigue"], "Breathing pauses, chest pain, severe mood crisis or thoughts of self-harm.", "menopause"],
  ["early-menopause", "Early and Premature Menopause", "Menopause", "Menopause before 45 is considered early and before 40 premature, with implications for symptoms and long-term health.", ["missed-periods", "hot-flushes", "vaginal-dryness"], "Heavy bleeding, severe pain, fainting or acute mental health crisis.", "menopause"],
  ["hrt", "Hormone Replacement Therapy", "Menopause", "HRT can relieve menopause symptoms, with benefits and risks considered for the individual.", ["hot-flushes", "night-sweats", "vaginal-dryness"], "Chest pain, sudden breathlessness, coughing blood, one-sided leg swelling or stroke symptoms.", "nice"],
  ["postmenopausal-bleeding", "Bleeding After Menopause", "Menopause", "Any vaginal bleeding after menopause should be assessed, even when it happens only once.", ["postmenopausal-bleeding"], "Heavy bleeding, fainting, severe pain, chest pain or shortness of breath.", "nhs"],

  ["breast-pain", "Breast Pain", "Breast health", "Breast pain is common and usually not cancer, but persistent or focal symptoms deserve review.", ["breast-pain", "breast-tenderness"], "A rapidly spreading red painful breast with fever, or severe illness.", "nhs"],
  ["breast-lump", "Breast Lumps and Changes", "Breast health", "Most breast lumps are not cancer, but every new lump or persistent change should be checked.", ["breast-lump", "skin-dimpling", "nipple-change"], "Rapid swelling with fever or severe infection symptoms; otherwise arrange prompt clinical assessment.", "nhs"],
  ["cervical-screening", "Cervical Screening", "Screening", "Cervical screening checks for high-risk HPV so that people at increased risk can be monitored or treated before cervical cancer develops.", ["screening", "hpv"], "Heavy bleeding, severe pelvic pain or feeling very unwell after a procedure.", "nhs"],
  ["hpv", "Human Papillomavirus (HPV)", "Sexual health", "HPV is a common group of viruses; some types cause warts and others can contribute to cancer.", ["genital-warts", "screening-changes"], "Breathing difficulty or severe reaction after vaccination; heavy unexplained bleeding needs assessment.", "who"],
  ["chlamydia", "Chlamydia", "Sexual health", "Chlamydia is a common bacterial STI that is often symptomless and is treated with antibiotics.", ["unusual-discharge", "pain-passing-urine", "pelvic-pain"], "Severe pelvic pain, fever, vomiting, pregnancy with pain or feeling very unwell.", "who"],
  ["genital-herpes", "Genital Herpes", "Sexual health", "Genital herpes is a viral infection that can cause recurring painful blisters or ulcers.", ["genital-sores", "pain", "tingling"], "Inability to pass urine, severe widespread symptoms, pregnancy with a first outbreak or severe immune suppression.", "who"],
  ["bacterial-vaginosis", "Bacterial Vaginosis", "Vaginal health", "Bacterial vaginosis is a change in vaginal bacteria that can cause thin discharge and a noticeable smell.", ["vaginal-discharge", "vaginal-odour"], "Pelvic pain, fever, pregnancy complications or feeling very unwell.", "nhs"],

  ["uti", "Urinary Tract Infection", "Bladder health", "A urinary tract infection can affect the bladder or kidneys, causing burning, urgency or frequency and sometimes requiring antibiotic treatment.", ["pain-passing-urine", "frequency", "urgency"], "Fever, flank pain, vomiting, confusion, pregnancy, or feeling severely unwell.", "nhs"],
  ["bladder-leaks", "Bladder Leaks", "Bladder health", "Urinary incontinence is common and treatable, with different patterns requiring different approaches.", ["stress-incontinence", "urgency", "frequency"], "New loss of bladder control with numbness, leg weakness or severe back pain.", "nhs"],
  ["thyroid-pregnancy", "Thyroid Health in Pregnancy", "Pregnancy", "Thyroid conditions require monitoring in pregnancy because hormone needs and treatment doses can change.", ["fatigue", "temperature-changes", "heart-rate-changes"], "Chest pain, severe breathlessness, collapse, confusion or very fast heart rate.", "nice"],
  ["anaemia-pregnancy", "Anaemia in Pregnancy", "Pregnancy", "Anaemia in pregnancy commonly relates to iron deficiency and can contribute to fatigue, breathlessness and palpitations.", ["fatigue", "breathlessness", "palpitations"], "Chest pain, severe breathlessness at rest, fainting or a very fast heartbeat.", "pregnancy"],
  ["heart-health-women", "Heart Health in Women", "Whole-body health", "Heart disease symptoms and risk can be under-recognised in women, particularly around pregnancy and menopause.", ["chest-discomfort", "breathlessness", "fatigue"], "Call emergency services for chest pressure, severe breathlessness, collapse, sweating or pain spreading to the arm, jaw or back.", "who"],
];

const CLINICAL_PATHWAYS = {
  "Menstrual health": {
    assessment: ["Record cycle length, bleeding days, product changes, clots, pain and any bleeding between periods.", "A pregnancy test, blood count, hormone tests, examination or ultrasound may be considered according to the pattern."],
    treatment: ["Treatment targets the cause and may include anti-inflammatory pain relief, tranexamic acid or hormonal options where suitable.", "Persistent abnormal bleeding or pain may need gynaecology assessment rather than repeated symptom treatment."],
  },
  Gynaecological: {
    assessment: ["Assessment distinguishes infection, pregnancy-related causes and structural conditions using history, examination and targeted tests.", "Pelvic ultrasound is common; swabs, blood tests, MRI or specialist procedures are used only when the findings indicate them."],
    treatment: ["Options can include monitoring, medicines, hormonal treatment or a procedure, depending on the exact diagnosis and symptom burden.", "Fertility wishes and the effect on pain, bleeding, bladder, bowel and sexual function should be part of shared decisions."],
  },
  Pregnancy: {
    assessment: ["Pregnancy stage, observations, hydration, pain, bleeding and fetal wellbeing determine how urgently assessment is needed.", "Urine or blood tests, ultrasound and maternity monitoring are selected for the particular symptom rather than used routinely."],
    treatment: ["Pregnancy-safe treatment should be agreed with a midwife, GP, pharmacist or maternity team.", "The plan may include monitoring, fluids, medicines or hospital care, with follow-up for parent and baby."],
  },
  Postpartum: {
    assessment: ["Assessment includes time since birth, feeding, bleeding, wound or breast symptoms, mood, sleep and support at home.", "Clinicians check for infection, anaemia, blood-pressure complications and mental-health risk when relevant."],
    treatment: ["Treatment is compatible with feeding where possible and may include antibiotics, pain relief, psychological therapy or specialist review.", "A clear follow-up plan matters because postnatal symptoms can change quickly."],
  },
  Menopause: {
    assessment: ["Age, menstrual change, symptom pattern, medicines and personal risk factors usually guide assessment.", "Blood tests are not routinely needed over age 45 with typical symptoms, but may help when menopause is early or the diagnosis is unclear."],
    treatment: ["Options include symptom-specific self-care, non-hormonal medicines, vaginal oestrogen and systemic HRT where appropriate.", "Benefits, bleeding pattern, contraindications and review timing should be discussed individually."],
  },
  Fertility: {
    assessment: ["Assessment considers both partners, duration of trying, intercourse timing, menstrual history, previous pregnancies and relevant medical history.", "Tests may assess ovulation, ovarian reserve, tubal or uterine anatomy and semen, chosen for the individual situation."],
    treatment: ["Management may range from timing advice and treating an underlying condition to ovulation treatment, surgery or assisted conception.", "Age, test results, treatment burden, success rates and emotional support should be discussed together."],
  },
  Contraception: {
    assessment: ["Choice depends on pregnancy-prevention goals, bleeding preferences, medicines, migraine history, blood pressure and clot risk.", "A pregnancy test, blood-pressure check or STI assessment is used when relevant to the chosen method."],
    treatment: ["Explain effectiveness, correct use, common bleeding changes, side effects, interactions and what to do after a missed or late dose.", "Changing or stopping a method should include immediate alternative contraception when pregnancy is not wanted."],
  },
};

const humanise = (value) => value.replaceAll("-", " ");

function createExpandedCondition([id, title, category, summary, symptoms, urgent, sourceKey]) {
  const pathway = CLINICAL_PATHWAYS[category] || {
    assessment: ["A clinician will take a focused history and examine or test only where findings make this useful.", "The aim is to confirm the likely cause, exclude important alternatives and assess impact on daily life."],
    treatment: ["Treatment is matched to the confirmed cause, symptom severity, other medicines and personal priorities.", "Follow-up should define what improvement to expect and when to return if it does not occur."],
  };
  const symptomNames = symptoms.map(humanise);
  return {
    id,
    slug: id,
    title,
    category,
    readTime: 7,
    summary,
    quickFacts: [
      summary,
      `The key features to track are ${symptomNames.slice(0, 3).join(", ")}.`,
      `The pattern, timing and functional impact help distinguish ${title.toLowerCase()} from conditions with overlapping symptoms.`,
    ],
    symptoms,
    causes: [`The causes and mechanisms of ${title.toLowerCase()} depend on the clinical pattern; pregnancy, infection, medicines and hormonal or structural causes are considered where relevant.`],
    riskFactors: [`Age, life stage, pregnancy possibility, previous diagnoses, procedures, medicines and family history can change the likelihood and urgency of ${title.toLowerCase()}.`],
    diagnosis: pathway.assessment.map((item) => `${item} This is applied specifically to ${title.toLowerCase()}.`),
    treatments: pathway.treatment,
    selfCare: [`Track ${symptomNames.join(", ")} with dates, severity, triggers and effect on sleep, movement, work or sex.`, "Use medicines only as directed and record whether they improve symptoms or cause side effects."],
    whenToSeeGP: [`Arrange review when ${symptomNames.slice(0, 2).join(" or ")} persists, recurs or changes from your usual pattern.`, `Ask for reassessment if ${title.toLowerCase()} continues to limit normal activities despite the agreed plan.`],
    emergencySigns: [urgent],
    clinicalReviewer: null,
    lastReviewed: "8 August 2026",
    sources: [SOURCES[sourceKey] || SOURCES.nhs, category === "Pregnancy" || category === "Postpartum" ? SOURCES.hsePregnancy : SOURCES.hse],
    version: 1,
  };
}

export const expandedConditions = specs.map(createExpandedCondition);
