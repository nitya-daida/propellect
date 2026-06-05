import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useTheme } from "next-themes";
import { useAuth } from "../../contexts/AuthContext";
import {
  Search, Bell, ChevronDown, Menu, X,
  User, Settings, LogOut, Command, Phone, Users, Megaphone, Sun, Moon
} from "lucide-react";
import { notifications } from "../../data/mockData";

const breadcrumbMap: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/leads": "Leads",
  "/campaigns": "Campaigns",
  "/calls": "Calls",
  "/voice-agent": "Voice Agent",
  "/dialer": "Dialer",
  "/analysis": "Analysis",
  "/follow-up": "Follow-up",
  "/properties": "Properties",
  "/database": "Database",
  "/bot": "Bot",
  "/settings": "Settings",
  "/profile": "Profile",
};

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { logout, user } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const userName = user?.name ?? "Nitya Daida";
  const userEmail = user?.email ?? "nitya@propellect.com";
  const userInitials = userName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const currentPage = breadcrumbMap[location.pathname] || "Dashboard";
  const unreadCount = notifications.filter((n) => n.unread).length;

  const searchSuggestions = [
    { icon: Users, label: "Arjun Sharma", sub: "Hot Lead · +91 98201 34567", path: "/leads" },
    { icon: Megaphone, label: "Mumbai Premium Buyers", sub: "Active Campaign · 234 leads", path: "/campaigns" },
    { icon: Phone, label: "Recent calls log", sub: "167 calls today", path: "/calls" },
    { icon: Users, label: "Kavya Rao", sub: "Hot Lead · +91 93210 98765", path: "/leads" },
  ];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true); }
      if (e.key === "Escape") { setSearchOpen(false); setSearchValue(""); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className="flex items-center gap-4 px-4 md:px-6 flex-shrink-0 z-30"
        style={{ height: 64, background: "var(--background)", borderBottom: "1px solid var(--border)" }}
      >
        {/* Mobile menu */}
        <button className="md:hidden text-slate-400 hover:text-white" onClick={onMenuClick}>
          <Menu size={20} />
        </button>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mr-auto">
          <span className="text-slate-500 text-sm font-medium">Propellect</span>
          <span className="text-slate-400 text-sm">/</span>
          <span className="text-slate-900 dark:text-slate-100 text-sm font-semibold">
            {currentPage}
          </span>
        </div>

        {/* Search trigger */}
        <button
          onClick={() => setSearchOpen(true)}
          className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg transition-colors bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-slate-500"
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, minWidth: 220 }}
        >
          <Search size={14} />
          <span>Search anything...</span>
          <span className="ml-auto flex items-center gap-0.5 text-xs px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/6 text-slate-600 dark:text-slate-400">
            <Command size={11} /> K
          </span>
        </button>

        {/* Icons */}
        <div className="flex items-center gap-1">
          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative flex items-center justify-center w-9 h-9 rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-white"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span
                  className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-white bg-red-500 text-xs font-bold"
                >
                  {unreadCount}
                </span>
              )}
            </button>
            {notifOpen && (
              <div
                className="absolute right-0 top-12 w-80 rounded-xl shadow-2xl overflow-hidden z-50 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-600">
                  <span className="text-slate-900 dark:text-white text-sm font-semibold" style={{ fontFamily: "'Sora', sans-serif" }}>Notifications</span>
                  <button className="text-xs text-emerald-600">Mark all read</button>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`flex items-start gap-3 px-4 py-3 border-b border-slate-100 dark:border-slate-600 transition-colors hover:bg-slate-50 dark:hover:bg-slate-600 cursor-pointer ${n.unread ? 'bg-emerald-50 dark:bg-emerald-900/20' : ''}`}
                    >
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.unread ? 'bg-emerald-500' : 'border border-slate-300 dark:border-slate-500'}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm leading-5 text-slate-900 dark:text-slate-100" style={{ fontFamily: "'DM Sans', sans-serif" }}>{n.message}</p>
                        <p className="text-xs mt-0.5 text-slate-500" style={{ color: "#64748B" }}>{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 text-center">
                  <button className="text-xs text-indigo-600">View all notifications</button>
                </div>
              </div>
            )}
          </div>

          {/* Help removed as requested */}

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center justify-center w-9 h-9 rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-white"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* User */}
          <div className="relative" ref={userRef}>
            <button
              onClick={() => setUserOpen(!userOpen)}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-white/5"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold bg-indigo-500"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                {userInitials}
              </div>
              <ChevronDown size={12} className="text-slate-400" />
            </button>
            {userOpen && (
              <div
                className="absolute right-0 top-12 w-48 rounded-xl shadow-2xl overflow-hidden z-50 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600"
              >
                <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-600">
                  <p className="text-sm text-slate-900 dark:text-white font-semibold" style={{ fontFamily: "'Sora', sans-serif" }}>{userName}</p>
                  <p className="text-xs text-slate-500">{userEmail}</p>
                </div>
                {[{ icon: User, label: "Profile", path: "/profile" }, { icon: Settings, label: "Settings", path: "/settings" }].map((item) => (
                  <button
                    key={item.path}
                    onClick={() => { navigate(item.path); setUserOpen(false); }}
                    className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <item.icon size={14} />
                    {item.label}
                  </button>
                ))}
                <div className="border-t border-slate-200 dark:border-slate-600">
                  <button
                    onClick={() => { logout(); navigate("/"); setUserOpen(false); }}
                    className="flex items-center gap-2 w-full px-4 py-2.5 text-sm transition-colors hover:bg-slate-50 dark:hover:bg-slate-600 text-red-600"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <LogOut size={14} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Command Palette */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4"
          style={{ background: "rgba(15,23,42,0.8)", backdropFilter: "blur(4px)" }}
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden"
            style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <Search size={18} style={{ color: "#64748B" }} />
              <input
                autoFocus
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search leads, campaigns, calls, properties..."
                className="flex-1 bg-transparent outline-none text-white text-sm"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />
              <button onClick={() => setSearchOpen(false)} style={{ color: "#64748B" }}>
                <X size={16} />
              </button>
            </div>
            <div className="py-2">
              <p className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider" style={{ color: "#475569", fontFamily: "'DM Sans', sans-serif" }}>
                Quick Results
              </p>
              {searchSuggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => { navigate(s.path); setSearchOpen(false); }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-left transition-colors hover:bg-white/5"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(99,102,241,0.15)" }}>
                    <s.icon size={15} style={{ color: "#6366F1" }} />
                  </div>
                  <div>
                    <p className="text-sm text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.label}</p>
                    <p className="text-xs" style={{ color: "#64748B" }}>{s.sub}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
