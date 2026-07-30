import { useEffect, useRef, useState } from "react";
import {
  Baby,
  Droplets,
  Flower2,
  Pill,
  ShieldPlus,
} from "lucide-react";
import ChatComposer from "../components/ChatComposer";
import ChatMessage from "../components/ChatMessage";
import { buildGroundedResponse } from "../utils/chatKnowledge";

function formatSHELearnResponse(response) {
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
        section.items.map((item) => `• ${item}`).join("\n")
      );
    }

    if (section.comparisons?.length) {
      content.push(
        section.comparisons
          .map((comparison) => {
            return [
              comparison.title,
              comparison.text,
              ...(comparison.keyPoints || []).map(
                (point) => `• ${point}`
              ),
            ]
              .filter(Boolean)
              .join("\n");
          })
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

const topics = [
  {
    title: "Painful periods",
    prompt: "Why are my periods so painful?",
    icon: Droplets,
  },
  {
    title: "Endometriosis",
    prompt: "Could I have endometriosis?",
    icon: Flower2,
  },
  {
    title: "Trying to conceive",
    prompt: "What should I know about trying to conceive?",
    icon: Baby,
  },
  {
    title: "Contraception options",
    prompt: "Help me compare contraception options.",
    icon: Pill,
  },
  {
    title: "Autoimmune diseases",
    prompt: "How can autoimmune diseases affect women’s health?",
    icon: ShieldPlus,
  },
];

export default function ChatPage({
  conversation,
  setConversation,
  saveConversation,
}) {
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const endRef = useRef(null);

  const hasConversation = conversation.length > 0;

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation, isThinking, streamingText]);

  function submitMessage(event) {
    event.preventDefault();

    const cleanMessage = message.trim();

    if ((!cleanMessage && attachments.length === 0) || isThinking) {
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
      id: Date.now(),
      role: "user",
      text: cleanMessage,
      attachments: submittedAttachments,
    };

    setConversation((current) => [...current, userMessage]);
    setMessage("");
    setAttachments([]);
    setIsThinking(true);

    const questionForResponse =
      cleanMessage ||
      createAttachmentPrompt(submittedAttachments);

    window.setTimeout(() => {
      streamResponse(
        createResponse(questionForResponse),
        questionForResponse
      );
    }, 650);
  }

  function streamResponse(fullResponse, originalQuestion) {
    setIsThinking(false);
    setStreamingText("");

    let position = 0;

    const interval = window.setInterval(() => {
      position += 3;
      setStreamingText(fullResponse.slice(0, position));

      if (position >= fullResponse.length) {
        window.clearInterval(interval);

        const completedMessage = {
          id: Date.now() + 1,
          role: "she",
          text: fullResponse,
        };

        setConversation((current) => {
          const updated = [...current, completedMessage];
          saveConversation(originalQuestion, updated);
          return updated;
        });

        setStreamingText("");
      }
    }, 12);
  }

  function chooseSuggestion(suggestion) {
    setMessage(suggestion);

    window.setTimeout(() => {
      document.querySelector("#she-message-input")?.focus();
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
                disabled={isThinking}
                attachments={attachments}
                setAttachments={setAttachments}
              />
            </div>
          </div>
        </section>
      )}

      {(hasConversation || streamingText) && (
        <section className="mx-auto max-w-3xl pb-8 pt-3">
          <div className="mb-7">
            <p className="text-sm font-medium text-[#f43f72]">
              SHE Health Navigator
            </p>
            <h2 className="mt-1 text-2xl font-semibold">
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
                  index === conversation.length - 1
                    ? getSuggestions(entry.text)
                    : []
                }
                chooseSuggestion={chooseSuggestion}
              />
            ))}

            {isThinking && (
              <div className="flex justify-start">
                <div className="rounded-3xl rounded-bl-lg border border-pink-100 bg-white px-5 py-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <img
                      src="/logo.png"
                      alt=""
                      className="h-7 w-7 rounded-full object-cover"
                    />

                    <div className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-pink-300" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-pink-400 [animation-delay:150ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-pink-500 [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              </div>
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
            <ChatComposer
              message={message}
              setMessage={setMessage}
              submitMessage={submitMessage}
              disabled={isThinking || Boolean(streamingText)}
              compact
              attachments={attachments}
              setAttachments={setAttachments}
            />
          </div>
        </section>
      )}
    </main>
  );
}

function createAttachmentPrompt(attachments) {
  const imageCount = attachments.filter((attachment) =>
    attachment.type?.startsWith("image/")
  ).length;

  const documentCount = attachments.length - imageCount;

  if (imageCount > 0 && documentCount > 0) {
    return "I have attached images and documents and would like help understanding them.";
  }

  if (imageCount > 0) {
    return "I have attached an image and would like help understanding it.";
  }

  return "I have attached a document and would like help understanding it.";
}

function getSuggestions(text) {
  const lower = text.toLowerCase();

  if (lower.includes("period")) {
    return [
      "Help me prepare for a GP appointment",
      "What symptoms should I track?",
      "Could this be endometriosis?",
    ];
  }

  if (lower.includes("fertility")) {
    return [
      "When should I seek fertility advice?",
      "What happens during an assessment?",
      "How should I track my cycle?",
    ];
  }

  return [
    "What should I do next?",
    "What should I ask my GP?",
    "Which symptoms should I record?",
  ];
}

function createResponse(question) {
  const groundedResponse = buildGroundedResponse(
    String(question ?? "")
  );

  return formatSHELearnResponse(groundedResponse);
}
