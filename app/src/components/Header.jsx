import { User } from "lucide-react";

export default function Header({ onProfile }) {
  return (
    <header className="flex items-center justify-between px-5 py-5 md:px-10 md:py-7">
      <div className="flex items-center gap-3 md:gap-4">
        <img
          src="/logo.png"
          alt="SHE logo"
          className="h-12 w-12 rounded-full object-cover md:h-16 md:w-16"
        />

        <div>
          <h1 className="text-2xl font-semibold tracking-[0.2em] md:text-4xl">
            SHE
          </h1>

          <p className="mt-1 text-xs text-[#f43f72] md:text-sm">
            Women’s Health, Made Easy
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onProfile}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-pink-100 bg-white shadow-sm transition hover:bg-pink-50 md:h-14 md:w-14"
        aria-label="Open profile"
      >
        <User size={21} />
      </button>
    </header>
  );
}
