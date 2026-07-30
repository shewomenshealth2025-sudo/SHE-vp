const createCondition = ({
  id,
  title,
  category,
  readTime = 6,
  summary,
  quickFacts,
  symptoms,
  causes = [],
  riskFactors = [],
  diagnosis = [],
  treatments = [],
  selfCare = [],
  whenToSeeGP = [],
  emergencySigns = [],
}) => ({
  id,
  slug: id,
  title,
  category,
  readTime,
  summary,
  quickFacts,
  symptoms,
  causes,
  riskFactors,
  diagnosis,
  treatments,
  selfCare,
  whenToSeeGP,
  emergencySigns,
  relatedSymptoms: symptoms,
  relatedConditions: [],
  relatedTests: [],
  relatedTreatments: [],
  relatedServices: [],
  relatedProducts: [],
  sources: [],
  reviewed: "",
  version: 1,
});

export const pcos = createCondition({
  id: "pcos",
  title: "Polycystic Ovary Syndrome",
  category: "Hormonal health",
  readTime: 7,
  summary:
    "Polycystic ovary syndrome, often called PCOS, is a hormonal condition that can affect periods, ovulation, skin, hair, fertility and metabolism.",
  quickFacts: [
    "Symptoms can differ significantly between individuals.",
    "PCOS may affect ovulation and menstrual cycles.",
    "Management depends on symptoms and personal health goals.",
  ],
  symptoms: [
    "irregular-periods",
    "acne",
    "excess-hair-growth",
    "difficulty-conceiving",
    "weight-changes",
    "hair-thinning",
  ],
  diagnosis: [
    "A discussion about symptoms and menstrual history.",
    "Blood tests may be used to assess hormone levels.",
    "An ultrasound may sometimes be recommended.",
  ],
  treatments: [
    "Hormonal treatments may help regulate periods.",
    "Treatment may be offered for acne or excess hair growth.",
    "Fertility treatment may be considered when needed.",
  ],
  selfCare: [
    "Regular movement and balanced meals may support overall wellbeing.",
    "Track menstrual patterns and changes in symptoms.",
  ],
  whenToSeeGP: [
    "Periods are consistently irregular or absent.",
    "Symptoms are affecting confidence, fertility or daily life.",
  ],
});

export const adenomyosis = createCondition({
  id: "adenomyosis",
  title: "Adenomyosis",
  category: "Gynaecological",
  summary:
    "Adenomyosis occurs when tissue similar to the lining of the uterus grows into the muscular wall of the uterus.",
  quickFacts: [
    "It may cause painful or heavy periods.",
    "Symptoms can overlap with endometriosis and fibroids.",
    "Treatment depends on symptom severity and future pregnancy plans.",
  ],
  symptoms: [
    "painful-periods",
    "heavy-periods",
    "pelvic-pain",
    "bloating",
    "pain-during-sex",
  ],
  diagnosis: [
    "Symptoms and menstrual history are reviewed.",
    "Ultrasound or MRI may support diagnosis.",
  ],
  treatments: [
    "Pain relief and hormonal treatments may be offered.",
    "Procedural or surgical options may be considered for severe symptoms.",
  ],
  whenToSeeGP: [
    "Periods are increasingly painful or heavy.",
    "Symptoms interfere with work, study, sleep or daily activities.",
  ],
});

export const fibroids = createCondition({
  id: "fibroids",
  title: "Fibroids",
  category: "Gynaecological",
  summary:
    "Fibroids are non-cancerous growths that develop in or around the uterus and can vary considerably in size and number.",
  quickFacts: [
    "Many fibroids cause no symptoms.",
    "They may cause heavy bleeding or pressure symptoms.",
    "Treatment is based on symptoms, size, location and fertility goals.",
  ],
  symptoms: [
    "heavy-periods",
    "pelvic-pressure",
    "pelvic-pain",
    "frequent-urination",
    "constipation",
    "difficulty-conceiving",
  ],
  diagnosis: [
    "A pelvic examination may be performed.",
    "Ultrasound is commonly used to identify fibroids.",
  ],
  treatments: [
    "Medication may help control bleeding and pain.",
    "Procedures or surgery may be considered when symptoms are significant.",
  ],
  emergencySigns: [
    "Very heavy bleeding accompanied by dizziness or faintness.",
    "Severe sudden pelvic pain.",
  ],
});

export const pmdd = createCondition({
  id: "pmdd",
  title: "Premenstrual Dysphoric Disorder",
  category: "Menstrual health",
  summary:
    "PMDD is a severe cyclical condition involving emotional and physical symptoms that occur before a period and improve shortly after it begins.",
  quickFacts: [
    "PMDD is more severe than typical premenstrual symptoms.",
    "Symptoms follow a recurring relationship with the menstrual cycle.",
    "Tracking symptoms can help support assessment.",
  ],
  symptoms: [
    "low-mood",
    "anxiety",
    "irritability",
    "fatigue",
    "bloating",
    "difficulty-concentrating",
  ],
  diagnosis: [
    "Daily symptom tracking over several menstrual cycles may be recommended.",
    "Other physical and mental health causes may need to be considered.",
  ],
  treatments: [
    "Antidepressant medication may be considered.",
    "Hormonal treatments may help some people.",
    "Psychological support and lifestyle adjustments may also form part of care.",
  ],
  whenToSeeGP: [
    "Symptoms significantly affect relationships, work or daily life.",
    "Symptoms repeatedly occur before periods.",
  ],
  emergencySigns: [
    "Thoughts of self-harm or suicide require urgent support.",
  ],
});

export const pms = createCondition({
  id: "pms",
  title: "Premenstrual Syndrome",
  category: "Menstrual health",
  summary:
    "Premenstrual syndrome describes recurring physical and emotional symptoms that occur in the weeks before a period.",
  quickFacts: [
    "Symptoms vary from month to month.",
    "Common experiences include mood changes, bloating and breast tenderness.",
    "A symptom diary can help identify cyclical patterns.",
  ],
  symptoms: [
    "bloating",
    "breast-tenderness",
    "irritability",
    "headaches",
    "fatigue",
    "mood-changes",
  ],
  treatments: [
    "Pain relief may help physical symptoms.",
    "Hormonal or antidepressant treatment may be considered for persistent symptoms.",
  ],
  selfCare: [
    "Track symptoms alongside the menstrual cycle.",
    "Regular sleep, movement and balanced meals may help general wellbeing.",
  ],
  whenToSeeGP: [
    "Symptoms disrupt daily life.",
    "Self-care measures are not helping.",
  ],
});

export const ovarianCysts = createCondition({
  id: "ovarian-cysts",
  title: "Ovarian Cysts",
  category: "Gynaecological",
  summary:
    "Ovarian cysts are fluid-filled sacs that develop on an ovary. Many are harmless and disappear without treatment.",
  quickFacts: [
    "Many ovarian cysts cause no symptoms.",
    "Most are non-cancerous.",
    "Symptoms depend on the cyst’s type, size and whether complications occur.",
  ],
  symptoms: [
    "pelvic-pain",
    "bloating",
    "pain-during-sex",
    "frequent-urination",
    "changes-to-periods",
  ],
  diagnosis: [
    "Ultrasound is commonly used to examine an ovarian cyst.",
    "Follow-up imaging or blood tests may sometimes be recommended.",
  ],
  treatments: [
    "Some cysts are monitored without immediate treatment.",
    "Surgery may be considered if a cyst is large, persistent or concerning.",
  ],
  emergencySigns: [
    "Sudden severe pelvic pain.",
    "Pain accompanied by vomiting, weakness, faintness or fever.",
  ],
});

export const pelvicInflammatoryDisease = createCondition({
  id: "pelvic-inflammatory-disease",
  title: "Pelvic Inflammatory Disease",
  category: "Sexual and reproductive health",
  summary:
    "Pelvic inflammatory disease, or PID, is an infection of the upper reproductive organs that requires medical treatment.",
  quickFacts: [
    "PID is usually treated with antibiotics.",
    "Early treatment helps reduce the risk of complications.",
    "Symptoms may be mild or difficult to recognise.",
  ],
  symptoms: [
    "pelvic-pain",
    "unusual-discharge",
    "pain-during-sex",
    "bleeding-between-periods",
    "fever",
  ],
  diagnosis: [
    "Assessment may include an examination and infection testing.",
    "Pregnancy testing, blood tests or imaging may be used.",
  ],
  treatments: [
    "Antibiotics should be started promptly when PID is suspected.",
    "Sexual partners may also require testing or treatment.",
  ],
  whenToSeeGP: [
    "There is pelvic pain with unusual discharge or bleeding.",
    "There is pain during sex or urination.",
  ],
  emergencySigns: [
    "Severe pain, vomiting, high fever, faintness or suspected pregnancy.",
  ],
});

export const perimenopause = createCondition({
  id: "perimenopause",
  title: "Perimenopause",
  category: "Menopause",
  summary:
    "Perimenopause is the transitional period before menopause when hormone levels fluctuate and menstrual patterns may change.",
  quickFacts: [
    "It can begin several years before the final period.",
    "Symptoms and cycle changes vary considerably.",
    "Support is available even while periods are continuing.",
  ],
  symptoms: [
    "irregular-periods",
    "hot-flushes",
    "night-sweats",
    "sleep-problems",
    "mood-changes",
    "brain-fog",
  ],
  treatments: [
    "Hormone replacement therapy may be suitable for some people.",
    "Non-hormonal treatments can also help particular symptoms.",
  ],
  selfCare: [
    "Track cycle changes and symptoms.",
    "Prioritise sleep, bone health, movement and cardiovascular health.",
  ],
  whenToSeeGP: [
    "Symptoms are affecting quality of life.",
    "Bleeding is unusually heavy, persistent or occurs after sex.",
  ],
});

export const menopause = createCondition({
  id: "menopause",
  title: "Menopause",
  category: "Menopause",
  summary:
    "Menopause is reached after 12 months without a menstrual period when this is not caused by another medical condition or treatment.",
  quickFacts: [
    "Menopause is a natural life stage.",
    "Symptoms can begin before periods stop.",
    "Treatment should be personalised to symptoms and medical history.",
  ],
  symptoms: [
    "hot-flushes",
    "night-sweats",
    "sleep-problems",
    "vaginal-dryness",
    "mood-changes",
    "brain-fog",
  ],
  treatments: [
    "Hormone replacement therapy may relieve several symptoms.",
    "Non-hormonal medicines and local vaginal treatments are also available.",
  ],
  selfCare: [
    "Support bone health through appropriate nutrition and weight-bearing movement.",
    "Discuss cardiovascular risk factors during routine healthcare reviews.",
  ],
  whenToSeeGP: [
    "Symptoms are affecting daily life.",
    "There is vaginal bleeding after menopause.",
  ],
});

export const vaginismus = createCondition({
  id: "vaginismus",
  title: "Vaginismus",
  category: "Pelvic and sexual health",
  summary:
    "Vaginismus involves involuntary tightening of muscles around the vagina when penetration is attempted or anticipated.",
  quickFacts: [
    "The muscle response is involuntary.",
    "It can make penetration painful, difficult or impossible.",
    "Treatment commonly combines physical and psychological support.",
  ],
  symptoms: [
    "pain-during-sex",
    "difficulty-with-penetration",
    "pelvic-floor-tightness",
    "fear-of-penetration",
  ],
  treatments: [
    "Pelvic health physiotherapy may be helpful.",
    "Gradual desensitisation and psychological support may form part of care.",
  ],
  whenToSeeGP: [
    "Pain or difficulty with penetration is causing distress.",
    "Pelvic examinations or tampon use are difficult or impossible.",
  ],
});