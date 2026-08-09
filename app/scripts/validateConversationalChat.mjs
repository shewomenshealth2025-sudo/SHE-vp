import { createServer } from "vite";

const server = await createServer({
  appType: "custom",
  logLevel: "error",
  server: { middlewareMode: true },
});

const { generateSHEReply } = await server.ssrLoadModule("/src/utils/chatEngine.js");

const failures = [];

function expect(name, condition) {
  if (!condition) failures.push(name);
}

const greeting = generateSHEReply({ message: "Hi", conversation: [] });
expect("greeting feels conversational", /how are you doing/i.test(greeting.text));
expect("greeting offers choices", greeting.suggestions.length >= 2);

const symptomUser = { id: "u1", role: "user", text: "I keep getting pelvic pain" };
const symptom = generateSHEReply({ message: symptomUser.text, conversation: [symptomUser] });
expect("brief symptom statement asks one question at a time", /one useful question at a time/i.test(symptom.text));
expect("brief symptom statement is acknowledged", /sorry|frustrating|thanks/i.test(symptom.text));

const clarification = { id: "s1", role: "she", text: symptom.text };
const followUpUser = { id: "u2", role: "user", text: "About three months, severe and worse around my period, with nausea" };
const followUp = generateSHEReply({
  message: followUpUser.text,
  conversation: [symptomUser, clarification, followUpUser],
});
expect("follow-up uses prior turn", !/one useful question at a time/i.test(followUp.text));
expect("follow-up produces grounded interpretation", /SHE Learn|pattern|overlap|medical help/i.test(followUp.text));

const definition = generateSHEReply({ message: "What is POTS?", conversation: [] });
expect("definition retrieves Learn knowledge", /POTS|postural/i.test(definition.text));
expect("definition supplies follow-ups", definition.suggestions.length >= 2);
expect("definition is concise", definition.text.length < 1800);
expect("definition includes cause", /Cause/i.test(definition.text));
expect("definition links the full article", definition.article?.id === "pots");

const casual = generateSHEReply({ message: "How are you?", conversation: [] });
expect("casual conversation does not force health search", /ready to help|just having a chat/i.test(casual.text));

const uncertain = generateSHEReply({ message: "That weird thing is back", conversation: [] });
expect("uncertain language is handled honestly", /not completely sure|tell me a little more/i.test(uncertain.text));

const urgentWorried = generateSHEReply({ message: "I am scared because I am pregnant and the baby is not moving", conversation: [] });
expect("urgent warning overrides emotional reassurance", urgentWorried.urgency === "urgent" && /maternity assessment|urgent pregnancy/i.test(urgentWorried.text));

const heavyBleeding = generateSHEReply({ message: "I am soaking a pad every hour and feel faint", conversation: [] });
expect("specific heavy-bleeding red flags escalate", heavyBleeding.urgency === "urgent");

const ordinaryHeavyPeriod = generateSHEReply({ message: "My periods are heavier than usual", conversation: [{ role: "user", text: "My periods are heavier than usual" }] });
expect("non-specific heavy periods are clarified rather than automatically escalated", ordinaryHeavyPeriod.urgency !== "urgent" && /one useful question/i.test(ordinaryHeavyPeriod.text));

const contextual = generateSHEReply({
  message: "I have had pelvic pain for six months, it is severe, worse around my period and comes with nausea",
  conversation: [{ role: "user", text: "I have had pelvic pain for six months, it is severe, worse around my period and comes with nausea" }],
  healthContext: { enabled: true, lifeStage: "Menstrual health", conditions: ["Endometriosis"] },
});
expect("consented health context is acknowledged", /details you chose to share/i.test(contextual.text));

const correctionUser = { role: "user", text: "Actually, I meant the pain is on my left side, not my right" };
const correction = generateSHEReply({ message: correctionUser.text, conversation: [symptomUser, clarification, correctionUser] });
expect("corrections supersede prior details", /latest detail rather than the earlier one/i.test(correction.text));

if (failures.length) {
  console.error(failures.map((failure) => `FAIL: ${failure}`).join("\n"));
  await server.close();
  process.exit(1);
}

console.log("Validated conversational greetings, clarification, memory, retrieval and uncertainty handling.");
await server.close();
