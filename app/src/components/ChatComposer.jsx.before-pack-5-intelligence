import { ArrowUp, Mic, Paperclip } from "lucide-react";

export default function ChatComposer({
  message,
  setMessage,
  submitMessage,
  disabled,
  compact = false,
}) {
  return (
    <form
      onSubmit={submitMessage}
      className={`mx-auto w-full max-w-3xl rounded-[28px] border border-pink-100 bg-white px-4 shadow-[0_20px_55px_rgba(244,63,114,0.10)] transition focus-within:border-pink-200 focus-within:shadow-[0_22px_65px_rgba(244,63,114,0.16)] md:px-5 ${
        compact ? "py-3" : "py-4"
      }`}
    >
      <textarea
        id="she-message-input"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            event.currentTarget.form?.requestSubmit();
          }
        }}
        rows={1}
        disabled={disabled}
        placeholder="Tell SHE what’s been happening..."
        className="max-h-40 min-h-[48px] w-full resize-none bg-transparent px-2 py-3 text-base leading-6 outline-none placeholder:text-stone-400"
      />

      <div className="flex items-center justify-between">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-50 text-stone-600 transition hover:bg-pink-100"
          aria-label="Attach a file"
        >
          <Paperclip size={19} />
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-50 text-stone-600 transition hover:bg-pink-100"
            aria-label="Use voice input"
          >
            <Mic size={19} />
          </button>

          <button
            type="submit"
            disabled={disabled || !message.trim()}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f43f72] text-white transition hover:scale-105 hover:bg-[#e93265] disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Send message"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </form>
  );
}
