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
  clinicalReviewer = "Clinical reviewer to be confirmed",
  lastReviewed = "8 August 2026",
  sources = [
    { title: "NHS Health A to Z", url: "https://www.nhs.uk/conditions/" },
    { title: "NICE guidance", url: "https://www.nice.org.uk/guidance" },
  ],
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
  sources,
  clinicalReviewer,
  lastReviewed,
  reviewed: lastReviewed,
  version: 1,
});

export const pcos = createCondition({
  id: "pcos",
  title: "Polyendocrine Metabolic Ovarian Syndrome (PMOS; PCOS)",
  category: "Hormonal health",
  readTime: 7,
  summary:
    "Polyendocrine metabolic ovarian syndrome, often called PMOS (PCOS), is a hormonal condition that can affect periods, ovulation, skin, hair, fertility and metabolism.",
  quickFacts: [
    "Symptoms can differ significantly between individuals.",
    "PMOS (PCOS) may affect ovulation and menstrual cycles.",
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
export const lupus = createCondition({
  id: "lupus",
  title: "Lupus",
  category: "Autoimmune health",
  readTime: 7,
  summary:
    "Lupus is a long-term autoimmune condition in which the immune system mistakenly attacks healthy tissues, potentially affecting the skin, joints, blood, kidneys and other organs.",
  quickFacts: [
    "Lupus affects women more commonly than men.",
    "Symptoms may come and go in periods known as flares.",
    "Symptoms and severity vary significantly between individuals.",
  ],
  symptoms: [
    "fatigue",
    "joint-pain",
    "skin-rashes",
    "fever",
    "hair-loss",
    "sun-sensitivity",
    "chest-pain",
  ],
  diagnosis: [
    "Diagnosis may involve reviewing symptoms and medical history.",
    "Blood and urine tests may be used.",
    "Assessment may involve a rheumatology specialist.",
  ],
  treatments: [
    "Anti-inflammatory or immune-modifying medicines may be prescribed.",
    "Treatment depends on which parts of the body are affected.",
    "Regular monitoring may be required.",
  ],
  selfCare: [
    "Protect skin from excessive sun exposure.",
    "Track symptoms and possible flare triggers.",
    "Balance activity with appropriate rest.",
  ],
  whenToSeeGP: [
    "Persistent fatigue, joint pain or unexplained rashes are affecting daily life.",
    "Symptoms repeatedly occur together or are worsening.",
  ],
  emergencySigns: [
    "Severe chest pain or difficulty breathing.",
    "Sudden weakness, confusion or neurological symptoms.",
  ],
});

export const rheumatoidArthritis = createCondition({
  id: "rheumatoid-arthritis",
  title: "Rheumatoid Arthritis",
  category: "Autoimmune health",
  readTime: 6,
  summary:
    "Rheumatoid arthritis is an autoimmune condition that causes inflammation, pain, swelling and stiffness in the joints.",
  quickFacts: [
    "It commonly affects the small joints of the hands and feet.",
    "Morning stiffness may last longer than with ordinary joint strain.",
    "Early treatment can help limit joint damage.",
  ],
  symptoms: [
    "joint-pain",
    "joint-swelling",
    "morning-stiffness",
    "fatigue",
    "reduced-mobility",
  ],
  diagnosis: [
    "Assessment includes symptoms and examination of the joints.",
    "Blood tests and imaging may support diagnosis.",
    "Referral to rheumatology may be required.",
  ],
  treatments: [
    "Disease-modifying medicines may reduce inflammation and joint damage.",
    "Pain relief and physiotherapy may support symptom management.",
  ],
  whenToSeeGP: [
    "Joint pain, swelling or stiffness persists for several weeks.",
    "Morning stiffness is prolonged or multiple joints are affected.",
  ],
});

export const hashimotosThyroiditis = createCondition({
  id: "hashimotos-thyroiditis",
  title: "Hashimoto’s Thyroiditis",
  category: "Autoimmune health",
  readTime: 6,
  summary:
    "Hashimoto’s thyroiditis is an autoimmune condition in which the immune system attacks the thyroid gland and may gradually reduce thyroid hormone production.",
  quickFacts: [
    "It is a common cause of an underactive thyroid.",
    "Symptoms may develop gradually.",
    "Blood tests are used to assess thyroid function and antibodies.",
  ],
  symptoms: [
    "fatigue",
    "weight-changes",
    "feeling-cold",
    "dry-skin",
    "hair-thinning",
    "constipation",
    "heavy-periods",
    "low-mood",
  ],
  diagnosis: [
    "Thyroid-stimulating hormone and thyroid hormone levels are assessed.",
    "Thyroid antibody testing may support diagnosis.",
  ],
  treatments: [
    "Thyroid hormone replacement may be prescribed when thyroid function is reduced.",
    "Ongoing blood-test monitoring may be required.",
  ],
  whenToSeeGP: [
    "Persistent fatigue, cold intolerance or unexplained weight changes occur.",
    "Periods become unusually heavy or irregular alongside other symptoms.",
  ],
});

export const hypothyroidism = createCondition({
  id: "hypothyroidism",
  title: "Hypothyroidism",
  category: "Hormonal health",
  readTime: 6,
  summary:
    "Hypothyroidism, or an underactive thyroid, occurs when the thyroid gland does not produce enough thyroid hormones.",
  quickFacts: [
    "Symptoms often develop slowly.",
    "Thyroid hormones influence energy, temperature, metabolism and menstrual health.",
    "A blood test is needed to assess thyroid function.",
  ],
  symptoms: [
    "fatigue",
    "weight-changes",
    "feeling-cold",
    "constipation",
    "dry-skin",
    "hair-thinning",
    "heavy-periods",
    "difficulty-concentrating",
  ],
  diagnosis: [
    "Blood tests measure thyroid-stimulating hormone and thyroid hormone levels.",
    "Further testing may investigate the underlying cause.",
  ],
  treatments: [
    "Daily thyroid hormone replacement is commonly used.",
    "Blood tests help ensure the dose remains appropriate.",
  ],
  whenToSeeGP: [
    "Persistent tiredness or cold intolerance has no clear explanation.",
    "Several thyroid-related symptoms occur together.",
  ],
});

export const migraine = createCondition({
  id: "migraine",
  title: "Migraine",
  category: "Neurological health",
  readTime: 6,
  summary:
    "Migraine is a neurological condition that can cause recurring headaches alongside symptoms such as nausea and sensitivity to light, sound or movement.",
  quickFacts: [
    "Migraine is more common in women.",
    "Hormonal changes may influence migraine patterns.",
    "Some people experience aura before or during an attack.",
  ],
  symptoms: [
    "headache",
    "nausea",
    "light-sensitivity",
    "sound-sensitivity",
    "visual-changes",
    "dizziness",
  ],
  diagnosis: [
    "Diagnosis is usually based on symptoms and headache history.",
    "A headache diary may help identify patterns and triggers.",
  ],
  treatments: [
    "Pain-relieving or migraine-specific medicines may be used during attacks.",
    "Preventive treatment may be offered for frequent or severe migraine.",
  ],
  selfCare: [
    "Track attacks, menstrual patterns and possible triggers.",
    "Regular meals, hydration and sleep may help reduce some triggers.",
  ],
  emergencySigns: [
    "A sudden, extremely severe headache.",
    "Headache with new weakness, confusion, seizure or difficulty speaking.",
  ],
});

export const ironDeficiencyAnaemia = createCondition({
  id: "iron-deficiency-anaemia",
  title: "Iron-Deficiency Anaemia",
  category: "Blood health",
  readTime: 5,
  summary:
    "Iron-deficiency anaemia occurs when the body does not have enough iron to produce sufficient healthy red blood cells.",
  quickFacts: [
    "Heavy menstrual bleeding is a common cause.",
    "A blood test is needed to confirm anaemia and assess iron levels.",
    "The cause of iron deficiency should be investigated.",
  ],
  symptoms: [
    "fatigue",
    "shortness-of-breath",
    "dizziness",
    "headaches",
    "heart-palpitations",
    "pale-skin",
    "hair-loss",
  ],
  diagnosis: [
    "A full blood count can assess haemoglobin levels.",
    "Ferritin and other blood tests may assess iron stores.",
    "Further investigation may be needed to identify blood loss.",
  ],
  treatments: [
    "Iron supplements may be prescribed.",
    "Dietary changes may support iron intake.",
    "Underlying causes such as heavy periods may also require treatment.",
  ],
  whenToSeeGP: [
    "Persistent fatigue, breathlessness or dizziness is affecting daily life.",
    "Periods are very heavy or prolonged.",
  ],
  emergencySigns: [
    "Severe breathlessness, chest pain or fainting.",
    "Very heavy bleeding accompanied by weakness or dizziness.",
  ],
});

export const osteoporosis = createCondition({
  id: "osteoporosis",
  title: "Osteoporosis",
  category: "Bone health",
  readTime: 6,
  summary:
    "Osteoporosis is a condition in which bones become less dense and more likely to fracture.",
  quickFacts: [
    "Risk increases after menopause as oestrogen levels fall.",
    "Osteoporosis may cause no symptoms until a fracture occurs.",
    "Bone density scanning can help assess bone strength.",
  ],
  symptoms: [
    "fractures",
    "back-pain",
    "loss-of-height",
    "posture-changes",
  ],
  riskFactors: [
    "Menopause and increasing age.",
    "Long-term use of certain steroid medicines.",
    "Low body weight or nutritional deficiencies.",
    "Family history of osteoporosis or hip fracture.",
  ],
  diagnosis: [
    "A bone-density scan may be used.",
    "Blood tests may investigate contributing conditions.",
  ],
  treatments: [
    "Medicines may be prescribed to strengthen bones.",
    "Calcium and vitamin D intake may be reviewed.",
    "Weight-bearing and resistance exercise may be recommended.",
  ],
  whenToSeeGP: [
    "There is concern about fracture risk.",
    "A fracture occurs after a minor fall or injury.",
    "Menopause occurred unusually early.",
  ],
});

export const coeliacDisease = createCondition({
  id: "coeliac-disease",
  title: "Coeliac Disease",
  category: "Autoimmune health",
  readTime: 6,
  summary:
    "Coeliac disease is an autoimmune condition in which eating gluten triggers damage to the lining of the small intestine.",
  quickFacts: [
    "Symptoms may involve digestion, energy levels, skin, fertility or bone health.",
    "Testing should usually occur before removing gluten from the diet.",
    "Treatment involves a lifelong gluten-free diet.",
  ],
  symptoms: [
    "bloating",
    "abdominal-pain",
    "diarrhoea",
    "constipation",
    "fatigue",
    "iron-deficiency",
    "weight-changes",
  ],
  diagnosis: [
    "Blood tests can look for antibodies associated with coeliac disease.",
    "A small-bowel biopsy may sometimes be used to confirm diagnosis.",
  ],
  treatments: [
    "A strict lifelong gluten-free diet is the main treatment.",
    "Dietetic support can help ensure nutrition remains balanced.",
    "Nutritional deficiencies may require treatment.",
  ],
  whenToSeeGP: [
    "Persistent digestive symptoms or unexplained iron deficiency occur.",
    "There is a close family history of coeliac disease.",
  ],
});
