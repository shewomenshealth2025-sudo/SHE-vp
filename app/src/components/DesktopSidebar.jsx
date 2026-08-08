import {
  BookOpen,
  MapPin,
  MessageCircle,
  Plus,
  ShoppingBag,
  User,
} from "lucide-react";

export default function DesktopSidebar({
  activeTab,
  navigate,
  recentChats,
  newChat,
  openRecentChat,
}) {
  const links = [
    { id: "products", label: "Products", icon: ShoppingBag },
    { id: "services", label: "Services", icon: MapPin },
    { id: "education", label: "Learn", icon: BookOpen },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-pink-100 bg-[#fffafa] p-4 lg:flex lg:flex-col">
      <button
        type="button"
        onClick={newChat}
        className="flex w-full items-center gap-3 rounded-2xl px-2 py-3 text-left transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f43f72]/30"
        aria-label="Return to SHE homepage"
      >
        <img
          src="/logo.png"
          alt="SHE logo"
          className="h-11 w-11 rounded-full object-cover"
        />

        <div>
          <p className="text-xl font-semibold tracking-[0.18em]">SHE</p>
          <p className="text-xs text-[#f43f72]">Women’s Health, Made Easy</p>
        </div>
      </button>

      <button
        type="button"
        onClick={newChat}
        className="mt-5 flex w-full items-center gap-3 rounded-2xl bg-[#f43f72] px-4 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-[#e93265]"
      >
        <Plus size={19} />
        New chat
      </button>

      {recentChats.length > 0 && <div className="mt-7">
        <p className="px-3 text-xs font-semibold uppercase tracking-[0.16em] text-stone-400">
          Recent
        </p>

        <div className="mt-2 space-y-1">
          {recentChats.map((chat) => (
            <button
              key={chat.id}
              type="button"
              onClick={() => openRecentChat(chat)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-stone-600 transition hover:bg-white hover:text-stone-900"
            >
              <MessageCircle size={17} className="shrink-0 text-[#f43f72]" />
              <span className="truncate">{chat.title}</span>
            </button>
          ))}
        </div>
      </div>}

      <div className="mt-7 border-t border-pink-100 pt-5">
        <p className="px-3 text-xs font-semibold uppercase tracking-[0.16em] text-stone-400">
          Explore
        </p>

        <div className="mt-2 space-y-1">
          {links.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => navigate(id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                activeTab === id
                  ? "bg-white font-medium text-[#f43f72] shadow-sm"
                  : "text-stone-600 hover:bg-white"
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
