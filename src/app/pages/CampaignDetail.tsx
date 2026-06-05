import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Pause, Play, Trash2 } from "lucide-react";
import { campaigns, calls, leads, statusColors } from "../data/mockData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { toast } from "sonner";
import { useState } from "react";

const callsOverTime = [
  { date: "Apr 25", calls: 45, answered: 32 },
  { date: "Apr 26", calls: 67, answered: 48 },
  { date: "Apr 27", calls: 89, answered: 64 },
  { date: "Apr 28", calls: 78, answered: 57 },
  { date: "Apr 29", calls: 94, answered: 71 },
  { date: "Apr 30", calls: 112, answered: 86 },
  { date: "May 1", calls: 58, answered: 44 },
];

export default function CampaignDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const campaign = campaigns.find(c => c.id === id) || campaigns[0];
  const [status, setStatus] = useState(campaign.status);

  const campaignCalls = calls.filter(c => c.campaign.includes(campaign.name.split(" ")[0]));
  const campaignLeads = leads.slice(0, 6);

  const statusColor: Record<string, string> = { active: "#10B981", paused: "#F59E0B", completed: "#6366F1", draft: "#64748B" };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="px-3 py-2 rounded-lg text-xs" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}>
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((p: any, i: number) => <p key={i} style={{ color: p.color }}>{p.name}: {p.value}</p>)}
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Back + Header */}
      <div className="flex items-start gap-4">
        <button onClick={() => navigate("/campaigns")} className="mt-1 p-1.5 rounded-lg hover:bg-white/5 transition-colors" style={{ color: "#64748B" }}>
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex-1 min-w-0">
              <h1 className="text-white font-bold text-xl truncate" style={{ fontFamily: "'Sora', sans-serif" }}>{campaign.name}</h1>
              <p className="text-sm mt-0.5" style={{ color: "#64748B" }}>{campaign.description}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs px-2.5 py-1 rounded-full capitalize" style={{ background: `${statusColor[status]}22`, color: statusColor[status] }}>{status}</span>
              <button onClick={() => { setStatus(s => s === "active" ? "paused" : "active"); toast.success("Status updated"); }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs" style={{ background: status === "active" ? "rgba(245,158,11,0.1)" : "rgba(16,185,129,0.1)", color: status === "active" ? "#F59E0B" : "#10B981" }}>
                {status === "active" ? <><Pause size={12} /> Pause</> : <><Play size={12} /> Resume</>}
              </button>
              <button onClick={() => { toast.error("Campaign deleted"); navigate("/campaigns"); }} className="p-1.5 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444" }}><Trash2 size={14} /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {[
          { label: "Total Leads", value: campaign.leadCount, color: "#6366F1" },
          { label: "Dialed", value: campaign.dialed, color: "#E2E8F0" },
          { label: "Answered", value: campaign.answered, color: "#10B981" },
          { label: "Qualified", value: campaign.qualified, color: "#F59E0B" },
          { label: "Hot Leads", value: campaign.hot, color: "#EF4444" },
          { label: "Converted", value: campaign.converted, color: "#10B981" },
        ].map(s => (
          <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-xl font-bold" style={{ color: s.color, fontFamily: "'Sora', sans-serif" }}>{s.value}</p>
            <p className="text-xs mt-0.5" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl p-5" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 className="text-white font-semibold mb-4" style={{ fontFamily: "'Sora', sans-serif", fontSize: 15 }}>Calls Over Time</h2>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={callsOverTime} barSize={10}>
              <XAxis dataKey="date" tick={{ fill: "#475569", fontSize: 11, fontFamily: "'DM Sans', sans-serif" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="calls" fill="#6366F1" radius={4} name="Total" />
              <Bar dataKey="answered" fill="#10B981" radius={4} name="Answered" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-xl p-5" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 className="text-white font-semibold mb-4" style={{ fontFamily: "'Sora', sans-serif", fontSize: 15 }}>Campaign Details</h2>
          <div className="space-y-2">
            {[
              { label: "Goal", value: campaign.goal },
              { label: "Start Date", value: campaign.startDate },
              { label: "End Date", value: campaign.endDate },
              { label: "Language", value: campaign.language },
              { label: "Voice", value: campaign.voice },
              { label: "Max Concurrent", value: `${campaign.concurrentCalls} calls` },
              { label: "Recording", value: campaign.recording ? "Enabled" : "Disabled" },
              { label: "Transcription", value: campaign.transcription ? "Enabled" : "Disabled" },
            ].map(f => (
              <div key={f.label} className="flex justify-between py-1 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                <span className="text-xs" style={{ color: "#64748B" }}>{f.label}</span>
                <span className="text-xs font-medium" style={{ color: "#E2E8F0" }}>{f.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="rounded-xl overflow-hidden" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <h2 className="text-white font-semibold" style={{ fontFamily: "'Sora', sans-serif", fontSize: 15 }}>Campaign Leads</h2>
          <span className="text-xs" style={{ color: "#64748B" }}>{campaign.leadCount} total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {["Name", "Phone", "Status", "Score", "Last Called"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase" style={{ color: "#475569", fontFamily: "'DM Sans', sans-serif" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {campaignLeads.map(l => (
                <tr key={l.id} className="hover:bg-white/[0.02] transition-colors" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td className="px-4 py-3 text-sm font-medium text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>{l.firstName} {l.lastName}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#94A3B8" }}>{l.phone}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${statusColors[l.status]}`}>{l.status}</span>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#E2E8F0" }}>{l.score}/100</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#64748B" }}>{l.lastCalled}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
