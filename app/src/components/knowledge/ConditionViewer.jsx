export default function ConditionViewer({ condition }) {
  if (!condition) {
    return (
      <div className="p-8">
        <h1>Condition not found.</h1>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8">

      <h1 className="text-5xl font-bold mb-6">
        {condition.title}
      </h1>

      <p className="text-lg text-gray-600 mb-8">
        {condition.summary}
      </p>

      <section className="mb-10">

        <h2 className="text-2xl font-semibold mb-4">
          Quick Facts
        </h2>

        <ul className="list-disc ml-6 space-y-2">
          {condition.quickFacts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>

      </section>

      <section>

        <h2 className="text-2xl font-semibold mb-4">
          Symptoms
        </h2>

        <ul className="list-disc ml-6">
          {condition.symptoms.map((symptom) => (
            <li key={symptom}>{symptom}</li>
          ))}
        </ul>

      </section>

    </div>
  );
}