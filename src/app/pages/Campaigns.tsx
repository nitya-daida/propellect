import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Plus, Play, Pause, Edit2, Trash2, Eye, LayoutGrid, List, ChevronRight, X, Check } from "lucide-react";
import { statusColors } from "../data/mockData";
import { fetchJson } from "../api";
import { toast } from "sonner";

type Campaign = any;

function normalizeCampaign(item: any): Campaign {
  return {
    id: String(item.id ?? item._id ?? ""),
    name: item.name ?? item.title ?? "Untitled Campaign",
    description: item.description ?? "No description available",
    status: item.status ?? "draft",
    leadCount: Number(item.lead_count ?? item.leadCount ?? 0),
    createdAt: item.created_at ?? item.createdAt,
    dialed: Number(item.dialed ?? 0),
    answered: Number(item.answered ?? 0),
    qualified: Number(item.qualified ?? 0),
    hot: Number(item.hot ?? 0),
    converted: Number(item.converted ?? 0),
    startDate: item.start_date ?? item.startDate ?? "2026-01-01",
    endDate: item.end_date ?? item.endDate ?? "2026-01-31",
    agents: Array.isArray(item.agents) ? item.agents : [],
    goal: item.goal ?? "Qualification",
    concurrentCalls: Number(item.concurrentCalls ?? item.concurrent_calls ?? 0),
    language: item.language ?? "English",
    voice: item.voice ?? "Priya Pro",
    recording: item.recording ?? true,
    transcription: item.transcription ?? true,
  };
}

const statusLabel: Record<string, string> = {
  active: "Active", paused: "Paused", completed: "Completed", draft: "Draft"
};

function CreateCampaignModal({ onClose, onCreate }: { onClose: () => void; onCreate: (campaign: Campaign) => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "", description: "", goal: "Qualification", concurrent: 10, recording: true, transcription: true,
    language: "English", voice: "Priya Pro",
  });
  const [submitting, setSubmitting] = useState(false);

  const steps = ["Campaign Setup", "Lead Selection", "AI Settings"];
  const submitCampaign = async () => {
    if (!formData.name.trim()) {
      toast.error("Please enter a campaign name.");
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        goal: formData.goal,
        status: "draft",
        leadCount: 0,
        dialed: 0,
        answered: 0,
        qualified: 0,
        hot: 0,
        converted: 0,
        startDate: "2026-05-05",
        endDate: "2026-06-05",
        agents: [],
        timeWindow: { from: "09:00", to: "20:00", days: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
        concurrentCalls: formData.concurrent,
        language: formData.language,
        voice: formData.voice,
        recording: formData.recording,
        transcription: formData.transcription,
      };
      const result = await fetchJson<Campaign>("/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      toast.success("Campaign launched! 🚀");
      onCreate(normalizeCampaign(result));
      onClose();
    } catch (error) {
      console.error("Failed to create campaign", error);
      toast.error("Unable to create campaign.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(15,23,42,0.8)", backdropFilter: "blur(4px)" }}>
      <div className="w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)" }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <h2 className="text-white font-semibold" style={{ fontFamily: "'Sora', sans-serif", fontSize: 18 }}>Create Campaign</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5" style={{ color: "#64748B" }}><X size={16} /></button>
        </div>
        {/* Steps */}
        <div className="flex items-center gap-0 px-6 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className="flex items-center gap-2 flex-1">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{
                    background: step > i + 1 ? "#10B981" : step === i + 1 ? "#10B981" : "rgba(255,255,255,0.06)",
                    color: step >= i + 1 ? "#fff" : "#64748B",
                    fontFamily: "'Sora', sans-serif"
                  }}
                >
                  {step > i + 1 ? <Check size={12} /> : i + 1}
                </div>
                <span className="text-xs font-medium hidden sm:block" style={{ color: step >= i + 1 ? "#E2E8F0" : "#64748B", fontFamily: "'DM Sans', sans-serif" }}>{s}</span>
              </div>
              {i < steps.length - 1 && <div className="h-px flex-1 mx-2" style={{ background: step > i + 1 ? "#10B981" : "rgba(255,255,255,0.08)" }} />}
            </div>
          ))}
        </div>
        {/* Body */}
        <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
          {step === 1 && (
            <>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#94A3B8", fontFamily: "'DM Sans', sans-serif" }}>Campaign Name *</label>
                <input value={formData.name} onChange={(e) => setFormData(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Mumbai Premium Buyers Q2" className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }} />
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#94A3B8", fontFamily: "'DM Sans', sans-serif" }}>Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData(f => ({ ...f, description: e.target.value }))} placeholder="What is this campaign for?" rows={3} className="w-full px-3 py-2.5 rounded-lg text-sm outline-none resize-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1.5" style={{ color: "#94A3B8", fontFamily: "'DM Sans', sans-serif" }}>Goal</label>
                  <select value={formData.goal} onChange={(e) => setFormData(f => ({ ...f, goal: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}>
                    {["Qualification", "Follow-up", "Re-engagement", "Cold Outreach"].map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1.5" style={{ color: "#94A3B8", fontFamily: "'DM Sans', sans-serif" }}>Language</label>
                  <select value={formData.language} onChange={(e) => setFormData(f => ({ ...f, language: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}>
                    {["English", "Hindi", "Telugu", "Tamil", "Kannada"].map(l => <option key={l}>{l}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1.5" style={{ color: "#94A3B8", fontFamily: "'DM Sans', sans-serif" }}>Start Date</label>
                  <input type="date" defaultValue="2026-05-05" className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }} />
                </div>
                <div>
                  <label className="block text-sm mb-1.5" style={{ color: "#94A3B8", fontFamily: "'DM Sans', sans-serif" }}>End Date</label>
                  <input type="date" defaultValue="2026-06-05" className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }} />
                </div>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <p className="text-sm" style={{ color: "#94A3B8", fontFamily: "'DM Sans', sans-serif" }}>Filter leads by criteria to include in this campaign.</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Source", options: ["All", "MLS", "Referral", "Portal", "Ad"] },
                  { label: "Intent", options: ["All", "Buy", "Sell", "Rent", "Invest"] },
                  { label: "Status", options: ["All", "Hot", "Warm", "Cold"] },
                  { label: "Location", options: ["All", "Mumbai", "Bengaluru", "Pune", "Hyderabad"] },
                ].map(f => (
                  <div key={f.label}>
                    <label className="block text-sm mb-1.5" style={{ color: "#94A3B8", fontFamily: "'DM Sans', sans-serif" }}>{f.label}</label>
                    <select className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}>
                      {f.options.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl text-center" style={{ background: "rgba(16,185,129,0.08)", border: "1px dashed rgba(16,185,129,0.3)" }}>
                <p className="text-2xl font-bold" style={{ color: "#10B981", fontFamily: "'Sora', sans-serif" }}>847</p>
                <p className="text-sm" style={{ color: "#64748B" }}>matching leads found</p>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <div>
                <label className="block text-sm mb-2" style={{ color: "#94A3B8", fontFamily: "'DM Sans', sans-serif" }}>Max Concurrent Calls: {formData.concurrent}</label>
                <input type="range" min={1} max={50} value={formData.concurrent} onChange={(e) => setFormData(f => ({ ...f, concurrent: Number(e.target.value) }))} className="w-full accent-emerald-500" />
                <div className="flex justify-between text-xs mt-1" style={{ color: "#475569" }}><span>1</span><span>50</span></div>
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#94A3B8", fontFamily: "'DM Sans', sans-serif" }}>Voice Agent</label>
                <select value={formData.voice} onChange={(e) => setFormData(f => ({ ...f, voice: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}>
                  {["Priya Pro", "Arjun Pro", "Kavitha Pro", "Raj Pro", "Meera Pro"].map(v => <option key={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#94A3B8", fontFamily: "'DM Sans', sans-serif" }}>Opening Script</label>
                <textarea placeholder="Hi, this is [Agent Name] calling from Propellect Realty. I'm reaching out about properties in your preferred area..." rows={3} className="w-full px-3 py-2.5 rounded-lg text-sm outline-none resize-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }} />
              </div>
              <div className="flex items-center gap-6">
                {[{ label: "Call Recording", key: "recording" }, { label: "Transcription", key: "transcription" }].map((t) => (
                  <label key={t.key} className="flex items-center gap-2 cursor-pointer">
                    <div
                      className="w-10 h-5 rounded-full relative transition-colors cursor-pointer"
                      style={{ background: formData[t.key as keyof typeof formData] ? "#10B981" : "rgba(255,255,255,0.1)" }}
                      onClick={() => setFormData(f => ({ ...f, [t.key]: !f[t.key as keyof typeof formData] }))}
                    >
                      <div className="w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all" style={{ left: formData[t.key as keyof typeof formData] ? 22 : 2 }} />
                    </div>
                    <span className="text-sm" style={{ color: "#94A3B8", fontFamily: "'DM Sans', sans-serif" }}>{t.label}</span>
                  </label>
                ))}
              </div>
            </>
          )}
        </div>
        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <button onClick={() => step > 1 ? setStep(s => s - 1) : onClose()} className="px-4 py-2 rounded-lg text-sm" style={{ background: "rgba(255,255,255,0.06)", color: "#94A3B8", fontFamily: "'DM Sans', sans-serif", border: "1px solid rgba(255,255,255,0.08)" }}>
            {step > 1 ? "Back" : "Cancel"}
          </button>
          <button
            onClick={() => step < 3 ? setStep(s => s + 1) : submitCampaign()}
            className="px-6 py-2 rounded-lg text-sm text-white font-medium"
            style={{ background: "#10B981", fontFamily: "'DM Sans', sans-serif" }}
            disabled={submitting}
          >
            {step === 3 ? (submitting ? "Launching..." : "🚀 Launch Campaign") : "Continue →"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Campaigns() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showCreate, setShowCreate] = useState(false);
  const [cList, setCList] = useState<Campaign[]>([]);

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const data = await fetchJson<any>("/campaigns");
        const rawCampaigns = data?.campaigns ?? data ?? [];
        setCList(Array.isArray(rawCampaigns) ? rawCampaigns.map(normalizeCampaign) : []);
      } catch (error) {
        console.error("Failed to load campaigns", error);
        toast.error("Unable to load campaigns from backend.");
      }
    };

    loadCampaigns();
  }, []);

  const toggleStatus = (id: string) => {
    setCList(prev => prev.map(c => c.id === id ? { ...c, status: c.status === "active" ? "paused" : "active" } : c));
    toast.success("Campaign status updated");
  };

  const statusColor: Record<string, string> = {
    active: "#10B981", paused: "#F59E0B", completed: "#6366F1", draft: "#64748B"
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-white" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 24 }}>Campaigns</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => setViewMode("grid")} className="p-2 rounded-lg transition-colors" style={{ background: viewMode === "grid" ? "rgba(16,185,129,0.12)" : "rgba(255,255,255,0.04)", color: viewMode === "grid" ? "#10B981" : "#64748B" }}><LayoutGrid size={16} /></button>
          <button onClick={() => setViewMode("list")} className="p-2 rounded-lg transition-colors" style={{ background: viewMode === "list" ? "rgba(16,185,129,0.12)" : "rgba(255,255,255,0.04)", color: viewMode === "list" ? "#10B981" : "#64748B" }}><List size={16} /></button>
          <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white" style={{ background: "#10B981", fontFamily: "'DM Sans', sans-serif" }}>
            <Plus size={14} /> Create Campaign
          </button>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Campaigns", value: cList.length, color: "#6366F1" },
          { label: "Active", value: cList.filter(c => c.status === "active").length, color: "#10B981" },
          { label: "Total Leads", value: cList.reduce((s, c) => s + c.leadCount, 0).toLocaleString("en-IN"), color: "#F59E0B" },
          { label: "Total Converted", value: cList.reduce((s, c) => s + c.converted, 0), color: "#10B981" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl p-4" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-2xl font-bold" style={{ color: stat.color, fontFamily: "'Sora', sans-serif" }}>{stat.value}</p>
            <p className="text-xs mt-1" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif" }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {cList.map((c) => {
            const pct = c.leadCount ? Math.round((c.dialed / c.leadCount) * 100) : 0;
            return (
              <div key={c.id} className="rounded-xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-xl" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)", cursor: "pointer" }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0 pr-2">
                    <h3 className="text-white font-semibold truncate" style={{ fontFamily: "'Sora', sans-serif", fontSize: 15 }}>{c.name}</h3>
                    <p className="text-xs mt-0.5 truncate" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif" }}>{c.description}</p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: `${statusColor[c.status]}22`, color: statusColor[c.status], fontFamily: "'DM Sans', sans-serif" }}>
                    {statusLabel[c.status]}
                  </span>
                </div>
                {/* Progress */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif" }}>
                    <span>{c.dialed} dialed</span><span>{c.leadCount} total</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                    <div className="h-1.5 rounded-full transition-all" style={{ width: `${pct}%`, background: statusColor[c.status] }} />
                  </div>
                  <span className="text-xs" style={{ color: "#64748B" }}>{pct}% completed</span>
                </div>
                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { label: "Answered", value: c.answered, color: "#10B981" },
                    { label: "Hot", value: c.hot, color: "#F59E0B" },
                    { label: "Converted", value: c.converted, color: "#6366F1" },
                  ].map(s => (
                    <div key={s.label} className="text-center p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
                      <p className="font-bold" style={{ color: s.color, fontFamily: "'Sora', sans-serif", fontSize: 16 }}>{s.value}</p>
                      <p className="text-xs" style={{ color: "#64748B" }}>{s.label}</p>
                    </div>
                  ))}
                </div>
                {/* Agents */}
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {c.agents.map((a, i) => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-white text-xs font-bold" style={{ background: ["#6366F1", "#10B981", "#F59E0B"][i], borderColor: "#1E293B", fontFamily: "'Sora', sans-serif", fontSize: 9 }}>
                        {a.split(" ").map(w => w[0]).join("")}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => toggleStatus(c.id)} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors" style={{ color: c.status === "active" ? "#F59E0B" : "#10B981" }}>
                      {c.status === "active" ? <Pause size={14} /> : <Play size={14} />}
                    </button>
                    <button onClick={() => toast.info("Opening editor...")} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors" style={{ color: "#64748B" }}><Edit2 size={14} /></button>
                    <button onClick={() => navigate(`/campaigns/${c.id}`)} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors" style={{ color: "#6366F1" }}><Eye size={14} /></button>
                    <button onClick={() => { setCList(prev => prev.filter(x => x.id !== c.id)); toast.error("Campaign deleted"); }} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors" style={{ color: "#EF4444" }}><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-xl overflow-hidden" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {["Campaign", "Status", "Leads", "Dialed", "Answered", "Hot", "Converted", "Agents", "Actions"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#475569", fontFamily: "'DM Sans', sans-serif" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cList.map((c) => (
                  <tr key={c.id} className="hover:bg-white/[0.02] transition-colors" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>{c.name}</p>
                      <p className="text-xs" style={{ color: "#64748B" }}>{c.goal}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${statusColor[c.status]}22`, color: statusColor[c.status] }}>{statusLabel[c.status]}</span>
                    </td>
                    <td className="px-4 py-3 text-sm" style={{ color: "#94A3B8" }}>{c.leadCount}</td>
                    <td className="px-4 py-3 text-sm" style={{ color: "#94A3B8" }}>{c.dialed}</td>
                    <td className="px-4 py-3 text-sm" style={{ color: "#10B981" }}>{c.answered}</td>
                    <td className="px-4 py-3 text-sm" style={{ color: "#F59E0B" }}>{c.hot}</td>
                    <td className="px-4 py-3 text-sm" style={{ color: "#6366F1" }}>{c.converted}</td>
                    <td className="px-4 py-3">
                      <div className="flex -space-x-1">
                        {c.agents.slice(0, 3).map((a, i) => (
                          <div key={i} className="w-6 h-6 rounded-full flex items-center justify-center text-white border" style={{ background: ["#6366F1", "#10B981"][i % 2], borderColor: "#1E293B", fontSize: 9, fontFamily: "'Sora', sans-serif" }}>
                            {a.split(" ").map(w => w[0]).join("")}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => toggleStatus(c.id)} className="p-1.5 rounded" style={{ color: c.status === "active" ? "#F59E0B" : "#10B981" }}>
                          {c.status === "active" ? <Pause size={13} /> : <Play size={13} />}
                        </button>
                        <button onClick={() => navigate(`/campaigns/${c.id}`)} className="p-1.5 rounded" style={{ color: "#6366F1" }}><Eye size={13} /></button>
                        <button onClick={() => toast.error("Deleted")} className="p-1.5 rounded" style={{ color: "#EF4444" }}><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showCreate && <CreateCampaignModal onClose={() => setShowCreate(false)} onCreate={(campaign) => setCList((prev) => [campaign, ...prev])} />}
    </div>
  );
}
