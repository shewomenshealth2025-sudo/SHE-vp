import { Link } from "react-router-dom";
import { products } from "../../data/products";
import { getGpQuestions } from "../../utils/gpQuestions";

function Section({ title, children }) {
  if (!children) return null;

  return (
    <section className="border-t border-gray-200 py-8">
      <h2 className="mb-4 text-2xl font-bold text-gray-900">
        {title}
      </h2>

      {children}
    </section>
  );
}

function List({ items }) {
  if (!items?.length) return null;

  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li
          key={`${item}-${index}`}
          className="flex gap-3 text-gray-700"
        >
          <span className="mt-2 h-2 w-2 flex-none rounded-full bg-pink-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function formatId(value) {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const fallbackSources = [
  { title: "NHS Health A to Z", url: "https://www.nhs.uk/conditions/" },
  { title: "HSE Women’s health A–Z", url: "https://www2.hse.ie/conditions/womens-health-a-z/" },
];

export default function ConditionViewer({ condition, onBack, onSelectRelated }) {
  if (!condition) return null;
  const articleType = condition.articleType || "condition";
  const clinical = ["condition", "symptom"].includes(articleType);
  const gpQuestions = clinical ? getGpQuestions(condition) : getNonClinicalQuestions(articleType);
  const relatedProducts = (condition.relatedProductIds || [])
    .map((id) => products.find((product) => product.id === id))
    .filter(Boolean);

  return (
    <article className="mx-auto max-w-5xl">
      <button
        type="button"
        onClick={onBack}
        className="mb-8 font-semibold text-pink-600 hover:text-pink-700"
      >
        ← Back to Learn
      </button>

      <header className="mb-10 rounded-3xl bg-gradient-to-br from-pink-50 to-white p-8 md:p-12">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-pink-600 shadow-sm">
            {condition.category || "Women’s health"}
          </span>

          <span className="text-sm text-gray-500">Expected reading time: {condition.readTime || 6} minutes</span>
        </div>

        <h1 className="mb-5 text-4xl font-bold text-gray-900 md:text-6xl">
          {condition.title}
        </h1>

        <p className="max-w-3xl text-lg leading-8 text-gray-700">
          {condition.summary}
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <TrustFact label="Evidence basis" value="Based on NHS and HSE guidance" />
          <TrustFact label="Editorial review completed" value={condition.lastReviewed || condition.reviewed || "8 August 2026"} />
          <TrustFact label="Sources used" value={`${(condition.sources?.length || fallbackSources.length)} linked references`} />
        </div>
      </header>

      {!clinical ? <NonClinicalArticle condition={condition} questions={gpQuestions} /> : <>
        <Section title="At a glance">
          <List items={condition.quickFacts} />
        </Section>

        <Section title={articleType === "symptom" ? "What this symptom can feel like" : "Common symptoms"}>
          <div className="flex flex-wrap gap-3">
            {condition.symptoms?.map((symptom) => (
              <span key={symptom} className="rounded-full border border-pink-200 bg-pink-50 px-4 py-2 text-sm font-medium text-gray-800">{formatId(symptom)}</span>
            ))}
          </div>
        </Section>

        <Section title={articleType === "symptom" ? "Possible explanations" : "Possible causes"}><List items={condition.causes} /></Section>
        <Section title={articleType === "symptom" ? "Details that can change what it means" : "Risk factors"}><List items={condition.riskFactors} /></Section>
        <Section title={articleType === "symptom" ? "How it may be assessed" : "How it is diagnosed"}><List items={condition.diagnosis} /></Section>
        <Section title={articleType === "symptom" ? "What may help depends on the cause" : "Treatment and management"}><List items={condition.treatments} /></Section>
        <Section title="Things that may help"><List items={condition.selfCare} /></Section>
        <Section title="When to speak to a healthcare professional"><List items={condition.whenToSeeGP} /></Section>

        <QuestionPanel title={articleType === "symptom" ? "Questions to help a clinician assess this symptom" : "Questions you could ask your GP"} eyebrow="Prepare for an appointment" questions={gpQuestions} description="Choose the questions that match your situation and add your own. You do not need to ask all of them in one appointment." />

        <section className="my-8 rounded-2xl border border-red-200 bg-red-50 p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-red-700">When to seek urgent help</p>
          <h2 className="mt-2 text-2xl font-bold text-gray-900">Do not wait for a routine appointment if:</h2>
          <div className="mt-5"><List items={condition.emergencySigns?.length ? condition.emergencySigns : ["Symptoms are sudden, severe or rapidly worsening.", "You have heavy bleeding with fainting, chest pain, breathing difficulty or feel seriously unwell."]} /></div>
          <p className="mt-5 text-sm leading-6 text-red-800">In the UK, call 999 for a life-threatening emergency or use NHS 111 for urgent advice when you are unsure.</p>
        </section>
      </>}

      <Section title="Sources used">
        <ul className="space-y-3">
          {(condition.sources?.length ? condition.sources : fallbackSources).map((source) => {
            const item = typeof source === "string" ? { title: source, url: null } : source;
            return <li key={`${item.title}-${item.url || "source"}`}>{item.url ? <a href={item.url} target="_blank" rel="noreferrer" className="font-medium text-pink-700 underline decoration-pink-200 underline-offset-4 hover:text-pink-800">{item.title} ↗</a> : <span className="text-gray-700">{item.title}</span>}</li>;
          })}
        </ul>
      </Section>

      {condition.relatedConditions?.length > 0 && (
        <Section title="Related guides">
          <div className="flex flex-wrap gap-3">
            {condition.relatedConditions.map((id) => (
              <button key={id} type="button" onClick={() => onSelectRelated?.(id)} className="rounded-full border border-pink-200 bg-pink-50 px-4 py-2 text-sm font-medium text-pink-800 transition hover:bg-pink-100">
                {formatId(id)}
              </button>
            ))}
          </div>
        </Section>
      )}

      {clinical && relatedProducts.length > 0 && (
        <section className="mt-8 rounded-3xl border border-pink-100 bg-pink-50/50 p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-pink-700">Related products</p>
          <h2 className="mt-2 text-2xl font-bold text-gray-900">Products that may support comfort or tracking</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">These products do not treat the underlying condition. Check the full SHE Score, suitability and safety information before buying.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.slice(0, 3).map((product) => (
              <Link key={product.id} to="/products" className="group rounded-2xl border border-white bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                {product.image && <img src={product.image} alt={product.name} className="aspect-square w-full rounded-xl bg-gray-50 object-contain" loading="lazy" />}
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">{product.brand}</p>
                <h3 className="mt-1 font-semibold text-gray-900 group-hover:text-pink-700">{product.name}</h3>
                <p className="mt-2 text-sm font-semibold text-pink-700">SHE Score {product.score.toFixed(1)} · View in SHE Finds →</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm leading-6 text-gray-600">
        This information is for education and does not replace advice from a
        qualified healthcare professional.
      </div>
    </article>
  );
}

function NonClinicalArticle({ condition, questions }) {
  const hospital = condition.articleType === "healthcare-navigation";
  const explainer = condition.articleType === "life-stage-explainer";
  const procedure = condition.articleType === "procedure";
  const medicine = condition.articleType === "medicine";
  if (procedure) return <>
    <Section title="What this procedure or treatment involves"><List items={condition.quickFacts} /></Section>
    <Section title="How it works"><List items={condition.causes} /></Section>
    <Section title="What you may experience"><div className="flex flex-wrap gap-3">{condition.symptoms?.map((item) => <span key={item} className="rounded-full border border-pink-200 bg-pink-50 px-4 py-2 text-sm font-medium text-gray-800">{formatId(item)}</span>)}</div></Section>
    <Section title="Assessment and preparation"><List items={condition.diagnosis} /></Section>
    <Section title="What happens during treatment"><List items={condition.treatments} /></Section>
    <Section title="Recovery and practical guidance"><List items={condition.selfCare} /></Section>
    <Section title="When to contact the treatment team"><List items={condition.whenToSeeGP} /></Section>
    <QuestionPanel eyebrow="Prepare for treatment" title="Questions to ask the specialist team" description="Use the questions that fit your stage of care, priorities and treatment plan." questions={questions} />
    <SafetyPanel items={condition.emergencySigns} />
  </>;
  if (medicine) return <>
    <Section title="What this medicine is used for"><List items={condition.quickFacts} /></Section>
    <Section title="How it works"><List items={condition.causes} /></Section>
    <Section title="Possible effects and side effects"><div className="flex flex-wrap gap-3">{condition.symptoms?.map((item) => <span key={item} className="rounded-full border border-pink-200 bg-pink-50 px-4 py-2 text-sm font-medium text-gray-800">{formatId(item)}</span>)}</div></Section>
    <Section title="Who may need extra care"><List items={condition.riskFactors} /></Section>
    <Section title="How it is prescribed and monitored"><List items={condition.diagnosis} /></Section>
    <Section title="Using it safely"><List items={[...(condition.treatments || []), ...(condition.selfCare || [])]} /></Section>
    <Section title="When to contact a clinician or pharmacist"><List items={condition.whenToSeeGP} /></Section>
    <QuestionPanel eyebrow="Understand your medicine" title="Questions to ask a prescriber or pharmacist" description="Do not start, stop or change prescribed treatment solely from general information." questions={questions} />
    <SafetyPanel items={condition.emergencySigns} />
  </>;
  if (explainer) return <>
    <Section title="The key idea"><List items={condition.quickFacts} /></Section>
    <Section title="How it works"><List items={condition.causes} /></Section>
    <Section title="What you may notice or experience">
      <div className="flex flex-wrap gap-3">{condition.symptoms?.map((item) => <span key={item} className="rounded-full border border-pink-200 bg-pink-50 px-4 py-2 text-sm font-medium text-gray-800">{formatId(item)}</span>)}</div>
    </Section>
    <Section title="What healthcare may involve"><List items={condition.diagnosis} /></Section>
    <Section title="Practical guidance"><List items={[...(condition.treatments || []), ...(condition.selfCare || [])]} /></Section>
    <Section title="When to ask for medical advice"><List items={condition.whenToSeeGP} /></Section>
    <QuestionPanel eyebrow="Understand the topic" title="Useful questions you may want answered" description="Use these prompts to explore the topic further in SHE Chat or with a healthcare professional." questions={questions} />
    <section className="my-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 md:p-8"><p className="text-sm font-semibold uppercase tracking-[0.14em] text-amber-800">When not to rely on general information</p><h2 className="mt-2 text-2xl font-bold text-gray-900">Get individual advice if:</h2><div className="mt-5"><List items={condition.emergencySigns} /></div></section>
  </>;
  return <>
    <Section title={hospital ? "What this hospital service or step means" : "What this option means"}><List items={condition.quickFacts} /></Section>
    <Section title={hospital ? "How the hospital pathway works" : "How it works in practice"}><List items={condition.causes} /></Section>
    <Section title={hospital ? "What to expect" : "Legal and practical considerations"}><List items={condition.diagnosis} /></Section>
    <Section title={hospital ? "How to prepare" : "Things to consider without pressure"}><List items={condition.selfCare} /></Section>
    <Section title={hospital ? "What may happen next" : "Support and next steps"}><List items={condition.treatments} /></Section>
    <Section title={hospital ? "When to contact the hospital or your GP" : "When to seek further support"}><List items={condition.whenToSeeGP} /></Section>
    <QuestionPanel
      eyebrow={hospital ? "Navigate your care" : "Make an informed decision"}
      title={hospital ? "Questions to ask the hospital team" : "Questions to ask an options counsellor, social worker or adviser"}
      description={hospital ? "Use the questions that fit this stage of care and note the name or number of the team responsible for follow-up." : "These questions are designed to clarify the process and available support without steering you toward a particular decision."}
      questions={questions}
    />
    <section className="my-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 md:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-amber-800">Safety and urgent support</p>
      <h2 className="mt-2 text-2xl font-bold text-gray-900">Get help sooner if:</h2>
      <div className="mt-5"><List items={condition.emergencySigns} /></div>
    </section>
  </>;
}

function SafetyPanel({ items }) {
  return <section className="my-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 md:p-8"><p className="text-sm font-semibold uppercase tracking-[0.14em] text-amber-800">Safety and urgent support</p><h2 className="mt-2 text-2xl font-bold text-gray-900">Get help sooner if:</h2><div className="mt-5"><List items={items} /></div></section>;
}

function QuestionPanel({ eyebrow, title, description, questions }) {
  return <section className="my-8 rounded-3xl border border-[#e4ddf3] bg-[#faf8ff] p-6 md:p-8">
    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#7255a6]">{eyebrow}</p>
    <h2 className="mt-2 text-2xl font-bold text-gray-900">{title}</h2>
    <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600">{description}</p>
    <ol className="mt-6 space-y-3">{questions.map((question, index) => <li key={question} className="flex gap-4 rounded-2xl border border-white bg-white p-4 shadow-sm"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#7255a6] text-xs font-bold text-white">{index + 1}</span><span className="pt-0.5 text-sm font-medium leading-6 text-gray-800">{question}</span></li>)}</ol>
  </section>;
}

function getNonClinicalQuestions(articleType) {
  if (articleType === "healthcare-navigation") return [
    "What is the purpose of this appointment, test or hospital step?",
    "How should I prepare, and should I change any medicines or food and drink beforehand?",
    "Who will I see, and can I request a chaperone, interpreter or reasonable adjustment?",
    "When and how will I receive results or the next appointment?",
    "Who should I contact if my symptoms worsen or I have not heard back?",
  ];
  if (articleType === "life-stage-explainer") return [
    "What is the most important thing to understand about this topic?",
    "What variation is usually expected, and what would be unusual?",
    "How does this relate to periods, pregnancy, hormones or life stage?",
    "What information is useful to track or prepare?",
    "When should I ask a healthcare professional for individual advice?",
  ];
  if (articleType === "procedure") return [
    "Why is this procedure or treatment being offered in my situation?",
    "How should I prepare, and which medicines or instructions are time-sensitive?",
    "What are the realistic benefits, limitations, risks and alternatives for me?",
    "What should I expect during recovery, and who do I contact with concerns?",
    "Which symptoms mean I should seek urgent help rather than wait for follow-up?",
  ];
  if (articleType === "medicine") return [
    "What is this medicine intended to improve, and how long may that take?",
    "How and when should I take or use it, and what should I do after a missed dose?",
    "Which side effects, interactions or health conditions are important for me?",
    "Could it affect pregnancy, breastfeeding, fertility or contraception?",
    "When should it be reviewed, changed or stopped by my prescriber?",
  ];
  return [
    "What does this option mean legally and practically where I live?",
    "What support is available before, during and after this process?",
    "What decisions are time-sensitive, and which can I take more time to consider?",
    "Can I change my mind, and at what points in the process?",
    "Where can I receive independent, non-directive advice without pressure?",
  ];
}

function TrustFact({ label, value }) {
  return <div className="rounded-2xl border border-pink-100 bg-white/80 p-4"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-pink-700">{label}</p><p className="mt-2 text-sm font-medium leading-5 text-gray-800">{value}</p></div>;
}
