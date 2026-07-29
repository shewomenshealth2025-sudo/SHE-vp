import { Check, Copy, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ChatMessage({
  message,
  suggestions,
  chooseSuggestion,
}) {
  const [copied, setCopied] = useState(false);

  async function copyMessage() {
    await navigator.clipboard.writeText(message.text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  if (message.role === "user") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-end"
      >
        <div className="max-w-[85%] rounded-3xl rounded-br-lg bg-[#f43f72] px-5 py-4 text-white shadow-sm">
          <p className="whitespace-pre-wrap leading-7">{message.text}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start"
    >
      <div className="w-full max-w-[94%]">
        <div className="rounded-3xl rounded-bl-lg border border-pink-100 bg-white px-5 py-5 shadow-sm md:px-6">
          <div className="mb-4 flex items-center gap-2">
            <img
              src="/logo.png"
              alt=""
              className="h-7 w-7 rounded-full object-cover"
            />
            <span className="text-sm font-semibold">SHE</span>
          </div>

          <p className="whitespace-pre-wrap leading-7 text-stone-700">
            {message.text}
          </p>

          {suggestions?.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => chooseSuggestion(suggestion)}
                  className="rounded-full border border-pink-100 bg-[#fffafa] px-4 py-2 text-sm text-stone-600 transition hover:bg-pink-50 hover:text-[#f43f72]"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <div className="mt-5 rounded-2xl bg-pink-50 px-4 py-3 text-xs leading-5 text-stone-500">
            SHE offers general health information and navigation support, not a
            diagnosis.
          </div>
        </div>

        <div className="mt-2 flex items-center gap-1 pl-2 text-stone-400">
          <button
            type="button"
            onClick={copyMessage}
            className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-stone-100 hover:text-stone-700"
            aria-label="Copy response"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-stone-100 hover:text-stone-700"
            aria-label="Helpful"
          >
            <ThumbsUp size={16} />
          </button>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-stone-100 hover:text-stone-700"
            aria-label="Not helpful"
          >
            <ThumbsDown size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
