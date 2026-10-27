import {
  BookOpen,
  Compass,
  Heart,
  MapPin,
  ShoppingBag,
} from "lucide-react";

const items = [
  { id: "chat", label: "SHE Helps", icon: Compass },
  { id: "products", label: "SHE Finds", icon: ShoppingBag },
  { id: "services", label: "SHE Map", icon: MapPin },
  { id: "education", label: "SHE Facts", icon: BookOpen },
  { id: "profile", label: "My SHE", icon: Heart },
];

export default function BottomNavigation({ activeTab, navigate }) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-[1200] border-t border-pink-100 bg-white/95 px-2 py-2 shadow-[0_-8px_30px_rgba(50,35,40,0.05)] backdrop-blur"
      aria-label="Main navigation"
    >
      <div className="mx-auto grid max-w-3xl grid-cols-5 gap-1">
        {items.map(({ id, label, icon: Icon }) => {
          const active = activeTab === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => navigate(id)}
              aria-current={active ? "page" : undefined}
              className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-2xl px-0.5 py-2 text-[10px] transition sm:text-xs ${
                active
                  ? "bg-pink-50 font-medium text-[#f43f72]"
                  : "text-stone-500 hover:bg-stone-50 hover:text-stone-800"
              }`}
            >
              <Icon size={21} strokeWidth={active ? 2.4 : 1.9} />
              <span className="max-w-full truncate">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
