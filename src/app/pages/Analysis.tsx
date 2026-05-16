import { useState } from "react";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, LineChart, Line, Legend
} from "recharts";
import { sentimentData, callsByHour, agents, aiInsights, funnelData } from "../data/mockData";
import { Download, Search, TrendingUp, Phone, Smile, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const agentPerf = agents.map(a => ({
  name: a.name.split(" ")[0],
  calls: a.callsMonth,
  qualified: Math.floor(a.callsMonth * 0.25),
  hot: a.conversions,
}));

const callsByDay = [
  { day: "Mon", calls: 287, answered: 198 },
  { day: "Tue", calls: 312, answered: 231 },
  { day: "Wed", calls: 245, answered: 178 },
  { day: "Thu", calls: 356, answered: 267 },
  { day: "Fri", calls: 389, answered: 287 },
  { day: "Sat", calls: 156, answered: 98 },
  { day: "Sun", calls: 89, answered: 52 },
];

const transcriptResults = [
  { lead: "Arjun Sharma", date: "Apr 30", snippet: "...I'm very interested in the sea-facing property in Bandra. Can you arrange a visit?...", match: "sea-facing" },
  { lead: "Kavya Rao", date: "Apr 30", snippet: "...Yes, I have the loan pre-approved already. Looking for sea-facing or lake-view apartments...", match: "sea-facing" },
  { lead: "Rohit Joshi", date: "Apr 29", snippet: "...The sea-facing unit you mentioned sounds perfect for investment purposes...", match: "sea-facing" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="px-3 py-2 rounded-lg text-xs" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}>
      <p className="font-semibold mb-1">{label}</p>
      {payload.map((p: any, i: number) => <p key={i} style={{ color: p.color }}>{p.name}: {p.value}</p>)}
    </div>
  );
};

export default function Analysis() {
  const [dateRange, setDateRange] = useState("this_week");
  const [transcriptSearch, setTranscriptSearch] = useState("");

  const filteredTranscripts = transcriptSearch
    ? transcriptResults.filter(t => t.snippet.toLowerCase().includes(transcriptSearch.toLowerCase()) || t.lead.toLowerCase().includes(transcriptSearch.toLowerCase()))
    : transcriptResults;

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-white" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 24 }}>Analysis</h1>
        <div className="flex items-center gap-2">
          <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="px-3 py-2 rounded-lg text-sm outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}>
            <option value="today">Today</option>
            <option value="this_week">This Week</option>
            <option value="this_month">This Month</option>
            <option value="last_month">Last Month</option>
          </select>
          <button onClick={() => toast.success("Generating report...")} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm" style={{ background: "rgba(255,255,255,0.06)", color: "#94A3B8", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'DM Sans', sans-serif" }}>
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Calls Made", value: "1,834", icon: Phone, color: "#6366F1" },
          { label: "Avg Sentiment", value: "72/100", icon: Smile, color: "#10B981" },
          { label: "Objection Rate", value: "18.4%", icon: AlertTriangle, color: "#F59E0B" },
          { label: "Conversion Rate", value: "6.8%", icon: TrendingUp, color: "#10B981" },
        ].map((card) => (
          <div key={card.label} className="rounded-xl p-4" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: `${card.color}22` }}>
              <card.icon size={17} style={{ color: card.color }} />
            </div>
            <p className="text-2xl font-bold" style={{ color: card.color, fontFamily: "'Sora', sans-serif" }}>{card.value}</p>
            <p className="text-xs mt-0.5" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif" }}>{card.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Sentiment Distribution */}
        <div className="rounded-xl p-5" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 className="text-white font-semibold mb-4" style={{ fontFamily: "'Sora', sans-serif", fontSize: 16 }}>Sentiment Distribution</h2>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={140} height={140}>
              <PieChart>
                <Pie data={sentimentData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value" startAngle={90} endAngle={-270}>
                  {sentimentData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {sentimentData.map(s => (
                <div key={s.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: s.color }} />
                  <span className="text-sm" style={{ color: "#94A3B8", fontFamily: "'DM Sans', sans-serif" }}>{s.name}</span>
                  <span className="text-sm font-bold ml-auto" style={{ color: "#E2E8F0", fontFamily: "'Sora', sans-serif" }}>{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Calls This Week */}
        <div className="rounded-xl p-5" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 className="text-white font-semibold mb-4" style={{ fontFamily: "'Sora', sans-serif", fontSize: 16 }}>Calls This Week</h2>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={callsByDay} barSize={10}>
              <XAxis dataKey="day" tick={{ fill: "#475569", fontSize: 11, fontFamily: "'DM Sans', sans-serif" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="calls" fill="#6366F1" radius={4} name="Total" />
              <Bar dataKey="answered" fill="#10B981" radius={4} name="Answered" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Conversion Funnel */}
        <div className="rounded-xl p-5" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 className="text-white font-semibold mb-4" style={{ fontFamily: "'Sora', sans-serif", fontSize: 16 }}>Conversion Funnel</h2>
          <div className="space-y-2">
            {funnelData.map((stage, i) => {
              const pct = Math.round((stage.count / funnelData[0].count) * 100);
              const width = 100 - i * 15;
              return (
                <div key={stage.stage} className="flex items-center gap-3">
                  <div className="w-20 text-right">
                    <span className="text-xs" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif" }}>{stage.stage}</span>
                  </div>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="flex-1 h-7 rounded-lg relative overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <div className="h-full rounded-lg flex items-center justify-end pr-2" style={{ width: `${width}%`, background: stage.color }}>
                        <span className="text-xs font-bold text-white">{stage.count.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                    <span className="text-xs w-10 text-right" style={{ color: "#64748B" }}>{pct}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Agent Performance */}
        <div className="rounded-xl p-5" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 className="text-white font-semibold mb-4" style={{ fontFamily: "'Sora', sans-serif", fontSize: 16 }}>Agent Performance</h2>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={agentPerf} barSize={8} layout="vertical">
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" tick={{ fill: "#64748B", fontSize: 11, fontFamily: "'DM Sans', sans-serif" }} axisLine={false} tickLine={false} width={48} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="calls" fill="#6366F1" radius={3} name="Calls" />
              <Bar dataKey="qualified" fill="#F59E0B" radius={3} name="Qualified" />
              <Bar dataKey="hot" fill="#10B981" radius={3} name="Hot" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2">
            {[{ c: "#6366F1", l: "Calls" }, { c: "#F59E0B", l: "Qualified" }, { c: "#10B981", l: "Hot" }].map(x => (
              <div key={x.l} className="flex items-center gap-1.5">
                <span className="w-3 h-2 rounded-sm inline-block" style={{ background: x.c }} />
                <span className="text-xs" style={{ color: "#64748B" }}>{x.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="rounded-xl p-5" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(99,102,241,0.15)" }}>
            <span className="text-base">🤖</span>
          </div>
          <h2 className="text-white font-semibold" style={{ fontFamily: "'Sora', sans-serif", fontSize: 16 }}>AI Insights</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {aiInsights.map((insight, i) => (
            <div key={i} className="p-4 rounded-xl" style={{ background: insight.type === "success" ? "rgba(16,185,129,0.08)" : insight.type === "warning" ? "rgba(245,158,11,0.08)" : "rgba(239,68,68,0.08)", border: `1px solid ${insight.type === "success" ? "rgba(16,185,129,0.2)" : insight.type === "warning" ? "rgba(245,158,11,0.2)" : "rgba(239,68,68,0.2)"}` }}>
              <span className="text-sm font-bold" style={{ color: insight.type === "success" ? "#10B981" : insight.type === "warning" ? "#F59E0B" : "#EF4444" }}>
                {insight.type === "success" ? "✓ Do This" : insight.type === "warning" ? "⚠ Consider" : "✗ Avoid"}
              </span>
              <p className="text-xs mt-1.5 leading-5" style={{ color: "#94A3B8", fontFamily: "'DM Sans', sans-serif" }}>{insight.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Transcript Search */}
      <div className="rounded-xl p-5" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
        <h2 className="text-white font-semibold mb-4" style={{ fontFamily: "'Sora', sans-serif", fontSize: 16 }}>Transcript Search</h2>
        <div className="relative mb-4">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#64748B" }} />
          <input
            value={transcriptSearch}
            onChange={(e) => setTranscriptSearch(e.target.value)}
            placeholder="Search across all transcripts (e.g., 'site visit', 'sea-facing', 'loan')..."
            className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm outline-none"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}
          />
        </div>
        {(transcriptSearch || true) && (
          <div className="space-y-3">
            {filteredTranscripts.map((t, i) => (
              <div key={i} className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: "#6366F1", fontFamily: "'Sora', sans-serif" }}>
                    {t.lead.split(" ").map(w => w[0]).join("")}
                  </div>
                  <span className="text-sm font-medium text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>{t.lead}</span>
                  <span className="text-xs ml-auto" style={{ color: "#64748B" }}>{t.date}</span>
                </div>
                <p className="text-xs" style={{ color: "#94A3B8", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>
                  {t.snippet.split(t.match).map((part, pi) => (
                    <span key={pi}>
                      {part}
                      {pi < t.snippet.split(t.match).length - 1 && (
                        <mark style={{ background: "rgba(245,158,11,0.3)", color: "#F59E0B", borderRadius: 3, padding: "0 2px" }}>{t.match}</mark>
                      )}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
