import { createPlanFromJourney, JOURNEYS } from "../src/utils/shePlan.js";

const errors = [];
const expectedJourneys = ["heavy-periods", "cycle-changed", "pregnancy-postpartum"];

for (const journeyId of expectedJourneys) {
  const journey = JOURNEYS[journeyId];
  if (!journey) {
    errors.push(`Missing flagship journey: ${journeyId}`);
    continue;
  }
  if (journey.questions.length < 5) errors.push(`${journeyId}: expected at least five focused questions`);

  const plan = createPlanFromJourney(journeyId, {
    symptoms: "Example symptom pattern affecting normal activity",
    duration: "3–6 months",
    severity: "Moderate — affecting some normal activities",
    cycleContext: "Example cycle context",
    questions: "What should happen next?",
  }, { medications: ["Example medication"], conditions: ["Example history"] });

  for (const field of ["symptoms", "duration", "severity", "cycleContext", "medications", "relevantHistory", "questions"]) {
    if (!plan.appointment[field]) errors.push(`${journeyId}: appointment summary missing ${field}`);
  }
  for (const destination of ["learn", "products", "services"]) {
    if (!plan.links[destination]) errors.push(`${journeyId}: missing ${destination} connection`);
  }
  const serviceQuery = new URL(`https://example.test${plan.links.services}`).searchParams.get("q") || "";
  if (serviceQuery.split(/\s+/).length > 2) errors.push(`${journeyId}: service search is too broad for SHE Map matching`);
  if (!plan.reasons.some((reason) => reason.startsWith("SHE is showing this because"))) {
    errors.push(`${journeyId}: missing visible recommendation rationale`);
  }
}

const urgentPlan = createPlanFromJourney("pregnancy-postpartum", {
  symptoms: "Heavy bleeding and reduced baby movement",
  duration: "Today",
  severity: "Very unwell, severe pain, heavy bleeding, breathing difficulty, faintness or reduced baby movement",
  cycleContext: "Pregnant — 20 weeks or more",
  questions: "Who should I call?",
});

if (!urgentPlan.urgent || !urgentPlan.nextSteps.some((step) => /urgent/i.test(step))) {
  errors.push("Urgent pregnancy/postpartum answers must produce an urgent route rather than routine monitoring.");
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Validated three flagship journeys, SHE Plans, trust reasons, cross-links and urgent escalation.");
