export default function PlaceholderPage({
  eyebrow,
  title,
  description,
  icon: Icon,
}) {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 pb-32 pt-10 md:px-8 md:pt-14">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-50 text-[#f43f72]">
        <Icon size={24} />
      </div>

      <p className="mt-5 text-sm font-medium text-[#f43f72]">{eyebrow}</p>

      <h2 className="mt-2 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
        {title}
      </h2>

      <p className="mt-4 max-w-2xl text-base leading-7 text-stone-500 md:text-lg">
        {description}
      </p>

      <div className="mt-10 rounded-[32px] border border-pink-100 bg-white p-10 text-center shadow-sm">
        <p className="text-lg font-medium">This section is ready for its pack.</p>

        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-stone-500">
          The navigation is working correctly. We’ll add the full content and
          functionality next without changing the foundation.
        </p>
      </div>
    </main>
  );
}
