import { buildGroundedResponse } from "./chatKnowledge.js";

const GREETINGS = [
  "hi",
  "hello",
  "hey",
  "hiya",
  "hey there",
  "hello there",
  "good morning",
  "good afternoon",
  "good evening",
];

const THANKS = [
  "thanks",
  "thank you",
  "thankyou",
  "thanks so much",
  "thank you so much",
  "cheers",
];

const GOODBYES = [
  "bye",
  "goodbye",
  "see you",
  "see you later",
  "talk later",
  "speak later",
];

const POSITIVE_REPLIES = [
  "okay",
  "ok",
  "great",
  "perfect",
  "that helps",
  "helpful",
  "got it",
  "makes sense",
  "yes",
  "yeah",
];

const NEGATIVE_REPLIES = [
  "no",
  "not helpful",
  "that didnt help",
  "that didn't help",
  "i dont understand",
  "i don't understand",
  "thats wrong",
  "that's wrong",
];

const CASUAL_CHECK_INS = [
  "how are you",
  "how are you doing",
  "hows it going",
  "how's it going",
];

const EMOTIONAL_PATTERNS = [
  "im scared",
  "i'm scared",
  "im worried",
  "i'm worried",
  "im anxious",
  "i'm anxious",
  "this is worrying me",
  "i feel overwhelmed",
];

const HEALTH_TERMS = [
  "period",
  "periods",
  "menstrual",
  "bleeding",
  "spotting",
  "cramp",
  "cramps",
  "pain",
  "pelvic",
  "bloating",
  "swelling",
  "fatigue",
  "tired",
  "sweating",
  "weight",
  "thyroid",
  "hashimoto",
  "endometriosis",
  "adenomyosis",
  "pcos",
  "fertility",
  "conceive",
  "pregnant",
  "pregnancy",
  "contraception",
  "contraceptive",
  "pill",
  "implant",
  "coil",
  "iud",
  "menopause",
  "perimenopause",
  "discharge",
  "itching",
  "infection",
  "uti",
  "breast",
  "nipple",
  "headache",
  "migraine",
  "nausea",
  "dizzy",
  "dizziness",
  "hormone",
  "hormonal",
  "ovulation",
  "cycle",
  "blood test",
  "lab result",
  "medication",
  "heart races",
  "racing heart",
  "palpitations",
  "faint",
  "standing",
  "joint",
  "bowel",
  "urine",
  "skin",
  "sleep",
  "brain fog",
  "pots",
  "dysautonomia",
];

const EMERGENCY_PATTERNS = [
  "cant breathe",
  "can't breathe",
  "difficulty breathing",
  "chest pain",
  "passed out",
  "fainted",
  "unconscious",
  "suicidal",
  "kill myself",
  "severe allergic reaction",
  "face is swelling",
  "sudden severe pain",
  "reduced baby movement",
  "baby is not moving",
  "one leg is swollen",
  "coughing up blood",
];

export function generateSHEReply({
  message,
  attachments = [],
  conversation = [],
  healthContext = {},
}) {
  const originalMessage = String(message ?? "").trim();
  const normalised = normaliseText(originalMessage);
  const groundedQuery = resolveConversationQuery(originalMessage, conversation);

  if (detectEmergency(normalised)) {
    return reply(createEmergencyResponse(normalised), ["What should I tell urgent care?", "Show me urgent-care options"], { urgency: "urgent" });
  }

  if (attachments.length > 0) {
    return reply(createAttachmentResponse({
      message: originalMessage,
      normalised,
      attachments,
    }), attachmentSuggestions(attachments));
  }

  if (CASUAL_CHECK_INS.includes(normalised)) {
    return reply(
      "I’m here and ready to help. How are you doing — is there something on your mind, or are we just having a chat?",
      ["I have a health question", "I want to talk something through"]
    );
  }

  if (containsAny(normalised, EMOTIONAL_PATTERNS)) {
    return reply(
      "I’m sorry — that sounds unsettling. We can take it one step at a time. What is worrying you most right now: the symptom itself, what it might mean, or getting the right help?",
      ["The symptom itself", "What it might mean", "Getting medical help"]
    );
  }

  if (/^(actually|sorry,? i meant|i meant|correction|not quite)/.test(normalised) || /\bnot .+ but\b/.test(normalised)) {
    return createCorrectionReply(originalMessage, conversation, healthContext);
  }

  const intent = detectIntent(normalised);

  switch (intent) {
    case "empty":
      return reply("What would you like help with today?");

    case "emergency":
      return reply(createEmergencyResponse(normalised), ["What should I tell urgent care?", "Show me urgent-care options"], { urgency: "urgent" });

    case "greeting":
      return reply(
        "Hi! I’m SHE. How are you doing today — what would you like to talk about?",
        ["I have a health question", "Help me understand symptoms", "Help me prepare for an appointment"]
      );

    case "thanks":
      return reply("You’re very welcome. Is there anything else you’d like to talk through?");

    case "goodbye":
      return reply("Take care. You can come back whenever you want to talk something through.");

    case "positive":
      return reply("I’m glad that helped. Would you like to go deeper, look at next steps, or talk about something else?", ["Explain it more simply", "What should I do next?", "Something else"]);

    case "negative":
      return reply([
        "I’m sorry that wasn’t helpful.",
        "Tell me what felt unclear or what you were hoping to understand, and I’ll try a different approach.",
      ].join("\n\n"), ["Explain it more simply", "Give me practical next steps", "I meant something different"]);

    case "identity":
      return reply([
        "I’m SHE, a women’s health navigation assistant.",
        "I can help you understand health information, prepare questions for a clinician and think through appropriate next steps.",
        "I can’t diagnose a condition or replace professional medical care.",
      ].join("\n\n"));

    case "help":
      return reply([
        "Of course. Tell me what has been happening in your own words.",
        "You can include your symptoms, how long they have been happening and what concerns you most.",
      ].join("\n\n"));

    case "symptom_statement":
      return createConversationalHealthReply(originalMessage, groundedQuery, conversation, healthContext);

    case "health_question":
      if (/^(what is|what are|define|explain)\b/.test(normalised)) {
        return createCompactDefinitionReply(groundedQuery);
      }
      return replyWithGroundedAnswer(groundedQuery);

    case "vague":
      return groundedQuery !== originalMessage
        ? replyWithGroundedAnswer(groundedQuery, "", healthContext)
        : ["why", "how", "what", "maybe", "worried"].includes(normalised)
          ? reply(createClarifyingResponse(normalised, conversation))
          : replyWithGroundedAnswer(originalMessage);

    default:
      return createGeneralConversationReply(originalMessage, groundedQuery, conversation);
  }
}

export function generateSHEMessage(options) {
  const message = String(options?.message ?? "").trim();
  const normalised = normaliseText(message);
  const intent = detectIntent(normalised);

  // Backwards-compatible grounded answer API used by the knowledge validation
  // and any non-conversational consumers. The chat UI uses generateSHEReply.
  if (["symptom_statement", "health_question", "vague", "general"].includes(intent)) {
    return createGroundedHealthResponse(
      resolveConversationQuery(message, options?.conversation || [])
    );
  }

  return generateSHEReply(options).text;
}

function reply(text, suggestions = [], metadata = {}) {
  return { text, suggestions, ...metadata };
}

function createCompactDefinitionReply(query) {
  try {
    const response = buildGroundedResponse(query);
    const guide = response.relatedGuides?.[0];
    const relevantSections = response.sections || [];
    const causes = relevantSections.find((section) => /cause|mechanism/i.test(section.title || ""))?.items || [];
    const consequences = relevantSections.find((section) => /involve|symptom|pattern/i.test(section.title || ""))?.items || [];

    if (!response.introduction || !guide) return replyWithGroundedAnswer(query);

    const blocks = [
      response.title || guide.title,
      `Definition\n${response.introduction}`,
    ];

    if (causes.length) {
      blocks.push(`Cause\n${causes.slice(0, 2).join(" ")}`);
    }

    if (consequences.length) {
      blocks.push(`What it can lead to\n${consequences.slice(0, 3).join(", ")}.`);
    }

    blocks.push("That’s the short version. You can open the full SHE Learn article for symptoms, assessment, treatment and sources.");

    return reply(
      blocks.join("\n\n"),
      ["What causes it?", "How is it diagnosed?", "What can help?"],
      { article: { id: guide.id, title: guide.title } }
    );
  } catch {
    return replyWithGroundedAnswer(query);
  }
}

function createConversationalHealthReply(message, groundedQuery, conversation, healthContext = {}) {
  const combinedContext = collectRecentUserContext(conversation);
  const missing = missingSymptomContext(combinedContext || message);

  if (missing.length) {
    const question = missing[0];
    return reply(
      [
        compassionateAcknowledgement(message),
        "I don’t want to jump to a conclusion. Let me ask one useful question at a time.",
        question,
        "Answer however feels natural — you don’t need to use medical language.",
      ].join("\n\n"),
      suggestionsForMissingDetail(question),
      { conversationStage: "clarifying" },
    );
  }

  const contextNote = healthContextSummary(healthContext);
  const acknowledgement = [compassionateAcknowledgement(message), contextNote].filter(Boolean).join(" ");
  return replyWithGroundedAnswer(augmentWithHealthContext(groundedQuery, healthContext), acknowledgement, healthContext);
}

function replyWithGroundedAnswer(query, acknowledgement = "") {
  const answer = createGroundedHealthResponse(query);
  const naturalAnswer = acknowledgement
    ? `${acknowledgement}\n\n${answer}`
    : answer;

  return reply(naturalAnswer, suggestionsForQuery(query));
}

function createCorrectionReply(message, conversation, healthContext) {
  const prior = collectRecentUserContext(conversation.slice(0, -1));
  const query = `${prior}. The latest correction supersedes conflicting earlier details: ${message}`;
  return replyWithGroundedAnswer(
    augmentWithHealthContext(query, healthContext),
    "Thanks for correcting me — I’ll use the latest detail rather than the earlier one.",
  );
}

function createGeneralConversationReply(message, groundedQuery, conversation) {
  const text = normaliseText(message);

  if (/^(i feel|ive been feeling|i've been feeling|today i feel)/.test(text)) {
    return reply(
      "I’m listening. What has been making you feel that way? You can give me the long version.",
      ["It’s mainly my health", "It’s stress or wellbeing", "I’m not sure"]
    );
  }

  if (conversation.length > 1 && groundedQuery !== message) {
    return replyWithGroundedAnswer(groundedQuery);
  }

  return reply(
    "I’m with you, but I’m not completely sure what you mean yet. Tell me a little more in your own words, and I’ll respond to the full picture rather than guessing.",
    ["It’s about my health", "I’m describing how I feel", "I have a general question"]
  );
}

function detectIntent(text) {
  if (!text) {
    return "empty";
  }

  if (containsAny(text, EMERGENCY_PATTERNS)) {
    return "emergency";
  }

  if (GREETINGINGS_OR_VARIANTS(text)) {
    return "greeting";
  }

  if (THANKS.includes(text)) {
    return "thanks";
  }

  if (GOODBYES.includes(text)) {
    return "goodbye";
  }

  if (POSITIVE_REPLIES.includes(text)) {
    return "positive";
  }

  if (NEGATIVE_REPLIES.includes(text)) {
    return "negative";
  }

  if (
    [
      "who are you",
      "what are you",
      "what is she",
      "what can you do",
      "how can you help",
    ].includes(text)
  ) {
    return "identity";
  }

  if (
    [
      "help",
      "help me",
      "please help",
      "i need help",
      "can you help me",
    ].includes(text)
  ) {
    return "help";
  }

  const hasHealthTerm = containsAny(text, HEALTH_TERMS);
  const looksLikeQuestion = isQuestion(text);
  const looksLikeSymptomStatement =
    hasHealthTerm && isSymptomStatement(text);

  if (looksLikeSymptomStatement && !looksLikeQuestion) {
    return "symptom_statement";
  }

  if (hasHealthTerm || looksLikeQuestion) {
    return "health_question";
  }

  if (text.split(" ").length <= 4) {
    return "vague";
  }

  return "general";
}

function GREETINGINGS_OR_VARIANTS(text) {
  if (GREETINGS.includes(text)) {
    return true;
  }

  return GREETINGS.some(
    (greeting) =>
      text === `${greeting} she` ||
      text === `${greeting} there` ||
      text === `${greeting} how are you`
  );
}

function isQuestion(text) {
  const questionStarts = [
    "what",
    "why",
    "when",
    "where",
    "which",
    "who",
    "how",
    "can",
    "could",
    "should",
    "would",
    "is",
    "are",
    "do",
    "does",
    "am",
  ];

  return questionStarts.some(
    (start) => text === start || text.startsWith(`${start} `)
  );
}

function isSymptomStatement(text) {
  const statementPatterns = [
    "i have",
    "ive had",
    "i've had",
    "i am having",
    "im having",
    "i'm having",
    "i feel",
    "i keep",
    "i get",
    "i notice",
    "ive been",
    "i've been",
    "my period",
    "my periods",
    "my symptoms",
    "recently i",
    "for the past",
    "for a few",
    "for years",
  ];

  return statementPatterns.some((pattern) =>
    text.includes(pattern)
  );
}

function resolveConversationQuery(message, conversation = []) {
  const text = normaliseText(message);
  const lastAssistant = [...conversation]
    .slice(0, -1)
    .reverse()
    .find((entry) => entry.role === "she" || entry.role === "assistant");
  const answeringFollowUp = text.split(" ").length <= 16 && /\?|one useful question|when did|how intense|pattern|anything else/i.test(lastAssistant?.text || "");
  const refersBack = /\b(it|that|this|they|them|those|its)\b/.test(text) ||
    /^(why|how|what causes|what symptoms|treatment|and |also )/.test(text) || answeringFollowUp;

  if (!refersBack) {
    return message;
  }

  const recentUserMessages = [...conversation]
    .slice(0, -1)
    .filter((entry) => entry.role === "user" && entry.text?.trim())
    .slice(-3)
    .map((entry) => entry.text.trim());

  return recentUserMessages.length
    ? `${recentUserMessages.join(". ")}. Follow-up: ${message}`
    : message;
}

function collectRecentUserContext(conversation = []) {
  return conversation
    .filter((entry) => entry.role === "user" && entry.text?.trim())
    .slice(-4)
    .map((entry) => entry.text.trim())
    .join(". ");
}

function missingSymptomContext(value) {
  const text = normaliseText(value);
  const questions = [];
  const hasDuration = /\b(today|yesterday|days?|weeks?|months?|years?|since|started|recently|always)\b/.test(text);
  const hasSeverity = /\b(mild|moderate|severe|bad|awful|unbearable|\d+\/10|stops me|affects|worse|better)\b/.test(text);
  const hasPattern = /\b(constant|comes and goes|sometimes|daily|night|morning|after|before|during|around|period|cycle|standing|eating|exercise|sex)\b/.test(text);
  const hasAssociated = /\b(and|also|with|without|bleeding|fever|faint|dizzy|discharge|nausea|bowel|bladder|breathless|pregnan)\b/.test(text);

  if (!hasDuration) questions.push("When did it start, and has it changed over time?");
  if (!hasSeverity) questions.push("How intense is it, and does it interrupt sleep, work or normal activities?");
  if (!hasPattern) questions.push("Is it constant or does it follow a pattern — for example around periods, meals, standing, sex or activity?");
  if (!hasAssociated) questions.push("Have you noticed anything else alongside it, such as bleeding, fever, faintness, discharge, bowel or bladder changes?");

  return questions;
}

function compassionateAcknowledgement(message) {
  const text = normaliseText(message);
  if (/\b(year|month|long time|keeps|every|constant)\b/.test(text)) {
    return "That sounds frustrating, especially if it has been affecting you repeatedly.";
  }
  if (/\b(pain|bleeding|faint|dizzy|exhausted|tired|worried|scared)\b/.test(text)) {
    return "I’m sorry you’re dealing with that. Let’s slow it down and look at the pattern properly.";
  }
  return "Thanks for explaining that — I’m following you.";
}

function shortSuggestionForQuestion(question) {
  if (question.startsWith("When")) return "It started recently";
  if (question.startsWith("How intense")) return "It affects daily life";
  if (question.startsWith("Is it constant")) return "It follows a pattern";
  if (question.startsWith("Have you noticed")) return "There are other symptoms";
  return "Tell you more";
}

function suggestionsForMissingDetail(question) {
  if (question.startsWith("When")) return ["It started recently", "It has been happening for months", "It has been happening for years"];
  if (question.startsWith("How intense")) return ["I notice it but can continue", "It affects daily life", "It stops normal activities"];
  if (question.startsWith("Is it constant")) return ["It is constant", "It comes and goes", "It follows my cycle"];
  if (question.startsWith("Have you noticed")) return ["No other symptoms", "There are other symptoms", "I’m not sure"];
  return [shortSuggestionForQuestion(question)];
}

function healthContextSummary(context = {}) {
  if (!context.enabled) return "";
  const hasDetails = context.lifeStage || context.conditions?.length || context.symptoms?.length || context.latestSummary;
  return hasDetails ? "I’m also taking account of the health details you chose to share on this device." : "";
}

function augmentWithHealthContext(query, context = {}) {
  if (!context.enabled) return query;
  const details = [
    context.lifeStage && `life stage: ${context.lifeStage}`,
    context.conditions?.length && `existing conditions: ${context.conditions.join(", ")}`,
    context.symptoms?.length && `saved symptoms: ${context.symptoms.join(", ")}`,
    context.latestSummary && `recent saved summary: ${context.latestSummary}`,
  ].filter(Boolean);
  return details.length ? `${query}. Context the user consented to share: ${details.join("; ")}.` : query;
}

function detectEmergency(text) {
  if (containsAny(text, EMERGENCY_PATTERNS)) return true;
  const heavyBleeding = /\b(bleed|bleeding|period|pad|tampon)\b/.test(text) && /\b(soak|soaking|every hour|faint|fainted|passing out|breathless|very weak|pregnan)\b/.test(text);
  const pregnancyWarning = /\b(pregnan|postpartum|postnatal|after birth)\b/.test(text) && /\b(severe headache|vision change|heavy bleeding|chest pain|shortness of breath|swollen leg|reduced movement)\b/.test(text);
  return heavyBleeding || pregnancyWarning;
}

function suggestionsForQuery(query) {
  const text = normaliseText(query);
  if (/\bwhat is|define|explain\b/.test(text)) {
    return ["What causes it?", "What are the symptoms?", "How is it diagnosed?"];
  }
  if (/\b(cause|risk)\b/.test(text)) {
    return ["How is it assessed?", "What can help?", "When should I see a GP?"];
  }
  if (/\b(treat|manage|help|next step)\b/.test(text)) {
    return ["What should I ask my GP?", "What should I track?", "When is it urgent?"];
  }
  return ["What could be relevant?", "What should I track?", "When should I seek help?"];
}

function attachmentSuggestions(attachments) {
  return attachments.some((attachment) => String(attachment.type || "").startsWith("image/"))
    ? ["I’ll describe what I can see", "I have a question about it"]
    : ["I’ll paste the relevant text", "Help me understand a result"];
}

function createSymptomFollowUp(text) {
  return createGroundedHealthResponse(text);
}

function createGroundedHealthResponse(question) {
  try {
    const response = buildGroundedResponse(question);
    const formatted = formatSHELearnResponse(response);

    if (formatted) {
      return formatted;
    }
  } catch (error) {
    console.error("SHE knowledge response failed:", error);
  }

  return [
    "I don’t have enough information to answer that safely yet.",
    "Could you describe what has been happening, how long it has been happening and what concerns you most?",
  ].join("\n\n");
}

function createAttachmentResponse({
  message,
  normalised,
  attachments,
}) {
  const images = attachments.filter((attachment) =>
    String(attachment.type || "").startsWith("image/")
  );

  const documents = attachments.filter(
    (attachment) =>
      !String(attachment.type || "").startsWith("image/")
  );

  let acknowledgement = "";

  if (images.length && documents.length) {
    acknowledgement = `I can see ${images.length} image${
      images.length === 1 ? "" : "s"
    } and ${documents.length} document${
      documents.length === 1 ? "" : "s"
    } attached.`;
  } else if (images.length) {
    acknowledgement = `I can see ${
      images.length === 1
        ? "an image"
        : `${images.length} images`
    } attached.`;
  } else {
    acknowledgement = `I can see ${
      documents.length === 1
        ? "a document"
        : `${documents.length} documents`
    } attached.`;
  }

  const limitation = images.length
    ? "Image analysis is not connected yet, so I cannot safely interpret the image itself."
    : "Secure document reading is not connected yet, so I cannot read the contents of the file.";

  if (!message) {
    return [
      acknowledgement,
      limitation,
      images.length
        ? "Tell me what the image shows and what you would like help understanding."
        : "Paste the relevant wording or values into the chat after removing personal identifying information.",
    ].join("\n\n");
  }

  const messageIntent = detectIntent(normalised);

  if (
    messageIntent === "health_question" ||
    messageIntent === "symptom_statement"
  ) {
    const writtenResponse =
      messageIntent === "symptom_statement"
        ? createSymptomFollowUp(normalised)
        : createGroundedHealthResponse(message);

    return [
      acknowledgement,
      limitation,
      "I’ll use the written information in your message instead.",
      writtenResponse,
    ].join("\n\n");
  }

  return [
    acknowledgement,
    limitation,
    createClarifyingResponse(normalised),
  ].join("\n\n");
}

function createEmergencyResponse(text = "") {
  if (/suicidal|kill myself|self harm|self-harm/.test(text)) {
    return [
      "⚠️ Your immediate safety matters more than continuing this chat.",
      "If you may act on these thoughts or cannot stay safe, call 999/112 now or go to the nearest emergency department. If you can, tell someone you trust and stay with them while you get help.",
      "For urgent mental-health support in the UK, you can also call NHS 111 and select the mental-health option where available. Do not rely on SHE for crisis support.",
    ].join("\n\n");
  }
  if (/pregnan|postpartum|postnatal|baby|after birth/.test(text)) {
    return [
      "⚠️ This may need urgent pregnancy or postnatal assessment.",
      "Contact your maternity assessment unit, labour ward, midwife or urgent medical service now. Call 999/112 for severe breathing difficulty, collapse, chest pain, uncontrolled bleeding or another life-threatening emergency.",
      "Do not wait for a routine appointment or rely on this chat to assess the situation.",
    ].join("\n\n");
  }
  return [
    "⚠️ This may need urgent medical attention.",
    "Please contact urgent medical care now. Call 999/112 for a life-threatening emergency; otherwise use NHS 111, an out-of-hours service or urgent in-person care as appropriate.",
    "Do not rely on this chat for emergency assessment.",
  ].join("\n\n");
}

function createClarifyingResponse(text) {
  const responses = {
    why:
      "What would you like me to explain? Include the symptom, condition or part of the previous response you mean.",
    how:
      "What would you like help doing? Tell me a little more and I’ll guide you.",
    what:
      "What would you like to understand? You can ask about a symptom, condition, treatment or next step.",
    maybe:
      "That’s okay. Tell me a little more about what you’re unsure about.",
    worried:
      "I’m sorry you’re feeling worried. Tell me what is happening and what concerns you most.",
  };

  return (
    responses[text] ||
    "Could you tell me a little more about what you’d like help with?"
  );
}

function formatSHELearnResponse(response) {
  if (!response) {
    return "";
  }

  const blocks = [];

  if (response.urgentWarning) {
    blocks.push(
      [
        "⚠️ Urgent safety information",
        response.urgentWarning,
        "Seek urgent medical assistance when symptoms are sudden, severe or life-threatening.",
      ].join("\n\n")
    );
  }

  if (response.title) {
    blocks.push(response.title);
  }

  if (response.introduction) {
    blocks.push(response.introduction);
  }

  (response.sections || []).forEach((section) => {
    const content = [];

    if (section.title) {
      content.push(section.title);
    }

    if (section.text) {
      content.push(section.text);
    }

    if (section.items?.length) {
      content.push(
        section.items
          .map((item) => `• ${item}`)
          .join("\n")
      );
    }

    if (section.comparisons?.length) {
      content.push(
        section.comparisons
          .map((comparison) =>
            [
              comparison.title,
              comparison.text,
              ...(comparison.keyPoints || []).map(
                (point) => `• ${point}`
              ),
            ]
              .filter(Boolean)
              .join("\n")
          )
          .join("\n\n")
      );
    }

    if (content.length) {
      blocks.push(content.join("\n\n"));
    }
  });

  if (response.relatedGuides?.length) {
    blocks.push(
      [
        "Related SHE Learn guides",
        ...response.relatedGuides.map(
          (guide) =>
            `• ${guide.title} — ${guide.readTime} minute read`
        ),
      ].join("\n")
    );
  }

  if (response.disclaimer) {
    blocks.push(response.disclaimer);
  }

  return blocks.filter(Boolean).join("\n\n");
}

function normaliseText(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s']/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function containsAny(value, phrases) {
  return phrases.some((phrase) => value.includes(phrase));
}
