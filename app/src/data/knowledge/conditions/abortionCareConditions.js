const sources = [
  { title: "NHS — Abortion", url: "https://www.nhs.uk/tests-and-treatments/abortion/" },
  { title: "NHS — How an abortion is done", url: "https://www.nhs.uk/tests-and-treatments/abortion/what-happens/" },
  { title: "NHS — Recovery after an abortion", url: "https://www.nhs.uk/tests-and-treatments/abortion/recovery/" },
  { title: "NHS — Complications of an abortion", url: "https://www.nhs.uk/tests-and-treatments/abortion/risks/" },
  { title: "HSE — Abortion care", url: "https://www2.hse.ie/conditions/abortion/" },
  { title: "HSE — After an abortion", url: "https://www2.hse.ie/conditions/abortion/after/" },
];

const specs = [
  ["abortion-care-overview", "Abortion Care: An Overview", "Abortion is healthcare that ends a pregnancy using medicines or a procedure, with the appropriate option depending on pregnancy stage, health, preference and local services.", "understanding options|medical or surgical care|access questions|confidential support"],
  ["accessing-abortion-care", "Accessing Abortion Care and the First Appointment", "The first contact usually confirms pregnancy timing, discusses health and medicines, explains available methods and offers confidential information and support without judgement.", "booking care|pregnancy dating|medical history|confidential consultation"],
  ["medical-abortion-medicines", "Mifepristone and Misoprostol: How Abortion Pills Work", "Medical abortion normally uses mifepristone followed by misoprostol: the first medicine blocks pregnancy-supporting hormones and the second causes the womb to contract and empty.", "mifepristone|misoprostol|abortion pills|medicine timing"],
  ["medical-abortion-what-to-expect", "Medical Abortion: What to Expect", "A medical abortion commonly causes strong cramps, bleeding and passage of pregnancy tissue after misoprostol, with timing and intensity varying between individuals.", "strong cramps|vaginal bleeding|passing clots or tissue|nausea or diarrhoea"],
  ["surgical-abortion-guide", "Surgical Abortion: What to Expect", "Surgical abortion removes a pregnancy through the cervix using suction or instruments, with local anaesthetic, sedation or general anaesthetic depending on the procedure and service.", "suction procedure|sedation or anaesthetic|same-day care|post-procedure bleeding"],
  ["medical-vs-surgical-abortion", "Medical vs Surgical Abortion", "Medical and surgical abortion are both effective, but differ in timing, setting, predictability, pain, bleeding, anaesthesia and how directly someone experiences the process.", "method comparison|home or clinic care|pain and bleeding|personal preference"],
  ["pain-relief-abortion", "Pain Relief During and After an Abortion", "Cramping is expected with abortion care, particularly during a medical abortion, and the treating service should explain safe pain relief, what is expected and when pain needs assessment.", "uterine cramps|pain medicine|heat support|severe pain warning signs"],
  ["bleeding-after-abortion", "Bleeding After an Abortion", "Bleeding can continue for several weeks after medical or surgical abortion, but very heavy bleeding, worsening symptoms or feeling faint requires urgent clinical advice.", "vaginal bleeding|clots|bleeding pattern|faintness"],
  ["abortion-aftercare-pregnancy-test", "Abortion Aftercare and Follow-up Pregnancy Testing", "Aftercare may include a low-sensitivity pregnancy test, an optional follow-up appointment and advice about bleeding, periods, sex, contraception and ongoing pregnancy symptoms.", "follow-up test|next period|ongoing pregnancy symptoms|recovery questions"],
  ["incomplete-abortion-ongoing-pregnancy", "Incomplete Abortion and Ongoing Pregnancy", "Occasionally pregnancy tissue remains or a pregnancy continues after treatment, requiring prompt reassessment and sometimes more medicine or a surgical procedure.", "positive follow-up test|persistent pregnancy symptoms|continued heavy bleeding|pelvic pain"],
  ["abortion-complications-urgent-help", "Abortion Complications and When to Seek Urgent Help", "Abortion is generally very safe, but heavy bleeding, infection, retained tissue, ongoing pregnancy or rare injury requires timely recognition and appropriate treatment.", "very heavy bleeding|fever or flu-like illness|worsening abdominal pain|unusual discharge"],
  ["emotional-support-after-abortion", "Emotional Wellbeing and Support After an Abortion", "People can experience relief, sadness, mixed feelings or little emotional change after an abortion; confidential support should be available without assuming how someone ought to feel.", "mixed emotions|relief|sadness or anxiety|support preferences"],
  ["fertility-contraception-after-abortion", "Fertility and Contraception After an Abortion", "Fertility can return quickly after an abortion, which does not usually reduce future fertility when there are no complications, so contraception can begin promptly if wanted.", "rapid return of fertility|contraceptive choice|next period|future pregnancy questions"],
];

function createGuide([id, title, summary, symptomText]) {
  const symptoms = symptomText.split("|");
  return {
    id, slug: id, title, category: "Abortion care", readTime: 8, summary,
    quickFacts: [summary, "Care should be confidential, respectful and based on informed choice.", "The treating service should provide clear instructions and a contact route for concerns."],
    symptoms,
    causes: ["The care pathway is shaped by pregnancy stage, medical history, symptoms, individual preference and which methods are clinically available.", "Assessment also considers ectopic-pregnancy risk, medicines, allergies, bleeding risk and whether an examination or scan is needed."],
    riskFactors: ["Later pregnancy stage and some medical conditions can change which setting, monitoring or method is safest.", "A previous complication does not automatically prevent abortion care, but should be discussed with the treating clinician."],
    diagnosis: ["The service confirms pregnancy timing and reviews symptoms, health conditions, medicines and safeguarding or support needs.", "Ultrasound, blood tests, STI testing or examination are used when clinically indicated rather than automatically in every case."],
    treatments: ["Care may involve mifepristone and misoprostol or a surgical procedure using suction or instruments through the cervix.", "Pain relief, aftercare instructions, follow-up and contraception should be discussed as part of the chosen pathway."],
    selfCare: ["Follow the provider’s instructions and keep its 24-hour or urgent contact details available during recovery.", "Use the supplied follow-up pregnancy test at the instructed time and seek advice if it is positive, invalid or unclear."],
    whenToSeeGP: ["Pain, bleeding or pregnancy symptoms are not improving as the service advised.", "You want follow-up, contraception, STI testing or emotional support."],
    emergencySigns: ["Seek urgent help for very heavy bleeding, fainting, severe or worsening pain, fever, offensive discharge, confusion or difficulty breathing."],
    sources, clinicalReviewer: null, lastReviewed: "9 August 2026", reviewed: "9 August 2026", version: 1,
  };
}

export const abortionCareConditions = specs.map(createGuide);

