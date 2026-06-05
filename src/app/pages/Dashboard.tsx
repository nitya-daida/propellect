import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Users, Phone, TrendingUp, Clock, AlertCircle, Flame,
  ArrowUpRight, ArrowDownRight,
  Activity, Trophy
} from "lucide-react";
import { fetchJson } from "../api";

const kpis = [
  { label: "Total Leads", value: 1847, change: 12.4, up: true, icon: Users, color: "#6366F1", bg: "rgba(99,102,241,0.12)" },
  { label: "Calls Today", value: 347, change: 8.2, up: true, icon: Phone, color: "#10B981", bg: "rgba(16,185,129,0.12)" },
  { label: "Hot Leads", value: 89, change: 23.1, up: true, icon: Flame, color: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
  { label: "Conversion Rate", value: "6.8%", change: 2.4, up: true, icon: TrendingUp, color: "#10B981", bg: "rgba(16,185,129,0.12)" },
  { label: "Avg Call Duration", value: "4m 23s", change: 0.8, up: false, icon: Clock, color: "#6366F1", bg: "rgba(99,102,241,0.12)" },
  { label: "Follow-ups Pending", value: 142, change: 5.3, up: false, icon: AlertCircle, color: "#EF4444", bg: "rgba(239,68,68,0.12)" },
];

function deriveDashboardKpis(data: any) {
  if (!data) return kpis;
  return [
    { label: "Total Leads", value: data.total_leads ?? 0, change: 0, up: true, icon: Users, color: "#6366F1", bg: "rgba(99,102,241,0.12)" },
    { label: "Hot Leads", value: data.hot_leads ?? 0, change: 0, up: true, icon: Flame, color: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
    { label: "Warm Leads", value: data.warm_leads ?? 0, change: 0, up: true, icon: TrendingUp, color: "#10B981", bg: "rgba(16,185,129,0.12)" },
    { label: "Campaigns", value: data.total_campaigns ?? 0, change: 0, up: true, icon: Trophy, color: "#6366F1", bg: "rgba(99,102,241,0.12)" },
    { label: "Properties", value: data.total_properties ?? 0, change: 0, up: true, icon: Activity, color: "#10B981", bg: "rgba(16,185,129,0.12)" },
    { label: "Calls Today", value: data.calls_today ?? 0, change: 0, up: true, icon: Phone, color: "#10B981", bg: "rgba(16,185,129,0.12)" },
  ];
}

const liveCalls = [
  { id: 1, lead: "Arjun Sharma", phone: "+91 98201 34567", agent: "Priya Mehta", campaign: "Mumbai Premium", status: "connected", duration: 0 },
  { id: 2, lead: "Kavya Rao", phone: "+91 93210 98765", agent: "Rahul Iyer", campaign: "Bengaluru Tech", status: "ringing", duration: 0 },
  { id: 3, lead: "Amit Kulkarni", phone: "+91 98123 45678", agent: "Sneha Verma", campaign: "Pune Growth", status: "connected", duration: 0 },
  { id: 4, lead: "Meera Krishnamurthy", phone: "+91 96543 21098", agent: "Vikram Das", campaign: "Hyderabad Luxury", status: "connected", duration: 0 },
];

function Counter({ target, suffix = "" }: { target: number | string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const isNum = typeof target === "number";
  useEffect(() => {
    if (!isNum) return;
    let start = 0;
    const end = target as number;
    const duration = 1200;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, isNum]);

  if (!isNum) return <>{target}</>;
  return <>{count.toLocaleString("en-IN")}{suffix}</>;
}

function LiveTimer({ initial = 0 }: { initial?: number }) {
  const [sec, setSec] = useState(initial);
  useEffect(() => {
    const t = setInterval(() => setSec((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");
  return <>{m}:{s}</>;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg px-3 py-2 text-xs" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}>
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }}>{p.name}: {p.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

// Custom bar chart — replaces recharts BarChart to avoid its internal duplicate-key bug
function CallsByHourChart({ data }: { data: any[] }) {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; item: any } | null>(null);
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-[#94A3B8]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        No hourly call data available
      </div>
    );
  }
  const maxVal = Math.max(...data.map(d => d.calls));

  return (
    <div className="relative" style={{ height: 180 }}>
      {/* Bars */}
      <div className="flex items-end gap-[3px]" style={{ height: 160 }}>
        {data.map((d, i) => (
          <div
            key={d.hour}
            className="flex-1 flex gap-[1px] items-end cursor-pointer group"
            style={{ height: "100%" }}
            onMouseEnter={(e) => {
              const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
              const parent = (e.currentTarget as HTMLElement).closest(".relative")?.getBoundingClientRect();
              setTooltip({
                x: rect.left - (parent?.left ?? 0),
                y: 0,
                item: d,
              });
            }}
            onMouseLeave={() => setTooltip(null)}
          >
            <div
              className="flex-1 rounded-sm transition-all duration-200 group-hover:opacity-90"
              style={{
                height: `${Math.max(4, (d.calls / maxVal) * 100)}%`,
                background: "#6366F1",
                minHeight: 4,
              }}
            />
            <div
              className="flex-1 rounded-sm transition-all duration-200 group-hover:opacity-90"
              style={{
                height: `${Math.max(4, (d.answered / maxVal) * 100)}%`,
                background: "#10B981",
                minHeight: 4,
              }}
            />
          </div>
        ))}
      </div>
      {/* X-axis labels */}
      <div className="flex gap-[3px] mt-1" style={{ height: 16 }}>
        {data.map((d, i) => (
          <div key={d.hour} className="flex-1 text-center" style={{ fontSize: 8, color: "#475569", fontFamily: "'DM Sans', sans-serif" }}>
            {i % 3 === 0 ? d.hour : ""}
          </div>
        ))}
      </div>
      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute pointer-events-none z-10 rounded-lg px-3 py-2 text-xs whitespace-nowrap"
          style={{
            left: Math.min(tooltip.x, 120),
            top: 0,
            background: "#1E293B",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#E2E8F0",
            fontFamily: "'DM Sans', sans-serif",
            boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
          }}
        >
          <p style={{ color: "#94A3B8", marginBottom: 4 }}>{tooltip.item.hour}</p>
          <p style={{ color: "#6366F1" }}>Total: {tooltip.item.calls}</p>
          <p style={{ color: "#10B981" }}>Answered: {tooltip.item.answered}</p>
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [dashboardKpis, setDashboardKpis] = useState(kpis);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [agents, setAgents] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [callsByHour, setCallsByHour] = useState<any[]>([]);
  const [funnelData, setFunnelData] = useState<any[]>([]);
  const [liveCalls, setLiveCalls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const data = await fetchJson<any>("/dashboard/stats");
        setDashboardKpis(data?.kpis ? data.kpis : deriveDashboardKpis(data));
        setCampaigns(data?.campaigns ?? []);
        setAgents(data?.agents ?? []);
        setActivities(data?.activities ?? []);
        setCallsByHour(data?.callsByHour ?? []);
        setFunnelData(data?.funnelData ?? []);
        setLiveCalls(data?.liveCalls ?? []);
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  // defensive baseline for funnel calculations
  const funnelBase = (funnelData && funnelData.length && funnelData[0] && funnelData[0].count) ? funnelData[0].count : 1;

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-white" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 24 }}>
            Welcome, Nitya Daida 👋
          </h1>
          <p className="mt-1" style={{ color: "#64748B", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>
            Thursday, May 1, 2026 · Here's what's happening today
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {[
            { label: "+ New Campaign", color: "#10B981", path: "/campaigns" },
            { label: "Import Leads", color: "transparent", path: "/leads" },
            { label: "▶ Start Dialing", color: "#6366F1", path: "/dialer" },
          ].map((btn) => (
            <button
              key={btn.label}
              onClick={() => navigate(btn.path)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                background: btn.color === "transparent" ? "rgba(255,255,255,0.06)" : btn.color,
                color: "#fff",
                fontFamily: "'DM Sans', sans-serif",
                border: btn.color === "transparent" ? "1px solid rgba(255,255,255,0.1)" : "none",
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {dashboardKpis.map((kpi, i) => (
          <div
            key={kpi.label}
            className="rounded-xl p-4 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 4px 24px rgba(0,0,0,0.18)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: kpi.bg }}>
                <kpi.icon size={17} style={{ color: kpi.color }} />
              </div>
              <span
                className="flex items-center gap-0.5 text-xs px-1.5 py-0.5 rounded-full font-semibold"
                style={{
                  background: kpi.up ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
                  color: kpi.up ? "#10B981" : "#EF4444",
                  fontFamily: "'DM Sans', sans-serif"
                }}
              >
                {kpi.up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {kpi.change}%
              </span>
            </div>
            <div className="text-white font-bold mb-1" style={{ fontFamily: "'Sora', sans-serif", fontSize: 22 }}>
              <Counter target={typeof kpi.value === "number" ? kpi.value : kpi.value} />
            </div>
            <div className="text-xs" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif" }}>{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Live Call Activity */}
        <div
          className="lg:col-span-3 rounded-xl p-5"
          style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 16 }}>
              Live Call Activity
            </h2>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#10B981" }} />
              <span className="text-xs" style={{ color: "#10B981", fontFamily: "'DM Sans', sans-serif" }}>
                {liveCalls.length} calls in progress
              </span>
            </div>
          </div>
          <div className="space-y-3">
            {liveCalls.map((call) => (
              <div
                key={call.id}
                className="flex items-center justify-between p-3 rounded-lg"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ background: "#6366F1", fontFamily: "'Sora', sans-serif" }}
                  >
                    {(call.lead ? call.lead.split(" ")?.map((w: string) => w[0])?.join("")?.slice(0,2)?.toUpperCase() : "ND")}
                  </div>
                  <div>
                    <p className="text-sm text-white font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>{call.lead}</p>
                    <p className="text-xs" style={{ color: "#64748B" }}>{call.agent} · {call.campaign}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{
                      background: call.status === "connected" ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)",
                      color: call.status === "connected" ? "#10B981" : "#F59E0B",
                      fontFamily: "'DM Sans', sans-serif"
                    }}
                  >
                    {call.status === "connected" ? "● Connected" : "◌ Ringing"}
                  </span>
                  <span className="text-sm font-mono" style={{ color: "#94A3B8" }}>
                    <LiveTimer initial={Math.floor(Math.random() * 180)} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Funnel */}
        <div
          className="lg:col-span-2 rounded-xl p-5"
          style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <h2 className="text-white mb-4" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 16 }}>
            Lead Funnel
          </h2>
          <div className="space-y-3">
            {funnelData.map((stage, i) => {
              const pct = Math.round(((stage.count ?? 0) / funnelBase) * 100);
              return (
                <div key={stage.stage}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs" style={{ color: "#94A3B8", fontFamily: "'DM Sans', sans-serif" }}>{stage.stage}</span>
                    <span className="text-xs font-semibold" style={{ color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}>{stage.count.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div
                      className="h-2 rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, background: stage.color }}
                    />
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "#475569" }}>{pct}% of total</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Campaign Performance */}
        <div
          className="lg:col-span-2 rounded-xl overflow-hidden"
          style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <h2 className="text-white" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 16 }}>Campaign Performance</h2>
            <button onClick={() => navigate("/campaigns")} className="text-xs" style={{ color: "#10B981" }}>View All →</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {["Campaign", "Leads", "Dialed", "Answer %", "Hot %", "Status", "Actions"].map((h, i) => (
                    <th key={`th-col-${i}`} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#475569", fontFamily: "'DM Sans', sans-serif" }}>{h !== "Actions" ? h : ""}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {campaigns.slice(0, 4).map((c) => {
                  const answerPct = c.dialed ? Math.round((c.answered / c.dialed) * 100) : 0;
                  const hotPct = c.answered ? Math.round((c.hot / c.answered) * 100) : 0;
                  const statusColor: Record<string, string> = {
                    active: "#10B981", paused: "#F59E0B", completed: "#6366F1", draft: "#64748B"
                  };
                  return (
                    <tr key={c.id} className="transition-colors hover:bg-white/[0.02] cursor-pointer" onClick={() => navigate(`/campaigns/${c.id}`)}>
                      <td className="px-4 py-3 text-white text-sm font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>{c.name}</td>
                      <td className="px-4 py-3 text-sm" style={{ color: "#94A3B8" }}>{c.leadCount}</td>
                      <td className="px-4 py-3 text-sm" style={{ color: "#94A3B8" }}>{c.dialed}</td>
                      <td className="px-4 py-3 text-sm" style={{ color: "#E2E8F0" }}>{answerPct}%</td>
                      <td className="px-4 py-3 text-sm" style={{ color: "#F59E0B" }}>{hotPct}%</td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-0.5 rounded-full capitalize" style={{ background: `${statusColor[c.status]}22`, color: statusColor[c.status], fontFamily: "'DM Sans', sans-serif" }}>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(16,185,129,0.1)", color: "#10B981" }}>View</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Calls by Hour */}
        <div
          className="rounded-xl p-5"
          style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <h2 className="text-white mb-4" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 16 }}>Calls by Hour</h2>
          <CallsByHourChart data={callsByHour} />
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-sm inline-block" style={{ background: "#6366F1" }} /><span className="text-xs" style={{ color: "#64748B" }}>Total</span></div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-sm inline-block" style={{ background: "#10B981" }} /><span className="text-xs" style={{ color: "#64748B" }}>Answered</span></div>
          </div>
        </div>
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Activity */}
        <div className="rounded-xl p-5" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 16 }}>Recent Activity</h2>
            <Activity size={16} style={{ color: "#64748B" }} />
          </div>
          <div className="space-y-4 relative">
            <div className="absolute left-4 top-0 bottom-0 w-px" style={{ background: "rgba(255,255,255,0.06)" }} />
            {activities.slice(0, 5).map((act) => (
              <div key={act.id} className="flex items-start gap-3 pl-8 relative">
                <div
                  className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full border-2 flex-shrink-0"
                  style={{
                    background: act.type === "call" ? "#10B981" : act.type === "campaign" ? "#6366F1" : "#F59E0B",
                    borderColor: "#1E293B",
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm" style={{ color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.4 }}>{act.message}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#475569" }}>{act.time} · {act.user}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Agents Leaderboard */}
        <div className="rounded-xl p-5" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 16 }}>Agent Leaderboard</h2>
            <Trophy size={16} style={{ color: "#F59E0B" }} />
          </div>
          <div className="space-y-3">
            {agents.map((agent, i) => (
              <div key={agent.id} className="flex items-center gap-3">
                <span className="text-sm font-bold w-5" style={{ color: i === 0 ? "#F59E0B" : i === 1 ? "#94A3B8" : i === 2 ? "#CD7F32" : "#475569", fontFamily: "'Sora', sans-serif" }}>
                  {i + 1}
                </span>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: ["#10B981", "#6366F1", "#F59E0B", "#EF4444", "#3B82F6", "#8B5CF6"][i], fontFamily: "'Sora', sans-serif" }}
                >
                  {agent.avatar ?? (agent.name ? agent.name.split(" ").map((w: string) => w[0]).join("").slice(0,2).toUpperCase() : "AG")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-semibold truncate" style={{ fontFamily: "'DM Sans', sans-serif" }}>{agent.name}</p>
                  <p className="text-xs" style={{ color: "#64748B" }}>{agent.callsToday} calls · {agent.conversions} conv.</p>
                </div>
                <span className="text-sm font-bold" style={{ color: "#10B981", fontFamily: "'Sora', sans-serif" }}>{agent.conversionRate}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}