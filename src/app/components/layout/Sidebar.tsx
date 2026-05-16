import { useState } from "react";
import { NavLink, useLocation } from "react-router";
import {
  LayoutDashboard, Users, Megaphone, Phone, Bot, Radio, BarChart2,
  RepeatIcon, Building2, Database, FileBarChart, Link2, Shield,
  Settings, CreditCard, ChevronLeft, ChevronRight, LogOut, UserCircle, Bell, Menu
} from "lucide-react";

const navGroups = [
  {
    label: "Main",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
      { icon: Users, label: "Leads", path: "/leads" },
      { icon: Megaphone, label: "Campaigns", path: "/campaigns" },
      { icon: Phone, label: "Calls", path: "/calls" },
    ],
  },
  {
    label: "AI Tools",
    items: [
      { icon: Bot, label: "Voice Agent", path: "/voice-agent" },
      { icon: Radio, label: "Dialer", path: "/dialer" },
      { icon: BarChart2, label: "Analysis", path: "/analysis" },
      { icon: RepeatIcon, label: "Follow-up", path: "/follow-up" },
    ],
  },
  {
    label: "Data",
    items: [
      { icon: Building2, label: "Properties", path: "/properties" },
      { icon: Database, label: "Database", path: "/database" },
      { icon: FileBarChart, label: "Reports", path: "/reports" },
    ],
  },
  {
    label: "Settings",
    items: [
      { icon: Link2, label: "Integrations", path: "/integrations" },
      { icon: Users, label: "Team", path: "/team" },
      { icon: CreditCard, label: "Billing", path: "/billing" },
      { icon: Shield, label: "Security", path: "/security" },
      { icon: Settings, label: "Settings", path: "/settings" },
    ],
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const location = useLocation();

  const sidebarContent = (
    <div
      className="flex flex-col h-full bg-slate-800 dark:bg-slate-800 border-r border-slate-700 dark:border-slate-600"
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5" style={{ minHeight: 64 }}>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500"
            >
              <Phone size={16} color="#fff" strokeWidth={2.5} />
            </div>
            <span
              className="text-white select-none"
              style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 18 }}
            >
              Propellect
            </span>
          </div>
        )}
        {collapsed && (
          <div className="flex items-center justify-center w-8 h-8 rounded-lg mx-auto bg-emerald-500">
            <Phone size={16} color="#fff" strokeWidth={2.5} />
          </div>
        )}
        <button
          onClick={onToggle}
          className="hidden md:flex items-center justify-center w-7 h-7 rounded-md transition-colors bg-slate-700 dark:bg-slate-700 text-slate-400 hover:text-white"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto py-2 px-2 scrollbar-none">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-4">
            {!collapsed && (
              <div
                className="px-3 py-1 mb-1 uppercase tracking-wider text-slate-500"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600 }}
              >
                {group.label}
              </div>
            )}
            {group.items.map((item) => {
              const active = location.pathname === item.path || location.pathname.startsWith(item.path + "/");
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onMobileClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 transition-all duration-200 group relative ${
                    active
                      ? 'bg-emerald-900/20 border-l-2 border-emerald-500 text-emerald-400'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: active ? 600 : 400,
                    fontSize: 14,
                  }}
                >
                  <item.icon size={18} style={{ flexShrink: 0 }} />
                  {!collapsed && <span>{item.label}</span>}
                  {collapsed && (
                    <div
                      className="absolute left-full ml-2 px-2 py-1 rounded text-xs whitespace-nowrap pointer-events-none z-50 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-slate-100"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {item.label}
                    </div>
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>

      {/* User */}
      <div className="p-3 border-t border-slate-600">
        <NavLink to="/profile" onClick={onMobileClose}>
          <div className="flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors hover:bg-slate-700/50">
            <div
              className="flex items-center justify-center w-8 h-8 rounded-full text-white text-xs font-bold flex-shrink-0 bg-indigo-500"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              RK
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <div className="text-sm text-white truncate" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>
                  Rajesh Kapoor
                </div>
                <div className="text-xs text-emerald-400">Admin</div>
              </div>
            )}
            {!collapsed && <LogOut size={14} className="text-slate-400 flex-shrink-0" />}
          </div>
        </NavLink>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className="hidden md:flex flex-col flex-shrink-0 h-full transition-all duration-250 ease-in-out overflow-hidden"
        style={{ width: collapsed ? 64 : 260 }}
      >
        {sidebarContent}
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={onMobileClose}
          />
          <div className="absolute left-0 top-0 bottom-0 w-72 z-10">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
