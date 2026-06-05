import { useState } from "react";
import { Play, X, Phone, Mic, TrendingUp, Brain, ChevronDown } from "lucide-react";
import { calls, statusColors } from "../data/mockData";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

const sentimentTimeline = [
  { t: "0:00", score: 50 }, { t: "0:30", score: 60 }, { t: "1:00", score: 72 },
  { t: "1:30", score: 65 }, { t: "2:00", score: 78 }, { t: "2:30", score: 85 },
  { t: "3:00", score: 80 }, { t: "3:30", score: 88 }, { t: "4:00", score: 91 },
];

function CallDetailModal({ call, onClose }: { call: typeof calls[0]; onClose: () => void }) {
  const [tab, setTab] = useState("transcript");
  const transcript = [
    { speaker: "Agent", text: "Good morning! Am I speaking with " + call.leadName + "?", time: "0:00" },
    { speaker: call.leadName, text: "Yes, this is " + call.leadName + ". Who's this?", time: "0:05" },
    { speaker: "Agent", text: "Hi! I'm Priya from Propellect Realty. We have some excellent properties matching your criteria in Mumbai.", time: "0:12" },
    { speaker: call.leadName, text: "Oh interesting! What kind of properties are you talking about?", time: "0:28" },
    { speaker: "Agent", text: "We have luxury 3BHK apartments in Bandra and Powai starting at ₹1.2Cr. All have sea views or lake views.", time: "0:38" },
    { speaker: call.leadName, text: "That sounds very promising. I've been looking in that area for a while.", time: "1:02" },
    { speaker: "Agent", text: "That's great! I'd love to arrange a site visit for this weekend. Would Saturday morning work for you?", time: "1:15" },
    { speaker: call.leadName, text: "Yes, Saturday could work. Can you send me the details on WhatsApp?", time: "1:45" },
    { speaker: "Agent", text: "Absolutely! I'll send you all the details. Should I note your budget preference as ₹1.5Cr–₹2Cr?", time: "1:58" },
    { speaker: call.leadName, text: "Yes, that's correct. Looking forward to seeing the properties!", time: "2:20" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(15,23,42,0.85)", backdropFilter: "blur(4px)" }}>
      <div className="w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)" }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div>
            <h2 className="text-white font-semibold" style={{ fontFamily: "'Sora', sans-serif" }}>Call Detail — {call.leadName}</h2>
            <p className="text-xs mt-0.5" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif" }}>{call.date} {call.time} · {call.duration} · {call.campaign}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5" style={{ color: "#64748B" }}><X size={16} /></button>
        </div>
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Left Panel */}
          <div className="flex-1 overflow-y-auto">
            {/* Waveform player */}
            <div className="px-6 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <div className="p-4 rounded-xl" style={{ background: "rgba(0,0,0,0.3)" }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#10B981" }} onClick={() => toast.info("Playing recording...")}>
                      <Play size={16} color="#fff" />
                    </button>
                    <div>
                      <p className="text-sm text-white font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>{call.leadName} — {call.campaign}</p>
                      <p className="text-xs" style={{ color: "#64748B" }}>{call.duration}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {["0.75x", "1x", "1.5x", "2x"].map(s => (
                      <button key={s} className="text-xs px-2 py-0.5 rounded" style={{ background: s === "1x" ? "rgba(16,185,129,0.2)" : "rgba(255,255,255,0.06)", color: s === "1x" ? "#10B981" : "#64748B", fontFamily: "'DM Sans', sans-serif" }}>{s}</button>
                    ))}
                  </div>
                </div>
                {/* Fake waveform */}
                <div className="flex items-center gap-0.5 h-12">
                  {Array.from({ length: 80 }, (_, i) => (
                    <div key={i} className="flex-1 rounded-full" style={{ height: `${20 + Math.sin(i * 0.4) * 15 + Math.random() * 10}px`, background: i < 30 ? "#10B981" : "rgba(255,255,255,0.12)" }} />
                  ))}
                </div>
                <div className="flex items-center justify-between mt-2 text-xs" style={{ color: "#475569" }}>
                  <span>1:23</span><span>{call.duration}</span>
                </div>
              </div>
            </div>
            {/* Tabs */}
            <div className="flex border-b px-6" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              {["Transcript", "AI Analysis"].map(t => (
                <button key={t} onClick={() => setTab(t.toLowerCase().replace(" ", "_"))} className="px-4 py-3 text-xs font-medium border-b-2 transition-colors" style={{ borderColor: tab === t.toLowerCase().replace(" ", "_") ? "#10B981" : "transparent", color: tab === t.toLowerCase().replace(" ", "_") ? "#10B981" : "#64748B", fontFamily: "'DM Sans', sans-serif" }}>{t}</button>
              ))}
            </div>
            <div className="p-6 space-y-3">
              {tab === "transcript" && transcript.map((line, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="text-xs w-10 flex-shrink-0 pt-0.5" style={{ color: "#475569", fontFamily: "'DM Sans', sans-serif" }}>{line.time}</span>
                  <div className="flex-1">
                    <span className="text-xs font-semibold" style={{ color: line.speaker === "Agent" ? "#6366F1" : "#F59E0B", fontFamily: "'DM Sans', sans-serif" }}>{line.speaker}: </span>
                    <span className="text-sm" style={{ color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}>{line.text}</span>
                  </div>
                </div>
              ))}
              {tab === "ai_analysis" && (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-white mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Key Insights</p>
                    {["Lead showed strong buying intent — mentioned 'been looking for a while'", "Site visit commitment secured for Saturday", "Budget confirmed: ₹1.5Cr–₹2Cr range", "WhatsApp follow-up requested — send property brochures immediately", "High engagement score — 91/100"].map((insight, i) => (
                      <div key={i} className="flex items-start gap-2 py-1.5">
                        <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: "#10B981" }} />
                        <p className="text-sm" style={{ color: "#94A3B8", fontFamily: "'DM Sans', sans-serif" }}>{insight}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Sentiment Over Time</p>
                    <ResponsiveContainer width="100%" height={100}>
                      <LineChart data={sentimentTimeline}>
                        <XAxis dataKey="t" tick={{ fill: "#475569", fontSize: 10 }} axisLine={false} tickLine={false} />
                        <YAxis domain={[0, 100]} hide />
                        <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 11 }} />
                        <Line type="monotone" dataKey="score" stroke="#10B981" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Objections Detected</p>
                    <div className="flex gap-2 flex-wrap">
                      {["None detected"].map(o => (
                        <span key={o} className="text-xs px-2.5 py-1 rounded-full" style={{ background: "rgba(16,185,129,0.15)", color: "#10B981", fontFamily: "'DM Sans', sans-serif" }}>{o}</span>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
                    <p className="text-xs font-semibold mb-1" style={{ color: "#10B981" }}>⚡ Next Best Action</p>
                    <p className="text-sm" style={{ color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}>Send property brochures on WhatsApp within 1 hour. Confirm Saturday 10 AM site visit.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Right Panel — Lead Info */}
          <div className="w-full md:w-64 border-t md:border-t-0 md:border-l p-4 flex-shrink-0" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.15)" }}>
            <div className="text-center mb-4">
              <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold" style={{ background: "#6366F1", fontFamily: "'Sora', sans-serif" }}>
                {call.leadName.split(" ").map(w => w[0]).join("")}
              </div>
              <p className="text-sm font-semibold text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>{call.leadName}</p>
              <p className="text-xs" style={{ color: "#64748B" }}>{call.phone}</p>
            </div>
            <div className="space-y-2 mb-4">
              {[
                { label: "Agent", value: call.agent },
                { label: "Campaign", value: call.campaign },
                { label: "Duration", value: call.duration },
                { label: "Outcome", value: call.outcome },
                { label: "Score", value: `${call.score}/100` },
              ].map(f => (
                <div key={f.label} className="flex justify-between text-xs">
                  <span style={{ color: "#64748B" }}>{f.label}</span>
                  <span style={{ color: "#E2E8F0" }} className="capitalize">{f.value}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <button onClick={() => toast.success("Status updated")} className="w-full py-2 rounded-lg text-xs font-medium text-white" style={{ background: "#10B981", fontFamily: "'DM Sans', sans-serif" }}>Update Lead Status</button>
              <button onClick={() => toast.success("Follow-up scheduled")} className="w-full py-2 rounded-lg text-xs font-medium" style={{ background: "rgba(99,102,241,0.15)", color: "#6366F1", fontFamily: "'DM Sans', sans-serif" }}>Schedule Follow-up</button>
              <button onClick={() => toast.success("Note added")} className="w-full py-2 rounded-lg text-xs font-medium" style={{ background: "rgba(255,255,255,0.06)", color: "#94A3B8", fontFamily: "'DM Sans', sans-serif" }}>Add Note</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Calls() {
  const [selectedCall, setSelectedCall] = useState<typeof calls[0] | null>(null);
  const [filter, setFilter] = useState("all");
  const [liveExpanded, setLiveExpanded] = useState(true);

  const liveCalls = [
    { id: "LC1", lead: "Arjun Sharma", phone: "+91 98201 34567", campaign: "Mumbai Premium", agent: "Priya Mehta", status: "Connected", duration: 234 },
    { id: "LC2", lead: "Kavya Rao", phone: "+91 93210 98765", campaign: "Bengaluru Tech", agent: "Rahul Iyer", status: "Ringing", duration: 0 },
    { id: "LC3", lead: "Amit Kulkarni", phone: "+91 98123 45678", campaign: "Pune Growth", agent: "Sneha Verma", status: "Connected", duration: 87 },
  ];

  const filtered = filter === "all" ? calls : calls.filter(c => c.outcome === filter);

  const sentimentIcon = (s: string) => s === "positive" ? "😊" : s === "neutral" ? "😐" : "😟";

  return (
    <div className="p-4 md:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-white" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 24 }}>Calls</h1>
        <button onClick={() => toast.success("Exporting call logs...")} className="px-4 py-2 rounded-lg text-sm" style={{ background: "rgba(255,255,255,0.06)", color: "#94A3B8", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'DM Sans', sans-serif" }}>
          Export CSV
        </button>
      </div>

      {/* Live Calls Panel */}
      <div className="rounded-xl overflow-hidden" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
        <button
          onClick={() => setLiveExpanded(!liveExpanded)}
          className="w-full flex items-center justify-between px-5 py-3.5"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#10B981" }} />
            <span className="text-white font-semibold" style={{ fontFamily: "'Sora', sans-serif", fontSize: 14 }}>Live Calls ({liveCalls.length} active)</span>
          </div>
          <ChevronDown size={16} style={{ color: "#64748B", transform: liveExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
        </button>
        {liveExpanded && (
          <div className="px-5 pb-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            {liveCalls.map((lc) => (
              <div key={lc.id} className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>{lc.lead}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: lc.status === "Connected" ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)", color: lc.status === "Connected" ? "#10B981" : "#F59E0B" }}>
                    {lc.status}
                  </span>
                </div>
                <p className="text-xs mb-1" style={{ color: "#64748B" }}>{lc.agent} · {lc.campaign}</p>
                <p className="text-xs font-mono" style={{ color: "#94A3B8" }}>
                  {lc.status === "Connected" ? `${String(Math.floor(lc.duration / 60)).padStart(2, "0")}:${String(lc.duration % 60).padStart(2, "0")}` : "Ringing..."}
                </p>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => toast.info("Listening in...")} className="flex-1 text-xs py-1 rounded" style={{ background: "rgba(99,102,241,0.1)", color: "#6366F1" }}>Listen In</button>
                  <button onClick={() => toast.error("Call ended")} className="flex-1 text-xs py-1 rounded" style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444" }}>End Call</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        {["all", "answered", "no_answer", "voicemail"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-lg text-xs capitalize transition-colors"
            style={{
              background: filter === f ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.04)",
              color: filter === f ? "#10B981" : "#64748B",
              border: filter === f ? "1px solid rgba(16,185,129,0.3)" : "1px solid rgba(255,255,255,0.06)",
              fontFamily: "'DM Sans', sans-serif"
            }}
          >
            {f === "all" ? "All Calls" : f.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Call History Table */}
      <div className="rounded-xl overflow-hidden" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {["Date/Time", "Lead", "Campaign", "Agent", "Duration", "Outcome", "Sentiment", "Score", "Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#475569", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((call) => (
                <tr key={call.id} className="hover:bg-white/[0.02] cursor-pointer transition-colors group" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }} onClick={() => setSelectedCall(call)}>
                  <td className="px-4 py-3 text-xs" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>
                    <p style={{ color: "#E2E8F0" }}>{call.date}</p>
                    <p>{call.time}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: "#6366F1", fontFamily: "'Sora', sans-serif" }}>
                        {call.leadName.split(" ").map(w => w[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>{call.leadName}</p>
                        <p className="text-xs" style={{ color: "#64748B" }}>{call.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#94A3B8" }}>{call.campaign}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#94A3B8" }}>{call.agent}</td>
                  <td className="px-4 py-3 text-xs font-mono" style={{ color: "#E2E8F0" }}>{call.duration || "—"}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full capitalize" style={{ background: call.outcome === "answered" ? "rgba(16,185,129,0.15)" : call.outcome === "voicemail" ? "rgba(245,158,11,0.15)" : "rgba(239,68,68,0.15)", color: call.outcome === "answered" ? "#10B981" : call.outcome === "voicemail" ? "#F59E0B" : "#EF4444", fontFamily: "'DM Sans', sans-serif" }}>
                      {call.outcome.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-lg">{sentimentIcon(call.sentiment)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-12 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
                        <div className="h-1.5 rounded-full" style={{ width: `${call.score}%`, background: call.score >= 70 ? "#10B981" : "#F59E0B" }} />
                      </div>
                      <span className="text-xs" style={{ color: "#94A3B8" }}>{call.score}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {call.recording && <button onClick={() => toast.info("Playing...")} className="p-1.5 rounded" style={{ color: "#6366F1" }}><Play size={12} /></button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedCall && <CallDetailModal call={selectedCall} onClose={() => setSelectedCall(null)} />}
    </div>
  );
}
