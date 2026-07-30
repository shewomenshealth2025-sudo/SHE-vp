import { buildGroundedResponse } from "./chatKnowledge";

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
];

const EMERGENCY_PATTERNS = [
  "cant breathe",
  "can't breathe",
  "difficulty breathing",
  "chest pain",
  "passed out",
  "fainted",
  "unconscious",
  "severe bleeding",
  "bleeding heavily",
  "suicidal",
  "kill myself",
  "severe allergic reaction",
  "face is swelling",
  "sudden severe pain",
];

export function generateSHEMessage({
  message,
  attachments = [],
  conversation = [],
}) {
  const originalMessage = String(message ?? "").trim();
  const normalised = normaliseText(originalMessage);

  if (attachments.length > 0) {
    return createAttachmentResponse({
      message: originalMessage,
      normalised,
      attachments,
    });
  }

  const intent = detectIntent(normalised);

  switch (intent) {
    case "empty":
      return "What would you like help with today?";

    case "emergency":
      return createEmergencyResponse();

    case "greeting":
      return [
        "Hi! I’m SHE.",
        "What would you like help with today?",
      ].join("\n\n");

    case "thanks":
      return "You’re very welcome. Is there anything else you’d like help with?";

    case "goodbye":
      return "Take care. You can come back whenever you need help finding your next step.";

    case "positive":
      return "I’m glad that helped. What would you like to look at next?";

    case "negative":
      return [
        "I’m sorry that wasn’t helpful.",
        "Tell me what felt unclear or what you were hoping to understand, and I’ll try a different approach.",
      ].join("\n\n");

    case "identity":
      return [
        "I’m SHE, a women’s health navigation assistant.",
        "I can help you understand health information, prepare questions for a clinician and think through appropriate next steps.",
        "I can’t diagnose a condition or replace professional medical care.",
      ].join("\n\n");

    case "help":
      return [
        "Of course. Tell me what has been happening in your own words.",
        "You can include your symptoms, how long they have been happening and what concerns you most.",
      ].join("\n\n");

    case "symptom_statement":
      return createSymptomFollowUp(normalised);

    case "health_question":
      return createGroundedHealthResponse(originalMessage);

    case "vague":
      return createClarifyingResponse(normalised, conversation);

    default:
      return [
        "I can help with women’s health information and next steps.",
        "Could you tell me a little more about what you would like help with?",
      ].join("\n\n");
  }
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

function createSymptomFollowUp(text) {
  if (
    containsAny(text, [
      "period",
      "periods",
      "menstrual",
      "bleeding",
      "cramp",
      "cramps",
      "pelvic pain",
    ])
  ) {
    return [
      "I’m sorry you’re dealing with that.",
      "To understand the pattern better, can you tell me:",
      "• How long this has been happening",
      "• Where the pain is located",
      "• Whether it happens before, during or after your period",
      "• Whether it affects school, work, sleep or daily activities",
      "• Whether you have heavy bleeding, pain during sex, bowel symptoms or pain when urinating",
    ].join("\n\n");
  }

  if (
    containsAny(text, [
      "bloating",
      "weight",
      "fatigue",
      "tired",
      "sweating",
      "thyroid",
    ])
  ) {
    return [
      "Those symptoms can have several possible causes, so the pattern matters.",
      "Can you tell me:",
      "• How long they have been happening",
      "• Whether they started suddenly or gradually",
      "• Whether your periods or cycle have changed",
      "• Whether you have noticed changes in appetite, sleep, heart rate, bowel habits or temperature tolerance",
      "• Whether you take any medication or have had recent blood tests",
    ].join("\n\n");
  }

  if (
    containsAny(text, [
      "discharge",
      "itching",
      "infection",
      "uti",
    ])
  ) {
    return [
      "I can help you think through the next step.",
      "Can you tell me:",
      "• How long this has been happening",
      "• Whether there is pain, burning, itching or an unusual smell",
      "• Whether the colour or consistency has changed",
      "• Whether you have pelvic pain, fever or pain when urinating",
    ].join("\n\n");
  }

  if (
    containsAny(text, [
      "fertility",
      "conceive",
      "pregnant",
      "pregnancy",
      "ovulation",
    ])
  ) {
    return [
      "I can help you work through this.",
      "Can you tell me:",
      "• What you are most concerned about",
      "• How long you have been trying or tracking",
      "• Whether your cycles are usually regular",
      "• Whether you have any diagnosed conditions or previous fertility assessments",
    ].join("\n\n");
  }

  return [
    "I’m sorry you’ve been experiencing that.",
    "Can you tell me how long it has been happening, how severe it feels and whether anything makes it better or worse?",
  ].join("\n\n");
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

function createEmergencyResponse() {
  return [
    "⚠️ This may need urgent medical attention.",
    "Please contact your local emergency service or seek urgent in-person medical care now, especially if symptoms are sudden, severe or getting worse.",
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