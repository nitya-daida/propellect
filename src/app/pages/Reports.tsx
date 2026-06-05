import { useState } from "react";
import { Download, Calendar, X, Mail, FileText } from "lucide-react";
import { toast } from "sonner";
import { billingHistory } from "../data/mockData";

const reportTemplates = [
  { id: "lead", name: "Lead Report", desc: "Comprehensive analysis of all leads with status, sources, conversion rates.", icon: "👥", color: "#6366F1" },
  { id: "campaign", name: "Campaign Performance", desc: "Detailed metrics for all campaigns including dialed, answered, converted.", icon: "📣", color: "#10B981" },
  { id: "agent", name: "Agent Report", desc: "Individual agent performance, calls made, conversions and efficiency.", icon: "👤", color: "#F59E0B" },
  { id: "call", name: "Call Analytics", desc: "In-depth analysis of all calls, durations, outcomes and sentiment scores.", icon: "📞", color: "#EF4444" },
  { id: "conversion", name: "Conversion Report", desc: "End-to-end conversion funnel from lead to closed deal analysis.", icon: "📈", color: "#10B981" },
  { id: "sentiment", name: "Sentiment Report", desc: "AI-powered sentiment analysis across all calls and interactions.", icon: "🧠", color: "#6366F1" },
];

const generatedReports = [
  { id: "R001", name: "Lead Report — April 2026", type: "Lead Report", date: "May 1, 2026", range: "Apr 1–30, 2026", format: "PDF", status: "ready" },
  { id: "R002", name: "Campaign Performance Q1", type: "Campaign Performance", date: "Apr 15, 2026", range: "Jan 1 – Mar 31, 2026", format: "Excel", status: "ready" },
  { id: "R003", name: "Agent Monthly Report — April", type: "Agent Report", date: "May 1, 2026", range: "Apr 1–30, 2026", format: "PDF", status: "generating" },
  { id: "R004", name: "Sentiment Analysis — Week 17", type: "Sentiment Report", date: "Apr 28, 2026", range: "Apr 21–27, 2026", format: "PDF", status: "ready" },
  { id: "R005", name: "Call Analytics Daily", type: "Call Analytics", date: "Apr 30, 2026", range: "Apr 30, 2026", format: "Excel", status: "ready" },
];

function ScheduleModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(15,23,42,0.85)", backdropFilter: "blur(4px)" }}>
      <div className="w-full max-w-md rounded-2xl shadow-2xl" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <h2 className="text-white font-semibold" style={{ fontFamily: "'Sora', sans-serif" }}>Schedule Report</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5" style={{ color: "#64748B" }}><X size={16} /></button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-sm mb-1.5" style={{ color: "#94A3B8" }}>Report Type</label>
            <select className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}>
              {reportTemplates.map(r => <option key={r.id}>{r.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1.5" style={{ color: "#94A3B8" }}>Frequency</label>
            <select className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}>
              <option>Daily</option><option>Weekly</option><option>Monthly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1.5" style={{ color: "#94A3B8" }}>Delivery Time</label>
            <input type="time" defaultValue="08:00" className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0" }} />
          </div>
          <div>
            <label className="block text-sm mb-1.5" style={{ color: "#94A3B8" }}>Email Recipients</label>
            <input placeholder="rajesh@callaihm.com, priya@callaihm.com" className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }} />
          </div>
          <div>
            <label className="block text-sm mb-1.5" style={{ color: "#94A3B8" }}>Format</label>
            <div className="flex gap-2">
              {["PDF", "Excel"].map(f => (
                <button key={f} className="px-4 py-2 rounded-lg text-sm" style={{ background: f === "PDF" ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.06)", color: f === "PDF" ? "#10B981" : "#64748B", border: f === "PDF" ? "1px solid rgba(16,185,129,0.3)" : "1px solid rgba(255,255,255,0.08)", fontFamily: "'DM Sans', sans-serif" }}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="px-5 py-4 border-t flex justify-end gap-3" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm" style={{ background: "rgba(255,255,255,0.06)", color: "#94A3B8", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'DM Sans', sans-serif" }}>Cancel</button>
          <button onClick={() => { toast.success("Report scheduled! ✓"); onClose(); }} className="px-5 py-2 rounded-lg text-sm text-white" style={{ background: "#10B981", fontFamily: "'DM Sans', sans-serif" }}>Schedule</button>
        </div>
      </div>
    </div>
  );
}

export default function Reports() {
  const [showSchedule, setShowSchedule] = useState(false);
  const [reports, setReports] = useState(generatedReports);

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-white" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 24 }}>Reports</h1>

      {/* Report Templates */}
      <div>
        <h2 className="text-white font-semibold mb-4" style={{ fontFamily: "'Sora', sans-serif", fontSize: 16 }}>Report Templates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTemplates.map(report => (
            <div key={report.id} className="rounded-xl p-5 transition-all hover:-translate-y-0.5" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: `${report.color}22` }}>
                  {report.icon}
                </div>
              </div>
              <h3 className="text-white font-semibold mb-1" style={{ fontFamily: "'Sora', sans-serif", fontSize: 15 }}>{report.name}</h3>
              <p className="text-xs mb-4 leading-5" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif" }}>{report.desc}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => { toast.success(`Generating ${report.name}...`); }}
                  className="flex-1 py-2 rounded-lg text-xs font-medium text-white transition-all"
                  style={{ background: report.color, fontFamily: "'DM Sans', sans-serif" }}
                >
                  Generate
                </button>
                <button
                  onClick={() => setShowSchedule(true)}
                  className="py-2 px-3 rounded-lg text-xs transition-colors"
                  style={{ background: "rgba(255,255,255,0.06)", color: "#94A3B8", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  <Calendar size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Generated Reports Table */}
      <div>
        <h2 className="text-white font-semibold mb-4" style={{ fontFamily: "'Sora', sans-serif", fontSize: 16 }}>Generated Reports</h2>
        <div className="rounded-xl overflow-hidden" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {["Name", "Type", "Generated", "Date Range", "Format", "Status", "Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#475569", fontFamily: "'DM Sans', sans-serif" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reports.map(r => (
                <tr key={r.id} className="hover:bg-white/[0.02] transition-colors" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FileText size={14} style={{ color: "#64748B", flexShrink: 0 }} />
                      <span className="text-sm font-medium text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>{r.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#94A3B8" }}>{r.type}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#64748B" }}>{r.date}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#64748B" }}>{r.range}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: r.format === "PDF" ? "rgba(239,68,68,0.1)" : "rgba(16,185,129,0.1)", color: r.format === "PDF" ? "#EF4444" : "#10B981" }}>{r.format}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {r.status === "generating" && <div className="w-3 h-3 border-2 rounded-full border-t-transparent animate-spin" style={{ borderColor: "#F59E0B", borderTopColor: "transparent" }} />}
                      <span className="text-xs" style={{ color: r.status === "ready" ? "#10B981" : "#F59E0B" }}>{r.status === "ready" ? "Ready" : "Generating..."}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {r.status === "ready" && (
                        <button onClick={() => toast.success("Downloading...")} className="p-1.5 rounded-lg" style={{ background: "rgba(16,185,129,0.1)", color: "#10B981" }}>
                          <Download size={12} />
                        </button>
                      )}
                      <button onClick={() => setReports(prev => prev.filter(x => x.id !== r.id))} className="p-1.5 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444" }}>
                        <X size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showSchedule && <ScheduleModal onClose={() => setShowSchedule(false)} />}
    </div>
  );
}
