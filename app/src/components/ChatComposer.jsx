import { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  Camera,
  FileText,
  Image,
  Mic,
  Paperclip,
  Square,
  UploadCloud,
  X,
} from "lucide-react";

const MAX_ATTACHMENTS = 6;
const MAX_FILE_SIZE = 20 * 1024 * 1024;

const ACCEPTED_FILE_TYPES = [
  ".pdf",
  ".doc",
  ".docx",
  ".txt",
  ".rtf",
  ".csv",
  ".xls",
  ".xlsx",
  "image/*",
].join(",");

function createAttachmentId(file) {
  const randomPart =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2);

  return `${file.name}-${file.size}-${file.lastModified}-${randomPart}`;
}

function formatFileSize(bytes = 0) {
  if (bytes < 1024) return `${bytes} B`;

  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isImageFile(file) {
  return file?.type?.startsWith("image/");
}

function isAcceptedFile(file) {
  if (!file) return false;

  if (isImageFile(file)) return true;

  const acceptedExtensions = [
    ".pdf",
    ".doc",
    ".docx",
    ".txt",
    ".rtf",
    ".csv",
    ".xls",
    ".xlsx",
  ];

  const lowerName = file.name.toLowerCase();

  return acceptedExtensions.some((extension) =>
    lowerName.endsWith(extension)
  );
}

export default function ChatComposer({
  message,
  setMessage,
  submitMessage,
  disabled = false,
  compact = false,
  attachments = [],
  setAttachments,
}) {
  const [attachmentMenuOpen, setAttachmentMenuOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [inputError, setInputError] = useState("");

  const cameraInputRef = useRef(null);
  const photoInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const recognitionRef = useRef(null);
  const menuRef = useRef(null);
  const dragDepthRef = useRef(0);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        attachmentMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setAttachmentMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [attachmentMenuOpen]);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
  }, [message]);

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop?.();
    };
  }, []);

  function showError(errorMessage) {
    setInputError(errorMessage);

    window.setTimeout(() => {
      setInputError((currentError) =>
        currentError === errorMessage ? "" : currentError
      );
    }, 5000);
  }

  function addFiles(fileList) {
    setInputError("");

    const selectedFiles = Array.from(fileList || []);

    if (!selectedFiles.length) return;

    const availableSpaces = MAX_ATTACHMENTS - attachments.length;

    if (availableSpaces <= 0) {
      showError(`You can attach up to ${MAX_ATTACHMENTS} files.`);
      return;
    }

    const acceptedFiles = [];

    for (const file of selectedFiles) {
      if (!isAcceptedFile(file)) {
        showError(
          `${file.name} is not a supported file type. Try an image, PDF, Word document or spreadsheet.`
        );
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        showError(`${file.name} is larger than the 20 MB limit.`);
        continue;
      }

      acceptedFiles.push(file);
    }

    const filesToAdd = acceptedFiles.slice(0, availableSpaces);

    const newAttachments = filesToAdd.map((file) => ({
      id: createAttachmentId(file),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      previewUrl: isImageFile(file)
        ? URL.createObjectURL(file)
        : null,
    }));

    setAttachments((current) => [...current, ...newAttachments]);
    setAttachmentMenuOpen(false);

    if (acceptedFiles.length > availableSpaces) {
      showError(`You can attach up to ${MAX_ATTACHMENTS} files.`);
    }
  }

  function removeAttachment(id) {
    setAttachments((current) => {
      const removedAttachment = current.find(
        (attachment) => attachment.id === id
      );

      if (removedAttachment?.previewUrl) {
        URL.revokeObjectURL(removedAttachment.previewUrl);
      }

      return current.filter((attachment) => attachment.id !== id);
    });
  }

  function handlePaste(event) {
    const clipboardItems = Array.from(
      event.clipboardData?.items || []
    );

    const pastedImages = clipboardItems
      .filter((item) => item.kind === "file")
      .map((item) => item.getAsFile())
      .filter(Boolean);

    if (!pastedImages.length) return;

    event.preventDefault();
    addFiles(pastedImages);
  }

  function handleDragEnter(event) {
    event.preventDefault();
    event.stopPropagation();

    if (disabled) return;

    dragDepthRef.current += 1;
    setIsDragging(true);
  }

  function handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "copy";
    }
  }

  function handleDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();

    dragDepthRef.current -= 1;

    if (dragDepthRef.current <= 0) {
      dragDepthRef.current = 0;
      setIsDragging(false);
    }
  }

  function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    dragDepthRef.current = 0;
    setIsDragging(false);

    if (disabled) return;

    addFiles(event.dataTransfer?.files);
  }

  function stopVoiceInput() {
    recognitionRef.current?.stop?.();
    recognitionRef.current = null;
    setIsListening(false);
  }

  async function startVoiceInput() {
    setInputError("");

    if (isListening) {
      stopVoiceInput();
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      showError(
        "Voice input is not supported in this browser. Google Chrome works best."
      );
      return;
    }

    try {
      if (navigator.mediaDevices?.getUserMedia) {
        const permissionStream =
          await navigator.mediaDevices.getUserMedia({
            audio: true,
          });

        permissionStream
          .getTracks()
          .forEach((track) => track.stop());
      }

      const recognition = new SpeechRecognition();
      const startingMessage = message.trim();

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-GB";

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        let transcript = "";

        for (
          let index = event.resultIndex;
          index < event.results.length;
          index += 1
        ) {
          transcript += event.results[index][0].transcript;
        }

        const spokenText = transcript.trim();

        setMessage(
          [startingMessage, spokenText]
            .filter(Boolean)
            .join(startingMessage && spokenText ? " " : "")
        );
      };

      recognition.onerror = (event) => {
        setIsListening(false);
        recognitionRef.current = null;

        if (
          event.error === "not-allowed" ||
          event.error === "service-not-allowed"
        ) {
          showError(
            "Microphone access is blocked. Allow microphone access in your browser settings and try again."
          );
          return;
        }

        if (event.error === "no-speech") {
          showError(
            "I couldn’t hear anything. Please try speaking again."
          );
          return;
        }

        if (event.error === "audio-capture") {
          showError(
            "No microphone was found. Check that your microphone is connected."
          );
          return;
        }

        if (event.error !== "aborted") {
          showError(
            "Voice input stopped unexpectedly. Please try again."
          );
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        recognitionRef.current = null;
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (error) {
      setIsListening(false);
      recognitionRef.current = null;

      if (
        error?.name === "NotAllowedError" ||
        error?.name === "PermissionDeniedError"
      ) {
        showError(
          "Microphone access is blocked. Select the microphone icon beside the address bar and choose Allow."
        );
        return;
      }

      showError(
        "Voice input could not start. Check your microphone and try again."
      );
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const hasContent =
      message.trim().length > 0 || attachments.length > 0;

    if (disabled || !hasContent) return;

    stopVoiceInput();
    setAttachmentMenuOpen(false);
    setInputError("");

    submitMessage(event);
  }

  const canSubmit =
    !disabled &&
    (message.trim().length > 0 || attachments.length > 0);

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative mx-auto w-full max-w-3xl overflow-visible rounded-[30px] border bg-white px-4 transition-all duration-200 md:px-5 ${
          compact ? "py-3" : "py-4"
        } ${
          isListening
            ? "border-[#f43f72] shadow-[0_20px_65px_rgba(244,63,114,0.22)]"
            : "border-pink-100 shadow-[0_20px_55px_rgba(244,63,114,0.10)] focus-within:border-pink-200 focus-within:shadow-[0_22px_65px_rgba(244,63,114,0.15)]"
        }`}
      >
        {isDragging && (
          <div className="absolute inset-0 z-40 flex items-center justify-center rounded-[30px] border-2 border-dashed border-[#f43f72] bg-white/95 backdrop-blur-sm">
            <div className="text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-50 text-[#f43f72]">
                <UploadCloud size={27} />
              </span>

              <p className="mt-3 font-semibold text-stone-800">
                Drop files to attach
              </p>

              <p className="mt-1 text-sm text-stone-400">
                Images, PDFs and health documents
              </p>
            </div>
          </div>
        )}

        {attachments.length > 0 && (
          <div className="mb-3 flex gap-3 overflow-x-auto px-1 pb-2">
            {attachments.map((attachment) => (
              <AttachmentPreview
                key={attachment.id}
                attachment={attachment}
                removeAttachment={removeAttachment}
              />
            ))}
          </div>
        )}

        {isListening && (
          <div className="mb-2 flex items-center gap-3 rounded-2xl bg-pink-50 px-3 py-2">
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f43f72] opacity-50" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-[#f43f72]" />
            </span>

            <div className="flex flex-1 items-end gap-[3px]">
              {[12, 20, 15, 25, 18, 28, 13, 22, 16, 26, 14, 20].map(
                (height, index) => (
                  <span
                    key={`${height}-${index}`}
                    className="voice-wave-bar w-[3px] rounded-full bg-[#f43f72]"
                    style={{
                      height,
                      animationDelay: `${index * 70}ms`,
                    }}
                  />
                )
              )}
            </div>

            <span className="text-sm font-medium text-[#f43f72]">
              Listening…
            </span>
          </div>
        )}

        <textarea
          ref={textareaRef}
          id="she-message-input"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onPaste={handlePaste}
          onKeyDown={(event) => {
            if (
              event.key === "Enter" &&
              !event.shiftKey &&
              !event.nativeEvent.isComposing
            ) {
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
          className="max-h-40 min-h-[48px] w-full resize-none overflow-y-auto bg-transparent px-2 py-3 text-base leading-6 text-stone-800 outline-none placeholder:text-stone-400 disabled:cursor-not-allowed disabled:opacity-60"
        />

        <div className="flex items-center justify-between pt-1">
          <div ref={menuRef} className="relative">
            <button
              type="button"
              onClick={() =>
                setAttachmentMenuOpen((current) => !current)
              }
              disabled={disabled}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
                attachmentMenuOpen
                  ? "bg-pink-100 text-[#f43f72]"
                  : "bg-pink-50 text-stone-600 hover:bg-pink-100 hover:text-[#f43f72]"
              } disabled:cursor-not-allowed disabled:opacity-40`}
              aria-label="Attach something"
              aria-expanded={attachmentMenuOpen}
            >
              <Paperclip size={19} />
            </button>

            {attachmentMenuOpen && (
              <div className="absolute bottom-13 left-0 z-50 w-[280px] overflow-hidden rounded-2xl border border-pink-100 bg-white p-2 shadow-[0_20px_65px_rgba(0,0,0,0.16)]">
                <div className="flex items-center justify-between px-3 pb-2 pt-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-400">
                    Attach to chat
                  </p>

                  <button
                    type="button"
                    onClick={() => setAttachmentMenuOpen(false)}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
                    aria-label="Close attachment menu"
                  >
                    <X size={15} />
                  </button>
                </div>

                <AttachmentOption
                  icon={Camera}
                  title="Camera"
                  description="Take a new photo"
                  onClick={() => cameraInputRef.current?.click()}
                />

                <AttachmentOption
                  icon={Image}
                  title="Photos"
                  description="Choose images from your device"
                  onClick={() => photoInputRef.current?.click()}
                />

                <AttachmentOption
                  icon={FileText}
                  title="Files"
                  description="PDFs, reports and documents"
                  onClick={() => fileInputRef.current?.click()}
                />

                <div className="mx-3 my-2 border-t border-stone-100" />

                <p className="px-3 pb-2 text-[11px] leading-4 text-stone-400">
                  You can also drag files here or paste a screenshot.
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={startVoiceInput}
              disabled={disabled}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition duration-200 disabled:cursor-not-allowed disabled:opacity-40 ${
                isListening
                  ? "scale-105 bg-[#f43f72] text-white shadow-[0_6px_20px_rgba(244,63,114,0.35)]"
                  : "bg-pink-50 text-stone-600 hover:bg-pink-100 hover:text-[#f43f72]"
              }`}
              aria-label={
                isListening
                  ? "Stop voice input"
                  : "Start voice input"
              }
              title={
                isListening
                  ? "Stop listening"
                  : "Speak your message"
              }
            >
              {isListening ? (
                <Square size={15} fill="currentColor" />
              ) : (
                <Mic size={19} />
              )}
            </button>

            <button
              type="submit"
              disabled={!canSubmit}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f43f72] text-white shadow-sm transition duration-200 hover:scale-105 hover:bg-[#e93265] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:scale-100"
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
          accept={ACCEPTED_FILE_TYPES}
          multiple
          className="hidden"
          onChange={(event) => {
            addFiles(event.target.files);
            event.target.value = "";
          }}
        />
      </form>

      {inputError && (
        <div
          role="alert"
          className="mx-auto mt-2 flex max-w-3xl items-start justify-between gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <span>{inputError}</span>

          <button
            type="button"
            onClick={() => setInputError("")}
            className="shrink-0 text-red-400 transition hover:text-red-700"
            aria-label="Dismiss error"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <style>{`
        @keyframes sheVoiceWave {
          0%, 100% {
            transform: scaleY(0.45);
            opacity: 0.55;
          }

          50% {
            transform: scaleY(1);
            opacity: 1;
          }
        }

        .voice-wave-bar {
          transform-origin: bottom;
          animation: sheVoiceWave 760ms ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

function AttachmentPreview({
  attachment,
  removeAttachment,
}) {
  return (
    <div className="group relative min-w-[158px] max-w-[190px] overflow-hidden rounded-2xl border border-pink-100 bg-[#fffafa] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      {attachment.previewUrl ? (
        <div className="relative h-24 overflow-hidden bg-stone-100">
          <img
            src={attachment.previewUrl}
            alt={attachment.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition group-hover:opacity-100" />
        </div>
      ) : (
        <div className="flex h-24 items-center justify-center bg-gradient-to-br from-pink-50 to-[#fff8fa]">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#f43f72] shadow-sm">
            <FileText size={25} />
          </span>
        </div>
      )}

      <button
        type="button"
        onClick={() => removeAttachment(attachment.id)}
        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/65 text-white shadow-sm backdrop-blur-sm transition hover:scale-105 hover:bg-black"
        aria-label={`Remove ${attachment.name}`}
      >
        <X size={15} />
      </button>

      <div className="px-3 py-2.5">
        <p
          className="truncate text-xs font-semibold text-stone-700"
          title={attachment.name}
        >
          {attachment.name}
        </p>

        <div className="mt-1 flex items-center justify-between gap-2">
          <p className="text-[11px] text-stone-400">
            {formatFileSize(attachment.size)}
          </p>

          <span className="rounded-full bg-pink-50 px-2 py-0.5 text-[10px] font-medium text-[#f43f72]">
            Ready
          </span>
        </div>
      </div>
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
      className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-pink-50"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-50 text-[#f43f72] transition group-hover:bg-white group-hover:shadow-sm">
        <Icon size={19} />
      </span>

      <span className="min-w-0">
        <span className="block text-sm font-semibold text-stone-800">
          {title}
        </span>

        <span className="mt-0.5 block text-xs text-stone-400">
          {description}
        </span>
      </span>
    </button>
  );
}