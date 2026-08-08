export const SHE_PLAN_KEY = "she-health-plans-v1";
export const SHE_MEMORY_CONSENT_KEY = "she-memory-consent-v1";

export const JOURNEYS = {
  "heavy-periods": {
    id: "heavy-periods",
    label: "Heavy or painful periods",
    shortLabel: "Periods",
    description: "Make sense of bleeding, pain and the impact on your day.",
    learnQuery: "heavy painful periods",
    productQuery: "heavy period pain relief",
    serviceQuery: "pelvic pain",
    questions: [
      { id: "symptoms", label: "What has been happening?", hint: "For example: flooding, clots, pain, bleeding through products or missed work.", type: "textarea" },
      { id: "duration", label: "How long has this pattern been happening?", type: "select", options: ["This is the first time", "Less than 3 months", "3–6 months", "Longer than 6 months"] },
      { id: "severity", label: "How much is it affecting you?", type: "select", options: ["Mild — noticeable but manageable", "Moderate — affecting some normal activities", "Severe — stopping normal activities", "Urgent — I feel faint, very unwell or cannot manage the bleeding"] },
      { id: "cycleContext", label: "Where does this sit in your cycle?", hint: "Include cycle length, bleeding days, contraception or whether it has recently changed.", type: "textarea" },
      { id: "questions", label: "What do you most want answered?", hint: "For example: Could I be anaemic? What assessment should I ask for?", type: "textarea" },
    ],
  },
  "cycle-changed": {
    id: "cycle-changed",
    label: "My cycle has changed",
    shortLabel: "Cycle change",
    description: "Capture what changed, when it began and what may be relevant.",
    learnQuery: "irregular periods cycle changes",
    productQuery: "cycle tracking pregnancy tests",
    serviceQuery: "menstrual",
    questions: [
      { id: "symptoms", label: "What changed?", hint: "For example: timing, skipped periods, bleeding between periods, flow, pain or new symptoms.", type: "textarea" },
      { id: "duration", label: "When did you first notice the change?", type: "select", options: ["This cycle", "Within the last 3 months", "3–6 months ago", "More than 6 months ago"] },
      { id: "cycleContext", label: "What else may be relevant?", hint: "Pregnancy possibility, contraception, stress, weight change, exercise, illness or life stage.", type: "textarea" },
      { id: "severity", label: "How much is it affecting you?", type: "select", options: ["Mostly curious", "Worried but managing", "Affecting daily life", "Severe pain, very heavy bleeding, faintness or I feel very unwell"] },
      { id: "questions", label: "What would you like a clinician to help answer?", type: "textarea" },
    ],
  },
  "pregnancy-postpartum": {
    id: "pregnancy-postpartum",
    label: "Pregnancy or postpartum concern",
    shortLabel: "Pregnancy & postpartum",
    description: "Organise a concern and find the safest appropriate next step.",
    learnQuery: "pregnancy postpartum warning signs",
    productQuery: "pregnancy postpartum recovery",
    serviceQuery: "maternity",
    questions: [
      { id: "cycleContext", label: "Which stage best describes you?", type: "select", options: ["Pregnant — under 20 weeks", "Pregnant — 20 weeks or more", "Up to 6 weeks after birth", "More than 6 weeks after birth", "Not sure / pregnancy possible"] },
      { id: "symptoms", label: "What is concerning you?", hint: "Describe the symptom, where it is, and anything that happened before it began.", type: "textarea" },
      { id: "duration", label: "When did it begin?", type: "select", options: ["Within the last hour", "Today", "Within the last week", "Longer than a week"] },
      { id: "severity", label: "How are you feeling right now?", type: "select", options: ["Generally well", "Uncomfortable or worried", "Symptoms are affecting normal activity", "Very unwell, severe pain, heavy bleeding, breathing difficulty, faintness or reduced baby movement"] },
      { id: "questions", label: "What do you most need help deciding?", hint: "For example: who to call, whether this needs checking, or what to ask.", type: "textarea" },
    ],
  },
};

export function readPlans() {
  try {
    const value = JSON.parse(window.localStorage.getItem(SHE_PLAN_KEY) || "[]");
    return Array.isArray(value) ? value.map(normalisePlanLinks) : [];
  } catch {
    return [];
  }
}

function normalisePlanLinks(plan) {
  const journey = JOURNEYS[plan?.journeyId];
  if (!journey) return plan;
  return {
    ...plan,
    links: {
      learn: `/learn?q=${encodeURIComponent(journey.learnQuery)}`,
      products: `/products?q=${encodeURIComponent(journey.productQuery)}`,
      services: `/services?q=${encodeURIComponent(journey.serviceQuery)}&view=list`,
    },
  };
}

export function savePlan(plan) {
  const next = [plan, ...readPlans().filter((item) => item.id !== plan.id)].slice(0, 12);
  window.localStorage.setItem(SHE_PLAN_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("she-plan-updated"));
  return next;
}

export function deletePlan(id) {
  const next = readPlans().filter((plan) => plan.id !== id);
  window.localStorage.setItem(SHE_PLAN_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("she-plan-updated"));
  return next;
}

export function hasMemoryConsent() {
  return window.localStorage.getItem(SHE_MEMORY_CONSENT_KEY) === "yes";
}

export function setMemoryConsent(allowed) {
  window.localStorage.setItem(SHE_MEMORY_CONSENT_KEY, allowed ? "yes" : "no");
}

export function createPlanFromJourney(journeyId, answers, profile = {}) {
  const journey = JOURNEYS[journeyId];
  const now = new Date();
  const urgent = isUrgentAnswer(answers.severity);
  const symptoms = answers.symptoms?.trim() || "Not recorded";
  const medicationText = (profile.medications || []).join(", ") || "None recorded";
  const history = (profile.conditions || []).join(", ") || "None recorded";

  return {
    id: `${journeyId}-${Date.now()}`,
    journeyId,
    title: journey.label,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    status: "active",
    summary: symptoms,
    appointment: {
      symptoms,
      duration: answers.duration || "Not recorded",
      severity: answers.severity || "Not recorded",
      cycleContext: answers.cycleContext?.trim() || "Not recorded",
      medications: medicationText,
      relevantHistory: history,
      questions: answers.questions?.trim() || "What could explain this pattern, and what should happen next?",
    },
    nextSteps: urgent
      ? [
          "Seek urgent clinical advice now rather than waiting to monitor this in SHE.",
          "If symptoms are severe or rapidly worsening, call emergency services (999/112).",
          "Take this summary and your medicines list if you attend urgent care.",
        ]
      : buildNextSteps(journeyId),
    urgent,
    links: {
      learn: `/learn?q=${encodeURIComponent(journey.learnQuery)}`,
      products: `/products?q=${encodeURIComponent(journey.productQuery)}`,
      services: `/services?q=${encodeURIComponent(journey.serviceQuery)}&view=list`,
    },
    reasons: buildReasons(journeyId, answers),
  };
}

export function exportAppointmentSummary(plan) {
  const a = plan.appointment;
  const text = [
    "MY SHE APPOINTMENT SUMMARY",
    `Prepared: ${new Date(plan.updatedAt || plan.createdAt).toLocaleDateString("en-GB")}`,
    "",
    `Reason for appointment: ${plan.title}`,
    `Symptoms: ${a.symptoms}`,
    `Duration: ${a.duration}`,
    `Severity and impact: ${a.severity}`,
    `Cycle / pregnancy context: ${a.cycleContext}`,
    `Current medications and supplements: ${a.medications}`,
    `Relevant history: ${a.relevantHistory}`,
    `Questions I want answered: ${a.questions}`,
    "",
    "Suggested next steps",
    ...plan.nextSteps.map((step) => `- ${step}`),
    "",
    "This summary was created from information entered by the user. SHE provides health information and navigation support, not a diagnosis.",
  ].join("\n");

  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `SHE-appointment-summary-${new Date().toISOString().slice(0, 10)}.txt`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function isUrgentAnswer(value = "") {
  return /urgent|very unwell|severe pain|heavy bleeding|breathing difficulty|faint|reduced baby movement/i.test(value);
}

function buildNextSteps(journeyId) {
  const shared = ["Keep a short dated record of symptoms and their effect on sleep, work or normal activity."];
  if (journeyId === "heavy-periods") return [...shared, "Arrange a GP appointment if bleeding or pain is disrupting life, worsening or persistent.", "Ask whether a blood count and iron assessment may be appropriate."];
  if (journeyId === "cycle-changed") return [...shared, "Take a pregnancy test if pregnancy is possible.", "Arrange clinical advice for persistent changes, bleeding between periods or bleeding after sex."];
  return [...shared, "Contact your maternity unit, midwife, GP or out-of-hours service if you are worried.", "Use urgent maternity advice for bleeding, severe pain, severe headache, breathing difficulty or reduced baby movement."];
}

function buildReasons(journeyId, answers) {
  const reason = journeyId === "heavy-periods"
    ? "you described a bleeding or pain pattern that may be useful to assess alongside its impact and possible iron-deficiency symptoms"
    : journeyId === "cycle-changed"
      ? "a change from your usual cycle is most useful when timing, pregnancy possibility, contraception and wider changes are considered together"
      : "pregnancy and the postnatal period have stage-specific routes to care, so timing and how unwell you feel affect the safest next step";
  return [`SHE is showing this because ${reason}.`, answers.duration ? `Your timeline (${answers.duration.toLowerCase()}) has been included so a clinician can see whether this is new or persistent.` : ""] .filter(Boolean);
}
