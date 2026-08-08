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
expect("brief symptom statement asks questions", /few details would help/i.test(symptom.text));
expect("brief symptom statement is acknowledged", /sorry|frustrating|thanks/i.test(symptom.text));

const clarification = { id: "s1", role: "she", text: symptom.text };
const followUpUser = { id: "u2", role: "user", text: "About three months, severe and worse around my period" };
const followUp = generateSHEReply({
  message: followUpUser.text,
  conversation: [symptomUser, clarification, followUpUser],
});
expect("follow-up uses prior turn", !/few details would help/i.test(followUp.text));
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

if (failures.length) {
  console.error(failures.map((failure) => `FAIL: ${failure}`).join("\n"));
  await server.close();
  process.exit(1);
}

console.log("Validated conversational greetings, clarification, memory, retrieval and uncertainty handling.");
await server.close();
