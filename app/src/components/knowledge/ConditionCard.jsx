export default function ConditionCard({ condition, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(condition)}
      className="w-full min-h-72 rounded-2xl border border-gray-200 bg-white p-6 pb-16 text-left transition hover:-translate-y-1 hover:border-pink-300 hover:shadow-lg"
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-pink-600">
          {condition.category || "Women’s health"}
        </span>

        {condition.readTime && (
          <span className="text-sm text-gray-500">
            {condition.readTime} min
          </span>
        )}
      </div>

      <h3 className="mb-2 text-xl font-semibold text-gray-900">
        {condition.title}
      </h3>

      <p className="line-clamp-3 text-gray-600">
        {condition.summary}
      </p>

      <div className="mt-5 font-semibold text-pink-600">
        Learn more →
      </div>
    </button>
  );
}
