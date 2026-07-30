import { useEffect, useRef, useState } from "react";
import ChatComposer from "../components/ChatComposer";
import ChatMessage from "../components/ChatMessage";
import { generateSHEMessage } from "../utils/chatEngine";

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

    const conversationWithUserMessage = [
      ...conversation,
      userMessage,
    ];

    setConversation(conversationWithUserMessage);
    setMessage("");
    setAttachments([]);
    setIsThinking(true);

    responseTimeoutRef.current = window.setTimeout(() => {
      const response = generateSHEMessage({
        message: cleanMessage,
        attachments: submittedAttachments,
        conversation: conversationWithUserMessage,
      });

      streamResponse(
        response,
        cleanMessage || createAttachmentTitle(submittedAttachments)
      );
    }, submittedAttachments.length > 0 ? 850 : 450);
  }

  function streamResponse(fullResponse, conversationTitle) {
    setIsThinking(false);
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

          saveConversation?.(conversationTitle, updated);

          return updated;
        });

        setStreamingText("");
      }
    }, 10);
  }

  function chooseSuggestion(suggestion) {
    if (isBusy) {
      return;
    }

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
                  index === conversation.length - 1 &&
                  !isBusy
                    ? getSuggestions(entry.text)
                    : []
                }
                chooseSuggestion={chooseSuggestion}
              />
            ))}

            {isThinking && <ThinkingMessage />}

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
              disabled={isBusy}
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

function ThinkingMessage() {
  return (
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

function createAttachmentTitle(attachments) {
  if (attachments.length === 1) {
    return attachments[0].name || "Attachment";
  }

  return `${attachments.length} attachments`;
}

function getSuggestions(text = "") {
  const lower = text.toLowerCase();

  if (
    lower.includes("what would you like help with") ||
    lower.includes("tell me what has been happening")
  ) {
    return [
      "I want to understand some symptoms",
      "Help me prepare for a GP appointment",
      "I have a question about my period",
    ];
  }

  if (
    lower.includes("can you tell me") ||
    lower.includes("tell me how long")
  ) {
    return [
      "Help me track these symptoms",
      "Help me prepare for a GP appointment",
      "Which symptoms need urgent help?",
    ];
  }

  if (
    lower.includes("period") ||
    lower.includes("menstrual")
  ) {
    return [
      "What symptoms should I track?",
      "Help me prepare for a GP appointment",
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

  return [
    "What should I do next?",
    "What should I ask my GP?",
    "Which symptoms should I record?",
  ];
}