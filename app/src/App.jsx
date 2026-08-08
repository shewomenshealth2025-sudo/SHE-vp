import { lazy, Suspense, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import BottomNavigation from "./components/BottomNavigation";
import DesktopSidebar from "./components/DesktopSidebar";
import ChatPage from "./pages/ChatPage";

const loadProducts = () => import("./pages/ProductsPage");
const loadServices = () => import("./pages/ServicesPage");
const loadLearn = () => import("./pages/LearnPageV2");
const loadProfile = () => import("./pages/ProfilePage");

const ProductsPage = lazy(loadProducts);
const ServicesPage = lazy(loadServices);
const LearnPage = lazy(loadLearn);
const ProfilePage = lazy(loadProfile);

const tabPaths = {
  chat: "/",
  products: "/products",
  services: "/services",
  education: "/learn",
  profile: "/profile",
};

const pathTabs = Object.fromEntries(
  Object.entries(tabPaths).map(([tab, path]) => [path, tab]),
);

export default function App() {
  const location = useLocation();
  const routeNavigate = useNavigate();
  const activeTab = pathTabs[location.pathname] || "chat";
  const [conversation, setConversation] = useState([]);
  const [recentChats, setRecentChats] = useState(readRecentChats);

  useEffect(() => {
    window.localStorage.setItem("she-recent-chats", JSON.stringify(recentChats));
  }, [recentChats]);

  useEffect(() => {
    const preload = () => {
      void Promise.all([loadProducts(), loadServices(), loadLearn(), loadProfile()]);
    };

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(preload, { timeout: 1800 });
      return () => window.cancelIdleCallback(id);
    }

    const id = window.setTimeout(preload, 250);
    return () => window.clearTimeout(id);
  }, []);

  function navigate(tab, options = {}) {
    const path = tabPaths[tab] || "/";
    const query = options.search?.trim()
      ? `?q=${encodeURIComponent(options.search.trim())}`
      : "";
    routeNavigate(`${path}${query}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function newChat() {
    setConversation([]);
    navigate("chat");
  }

  function saveConversation(question, messages) {
    setRecentChats((current) => {
      const newChatEntry = {
        id: Date.now(),
        title: question.length > 34 ? `${question.slice(0, 34)}...` : question,
        messages,
      };

      return [
        newChatEntry,
        ...current.filter((chat) => chat.title !== newChatEntry.title),
      ].slice(0, 6);
    });
  }

  function openRecentChat(chat) {
    setConversation(chat.messages);
    navigate("chat");
  }

  return (
    <div className="min-h-screen bg-[#fffdfc] text-[#241f20]">
      <DesktopSidebar
        activeTab={activeTab}
        navigate={navigate}
        recentChats={recentChats}
        newChat={newChat}
        openRecentChat={openRecentChat}
      />

      <div className="lg:pl-72">
        <div className="lg:hidden">
          <Header onProfile={() => navigate("profile")} />
        </div>

        <Suspense fallback={<RouteLoading activeTab={activeTab} />}>
          <Routes>
            <Route
              path="/"
              element={
                <ChatPage
                  conversation={conversation}
                  setConversation={setConversation}
                  saveConversation={saveConversation}
                  navigate={navigate}
                />
              }
            />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>

        <div className="lg:hidden">
          <BottomNavigation activeTab={activeTab} navigate={navigate} />
        </div>
      </div>
    </div>
  );
}

function RouteLoading({ activeTab }) {
  const labels = {
    products: "products",
    services: "services",
    education: "health guides",
    profile: "your profile",
  };

  return (
    <main className="mx-auto max-w-6xl px-5 py-8 md:px-8 lg:px-12" aria-live="polite">
      <p className="text-sm font-medium text-[#e93368]">Loading {labels[activeTab] || "SHE"}…</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="animate-pulse rounded-2xl border border-stone-100 bg-white p-5">
            <div className="aspect-[4/3] rounded-xl bg-stone-100" />
            <div className="mt-5 h-4 w-1/3 rounded bg-stone-100" />
            <div className="mt-3 h-6 w-4/5 rounded bg-stone-100" />
            <div className="mt-3 h-4 w-full rounded bg-stone-100" />
          </div>
        ))}
      </div>
    </main>
  );
}

function readRecentChats() {
  try {
    return JSON.parse(window.localStorage.getItem("she-recent-chats") || "[]");
  } catch {
    return [];
  }
}
