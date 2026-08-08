const SOURCES = {
  nhs: { title: "NHS Health A to Z", url: "https://www.nhs.uk/conditions/" },
  periods: { title: "NHS — Periods", url: "https://www.nhs.uk/conditions/periods/" },
  pregnancy: { title: "NHS — Pregnancy guide", url: "https://www.nhs.uk/pregnancy/" },
  menopause: { title: "NHS — Menopause and perimenopause", url: "https://www.nhs.uk/conditions/menopause-and-perimenopause/" },
  nice: { title: "NICE guidance", url: "https://www.nice.org.uk/guidance" },
  who: { title: "WHO — Sexual and reproductive health", url: "https://www.who.int/health-topics/sexual-and-reproductive-health-and-rights" },
};

const specs = [
  ["period-pain", "Period Pain", "Menstrual health", "Cramping around a period is common, but pain that disrupts normal life deserves assessment.", ["painful-periods", "pelvic-pain", "nausea"], "Sudden severe pain, fainting or pain with a possible pregnancy.", "periods"],
  ["irregular-periods", "Irregular Periods", "Menstrual health", "Cycle length can vary, but persistent changes may relate to pregnancy, stress, hormones, medicines or health conditions.", ["irregular-periods", "missed-periods", "unexpected-bleeding"], "Very heavy bleeding, severe pain, fainting or suspected pregnancy complications.", "periods"],
  ["missed-periods", "Missed or Late Periods", "Menstrual health", "A late period has many possible causes, including pregnancy, stress, weight change, exercise, perimenopause and PMOS (PCOS).", ["missed-periods", "cycle-changes", "pelvic-pain"], "Severe one-sided pain, shoulder-tip pain, dizziness or bleeding with a possible pregnancy.", "periods"],
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
  ["cervical-screening", "Cervical Screening", "Screening", "Cervical screening checks for high-risk HPV to help prevent cervical cancer.", ["screening", "hpv"], "Heavy bleeding, severe pelvic pain or feeling very unwell after a procedure.", "nhs"],
  ["hpv", "Human Papillomavirus (HPV)", "Sexual health", "HPV is a common group of viruses; some types cause warts and others can contribute to cancer.", ["genital-warts", "screening-changes"], "Breathing difficulty or severe reaction after vaccination; heavy unexplained bleeding needs assessment.", "who"],
  ["chlamydia", "Chlamydia", "Sexual health", "Chlamydia is a common bacterial STI that is often symptomless and is treated with antibiotics.", ["unusual-discharge", "pain-passing-urine", "pelvic-pain"], "Severe pelvic pain, fever, vomiting, pregnancy with pain or feeling very unwell.", "who"],
  ["genital-herpes", "Genital Herpes", "Sexual health", "Genital herpes is a viral infection that can cause recurring painful blisters or ulcers.", ["genital-sores", "pain", "tingling"], "Inability to pass urine, severe widespread symptoms, pregnancy with a first outbreak or severe immune suppression.", "who"],
  ["bacterial-vaginosis", "Bacterial Vaginosis", "Vaginal health", "Bacterial vaginosis is a change in vaginal bacteria that can cause thin discharge and a noticeable smell.", ["vaginal-discharge", "vaginal-odour"], "Pelvic pain, fever, pregnancy complications or feeling very unwell.", "nhs"],

  ["uti", "Urinary Tract Infection", "Bladder health", "A UTI can affect the bladder or kidneys and may need antibiotic treatment.", ["pain-passing-urine", "frequency", "urgency"], "Fever, flank pain, vomiting, confusion, pregnancy, or feeling severely unwell.", "nhs"],
  ["bladder-leaks", "Bladder Leaks", "Bladder health", "Urinary incontinence is common and treatable, with different patterns requiring different approaches.", ["stress-incontinence", "urgency", "frequency"], "New loss of bladder control with numbness, leg weakness or severe back pain.", "nhs"],
  ["thyroid-pregnancy", "Thyroid Health in Pregnancy", "Pregnancy", "Thyroid conditions require monitoring in pregnancy because hormone needs and treatment doses can change.", ["fatigue", "temperature-changes", "heart-rate-changes"], "Chest pain, severe breathlessness, collapse, confusion or very fast heart rate.", "nice"],
  ["anaemia-pregnancy", "Anaemia in Pregnancy", "Pregnancy", "Anaemia in pregnancy commonly relates to iron deficiency and can contribute to fatigue, breathlessness and palpitations.", ["fatigue", "breathlessness", "palpitations"], "Chest pain, severe breathlessness at rest, fainting or a very fast heartbeat.", "pregnancy"],
  ["heart-health-women", "Heart Health in Women", "Whole-body health", "Heart disease symptoms and risk can be under-recognised in women, particularly around pregnancy and menopause.", ["chest-discomfort", "breathlessness", "fatigue"], "Call emergency services for chest pressure, severe breathlessness, collapse, sweating or pain spreading to the arm, jaw or back.", "who"],
];

function createExpandedCondition([id, title, category, summary, symptoms, urgent, sourceKey]) {
  return {
    id,
    slug: id,
    title,
    category,
    readTime: 5,
    summary,
    quickFacts: [
      summary,
      "Symptoms and severity vary between individuals.",
      "Assessment and treatment should reflect personal circumstances and clinical history.",
    ],
    symptoms,
    causes: ["Possible causes depend on the symptom pattern, age, medicines, life stage and wider health history."],
    riskFactors: ["A clinician can help identify which personal or family-history factors are relevant."],
    diagnosis: ["Assessment usually begins with symptoms, timing and medical history.", "Examination, tests or imaging may be considered when clinically appropriate."],
    treatments: ["Management depends on the cause, severity, preferences and reproductive goals.", "A pharmacist or clinician can explain suitable treatment options and safety considerations."],
    selfCare: ["Track timing, triggers and impact on daily life.", "Seek advice when symptoms are new, persistent, worsening or difficult to manage."],
    whenToSeeGP: ["Symptoms persist, recur or interfere with normal activities.", "You are worried, uncertain about the cause or need help choosing safe treatment."],
    emergencySigns: [urgent],
    clinicalReviewer: "Clinical reviewer to be confirmed",
    lastReviewed: "8 August 2026",
    sources: [SOURCES[sourceKey] || SOURCES.nhs, SOURCES.nice],
    version: 1,
  };
}

export const expandedConditions = specs.map(createExpandedCondition);
