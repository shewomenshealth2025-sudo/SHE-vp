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
  { title: "NICE guidance", url: "https://www.nice.org.uk/guidance" },
];

export default function ConditionViewer({ condition, onBack, onSelectRelated }) {
  if (!condition) return null;

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
          <TrustFact label="Clinically reviewed by" value={condition.clinicalReviewer || "Clinical reviewer to be confirmed"} />
          <TrustFact label="Last reviewed" value={condition.lastReviewed || condition.reviewed || "8 August 2026"} />
          <TrustFact label="Sources used" value={`${(condition.sources?.length || fallbackSources.length)} linked references`} />
        </div>
      </header>

      <Section title="At a glance">
        <List items={condition.quickFacts} />
      </Section>

      <Section title="Common symptoms">
        <div className="flex flex-wrap gap-3">
          {condition.symptoms?.map((symptom) => (
            <span
              key={symptom}
              className="rounded-full border border-pink-200 bg-pink-50 px-4 py-2 text-sm font-medium text-gray-800"
            >
              {formatId(symptom)}
            </span>
          ))}
        </div>
      </Section>

      <Section title="Possible causes">
        <List items={condition.causes} />
      </Section>

      <Section title="Risk factors">
        <List items={condition.riskFactors} />
      </Section>

      <Section title="How it is diagnosed">
        <List items={condition.diagnosis} />
      </Section>

      <Section title="Treatment and management">
        <List items={condition.treatments} />
      </Section>

      <Section title="Things that may help">
        <List items={condition.selfCare} />
      </Section>

      <Section title="When to speak to a healthcare professional">
        <List items={condition.whenToSeeGP} />
      </Section>

      <section className="my-8 rounded-2xl border border-red-200 bg-red-50 p-6 md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-red-700">When to seek urgent help</p>
        <h2 className="mt-2 text-2xl font-bold text-gray-900">Do not wait for a routine appointment if:</h2>
        <div className="mt-5"><List items={condition.emergencySigns?.length ? condition.emergencySigns : ["Symptoms are sudden, severe or rapidly worsening.", "You have heavy bleeding with fainting, chest pain, breathing difficulty or feel seriously unwell."]} /></div>
        <p className="mt-5 text-sm leading-6 text-red-800">In the UK, call 999 for a life-threatening emergency or use NHS 111 for urgent advice when you are unsure.</p>
      </section>

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

      <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm leading-6 text-gray-600">
        This information is for education and does not replace advice from a
        qualified healthcare professional.
      </div>
    </article>
  );
}

function TrustFact({ label, value }) {
  return <div className="rounded-2xl border border-pink-100 bg-white/80 p-4"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-pink-700">{label}</p><p className="mt-2 text-sm font-medium leading-5 text-gray-800">{value}</p></div>;
}
