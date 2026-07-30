import { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  Camera,
  FileText,
  Image,
  Mic,
  Paperclip,
  Square,
  X,
} from "lucide-react";

const MAX_ATTACHMENTS = 6;
const MAX_FILE_SIZE = 20 * 1024 * 1024;

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ChatComposer({
  message,
  setMessage,
  submitMessage,
  disabled,
  compact = false,
  attachments = [],
  setAttachments,
}) {
  const [attachmentMenuOpen, setAttachmentMenuOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [inputError, setInputError] = useState("");

  const cameraInputRef = useRef(null);
  const photoInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    function closeMenu(event) {
      if (
        attachmentMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setAttachmentMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", closeMenu);
    document.addEventListener("touchstart", closeMenu);

    return () => {
      document.removeEventListener("mousedown", closeMenu);
      document.removeEventListener("touchstart", closeMenu);
    };
  }, [attachmentMenuOpen]);

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop?.();

      attachments.forEach((attachment) => {
        if (attachment.previewUrl) {
          URL.revokeObjectURL(attachment.previewUrl);
        }
      });
    };
  }, []);

  function addFiles(fileList) {
    setInputError("");

    const selectedFiles = Array.from(fileList || []);

    if (!selectedFiles.length) return;

    const availableSpaces = MAX_ATTACHMENTS - attachments.length;

    if (availableSpaces <= 0) {
      setInputError(`You can attach up to ${MAX_ATTACHMENTS} files.`);
      return;
    }

    const validFiles = selectedFiles
      .filter((file) => {
        if (file.size > MAX_FILE_SIZE) {
          setInputError(
            `${file.name} is larger than the 20 MB attachment limit.`
          );
          return false;
        }

        return true;
      })
      .slice(0, availableSpaces)
      .map((file) => ({
        id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`,
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        previewUrl: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : null,
      }));

    setAttachments((current) => [...current, ...validFiles]);
    setAttachmentMenuOpen(false);

    if (selectedFiles.length > availableSpaces) {
      setInputError(`You can attach up to ${MAX_ATTACHMENTS} files.`);
    }
  }

  function removeAttachment(id) {
    setAttachments((current) => {
      const attachment = current.find((item) => item.id === id);

      if (attachment?.previewUrl) {
        URL.revokeObjectURL(attachment.previewUrl);
      }

      return current.filter((item) => item.id !== id);
    });
  }

  function startVoiceInput() {
    setInputError("");

    if (isListening) {
      recognitionRef.current?.stop?.();
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setInputError(
        "Voice input is not supported in this browser. Chrome works best."
      );
      return;
    }

    try {
      const recognition = new SpeechRecognition();

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-GB";

      const originalMessage = message.trim();

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        let transcript = "";

        for (let index = event.resultIndex; index < event.results.length; index += 1) {
          transcript += event.results[index][0].transcript;
        }

        const combined = [originalMessage, transcript.trim()]
          .filter(Boolean)
          .join(originalMessage ? " " : "");

        setMessage(combined);
      };

      recognition.onerror = (event) => {
        setIsListening(false);

        if (event.error === "not-allowed") {
          setInputError(
            "Microphone access was blocked. Allow microphone access in your browser settings and try again."
          );
          return;
        }

        if (event.error === "no-speech") {
          setInputError("I couldn’t hear anything. Please try again.");
          return;
        }

        setInputError("Voice input stopped unexpectedly. Please try again.");
      };

      recognition.onend = () => {
        setIsListening(false);
        recognitionRef.current = null;
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setInputError("Voice input could not start. Please try again.");
      setIsListening(false);
    }
  }

  function handleSubmit(event) {
    submitMessage(event);

    if (!disabled && (message.trim() || attachments.length > 0)) {
      recognitionRef.current?.stop?.();
      setAttachmentMenuOpen(false);
      setInputError("");
    }
  }

  const canSubmit =
    !disabled && (message.trim().length > 0 || attachments.length > 0);

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className={`mx-auto w-full max-w-3xl rounded-[28px] border bg-white px-4 shadow-[0_20px_55px_rgba(244,63,114,0.10)] transition md:px-5 ${
          isListening
            ? "border-[#f43f72] shadow-[0_22px_65px_rgba(244,63,114,0.20)]"
            : "border-pink-100 focus-within:border-pink-200 focus-within:shadow-[0_22px_65px_rgba(244,63,114,0.16)]"
        } ${compact ? "py-3" : "py-4"}`}
      >
        {attachments.length > 0 && (
          <div className="mb-3 flex gap-3 overflow-x-auto px-1 pb-1">
            {attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="relative min-w-[150px] max-w-[190px] overflow-hidden rounded-2xl border border-pink-100 bg-[#fffafa]"
              >
                {attachment.previewUrl ? (
                  <img
                    src={attachment.previewUrl}
                    alt=""
                    className="h-24 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-24 items-center justify-center bg-pink-50">
                    <FileText size={30} className="text-[#f43f72]" />
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => removeAttachment(attachment.id)}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/65 text-white transition hover:bg-black"
                  aria-label={`Remove ${attachment.name}`}
                >
                  <X size={15} />
                </button>

                <div className="px-3 py-2">
                  <p className="truncate text-xs font-medium text-stone-700">
                    {attachment.name}
                  </p>
                  <p className="mt-0.5 text-[11px] text-stone-400">
                    {formatFileSize(attachment.size)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {isListening && (
          <div className="mb-2 flex items-center gap-2 px-2 text-sm font-medium text-[#f43f72]">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f43f72] opacity-50" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-[#f43f72]" />
            </span>
            Listening… speak naturally
          </div>
        )}

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
          placeholder={
            isListening
              ? "Listening to you..."
              : "Tell SHE what’s been happening..."
          }
          className="max-h-40 min-h-[48px] w-full resize-none bg-transparent px-2 py-3 text-base leading-6 outline-none placeholder:text-stone-400"
        />

        <div className="flex items-center justify-between">
          <div ref={menuRef} className="relative">
            <button
              type="button"
              onClick={() => setAttachmentMenuOpen((current) => !current)}
              disabled={disabled}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-50 text-stone-600 transition hover:bg-pink-100 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Attach something"
              aria-expanded={attachmentMenuOpen}
            >
              <Paperclip size={19} />
            </button>

            {attachmentMenuOpen && (
              <div className="absolute bottom-12 left-0 z-50 w-64 overflow-hidden rounded-2xl border border-pink-100 bg-white p-2 shadow-[0_18px_55px_rgba(0,0,0,0.14)]">
                <p className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-[0.16em] text-stone-400">
                  Attach to chat
                </p>

                <AttachmentOption
                  icon={Camera}
                  title="Camera"
                  description="Take a new photo"
                  onClick={() => cameraInputRef.current?.click()}
                />

                <AttachmentOption
                  icon={Image}
                  title="Photos"
                  description="Choose from your photo library"
                  onClick={() => photoInputRef.current?.click()}
                />

                <AttachmentOption
                  icon={FileText}
                  title="Files"
                  description="PDFs, reports and documents"
                  onClick={() => fileInputRef.current?.click()}
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={startVoiceInput}
              disabled={disabled}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition disabled:cursor-not-allowed disabled:opacity-40 ${
                isListening
                  ? "bg-[#f43f72] text-white shadow-md"
                  : "bg-pink-50 text-stone-600 hover:bg-pink-100"
              }`}
              aria-label={
                isListening ? "Stop voice input" : "Use voice input"
              }
            >
              {isListening ? <Square size={16} /> : <Mic size={19} />}
            </button>

            <button
              type="submit"
              disabled={!canSubmit}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f43f72] text-white transition hover:scale-105 hover:bg-[#e93265] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Send message"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>

        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(event) => {
            addFiles(event.target.files);
            event.target.value = "";
          }}
        />

        <input
          ref={photoInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(event) => {
            addFiles(event.target.files);
            event.target.value = "";
          }}
        />

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.txt,.rtf,.csv,.xls,.xlsx,image/*"
          multiple
          className="hidden"
          onChange={(event) => {
            addFiles(event.target.files);
            event.target.value = "";
          }}
        />
      </form>

      {inputError && (
        <p
          role="alert"
          className="mx-auto mt-2 max-w-3xl px-3 text-sm text-red-600"
        >
          {inputError}
        </p>
      )}
    </div>
  );
}

function AttachmentOption({
  icon: Icon,
  title,
  description,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-pink-50"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-50 text-[#f43f72]">
        <Icon size={19} />
      </span>

      <span>
        <span className="block text-sm font-medium text-stone-800">
          {title}
        </span>
        <span className="mt-0.5 block text-xs text-stone-400">
          {description}
        </span>
      </span>
    </button>
  );
}