export default function KnowledgeSection({
  title,
  children,
}) {
  return (
    <section className="mb-12">

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-2xl font-bold">
          {title}
        </h2>

      </div>

      {children}

    </section>
  );
}