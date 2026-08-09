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
      // Preload the lightweight, high-frequency sections after first paint.
      // Services intentionally stays route-only so map and location data are
      // never downloaded until the user opens SHE Map.
      void Promise.all([loadProducts(), loadLearn(), loadProfile()]);
    };

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(preload, { timeout: 500 });
      return () => window.cancelIdleCallback(id);
    }

    const id = window.setTimeout(preload, 80);
    return () => window.clearTimeout(id);
  }, []);

  function navigate(tab, options = {}) {
    const path = tabPaths[tab] || "/";
    const params = new URLSearchParams();
    if (options.search?.trim()) params.set("q", options.search.trim());
    if (options.view) params.set("view", options.view);
    const query = params.size ? `?${params.toString()}` : "";
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
      <div className="mt-6 animate-pulse rounded-3xl border border-stone-100 bg-white p-6">
        <div className="h-9 w-2/5 rounded bg-stone-100" />
        <div className="mt-4 h-4 w-3/5 rounded bg-stone-100" />
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((item) => <div key={item} className="h-36 rounded-2xl bg-stone-100" />)}
        </div>
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
