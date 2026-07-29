import {
  BookOpen,
  MapPin,
  MessageCircle,
  ShoppingBag,
  User,
} from "lucide-react";

const items = [
  { id: "chat", label: "Chat", icon: MessageCircle },
  { id: "products", label: "Products", icon: ShoppingBag },
  { id: "services", label: "Services", icon: MapPin },
  { id: "education", label: "Learn", icon: BookOpen },
  { id: "profile", label: "Profile", icon: User },
];

export default function BottomNavigation({ activeTab, navigate }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-pink-100 bg-white/95 px-3 py-2 shadow-[0_-8px_30px_rgba(50,35,40,0.05)] backdrop-blur">
      <div className="mx-auto grid max-w-3xl grid-cols-5 gap-1">
        {items.map(({ id, label, icon: Icon }) => {
          const active = activeTab === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => navigate(id)}
              className={`flex flex-col items-center justify-center gap-1 rounded-2xl py-2 text-[11px] transition sm:text-xs ${
                active
                  ? "bg-pink-50 font-medium text-[#f43f72]"
                  : "text-stone-500 hover:bg-stone-50 hover:text-stone-800"
              }`}
            >
              <Icon size={21} strokeWidth={active ? 2.4 : 1.9} />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
