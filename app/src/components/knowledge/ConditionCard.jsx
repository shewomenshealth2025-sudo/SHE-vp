export default function ConditionCard({
  condition,
}) {
  return (
    <div className="rounded-2xl border p-6 hover:shadow-md transition cursor-pointer">

      <h3 className="text-xl font-semibold mb-2">
        {condition.title}
      </h3>

      <p className="text-gray-600 line-clamp-3">
        {condition.summary}
      </p>

    </div>
  );
}