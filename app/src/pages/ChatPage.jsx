import { useEffect, useRef, useState } from "react";
import ChatComposer from "../components/ChatComposer";
import ChatMessage from "../components/ChatMessage";
import GuidedJourney from "../components/GuidedJourney";
import { ChevronLeft, ChevronRight, Lightbulb, Newspaper, Search, Sparkles, TrendingUp, ArrowRight } from "lucide-react";

const loadChatEngine = () => import("../utils/chatEngine");

const trendingProducts = [
  { brand: "BeYou", name: "Monthly Patches", image: "https://img.ananinja.com/media/bra-public-files/services-admin/files/dc51349f-8725-4d8d-8351-c0ea6005feb1" },
  { brand: "Mooncup", name: "Reusable Menstrual Cup", image: "https://images.coopvitality.ch/product-images/650/650/mooncup-coupe-menstruelle-28-8ml-reutilisable-main-001UCC.jpg" },
  { brand: "WUKA", name: "Ultimate Medium Flow Brief", image: "/products/internet/wuka-medium-flow.webp" },
  { brand: "Beurer", name: "HK 72 Battery Heat Belt", image: "/products/branded-static/beurer-hk72.webp" },
  { brand: "Vitabiotics", name: "Pregnacare Original", image: "/products/internet/pregnacare-original.webp" },
  { brand: "OMRON", name: "M3 Blood Pressure Monitor", image: "/products/internet/omron-m3.webp" },
];

const sheNews = [
  { category: "Pelvic health", title: "Why severe period pain deserves proper investigation", summary: "What to track and when to speak to a clinician." },
  { category: "Hormonal health", title: "PCOS is about more than ovarian cysts", summary: "A clearer look at symptoms, assessment and long-term care, including why PMOS is sometimes proposed as an alternative name." },
  { category: "Menopause", title: "Understanding the stages of menopause", summary: "How perimenopause, menopause and postmenopause differ." },
  { category: "Fertility", title: "What ovulation tests can—and cannot—tell you", summary: "How to use test results without overinterpreting them." },
  { category: "Everyday health", title: "Iron deficiency can show up in unexpected ways", summary: "Fatigue, breathlessness and other signs worth discussing." },
  { category: "Pregnancy", title: "Preparing useful questions for antenatal appointments", summary: "A simple framework for getting the information you need." },
];

const dailyTips = [
  { title: "Write down when symptoms change", description: "Timing, triggers and patterns can make health conversations more useful.", prompt: "How should I track my symptoms before an appointment?" },
  { title: "Bring a current medicines list", description: "Include prescriptions, supplements and anything you take only occasionally.", prompt: "How do I prepare a medicines list for an appointment?" },
  { title: "Describe impact, not only intensity", description: "Note whether a symptom affects sleep, work, movement, eating or relationships.", prompt: "How can I explain the impact of my symptoms to a clinician?" },
  { title: "Track the first day of each period", description: "A simple calendar can reveal changes in cycle length and bleeding patterns.", prompt: "What period details are most useful to track?" },
  { title: "Write questions before an appointment", description: "Choose the three answers you most need so time pressure does not derail you.", prompt: "Help me prepare questions for a health appointment." },
  { title: "Check medicine instructions", description: "Some treatments depend on timing, food or avoiding particular combinations.", prompt: "What should I check when reading medicine instructions?" },
  { title: "Notice patterns around sleep", description: "Record bedtime, waking, symptoms and energy for a clearer picture over time.", prompt: "How can I keep a useful sleep and symptom diary?" },
  { title: "Do not normalise disruptive pain", description: "Pain that repeatedly stops daily activities deserves clinical attention.", prompt: "When should period or pelvic pain be medically assessed?" },
  { title: "Record unusual bleeding clearly", description: "Dates, duration, heaviness, clots and associated symptoms are useful details.", prompt: "How should I track unusual or heavy bleeding?" },
  { title: "Prepare for blood-pressure readings", description: "Sit quietly, support your arm and avoid talking during the measurement.", prompt: "How do I take an accurate blood-pressure reading at home?" },
  { title: "Ask what happens next", description: "Before leaving an appointment, clarify follow-up, results and when to seek urgent help.", prompt: "What follow-up questions should I ask at the end of an appointment?" },
  { title: "Keep test results together", description: "A single secure folder makes trends and past investigations easier to review.", prompt: "How should I organise my health records and test results?" },
  { title: "Mention every relevant symptom", description: "Symptoms across different body systems may still be important when considered together.", prompt: "How can I summarise several symptoms clearly for a clinician?" },
  { title: "Know your urgent warning signs", description: "Severe sudden pain, heavy bleeding, fainting or breathing difficulty need prompt assessment.", prompt: "Which women's health symptoms need urgent medical help?" },
];

export default function ChatPage({
  conversation,
  setConversation,
  saveConversation,
  navigate,
}) {
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [activeJourney, setActiveJourney] = useState(null);

  const endRef = useRef(null);
  const streamIntervalRef = useRef(null);
  const responseTimeoutRef = useRef(null);

  const hasConversation = conversation.length > 0;
  const isBusy = isThinking || Boolean(streamingText);
  const dailyTip = dailyTips[getLocalDayNumber() % dailyTips.length];

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

    responseTimeoutRef.current = window.setTimeout(async () => {
      const { generateSHEReply } = await loadChatEngine();
      const response = generateSHEReply({
        message: cleanMessage,
        attachments: submittedAttachments,
        conversation: conversationWithUserMessage,
        healthContext: readConsentedHealthContext(),
      });

      streamResponse(
        response.text,
        cleanMessage || createAttachmentTitle(submittedAttachments),
        response.suggestions,
        response.article,
        response.urgency === "urgent" ? null : detectJourney(cleanMessage),
        response.urgency,
      );
    }, submittedAttachments.length > 0 ? 850 : 450);
  }

  function streamResponse(fullResponse, conversationTitle, suggestions = [], article = null, journeyId = null, urgency = null) {
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
          suggestions,
          article,
          journeyId,
          urgency,
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

  function searchProducts(event) {
    event.preventDefault();
    navigate("products", { search: productSearch });
  }

  function handlePlanSaved() {
    setActiveJourney(null);
    const completedMessage = {
      id: createMessageId(),
      role: "she",
      text: "Your summary has been saved privately in My Health. You can return to it or export it before an appointment whenever you need it.",
      suggestions: ["Help me prepare for an appointment", "What should I track next?"],
    };
    setConversation((current) => [...current, completedMessage]);
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-5 pb-52 pt-4 md:px-8 lg:px-12">
      {!hasConversation && !streamingText && (
        <section className="py-10 md:py-16">
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

            <form onSubmit={searchProducts} className="mx-auto mt-5 flex w-full max-w-2xl flex-col gap-3 rounded-2xl border border-[#f4cad8] bg-[#fff7fa] p-3 sm:flex-row sm:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-3 px-2">
                <Sparkles size={17} className="shrink-0 text-[#e93368]" />
                <label htmlFor="homepage-product-search" className="sr-only">Search SHE Finds products</label>
                <input
                  id="homepage-product-search"
                  value={productSearch}
                  onChange={(event) => setProductSearch(event.target.value)}
                  placeholder="Search SHE Finds — period care, fertility, menopause…"
                  className="h-11 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-stone-400"
                />
              </div>
              <button type="submit" className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#211d1f] px-5 text-sm font-semibold text-white">
                <Search size={16} /> {productSearch.trim() ? "Search products" : "Explore SHE Finds"}
              </button>
            </form>

            <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3">
              <TrendingCarousel items={trendingProducts} onOpen={() => navigate("products")} />
              <NewsCarousel items={sheNews} onOpen={() => navigate("education")} />
              <DailyTipCard tip={dailyTip} onAsk={() => chooseSuggestion(dailyTip.prompt)} />
            </div>
          </div>
        </section>
      )}

      {(hasConversation || streamingText) && (
        <section className="mx-auto max-w-3xl pb-40 pt-3">
          <div className="mb-7">
            <p className="text-sm font-medium text-[#f43f72]">
              SHE Health Navigator
            </p>

            <h2 className="mt-1 text-2xl font-semibold">
              Your conversation
            </h2>
          </div>

          {activeJourney && <div className="mb-7"><GuidedJourney journeyId={activeJourney} onClose={() => setActiveJourney(null)} onSaved={handlePlanSaved} navigate={navigate} /></div>}

          <div className="space-y-6">
            {conversation.map((entry) => (
              <ChatMessage
                key={entry.id}
                message={entry}
                suggestions={entry.suggestions || []}
                chooseSuggestion={chooseSuggestion}
                onStartJourney={setActiveJourney}
              />
            ))}

            {isThinking && <ThinkingMessage />}

            {streamingText && (
  <ChatMessage
    key="streaming-response"
    message={{
      id: "streaming-response",
      role: "she",
      text: streamingText,
    }}
    suggestions={[]}
    chooseSuggestion={chooseSuggestion}
  />
)}

            <div ref={endRef} className="h-28 scroll-mb-48" aria-hidden="true" />
          </div>

          <div className="sticky bottom-20 z-20 mt-8 md:bottom-6">
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

function detectJourney(message = "") {
  const text = message.toLowerCase();
  const personal = /\b(i|my|me|i'm|i’ve|ive)\b/.test(text);
  if (!personal) return null;
  if (/pregnan|postpartum|postnatal|after (giving )?birth|baby movement/.test(text)) return "pregnancy-postpartum";
  if (/cycle.*chang|period.*(late|early|miss|irregular)|bleeding between/.test(text)) return "cycle-changed";
  if (/(heavy|painful) period|period.*(heavy|pain|clot|flood)|bleed.*through/.test(text)) return "heavy-periods";
  return null;
}

function readConsentedHealthContext() {
  try {
    const profile = JSON.parse(window.localStorage.getItem("she-health-profile") || "{}");
    const memoryAllowed = window.localStorage.getItem("she-memory-consent-v1") === "yes";
    const plans = JSON.parse(window.localStorage.getItem("she-health-plans-v1") || "[]");
    const profileAllowed = profile.personaliseChat === true;
    return {
      enabled: profileAllowed || memoryAllowed,
      lifeStage: profileAllowed ? profile.lifeStage || "" : "",
      conditions: profileAllowed ? profile.conditions || [] : [],
      symptoms: profileAllowed ? profile.symptoms || [] : [],
      medications: profileAllowed ? profile.medications || [] : [],
      latestSummary: memoryAllowed && Array.isArray(plans) ? plans[0]?.summary || "" : "",
    };
  } catch {
    return { enabled: false };
  }
}

function TrendingCarousel({ items, onOpen }) {
  const [index, setIndex] = useState(0);
  const item = items[index];

  return (
    <article className="overflow-hidden rounded-2xl border border-[#f7d7e2] bg-white shadow-sm">
      <CarouselHeader icon={TrendingUp} label="Trending on SHE" index={index} count={items.length} setIndex={setIndex} />
      <button type="button" onClick={onOpen} className="group block w-full text-left">
        <div className="aspect-[4/3] overflow-hidden bg-[#fff7fa]">
          <img src={item.image} alt={`${item.brand} ${item.name}`} className="h-full w-full object-contain p-3 transition duration-500 group-hover:scale-[1.03]" />
        </div>
        <div className="p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#d92f62]">{item.brand}</p>
          <h3 className="mt-2 font-semibold leading-snug">{item.name}</h3>
          <span className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#d92f62]">View in SHE Finds <ArrowRight size={15} /></span>
        </div>
      </button>
      <CarouselDots count={items.length} index={index} setIndex={setIndex} label="trending product" />
    </article>
  );
}

function NewsCarousel({ items, onOpen }) {
  const [index, setIndex] = useState(0);
  const item = items[index];

  return (
    <article className="overflow-hidden rounded-2xl border border-[#e7e0f7] bg-white shadow-sm">
      <CarouselHeader icon={Newspaper} label="SHE News" index={index} count={items.length} setIndex={setIndex} />
      <button type="button" onClick={onOpen} className="group block w-full text-left">
        <div className="flex aspect-[4/3] items-end bg-gradient-to-br from-[#eee8ff] via-[#f8f5ff] to-white p-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7255a6]">{item.category}</p>
            <h3 className="mt-3 text-xl font-semibold leading-snug">{item.title}</h3>
          </div>
        </div>
        <div className="p-5">
          <p className="text-sm leading-6 text-stone-600">{item.summary}</p>
          <span className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#7255a6]">Read in SHE Learn <ArrowRight size={15} /></span>
        </div>
      </button>
      <CarouselDots count={items.length} index={index} setIndex={setIndex} label="news story" />
    </article>
  );
}

function DailyTipCard({ tip, onAsk }) {
  return (
    <article className="flex min-h-full flex-col rounded-2xl bg-[#eef8f5] p-6">
      <div className="flex items-center gap-2 text-sm font-semibold text-[#287563]"><Lightbulb size={18} /> Daily tip</div>
      <p className="mt-2 text-xs font-medium text-[#4d8879]">One practical idea for today</p>
      <h3 className="mt-8 text-2xl font-semibold leading-snug">{tip.title}</h3>
      <p className="mt-4 text-sm leading-7 text-stone-600">{tip.description}</p>
      <button type="button" onClick={onAsk} className="mt-auto flex items-center gap-2 pt-8 text-left text-sm font-semibold text-[#287563]">Ask SHE about this <ArrowRight size={15} /></button>
    </article>
  );
}

function CarouselHeader({ icon: Icon, label, index, count, setIndex }) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-[#d92f62]"><Icon size={17} /> {label}</div>
      <div className="flex items-center gap-1">
        <button type="button" onClick={() => setIndex((index - 1 + count) % count)} aria-label={`Previous ${label} slide`} className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-50 text-stone-600 hover:bg-stone-100"><ChevronLeft size={16} /></button>
        <button type="button" onClick={() => setIndex((index + 1) % count)} aria-label={`Next ${label} slide`} className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-50 text-stone-600 hover:bg-stone-100"><ChevronRight size={16} /></button>
      </div>
    </div>
  );
}

function CarouselDots({ count, index, setIndex, label }) {
  return <div className="flex justify-center gap-1.5 pb-4">{Array.from({ length: count }, (_, dot) => <button key={dot} type="button" onClick={() => setIndex(dot)} aria-label={`Show ${label} ${dot + 1}`} className={`h-1.5 rounded-full transition-all ${dot === index ? "w-5 bg-[#e93368]" : "w-1.5 bg-stone-300"}`} />)}</div>;
}

function getLocalDayNumber() {
  const now = new Date();
  return Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000);
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
