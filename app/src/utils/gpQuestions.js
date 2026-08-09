export function getGpQuestions(condition) {
  if (condition.gpQuestions?.length) return condition.gpQuestions.slice(0, 7);

  const title = cleanTitle(condition.title);
  const text = [condition.id, condition.title, condition.category, ...(condition.symptoms || [])].join(" ").toLowerCase();
  const questions = [
    `Could ${title} explain the pattern I am experiencing, and what other causes should be ruled out?`,
    topicAssessmentQuestion(title, text),
    topicSpecificQuestion(text),
    `What treatment or management options are appropriate for me, and what are their likely benefits, risks and side effects?`,
    "When should we review this, and what would make a specialist referral appropriate?",
    "Which changes or warning signs would mean I should seek help sooner rather than waiting for a routine follow-up?",
  ];

  return [...new Set(questions.filter(Boolean))].slice(0, 6);
}

function cleanTitle(title = "this condition") {
  return title
    .replace(/, sometimes proposed as PMOS/i, "")
    .replace(/^Pregnancy week (\d+)$/i, "symptoms or concerns at week $1 of pregnancy")
    .replace(/^Understanding /i, "")
    .replace(/^The /, "the ");
}

function topicAssessmentQuestion(title, text) {
  if (/pregnan|antenatal|miscarriage|ectopic/.test(text)) return "Who is the most appropriate person to assess this during pregnancy—my GP, midwife, maternity assessment unit or another service?";
  if (/postpartum|postnatal|after-birth|breastfeed|mastitis/.test(text)) return "Does this need postnatal or feeding support as well as a GP assessment, and who should I contact if it worsens?";
  if (/mental|depress|anxiety|pmdd|pms|trauma|eating-disorder/.test(text)) return "How will you assess the effect on my mood, safety, sleep and daily life, and which support can I access while I wait?";
  if (/fertil|conceiv|infertil|ovulat/.test(text)) return "Which fertility assessments are appropriate, when should they happen, and should my partner be assessed too?";
  if (/menopause|perimenopause/.test(text)) return "Could my symptoms fit perimenopause or menopause, and do I need tests or is assessment based mainly on symptoms and age?";
  if (/autoimmune|lupus|rheumatoid|coeliac|hashimoto|thyroid/.test(text)) return "Which blood tests or examinations could help assess this, and would referral to a specialist be useful?";
  if (/pots|dysautonomia|faint|dizz|palpitation/.test(text)) return "Could you check my lying and standing heart rate and blood pressure, and are an ECG or blood tests appropriate?";
  if (/period|bleed|gynaec|pelvic|uter|ovarian|vulv|vagin|cervi|endometri|adenomy|fibroid|pcos/.test(text)) return `What examination, blood tests or imaging would help assess ${title}, and what would each test tell us?`;
  return `How is ${title} assessed, and which tests would genuinely change the next step?`;
}

function topicSpecificQuestion(text) {
  if (/heavy-period|heavy period|bleed|anaemia|anemia/.test(text)) return "Could bleeding be affecting my iron levels, and should I have a full blood count or ferritin test?";
  if (/pain|endometri|adenomy|migraine/.test(text)) return "What can I use safely for symptom relief now, and how should I record whether it is working?";
  if (/pcos|diabet|metabolic|insulin/.test(text)) return "Do I need checks for blood pressure, blood sugar, cholesterol or other longer-term health risks?";
  if (/contracep|pill|coil|implant|iud/.test(text)) return "Could my contraception be contributing to this, and what alternatives would suit my health needs and priorities?";
  if (/menopause|perimenopause/.test(text)) return "Would HRT or a non-hormonal option be suitable for me, and what factors affect that decision?";
  if (/pregnan|postpartum|postnatal/.test(text)) return "What symptoms are expected at this stage, and which ones need same-day maternity or urgent assessment?";
  if (/autoimmune|lupus|rheumatoid/.test(text)) return "If this is an inflammatory or autoimmune condition, how would flares be recognised and monitored?";
  if (/mental|depress|anxiety|pmdd|pms/.test(text)) return "What treatment choices are available, how quickly might they help, and what should I do if my mental health deteriorates?";
  if (/fertil|conceiv|ovulat/.test(text)) return "How could this affect ovulation or fertility, and should that change when I am referred?";
  return "What should I track before my next appointment so we can judge whether the symptoms are changing or treatment is helping?";
}
