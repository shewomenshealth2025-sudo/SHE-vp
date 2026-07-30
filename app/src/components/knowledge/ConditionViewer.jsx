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

export default function ConditionViewer({ condition, onBack }) {
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

          {condition.readTime && (
            <span className="text-sm text-gray-500">
              {condition.readTime} minute read
            </span>
          )}
        </div>

        <h1 className="mb-5 text-4xl font-bold text-gray-900 md:text-6xl">
          {condition.title}
        </h1>

        <p className="max-w-3xl text-lg leading-8 text-gray-700">
          {condition.summary}
        </p>
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

      <Section title="Seek urgent help">
        <List items={condition.emergencySigns} />
      </Section>

      <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm leading-6 text-gray-600">
        This information is for education and does not replace advice from a
        qualified healthcare professional.
      </div>
    </article>
  );
}