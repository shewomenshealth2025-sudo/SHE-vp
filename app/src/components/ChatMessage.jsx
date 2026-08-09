import {
  Check,
  Copy,
  FileText,
  ThumbsDown,
  ThumbsUp,
  ArrowRight,
  ClipboardList,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

function formatFileSize(bytes = 0) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ChatMessage({
  message,
  suggestions,
  chooseSuggestion,
  onStartJourney,
}) {
  const [copied, setCopied] = useState(false);

  async function copyMessage() {
    await navigator.clipboard.writeText(message.text || "");
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
        <div className="max-w-[88%] rounded-3xl rounded-br-lg bg-[#f43f72] px-4 py-4 text-white shadow-sm md:px-5">
          {message.attachments?.length > 0 && (
            <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {message.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="overflow-hidden rounded-2xl bg-white/15"
                >
                  {attachment.previewUrl ? (
                    <img
                      src={attachment.previewUrl}
                      alt={attachment.name}
                      className="max-h-56 w-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center gap-3 p-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20">
                        <FileText size={19} />
                      </span>

                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium">
                          {attachment.name}
                        </span>
                        <span className="mt-0.5 block text-xs text-white/70">
                          {formatFileSize(attachment.size)}
                        </span>
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {message.text && (
            <p className="whitespace-pre-wrap leading-7">
              {message.text}
            </p>
          )}
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

          {message.article && (
            <a
              href={`/learn?article=${encodeURIComponent(message.article.id)}`}
              className="mt-5 flex w-full items-center justify-between rounded-2xl bg-[#241f20] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#3a3234]"
            >
              <span>
                <span className="block text-[10px] uppercase tracking-[0.14em] text-white/60">SHE Learn</span>
                <span className="mt-1 block">Read the full article</span>
              </span>
              <ArrowRight size={18} />
            </a>
          )}

          {message.journeyId && (
            <button type="button" onClick={() => onStartJourney?.(message.journeyId)} className="mt-5 flex w-full items-center justify-between rounded-2xl border border-[#f0cad7] bg-[#fff5f8] px-5 py-4 text-left text-sm font-semibold text-[#c92758]">
              <span className="flex items-center gap-3"><ClipboardList size={19} /><span><span className="block text-[10px] uppercase tracking-[0.14em] text-[#c92758]/65">Optional guided support</span><span className="mt-1 block">Help me work out my next steps</span></span></span>
              <ArrowRight size={18} />
            </button>
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
