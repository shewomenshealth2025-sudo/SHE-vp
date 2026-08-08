const NHS_PREGNANCY_WEEKS = { title: "NHS — Pregnancy week by week", url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/" };
const HSE_PREGNANCY_STAGES = { title: "HSE — Stages of pregnancy", url: "https://www2.hse.ie/pregnancy-birth/baby-development-pregnancy-stages/stages/" };
const NHS_AZ = { title: "NHS Health A to Z", url: "https://www.nhs.uk/conditions/" };
const HSE_WOMENS_HEALTH = { title: "HSE Women’s health A–Z", url: "https://www2.hse.ie/conditions/womens-health-a-z/" };

const pregnancyMilestones = {
  4: "implantation is completing and the early placenta and embryo are beginning to form",
  5: "the neural tube, which becomes the brain and spinal cord, is developing",
  6: "the embryo is curved, limb buds are emerging and early cardiac activity may be visible on ultrasound",
  7: "the brain is growing rapidly while the eyes, ears and limb buds continue developing",
  8: "the embryo is now called a fetus and the limbs are lengthening",
  9: "the face, hands and feet are becoming more defined while major organs continue developing",
  10: "the heart and jaw are formed and fingers and toes are becoming distinct",
  11: "facial bones, ears and separated fingers and toes are developing quickly",
  12: "the major organs and limbs are in place and the skeleton is beginning to harden",
  13: "the second trimester begins and bones in the arms and legs are hardening",
  14: "facial movement and swallowing are developing while the body grows more quickly",
  15: "hearing structures and the skeleton continue developing and movement becomes more coordinated",
  16: "facial muscles work, the nervous system controls more movement and some people begin to show",
  17: "eyebrows and eyelashes begin growing and the fetus is putting on weight",
  18: "the ears are formed and movement may begin to feel like fluttering",
  19: "a protective greasy coating called vernix begins covering the skin",
  20: "pregnancy reaches its midpoint and the anomaly scan commonly assesses anatomy and growth",
  21: "movement is becoming stronger and the fetus continues swallowing amniotic fluid",
  22: "the lungs and nervous system continue maturing while touch and movement responses develop",
  23: "the lungs are forming airways and movement patterns may feel more recognisable",
  24: "the fetus has reached a stage where neonatal survival may be possible with intensive specialist care",
  25: "the startle response develops and the fetus responds more clearly to sound and movement",
  26: "the eyelids may begin opening and breathing movements practise using the developing lungs",
  27: "the second trimester ends as the brain, lungs and body fat continue maturing",
  28: "the third trimester begins and movements should now have an individual daily pattern",
  29: "the brain develops rapidly and the fetus continues gaining fat and muscle",
  30: "the lungs and digestive system mature while the growing uterus can increase breathlessness and reflux",
  31: "the fetus continues gaining weight and may already be positioned head-down",
  32: "body fat increases and breathing movements become more regular",
  33: "bones harden apart from the skull, which remains flexible for birth",
  34: "the lungs and central nervous system continue maturing and space for movement becomes tighter",
  35: "weight gain accelerates and the kidneys and liver are functioning",
  36: "the baby may move lower into the pelvis and birth preparation becomes more immediate",
  37: "pregnancy is now early term and labour can begin, although development and weight gain continue",
  38: "the organs are ready for life after birth and the baby may settle deeper into the pelvis",
  39: "pregnancy is full term and the placenta continues supporting the baby while labour approaches",
  40: "the estimated due date is reached, although only a small proportion of babies arrive on that exact day",
  41: "pregnancy is post-dates and the maternity team discusses monitoring and induction options",
};

function pregnancyWeek(week, milestone) {
  const trimester = week <= 12 ? "first" : week <= 27 ? "second" : "third";
  const lateWarning = week >= 24
    ? "Contact maternity triage urgently for reduced or changed fetal movement, bleeding, leaking fluid, regular painful contractions or severe illness."
    : "Seek urgent assessment for heavy bleeding, severe one-sided pain, shoulder-tip pain, collapse or severe dehydration.";

  return {
    id: `pregnancy-week-${week}`,
    slug: `pregnancy-week-${week}`,
    title: `${week} Weeks Pregnant`,
    category: "Pregnancy week by week",
    readTime: 7,
    summary: `At ${week} weeks, ${milestone}. This guide explains development, common body changes, routine care and warning signs for this point in the ${trimester} trimester.`,
    quickFacts: [
      `Pregnancy weeks are dated from the first day of the last menstrual period, approximately 2 weeks before conception in a typical cycle.`,
      `At week ${week}, ${milestone}.`,
      "Developmental measurements are averages and a scan should be interpreted by the maternity team rather than compared with an app alone.",
    ],
    symptoms: week < 13 ? ["nausea", "fatigue", "breast-tenderness", "frequent-urination"] : week < 28 ? ["growing-bump", "fetal-movement", "backache", "indigestion"] : ["fetal-movement", "pelvic-pressure", "breathlessness", "sleep-disruption"],
    causes: [
      `The changes at week ${week} are driven by placental hormones, growth of the uterus and the developmental milestone that ${milestone}.`,
      `Symptoms vary because hormone sensitivity, previous pregnancies, fetal position, placenta position and individual health differ.`,
    ],
    riskFactors: [
      "Pregnancy complications are more likely with some pre-existing conditions, multiple pregnancy, previous complications or abnormal placental development.",
      `Risk cannot be judged from gestational week alone; blood pressure, urine, scans, growth and movement pattern provide condition-specific information at week ${week}.`,
    ],
    diagnosis: [
      `Gestational age at week ${week} is based on menstrual dates and usually refined by the dating ultrasound.`,
      "Antenatal review uses symptoms, blood pressure, urine, fetal growth and heartbeat or movement checks appropriate to gestation.",
    ],
    treatments: [
      "Routine care includes attending scheduled appointments, taking recommended supplements and vaccines, and reviewing medicine safety with a clinician.",
      `Treatment at week ${week} is directed at a diagnosed complication; normal development does not require consumer tests or extra private scans.`,
    ],
    selfCare: [
      "Eat and drink regularly, remain active as advised and use pregnancy-safe symptom relief agreed with a midwife, pharmacist or doctor.",
      week >= 28 ? "Know the baby’s usual movement pattern and contact maternity triage immediately if it changes." : "Contact the maternity service if symptoms are difficult to manage or you are unsure what is normal.",
    ],
    whenToSeeGP: ["You have persistent vomiting, pain, bleeding, urinary symptoms, severe headache, itching or worsening mental health.", "You need advice about medicines, long-term conditions, screening, vaccines or the next antenatal appointment."],
    emergencySigns: [lateWarning],
    sources: [NHS_PREGNANCY_WEEKS, HSE_PREGNANCY_STAGES],
    clinicalReviewer: "Clinical reviewer to be confirmed",
    lastReviewed: "8 August 2026",
    reviewed: "8 August 2026",
    version: 1,
  };
}

const profiles = {
  cycle: {
    causes: ["The menstrual cycle is coordinated by GnRH from the brain, FSH and LH from the pituitary gland, and oestrogen and progesterone from the ovaries.", "Changes in ovulation, the womb lining or hormone timing alter bleeding, discharge, temperature and symptoms across the cycle."],
    risks: ["Puberty, breastfeeding and perimenopause commonly produce more variable hormone patterns.", "Pregnancy, hormonal contraception, stress, major weight or exercise change, PMOS (PCOS), thyroid disease and high prolactin can disrupt expected stages."],
    diagnosis: ["Track first bleeding day, cycle length, discharge, pain and relevant symptoms for several cycles.", "Pregnancy testing and targeted hormone, thyroid or ultrasound assessment are used when the pattern is persistently abnormal."],
    treatment: ["Normal cycle stages need no treatment; management targets pain, heavy bleeding, absent ovulation or an identified endocrine cause.", "Apps can record patterns but do not confirm ovulation or diagnose a hormonal condition."],
  },
  uterine: {
    causes: ["This structural difference develops while the reproductive tract is forming before birth or after scarring damages the womb cavity.", "Its effect depends on the exact shape, remaining healthy lining and whether the cervix, tubes or kidneys are also affected."],
    risks: ["Congenital uterine differences are not caused by anything done during pregnancy and often have no known risk factor.", "Scarring risk is higher after womb surgery, treatment for retained pregnancy tissue or severe womb infection."],
    diagnosis: ["Pelvic ultrasound is the usual first test; 3D ultrasound, MRI or hysteroscopy defines anatomy more accurately.", "Testing is guided by bleeding, pain, fertility history and pregnancy outcomes rather than an incidental label alone."],
    treatment: ["No treatment is needed when the finding causes no symptoms or reproductive problem.", "Hysteroscopic or specialist surgery is considered only for selected anatomy or scarring after discussing fertility and pregnancy evidence."],
  },
  placental: {
    causes: ["The condition results from where or how the placenta implants, separates or connects to the womb and fetal circulation.", "Placental development begins early in pregnancy, and the exact trigger is often not identifiable."],
    risks: ["Previous caesarean or womb surgery, placenta praevia, multiple pregnancy and assisted conception increase risk for some placental disorders.", "High blood pressure, smoking, abdominal trauma and previous placental complications are relevant to separation or impaired function."],
    diagnosis: ["Ultrasound assesses placental location, blood flow and the relationship to the cervix or womb wall.", "Bleeding or pain requires urgent maternity observations, fetal assessment and blood tests rather than waiting for a routine scan."],
    treatment: ["Care may include activity advice, repeat specialist scans, corticosteroids, hospital observation and a planned timing or mode of birth.", "Heavy bleeding, fetal compromise or maternal instability can require urgent delivery and blood-product support."],
  },
  autonomic: {
    causes: ["Autonomic conditions affect automatic control of heart rate, blood pressure, temperature, digestion and circulation.", "POTS can follow viral illness, surgery or pregnancy and can overlap with joint hypermobility; in many people no single cause is found."],
    risks: ["POTS is diagnosed more often in adolescent girls and younger women and may worsen around menstruation, heat, illness or prolonged standing.", "Dehydration, deconditioning, anaemia, thyroid disease and medicines can mimic or intensify orthostatic symptoms and must be assessed."],
    diagnosis: ["Measure heart rate and blood pressure lying and standing while documenting symptoms; ECG and blood tests exclude common alternatives.", "Specialist testing may include a 10-minute stand or tilt-table test, interpreted against diagnostic criteria and medicine use."],
    treatment: ["Fluids, salt when medically appropriate, compression, pacing and recumbent-to-upright conditioning are commonly used.", "Medicines are selected by a clinician for the person’s blood pressure, heart rate, pregnancy status and symptom pattern."],
  },
  vulval: {
    causes: ["Vulval symptoms can result from irritant or allergic dermatitis, inflammatory skin disease, infection, low-oestrogen tissue change or nerve sensitisation.", "The appearance and distribution of skin change help distinguish conditions that otherwise share itching, burning and pain."],
    risks: ["Eczema, autoimmune disease, menopause, incontinence and repeated exposure to fragranced products increase particular vulval problems.", "Persistent ulceration, thickening, colour change or a new lump requires assessment even without established risk factors."],
    diagnosis: ["A consent-led vulval examination reviews skin, discharge and pain location; swabs or biopsy are used only when indicated.", "Recurrent symptoms should be diagnosed rather than repeatedly treated as thrush without testing."],
    treatment: ["Remove irritants and use bland emollient care while treating the confirmed cause with prescribed steroid, anti-infective or hormonal therapy.", "Long-term inflammatory conditions need follow-up to prevent scarring and assess persistent focal changes."],
  },
  endometriosis: {
    causes: ["Endometriosis tissue responds to hormones and causes inflammation outside the womb; the exact origin remains uncertain.", "Deep, ovarian, bowel or thoracic disease describes location and depth rather than separate causes."],
    risks: ["A close relative with endometriosis increases likelihood and symptoms usually arise during reproductive years.", "Location cannot be predicted from pain severity, and normal ultrasound does not exclude superficial or some deep disease."],
    diagnosis: ["History links pain, bleeding, bowel, bladder, chest or fertility symptoms to the cycle.", "Specialist ultrasound or MRI can map deep disease and endometriomas; laparoscopy may diagnose and treat selected cases."],
    treatment: ["Pain relief and hormonal suppression are common when pregnancy is not being pursued.", "Complex ovarian, bowel, bladder or thoracic disease may need a specialist multidisciplinary surgical and fertility plan."],
  },
  general: {
    causes: ["This topic has several possible biological mechanisms, so the symptom pattern and clinical context are needed to identify the most likely one.", "Hormonal, inflammatory, structural, neurological, infectious and medicine-related explanations are considered where relevant."],
    risks: ["Age, life stage, pregnancy, family history, medicines and previous diagnoses change likelihood but do not confirm the condition.", "A person can be affected without a recognised risk factor, so persistent or progressive symptoms still deserve assessment."],
    diagnosis: ["Assessment starts with onset, pattern, triggers, functional impact, medicines and relevant menstrual or pregnancy history.", "Examination and targeted tests are used to confirm the suspected condition and exclude urgent alternatives."],
    treatment: ["Management targets the confirmed mechanism and the symptoms that most affect daily life.", "Treatment choices should account for pregnancy plans, other conditions, medicine interactions and follow-up."],
  },
};

const nicheSpecs = [
  ["menarche", "Menarche: The First Period", "Puberty", "Menarche is the first menstrual period and usually follows other puberty changes such as breast development and growth of pubic hair.", "first bleeding|puberty changes|irregular early cycles", "cycle"],
  ["imperforate-hymen", "Imperforate Hymen", "Puberty", "An imperforate hymen completely covers the vaginal opening and can block menstrual blood, causing cyclical pain without visible periods after puberty begins.", "monthly abdominal pain|absent visible periods|pelvic pressure|difficulty passing urine", "uterine"],
  ["menstrual-cycle-overview", "The Menstrual Cycle: A Detailed Overview", "Menstrual health", "The cycle includes menstruation, the follicular phase, ovulation and the luteal phase, coordinated by changing reproductive hormones.", "bleeding|cervical mucus change|ovulation|premenstrual symptoms", "cycle"],
  ["menstrual-phase", "The Menstrual Phase", "Menstrual health", "The menstrual phase begins on day one of full bleeding when falling progesterone and oestrogen trigger shedding of the womb lining.", "bleeding|cramps|fatigue|bowel change", "cycle"],
  ["follicular-phase", "The Follicular Phase", "Menstrual health", "During the follicular phase, FSH supports follicle growth and rising oestrogen rebuilds the womb lining before ovulation.", "changing discharge|rising energy|follicle development", "cycle"],
  ["ovulatory-phase", "The Ovulatory Phase", "Menstrual health", "A surge in LH triggers release of an egg, while cervical mucus becomes wetter and more sperm-friendly around the fertile window.", "slippery cervical mucus|brief one-sided pain|temperature shift", "cycle"],
  ["luteal-phase", "The Luteal Phase", "Menstrual health", "After ovulation, the corpus luteum produces progesterone to support the womb lining until pregnancy begins or hormone levels fall before a period.", "breast tenderness|bloating|temperature rise|premenstrual symptoms", "cycle"],
  ["cervical-mucus", "Understanding Cervical Mucus", "Menstrual health", "Cervical mucus changes with oestrogen, becoming wetter near ovulation and thicker after ovulation; infection causes a different pattern of discharge.", "clear stretchy mucus|creamy discharge|dry days|odour or irritation", "cycle"],
  ["basal-body-temperature", "Basal Body Temperature Tracking", "Fertility", "Progesterone raises resting temperature slightly after ovulation, so basal temperature can confirm a shift retrospectively but cannot predict it reliably.", "small temperature rise|cycle chart|sleep-related variation", "cycle"],
  ["anovulation", "Anovulation", "Hormonal health", "Anovulation means an egg is not released during a cycle and can cause irregular, absent or unexpectedly heavy bleeding.", "irregular periods|missed periods|unpredictable bleeding|fertility difficulty", "cycle"],
  ["amenorrhoea", "Amenorrhoea", "Menstrual health", "Amenorrhoea means periods have not started by the expected age or have stopped for several months when pregnancy is not the explanation.", "absent periods|puberty change|hot flushes|headache or vision symptoms", "cycle"],
  ["oligomenorrhoea", "Oligomenorrhoea", "Menstrual health", "Oligomenorrhoea describes infrequent periods, usually reflecting infrequent ovulation rather than simply a longer personal cycle.", "widely spaced periods|acne|hair growth|fertility difficulty", "cycle"],
  ["midcycle-spotting", "Mid-Cycle Spotting", "Menstrual health", "Light spotting can occur around ovulation, but recurrent bleeding between periods also has cervical, contraceptive, infectious and womb-related causes.", "light spotting|ovulation signs|bleeding after sex|pelvic pain", "cycle"],
  ["decidual-cast", "Decidual Cast", "Menstrual health", "A decidual cast is passage of the womb lining in one piece, which can cause severe cramping and can resemble pregnancy tissue.", "sudden cramps|passage of tissue|bleeding|nausea", "cycle"],
  ["cervical-ectropion", "Cervical Ectropion", "Cervical health", "Cervical ectropion occurs when delicate glandular cells are visible on the outer cervix and may bleed after sex or produce discharge.", "bleeding after sex|increased discharge|spotting", "general"],
  ["nabothian-cysts", "Nabothian Cysts", "Cervical health", "Nabothian cysts are small mucus-filled bumps on the cervix formed when surface cells cover a mucus-producing gland.", "usually no symptoms|incidental cervical finding", "general"],
  ["retroverted-uterus", "Retroverted Uterus", "Gynaecological", "A retroverted uterus tilts backwards toward the spine and is a common anatomical variation rather than a disease.", "often no symptoms|deep pain during sex|pelvic pressure", "uterine"],
  ["septate-uterus", "Septate Uterus", "Gynaecological", "A septate uterus contains a band of tissue dividing part or all of the womb cavity and can be associated with miscarriage.", "often no symptoms|recurrent miscarriage|pregnancy complication", "uterine"],
  ["bicornuate-uterus", "Bicornuate Uterus", "Gynaecological", "A bicornuate uterus has two upper cavities because the developing reproductive ducts did not fully join before birth.", "often no symptoms|preterm birth|breech presentation", "uterine"],
  ["asherman-syndrome", "Asherman Syndrome", "Gynaecological", "Asherman syndrome is scar tissue inside the womb that can reduce bleeding, cause pain or affect fertility and pregnancy.", "very light periods|absent periods|cyclical pain|infertility", "uterine"],
  ["hydrosalpinx", "Hydrosalpinx", "Fertility", "A hydrosalpinx is a fluid-filled blocked fallopian tube, usually resulting from previous inflammation or infection.", "fertility difficulty|pelvic pain|unusual discharge", "uterine"],
  ["diminished-ovarian-reserve", "Diminished Ovarian Reserve", "Fertility", "Diminished ovarian reserve means fewer recruitable follicles than expected and mainly affects response to fertility treatment rather than proving infertility.", "fertility difficulty|lower AMH|lower egg yield", "cycle"],
  ["premature-ovarian-insufficiency", "Premature Ovarian Insufficiency", "Hormonal health", "Premature ovarian insufficiency is loss or intermittent failure of ovarian function before age 40, causing low oestrogen and irregular or absent periods.", "missed periods|hot flushes|vaginal dryness|fertility difficulty", "cycle"],
  ["chemical-pregnancy", "Chemical Pregnancy", "Pregnancy loss", "A chemical pregnancy is a very early miscarriage after a positive pregnancy test but before a pregnancy can usually be seen on ultrasound.", "positive then negative test|late bleeding|mild cramps", "general"],
  ["anembryonic-pregnancy", "Anembryonic Pregnancy", "Pregnancy loss", "An anembryonic pregnancy occurs when a pregnancy sac develops but an embryo does not develop or stops at a very early stage.", "bleeding|cramping|pregnancy symptoms|uncertain scan", "general"],
  ["vanishing-twin", "Vanishing Twin", "Pregnancy", "Vanishing twin describes early loss of one embryo in a multiple pregnancy while another continues developing.", "light bleeding|cramps|change on follow-up scan", "general"],
  ["placenta-praevia", "Placenta Praevia", "Pregnancy complication", "Placenta praevia means the placenta lies low in the womb and partly or completely covers the cervix, creating a risk of painless bleeding.", "painless bright-red bleeding|low placenta on scan", "placental"],
  ["placenta-accreta-spectrum", "Placenta Accreta Spectrum", "Pregnancy complication", "Placenta accreta spectrum occurs when placental tissue attaches too deeply into the womb wall and may not separate safely after birth.", "usually scan finding|placenta praevia|bleeding risk", "placental"],
  ["placental-abruption", "Placental Abruption", "Pregnancy complication", "Placental abruption is premature separation of the placenta from the womb wall and can reduce oxygen supply while causing severe bleeding.", "sudden abdominal pain|bleeding|tight tender womb|reduced movement", "placental"],
  ["vasa-praevia", "Vasa Praevia", "Pregnancy complication", "Vasa praevia occurs when unprotected fetal blood vessels cross near the cervix and can tear when membranes rupture.", "often scan finding|bleeding after waters break|fetal heart-rate change", "placental"],
  ["cervical-insufficiency", "Cervical Insufficiency", "Pregnancy complication", "Cervical insufficiency means the cervix shortens or opens too early, sometimes with little pain, increasing late miscarriage or preterm birth risk.", "pelvic pressure|watery discharge|cervical shortening|early opening", "placental"],
  ["gestational-hypertension", "Gestational Hypertension", "Pregnancy complication", "Gestational hypertension is new high blood pressure after 20 weeks without the organ findings required for pre-eclampsia.", "often no symptoms|high blood pressure|headache", "placental"],
  ["hellp-syndrome", "HELLP Syndrome", "Pregnancy emergency", "HELLP combines red-blood-cell breakdown, raised liver enzymes and low platelets and is a severe pregnancy complication related to pre-eclampsia.", "upper abdominal pain|nausea|headache|feeling very unwell", "placental"],
  ["polyhydramnios", "Polyhydramnios", "Pregnancy complication", "Polyhydramnios means there is more amniotic fluid than expected and may cause a rapidly enlarging bump, breathlessness or early contractions.", "large bump|tightness|breathlessness|early contractions", "placental"],
  ["oligohydramnios", "Oligohydramnios", "Pregnancy complication", "Oligohydramnios means there is less amniotic fluid than expected and can reflect ruptured membranes, placental function or fetal urinary development.", "fluid leak|small bump|reduced movement|scan finding", "placental"],
  ["fetal-growth-restriction", "Fetal Growth Restriction", "Pregnancy complication", "Fetal growth restriction means a baby is not reaching its growth potential, often because placental function is limited.", "small fundal measurement|slower scan growth|reduced movement", "placental"],
  ["large-for-gestational-age", "Large for Gestational Age", "Pregnancy", "Large for gestational age means estimated size is above the expected range, which may reflect genetics, diabetes or dating uncertainty.", "large fundal measurement|higher estimated weight|birth-planning questions", "placental"],
  ["breech-presentation", "Breech Presentation", "Pregnancy", "A breech baby is positioned bottom- or feet-first near the end of pregnancy rather than head-first.", "position found on examination|hard head under ribs|scan confirmation", "placental"],
  ["transverse-lie", "Transverse Lie", "Pregnancy", "Transverse lie means the baby is sideways across the womb, which prevents vaginal birth if it persists when labour begins.", "sideways position|unusual bump shape|scan confirmation", "placental"],
  ["group-b-strep-pregnancy", "Group B Strep in Pregnancy", "Pregnancy infection", "Group B Streptococcus commonly lives in the bowel or vagina without symptoms but can rarely cause serious newborn infection around birth.", "usually no symptoms|positive swab or urine result|newborn risk", "general"],
  ["rhesus-negative-pregnancy", "Rhesus-Negative Blood in Pregnancy", "Pregnancy", "When an RhD-negative pregnant person carries an RhD-positive baby, exposure to fetal blood can trigger antibodies affecting this or later pregnancies.", "usually no symptoms|blood-group result|antibody screen", "general"],
  ["pots", "Postural Orthostatic Tachycardia Syndrome (POTS)", "Autonomic health", "POTS causes an excessive sustained heart-rate rise on standing with dizziness, palpitations, fatigue and exercise intolerance.", "standing dizziness|rapid heart rate|palpitations|fatigue|brain fog", "autonomic"],
  ["dysautonomia", "Dysautonomia", "Autonomic health", "Dysautonomia is an umbrella term for disorders of automatic body functions including heart rate, blood pressure, sweating, digestion and temperature control.", "dizziness|palpitations|sweating change|digestive symptoms|temperature intolerance", "autonomic"],
  ["vasovagal-syncope", "Vasovagal Syncope", "Autonomic health", "Vasovagal syncope is fainting caused by a reflex fall in heart rate and blood pressure, often after pain, heat, fear or prolonged standing.", "warning nausea|sweating|tunnel vision|brief faint", "autonomic"],
  ["orthostatic-hypotension", "Orthostatic Hypotension", "Autonomic health", "Orthostatic hypotension is a significant blood-pressure drop after standing, causing light-headedness, weakness or fainting.", "standing dizziness|blurred vision|weakness|fainting", "autonomic"],
  ["hypermobility-spectrum", "Hypermobility Spectrum Disorders", "Whole-body health", "Hypermobility spectrum disorders involve symptomatic joint hypermobility with pain, instability or soft-tissue injury not explained by another condition.", "flexible joints|sprains|joint pain|fatigue|proprioception difficulty", "general"],
  ["hypermobile-eds", "Hypermobile Ehlers-Danlos Syndrome", "Whole-body health", "Hypermobile EDS is a heritable connective-tissue disorder involving generalised joint hypermobility, instability, pain and other systemic features.", "joint hypermobility|dislocations|chronic pain|soft skin|fatigue", "general"],
  ["me-cfs-women", "ME/CFS in Women", "Whole-body health", "ME/CFS is a long-term condition whose defining feature is post-exertional malaise: delayed worsening after physical, cognitive or emotional effort.", "post-exertional malaise|unrefreshing sleep|brain fog|orthostatic symptoms", "general"],
  ["long-covid-women", "Long COVID in Women", "Whole-body health", "Long COVID describes symptoms continuing after COVID-19, including fatigue, breathlessness, cognitive difficulty, pain and autonomic symptoms.", "fatigue|post-exertional worsening|breathlessness|brain fog|palpitations", "general"],
  ["raynauds-phenomenon", "Raynaud’s Phenomenon", "Circulation", "Raynaud’s causes fingers or toes to change colour and become numb or painful when small blood vessels overreact to cold or stress.", "white blue red colour change|cold fingers|numbness|pain", "general"],
  ["lipoedema", "Lipoedema", "Whole-body health", "Lipoedema is a long-term condition causing disproportionate, often painful fat distribution in the legs and sometimes arms while usually sparing feet and hands.", "symmetrical limb enlargement|pain|easy bruising|ankle cuff", "general"],
  ["hidradenitis-suppurativa", "Hidradenitis Suppurativa", "Skin health", "Hidradenitis suppurativa causes recurrent painful nodules, abscesses and tunnels in skin folds such as the groin, under breasts and armpits.", "painful lumps|drainage|scarring|recurrent abscesses", "general"],
  ["vulval-dermatitis", "Vulval Dermatitis", "Vulval health", "Vulval dermatitis causes itching, burning and inflamed skin after irritant or allergic exposure or as part of eczema.", "itching|burning|redness|skin cracks", "vulval"],
  ["vulval-lichen-planus", "Vulval Lichen Planus", "Vulval health", "Vulval lichen planus is an inflammatory condition that can cause soreness, erosions, discharge and scarring around the vulva and vagina.", "burning pain|red glazed areas|discharge|scarring", "vulval"],
  ["pelvic-congestion-syndrome", "Pelvic Congestion Syndrome", "Pelvic health", "Pelvic congestion syndrome is chronic pelvic pain associated with enlarged pelvic veins and pain that may worsen after standing or later in the day.", "dull pelvic ache|pain after standing|pain after sex|visible varicose veins", "general"],
  ["pudendal-neuralgia", "Pudendal Neuralgia", "Pelvic health", "Pudendal neuralgia is burning, shooting or electric pain in the areas supplied by the pudendal nerve and often worsens with sitting.", "burning genital pain|pain sitting|rectal pain|sexual pain", "general"],
  ["deep-endometriosis", "Deep Endometriosis", "Endometriosis", "Deep endometriosis grows beneath the surface of pelvic tissues and may involve ligaments, vagina, bowel, bladder or ureters.", "severe pelvic pain|deep pain during sex|bowel pain|urinary pain", "endometriosis"],
  ["ovarian-endometrioma", "Ovarian Endometrioma", "Endometriosis", "An endometrioma is an ovarian cyst formed by endometriosis and containing old blood, sometimes called a chocolate cyst.", "pelvic pain|pain during sex|fertility difficulty|ovarian cyst", "endometriosis"],
  ["bowel-endometriosis", "Bowel Endometriosis", "Endometriosis", "Bowel endometriosis most often affects the rectum or sigmoid colon and can cause cyclical bowel pain, constipation, diarrhoea or bleeding.", "painful bowel movements|cyclical constipation|diarrhoea|rectal bleeding", "endometriosis"],
  ["bladder-endometriosis", "Bladder and Ureter Endometriosis", "Endometriosis", "Urinary-tract endometriosis can affect the bladder or ureters and may cause cyclical pain, blood in urine or silent kidney obstruction.", "painful urination|cyclical bladder pain|blood in urine|flank pain", "endometriosis"],
  ["thoracic-endometriosis", "Thoracic Endometriosis", "Endometriosis", "Thoracic endometriosis affects the chest lining, diaphragm or lung and can cause chest or shoulder pain, breathlessness or lung collapse around menstruation.", "cyclical chest pain|shoulder-tip pain|breathlessness|coughing blood", "endometriosis"],
  ["endometriosis-fertility", "Endometriosis and Fertility", "Fertility", "Endometriosis may affect fertility through inflammation, distorted pelvic anatomy, ovarian endometriomas or reduced ovarian reserve after disease or surgery.", "difficulty conceiving|pelvic pain|endometrioma|fertility-planning questions", "endometriosis"],
];

function createNiche([id, title, category, summary, symptomText, profileKey]) {
  const profile = profiles[profileKey];
  const symptoms = symptomText.split("|");
  return {
    id, slug: id, title, category, readTime: 8, summary,
    quickFacts: [summary, profile.causes[0], profile.diagnosis[0]],
    symptoms,
    causes: profile.causes,
    riskFactors: profile.risks,
    diagnosis: profile.diagnosis,
    treatments: profile.treatment,
    selfCare: [`Track ${symptoms.slice(0, 4).join(", ")} with timing, triggers, severity and functional impact.`, "Use NHS or HSE safety-net advice and ask a clinician or pharmacist before changing medicines, supplements or pregnancy care."],
    whenToSeeGP: [`${symptoms[0]} is persistent, worsening, recurrent or different from your normal pattern.`, "Symptoms affect normal activities, sleep, mobility, eating, sex, fertility, pregnancy, bladder, bowel or mental wellbeing."],
    emergencySigns: ["Seek urgent help for collapse, severe or rapidly worsening pain, heavy bleeding, breathing difficulty, new neurological symptoms or pregnancy warning signs."],
    sources: [NHS_AZ, HSE_WOMENS_HEALTH],
    clinicalReviewer: "Clinical reviewer to be confirmed", lastReviewed: "8 August 2026", reviewed: "8 August 2026", version: 1,
  };
}

export const nicheConditions = [
  ...Object.entries(pregnancyMilestones).map(([week, milestone]) => pregnancyWeek(Number(week), milestone)),
  ...nicheSpecs.map(createNiche),
];
