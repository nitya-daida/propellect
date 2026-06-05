import { useState, useEffect } from "react";
import { Play, Pause, Square, RefreshCw, Phone, Clock, TrendingUp, Users } from "lucide-react";
import { campaigns, leads } from "../data/mockData";
import { toast } from "sonner";

const queue = leads.map((l, i) => ({
  ...l,
  attempts: Math.floor(Math.random() * 3),
  nextRetry: i % 3 === 0 ? "Now" : `${5 + i * 2} min`,
  priority: i < 4 ? "High" : i < 8 ? "Medium" : "Low",
}));

function StatCard({ label, value, color, icon: Icon }: any) {
  return (
    <div className="rounded-xl p-4" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}22` }}>
          <Icon size={15} style={{ color }} />
        </div>
      </div>
      <p className="text-2xl font-bold" style={{ color, fontFamily: "'Sora', sans-serif" }}>{value}</p>
      <p className="text-xs mt-0.5" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif" }}>{label}</p>
    </div>
  );
}

export default function Dialer() {
  const [status, setStatus] = useState<"idle" | "running" | "paused">("idle");
  const [concurrent, setConcurrent] = useState(10);
  const [campaign, setCampaign] = useState("C001");
  const [callsInProgress, setCallsInProgress] = useState(0);
  const [callsToday, setCallsToday] = useState(347);
  const [queueSize, setQueueSize] = useState(234);
  const [successRate, setSuccessRate] = useState(68.4);
  const [lastUpdate, setLastUpdate] = useState("Just now");
  const [queueList, setQueueList] = useState(queue);

  useEffect(() => {
    if (status !== "running") return;
    const timer = setInterval(() => {
      setCallsInProgress(Math.floor(Math.random() * concurrent) + Math.floor(concurrent * 0.7));
      setCallsToday(c => c + Math.floor(Math.random() * 3));
      setQueueSize(q => Math.max(0, q - Math.floor(Math.random() * 2)));
      setSuccessRate(r => Math.min(100, r + (Math.random() - 0.5) * 0.5));
      setLastUpdate("Just now");
    }, 5000);
    return () => clearInterval(timer);
  }, [status, concurrent]);

  const handleStart = () => {
    setStatus("running");
    setCallsInProgress(Math.floor(concurrent * 0.8));
    toast.success("Dialer started! 🚀");
  };
  const handlePause = () => { setStatus("paused"); setCallsInProgress(0); toast.info("Dialer paused"); };
  const handleStop = () => { setStatus("idle"); setCallsInProgress(0); toast.info("Dialer stopped"); };

  const liveCalls = status === "running" ? [
    { lead: "Arjun Sharma", phone: "+91 98201 34567", status: "Connected", duration: "3:45" },
    { lead: "Kavya Rao", phone: "+91 93210 98765", status: "Ringing", duration: "—" },
    { lead: "Amit Kulkarni", phone: "+91 98123 45678", status: "Connected", duration: "1:22" },
    { lead: "Priti Agarwal", phone: "+91 95432 10987", status: "Connected", duration: "5:10" },
    { lead: "Meera Krishnamurthy", phone: "+91 96543 21098", status: "On Hold", duration: "0:45" },
  ].slice(0, callsInProgress) : [];

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-white" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 24 }}>Dialer Control Center</h1>

      {/* Control Panel */}
      <div className="rounded-xl p-6" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
          <div>
            <label className="block text-sm mb-1.5" style={{ color: "#94A3B8" }}>Campaign</label>
            <select value={campaign} onChange={(e) => setCampaign(e.target.value)} disabled={status === "running"} className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif", opacity: status === "running" ? 0.5 : 1 }}>
              {campaigns.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-2" style={{ color: "#94A3B8" }}>Concurrent Calls: <span style={{ color: "#10B981" }}>{concurrent}</span></label>
            <input type="range" min={1} max={50} value={concurrent} onChange={(e) => setConcurrent(Number(e.target.value))} className="w-full accent-emerald-500" />
            <div className="flex justify-between text-xs mt-1" style={{ color: "#475569" }}><span>1</span><span>50</span></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: status === "running" ? "#10B981" : status === "paused" ? "#F59E0B" : "#64748B", boxShadow: status === "running" ? "0 0 0 4px rgba(16,185,129,0.2)" : "none", animation: status === "running" ? "pulse 2s infinite" : "none" }}
              />
              <span className="text-sm capitalize font-semibold" style={{ color: status === "running" ? "#10B981" : status === "paused" ? "#F59E0B" : "#64748B", fontFamily: "'DM Sans', sans-serif" }}>
                {status}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            {status === "idle" || status === "paused" ? (
              <button onClick={handleStart} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm text-white font-medium" style={{ background: "#10B981", fontFamily: "'DM Sans', sans-serif" }}>
                <Play size={14} /> {status === "paused" ? "Resume" : "Start Dialing"}
              </button>
            ) : (
              <button onClick={handlePause} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm text-white font-medium" style={{ background: "#F59E0B", fontFamily: "'DM Sans', sans-serif" }}>
                <Pause size={14} /> Pause
              </button>
            )}
            {status !== "idle" && (
              <button onClick={handleStop} className="py-2.5 px-3 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444" }}>
                <Square size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Live Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Calls in Progress" value={callsInProgress} color="#10B981" icon={Phone} />
        <StatCard label="Queue Size" value={queueSize} color="#6366F1" icon={Users} />
        <StatCard label="Calls Today" value={callsToday.toLocaleString("en-IN")} color="#F59E0B" icon={TrendingUp} />
        <StatCard label="Success Rate" value={`${successRate.toFixed(1)}%`} color="#10B981" icon={TrendingUp} />
      </div>

      {/* Auto-refresh indicator */}
      <div className="flex items-center gap-2">
        <RefreshCw size={12} style={{ color: "#475569" }} className={status === "running" ? "animate-spin" : ""} />
        <span className="text-xs" style={{ color: "#475569", fontFamily: "'DM Sans', sans-serif" }}>Auto-refresh every 5s · Last updated: {lastUpdate}</span>
      </div>

      {/* Live Call Grid */}
      {liveCalls.length > 0 && (
        <div>
          <h2 className="text-white font-semibold mb-3" style={{ fontFamily: "'Sora', sans-serif", fontSize: 16 }}>Active Calls</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {liveCalls.map((call, i) => (
              <div key={i} className="p-3 rounded-xl" style={{ background: "#1E293B", border: `1px solid ${call.status === "Connected" ? "rgba(16,185,129,0.3)" : call.status === "Ringing" ? "rgba(245,158,11,0.3)" : "rgba(99,102,241,0.3)"}` }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: "#6366F1", fontFamily: "'Sora', sans-serif", fontSize: 10 }}>
                    {call.lead.split(" ").map((w: string) => w[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-white truncate" style={{ fontFamily: "'DM Sans', sans-serif" }}>{call.lead}</p>
                    <p className="text-xs" style={{ color: "#64748B" }}>{call.phone}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: call.status === "Connected" ? "rgba(16,185,129,0.15)" : call.status === "Ringing" ? "rgba(245,158,11,0.15)" : "rgba(99,102,241,0.15)", color: call.status === "Connected" ? "#10B981" : call.status === "Ringing" ? "#F59E0B" : "#6366F1", fontFamily: "'DM Sans', sans-serif" }}>
                    {call.status === "Connected" ? "●" : call.status === "Ringing" ? "◌" : "⏸"} {call.status}
                  </span>
                  <span className="text-xs font-mono" style={{ color: "#94A3B8" }}>{call.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Queue Management */}
      <div>
        <h2 className="text-white font-semibold mb-3" style={{ fontFamily: "'Sora', sans-serif", fontSize: 16 }}>Queue Management</h2>
        <div className="rounded-xl overflow-hidden" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {["Lead", "Phone", "Attempts", "Next Retry", "Priority", "Action"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#475569", fontFamily: "'DM Sans', sans-serif" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {queueList.slice(0, 8).map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: "#6366F1", fontFamily: "'Sora', sans-serif", fontSize: 10 }}>
                          {lead.firstName[0]}{lead.lastName[0]}
                        </div>
                        <span className="text-sm text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>{lead.firstName} {lead.lastName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: "#94A3B8" }}>{lead.phone}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: "#E2E8F0" }}>{lead.attempts}/3</td>
                    <td className="px-4 py-3 text-xs" style={{ color: lead.nextRetry === "Now" ? "#10B981" : "#94A3B8" }}>{lead.nextRetry}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{
                        background: lead.priority === "High" ? "rgba(239,68,68,0.15)" : lead.priority === "Medium" ? "rgba(245,158,11,0.15)" : "rgba(100,116,139,0.15)",
                        color: lead.priority === "High" ? "#EF4444" : lead.priority === "Medium" ? "#F59E0B" : "#64748B",
                        fontFamily: "'DM Sans', sans-serif"
                      }}>
                        {lead.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => { setQueueList(q => q.filter(x => x.id !== lead.id)); toast.info("Removed from queue"); }} className="text-xs px-2 py-1 rounded" style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444" }}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
