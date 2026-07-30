import { useEffect, useRef, useState } from "react";
import ChatComposer from "../components/ChatComposer";
import ChatMessage from "../components/ChatMessage";
import { buildGroundedResponse } from "../utils/chatKnowledge";

export default function ChatPage({
  conversation,
  setConversation,
  saveConversation,
}) {
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [processingLabel, setProcessingLabel] = useState("");

  const endRef = useRef(null);
  const streamIntervalRef = useRef(null);
  const responseTimeoutRef = useRef(null);

  const hasConversation = conversation.length > 0;
  const isBusy = isThinking || Boolean(streamingText);

  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [conversation, isThinking, streamingText]);

  useEffect(() => {
    return () => {
      if (streamIntervalRef.current) {
        window.clearInterval(streamIntervalRef.current);
      }

      if (responseTimeoutRef.current) {
        window.clearTimeout(responseTimeoutRef.current);
      }
    };
  }, []);

  function submitMessage(event) {
    event?.preventDefault?.();

    const cleanMessage = message.trim();

    if ((!cleanMessage && attachments.length === 0) || isBusy) {
      return;
    }

    const submittedAttachments = attachments.map((attachment) => ({
      id: attachment.id,
      name: attachment.name,
      size: attachment.size,
      type: attachment.type,
      previewUrl: attachment.previewUrl,
    }));

    const userMessage = {
      id: createMessageId(),
      role: "user",
      text: cleanMessage,
      attachments: submittedAttachments,
    };

    setConversation((current) => [...current, userMessage]);
    setMessage("");
    setAttachments([]);
    setIsThinking(true);

    const attachmentContext = analyseAttachments(
      submittedAttachments
    );

    const questionForResponse =
      cleanMessage || createAttachmentPrompt(attachmentContext);

    setProcessingLabel(
      getProcessingLabel(attachmentContext)
    );

    responseTimeoutRef.current = window.setTimeout(() => {
      const response = createResponse({
        question: questionForResponse,
        attachmentContext,
        hasUserText: Boolean(cleanMessage),
      });

      streamResponse(response, questionForResponse);
    }, submittedAttachments.length > 0 ? 950 : 650);
  }

  function streamResponse(fullResponse, originalQuestion) {
    setIsThinking(false);
    setProcessingLabel("");
    setStreamingText("");

    if (streamIntervalRef.current) {
      window.clearInterval(streamIntervalRef.current);
    }

    let position = 0;

    streamIntervalRef.current = window.setInterval(() => {
      position += 4;

      setStreamingText(fullResponse.slice(0, position));

      if (position >= fullResponse.length) {
        window.clearInterval(streamIntervalRef.current);
        streamIntervalRef.current = null;

        const completedMessage = {
          id: createMessageId(),
          role: "she",
          text: fullResponse,
        };

        setConversation((current) => {
          const updated = [...current, completedMessage];

          saveConversation?.(originalQuestion, updated);

          return updated;
        });

        setStreamingText("");
      }
    }, 10);
  }

  function chooseSuggestion(suggestion) {
    if (isBusy) return;

    setMessage(suggestion);

    window.setTimeout(() => {
      document
        .querySelector("#she-message-input")
        ?.focus();
    }, 50);
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-5 pb-32 pt-4 md:px-8 lg:px-12">
      {!hasConversation && !streamingText && (
        <section className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-10">
          <div className="w-full">
            <div className="text-center">
              <h2 className="mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                How can SHE help today?
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-base text-stone-500 md:text-xl">
                Your health, your questions, your next step.
              </p>
            </div>

            <div className="mx-auto mt-9 w-full max-w-2xl">
              <ChatComposer
                message={message}
                setMessage={setMessage}
                submitMessage={submitMessage}
                disabled={isBusy}
                attachments={attachments}
                setAttachments={setAttachments}
              />
            </div>
          </div>
        </section>
      )}

      {(hasConversation || streamingText) && (
        <section className="mx-auto max-w-3xl pb-8 pt-3">
          <div className="mb-7 border-b border-pink-100 pb-5">
            <p className="text-sm font-medium text-[#f43f72]">
              SHE Health Navigator
            </p>

            <h2 className="mt-1 text-2xl font-semibold text-stone-900">
              Your conversation
            </h2>
          </div>

          <div className="space-y-6">
            {conversation.map((entry, index) => (
              <ChatMessage
                key={entry.id}
                message={entry}
                suggestions={
                  entry.role === "she" &&
                  index === conversation.length - 1 &&
                  !isBusy
                    ? getSuggestions(entry.text)
                    : []
                }
                chooseSuggestion={chooseSuggestion}
              />
            ))}

            {isThinking && (
              <ThinkingMessage label={processingLabel} />
            )}

            {streamingText && (
              <ChatMessage
                message={{
                  id: "streaming",
                  role: "she",
                  text: streamingText,
                }}
                suggestions={[]}
                chooseSuggestion={chooseSuggestion}
              />
            )}

            <div ref={endRef} />
          </div>

          <div className="sticky bottom-24 z-20 mt-8">
            <div className="rounded-[34px] bg-white/85 py-2 backdrop-blur-xl">
              <ChatComposer
                message={message}
                setMessage={setMessage}
                submitMessage={submitMessage}
                disabled={isBusy}
                compact
                attachments={attachments}
                setAttachments={setAttachments}
              />
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

function ThinkingMessage({ label }) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[90%] rounded-3xl rounded-bl-lg border border-pink-100 bg-white px-5 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt=""
            className="h-8 w-8 rounded-full object-cover"
          />

          <div>
            <p className="mb-1.5 text-xs font-semibold text-stone-500">
              {label || "SHE is thinking"}
            </p>

            <div className="flex gap-1">
              <span className="h-2 w-2 animate-bounce rounded-full bg-pink-300" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-pink-400 [animation-delay:150ms]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-pink-500 [animation-delay:300ms]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function createMessageId() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`;
}

function createResponse({
  question,
  attachmentContext,
  hasUserText,
}) {
  const cleanQuestion = String(question ?? "").trim();

  if (attachmentContext.total > 0) {
    const attachmentResponse =
      createAttachmentAcknowledgement(
        attachmentContext,
        hasUserText
      );

    if (!hasUserText) {
      return attachmentResponse;
    }

    const conversationalResponse =
      createConversationalResponse(cleanQuestion);

    if (conversationalResponse) {
      return [attachmentResponse, conversationalResponse]
        .filter(Boolean)
        .join("\n\n");
    }

    const groundedResponse = buildGroundedResponse(
      cleanQuestion
    );

    const formattedResponse =
      formatSHELearnResponse(groundedResponse);

    return [attachmentResponse, formattedResponse]
      .filter(Boolean)
      .join("\n\n");
  }

  const conversationalResponse =
    createConversationalResponse(cleanQuestion);

  if (conversationalResponse) {
    return conversationalResponse;
  }

  const groundedResponse = buildGroundedResponse(
    cleanQuestion
  );

  return formatSHELearnResponse(groundedResponse);
}

function createConversationalResponse(question) {
  const normalised = question
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s']/gu, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!normalised) {
    return "What would you like help with today?";
  }

  if (isGreeting(normalised)) {
    return [
      "Hi! I’m SHE.",
      "You can ask me a women’s health question, describe symptoms you’ve been experiencing, or ask for help preparing for a healthcare appointment.",
      "What would you like help with today?",
    ].join("\n\n");
  }

  if (isThankYou(normalised)) {
    return "You’re very welcome. Is there anything else you’d like help understanding?";
  }

  if (isGoodbye(normalised)) {
    return "Take care. You can come back whenever you need help finding your next step.";
  }

  if (isPositiveReply(normalised)) {
    return "I’m glad that helped. What would you like to look at next?";
  }

  if (isNegativeReply(normalised)) {
    return [
      "I’m sorry that wasn’t helpful.",
      "Tell me what felt unclear or what you were hoping to understand, and I’ll try a different approach.",
    ].join("\n\n");
  }

  if (isHelpRequest(normalised)) {
    return [
      "Of course. Tell me what has been happening in your own words.",
      "You can include your symptoms, how long they have been happening, what makes them better or worse, and anything you’re worried about.",
    ].join("\n\n");
  }

  if (isIdentityQuestion(normalised)) {
    return [
      "I’m SHE, a women’s health navigation assistant.",
      "I can help explain health information, suggest questions to ask a clinician, and help you understand possible next steps.",
      "I can’t diagnose a condition or replace professional medical care.",
    ].join("\n\n");
  }

  if (isVeryShortOrVague(normalised)) {
    return createClarifyingResponse(normalised);
  }

  return null;
}

function isGreeting(text) {
  const greetings = [
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

  return greetings.includes(text);
}

function isThankYou(text) {
  const responses = [
    "thanks",
    "thank you",
    "thankyou",
    "thanks so much",
    "thank you so much",
    "cheers",
  ];

  return responses.includes(text);
}

function isGoodbye(text) {
  const responses = [
    "bye",
    "goodbye",
    "see you",
    "talk later",
    "speak later",
  ];

  return responses.includes(text);
}

function isPositiveReply(text) {
  const responses = [
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

  return responses.includes(text);
}

function isNegativeReply(text) {
  const responses = [
    "no",
    "not helpful",
    "that didnt help",
    "that didn't help",
    "i dont understand",
    "i don't understand",
    "thats wrong",
    "that's wrong",
  ];

  return responses.includes(text);
}

function isHelpRequest(text) {
  const responses = [
    "help",
    "can you help me",
    "i need help",
    "please help",
    "help me",
  ];

  return responses.includes(text);
}

function isIdentityQuestion(text) {
  const responses = [
    "who are you",
    "what are you",
    "what can you do",
    "how can you help",
    "what is she",
  ];

  return responses.includes(text);
}

function isVeryShortOrVague(text) {
  const words = text.split(" ").filter(Boolean);

  if (words.length > 3) {
    return false;
  }

  const healthWords = [
    "period",
    "periods",
    "pain",
    "bleeding",
    "bloating",
    "pregnant",
    "pregnancy",
    "fertility",
    "contraception",
    "endometriosis",
    "pcos",
    "menopause",
    "thyroid",
    "discharge",
    "itching",
    "cramps",
    "headache",
    "fatigue",
    "nausea",
    "dizzy",
    "dizziness",
    "sweating",
    "weight",
    "pill",
    "implant",
    "coil",
  ];

  return !healthWords.some((word) =>
    text.includes(word)
  );
}

function createClarifyingResponse(text) {
  const vagueResponses = {
    maybe:
      "That’s okay. Tell me a little more about what you’re unsure about.",
    why:
      "What would you like me to explain? You can include the symptom, condition or part of my previous response you mean.",
    how:
      "What would you like help doing? Tell me a little more and I’ll guide you.",
    what:
      "What would you like to understand? You can ask about a symptom, condition, treatment or next step.",
    worried:
      "I’m sorry you’re feeling worried. Tell me what is happening and what concerns you most.",
  };

  return (
    vagueResponses[text] ||
    "Could you tell me a little more about what you’d like help with?"
  );
}

function analyseAttachments(attachments = []) {
  const analysis = {
    total: attachments.length,
    images: [],
    documents: [],
    possibleLabResults: [],
    possibleLetters: [],
    possibleMedicationFiles: [],
  };

  attachments.forEach((attachment) => {
    const name = String(
      attachment.name || ""
    ).toLowerCase();

    const type = String(
      attachment.type || ""
    ).toLowerCase();

    if (type.startsWith("image/")) {
      analysis.images.push(attachment);
    } else {
      analysis.documents.push(attachment);
    }

    if (
      containsAny(name, [
        "blood",
        "lab",
        "result",
        "test",
        "pathology",
        "haematology",
        "biochemistry",
      ])
    ) {
      analysis.possibleLabResults.push(attachment);
    }

    if (
      containsAny(name, [
        "letter",
        "clinic",
        "hospital",
        "appointment",
        "referral",
        "discharge",
      ])
    ) {
      analysis.possibleLetters.push(attachment);
    }

    if (
      containsAny(name, [
        "medication",
        "medicine",
        "prescription",
        "tablet",
        "pharmacy",
      ])
    ) {
      analysis.possibleMedicationFiles.push(
        attachment
      );
    }
  });

  return analysis;
}

function containsAny(value, words) {
  return words.some((word) => value.includes(word));
}

function getProcessingLabel(attachmentContext) {
  if (!attachmentContext.total) {
    return "SHE is thinking";
  }

  if (attachmentContext.possibleLabResults.length) {
    return "Reviewing your lab result attachment";
  }

  if (attachmentContext.possibleLetters.length) {
    return "Reviewing your health document";
  }

  if (
    attachmentContext.images.length &&
    attachmentContext.documents.length
  ) {
    return "Reviewing your attachments";
  }

  if (attachmentContext.images.length) {
    return attachmentContext.images.length === 1
      ? "Reviewing your image"
      : "Reviewing your images";
  }

  return attachmentContext.documents.length === 1
    ? "Reviewing your document"
    : "Reviewing your documents";
}

function createAttachmentPrompt(attachmentContext) {
  if (
    attachmentContext.images.length &&
    attachmentContext.documents.length
  ) {
    return "I have attached health images and documents and would like help understanding what to do next.";
  }

  if (attachmentContext.possibleLabResults.length) {
    return "I have attached possible lab or blood test results and would like help understanding them.";
  }

  if (attachmentContext.possibleLetters.length) {
    return "I have attached a clinic or healthcare letter and would like help understanding it.";
  }

  if (attachmentContext.images.length) {
    return "I have attached a health-related image and would like help understanding what to do next.";
  }

  return "I have attached a health document and would like help understanding it.";
}

function createAttachmentAcknowledgement(
  attachmentContext,
  hasUserText
) {
  if (attachmentContext.possibleLabResults.length) {
    return [
      "I can see that you have attached what may be a lab or blood test document.",
      "This version of SHE can recognise the type of attachment, but it cannot yet securely extract or verify the individual values inside the file.",
      hasUserText
        ? "I’ll use the information in your message to guide the response."
        : "You can type the result names, values and reference ranges you want explained.",
    ].join("\n\n");
  }

  if (attachmentContext.possibleLetters.length) {
    return [
      "I can see that you have attached what may be a clinic or healthcare letter.",
      "This version of SHE cannot yet securely read the full contents of the document.",
      hasUserText
        ? "I’ll respond using the details you provided in your message."
        : "You can paste the section you would like explained after removing personal details.",
    ].join("\n\n");
  }

  if (attachmentContext.images.length) {
    return [
      `I can see ${
        attachmentContext.images.length === 1
          ? "an image"
          : `${attachmentContext.images.length} images`
      } attached to your message.`,
      "Image analysis is not connected yet, so I cannot safely identify a result, condition, medication or medical finding from the image alone.",
      hasUserText
        ? "I’ll use your written description to help with appropriate next steps."
        : "Tell me what the image shows and what you would like help understanding.",
    ].join("\n\n");
  }

  return [
    `I can see ${
      attachmentContext.documents.length === 1
        ? "a document"
        : `${attachmentContext.documents.length} documents`
    } attached to your message.`,
    "Secure document reading is not connected yet.",
    hasUserText
      ? "I’ll use your written message to guide the response."
      : "Paste the relevant wording into the chat after removing personal identifying information.",
  ].join("\n\n");
}

function formatSHELearnResponse(response) {
  if (!response) return "";

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

function getSuggestions(text = "") {
  const lower = text.toLowerCase();

  if (
    lower.includes("hi! i’m she") ||
    lower.includes("what would you like help with")
  ) {
    return [
      "I want to understand some symptoms",
      "Help me prepare for a GP appointment",
      "I have a question about my period",
    ];
  }

  if (
    lower.includes("urgent") ||
    lower.includes("emergency")
  ) {
    return [
      "Which symptoms need urgent help?",
      "How should I describe this to a clinician?",
      "What information should I have ready?",
    ];
  }

  if (
    lower.includes("blood test") ||
    lower.includes("lab")
  ) {
    return [
      "What do these blood test terms mean?",
      "What should I ask my GP?",
      "How should I record my results?",
    ];
  }

  if (
    lower.includes("period") ||
    lower.includes("menstrual")
  ) {
    return [
      "Help me prepare for a GP appointment",
      "What symptoms should I track?",
      "Could this be endometriosis?",
    ];
  }

  if (
    lower.includes("fertility") ||
    lower.includes("conceive")
  ) {
    return [
      "When should I seek fertility advice?",
      "What happens during an assessment?",
      "How should I track my cycle?",
    ];
  }

  if (
    lower.includes("contraception") ||
    lower.includes("contraceptive")
  ) {
    return [
      "Help me compare side effects",
      "What should I ask a clinician?",
      "Which options do not contain oestrogen?",
    ];
  }

  return [
    "What should I do next?",
    "What should I ask my GP?",
    "Which symptoms should I record?",
  ];
}