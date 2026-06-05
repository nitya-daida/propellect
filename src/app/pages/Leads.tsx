import { useState, useEffect } from "react";
import {
  Search, Plus, Upload, Download, Phone, Edit2, Eye, Trash2,
  X
} from "lucide-react";
import { statusColors, formatBudget } from "../data/mockData";
import { fetchJson } from "../api";
import { toast } from "sonner";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "../components/ui/dialog";
 
type Lead = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  source: string;
  intent: string;
  budget: { min: number; max: number };
  location: string;
  status: string;
  score: number;
  lastCalled: string;
  assignedAgent: string;
  campaign: string;
  propertyType: string;
  bestTime: string;
  dnd: boolean;
  notes: string;
  createdAt?: string;
};

function normalizeLead(item: any): Lead {
  const rawName = item.name ?? `${item.firstName ?? ""} ${item.lastName ?? ""}`.trim();
  const [firstName = "", ...rest] = String(rawName).split(" ");
  const lastName = rest.join(" ");
  const contact = String(item.contact ?? item.phone ?? item.email ?? "");
  const email = contact.includes("@") ? contact : item.email ?? "";
  const phone = !contact.includes("@") ? contact : item.phone ?? "";
  const budgetValue = String(item.budget ?? "0");
  const numericBudget = Number(budgetValue.replace(/[^0-9.]/g, "")) || 0;
  return {
    id: String(item.id ?? item._id ?? ""),
    firstName: firstName || "Unknown",
    lastName: lastName || "",
    phone,
    email,
    source: item.source ?? "Website",
    intent: item.intent ?? "Buy",
    budget: { min: numericBudget, max: numericBudget },
    location: item.location ?? "Unknown",
    status: item.status ?? "warm",
    score: Number(item.score ?? 72),
    lastCalled: item.last_called ?? item.lastCalled ?? "N/A",
    assignedAgent: item.assignedAgent ?? item.assigned_agent ?? "Unassigned",
    campaign: item.campaign ?? item.campaign_name ?? "N/A",
    propertyType: item.property_type ?? item.propertyType ?? "Apartment",
    bestTime: item.best_time ?? item.bestTime ?? "Any",
    dnd: item.dnd ?? false,
    notes: item.notes ?? "",
    createdAt: item.created_at ?? item.createdAt,
  };
}
 
async function submitLeadToBackend(data: {
  name: string;
  budget: string;
  property_type: string;
  contact: string;
}) {
  return fetchJson<any>("/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
 
// ─── ADD LEAD FORM ────────────────────────────────────────────────────────────
function AddLeadModal({ open, onClose, onLeadAdded }: { open: boolean; onClose: () => void; onLeadAdded: (lead: Lead) => void }) {
  const [form, setForm] = useState({
    name: "",
    budget: "",
    property_type: "Apartment",
    contact: "",
  });
  const [loading, setLoading] = useState(false);
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };
 
  const handleSubmit = async () => {
    if (!form.name || !form.budget || !form.contact) {
      toast.error("Please fill all fields!");
      return;
    }
    setLoading(true);
    try {
      const result = await submitLeadToBackend(form);
      toast.success(`Lead saved! ID: ${result.id} ✅`);
      if (result) {
        onLeadAdded(normalizeLead(result));
      }
      setForm({ name: "", budget: "", property_type: "Apartment", contact: "" });
      onClose();
    } catch (err) {
      toast.error("Failed to save lead. Try again!");
    } finally {
      setLoading(false);
    }
  };
 
  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.05)",
    color: "#E2E8F0",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    outline: "none",
  };
 
  const labelStyle = {
    fontSize: 12,
    color: "#64748B",
    fontFamily: "'DM Sans', sans-serif",
    marginBottom: 6,
    display: "block",
  };
 
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        style={{
          background: "#1E293B",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "#E2E8F0",
          maxWidth: 480,
        }}
      >
        <DialogHeader>
          <DialogTitle style={{ fontFamily: "'Sora', sans-serif", color: "#fff", fontSize: 18 }}>
            Add New Lead
          </DialogTitle>
        </DialogHeader>
 
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 8 }}>
          {/* Name */}
          <div>
            <label style={labelStyle}>Full Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Arjun Sharma"
              style={inputStyle}
            />
          </div>
 
          {/* Contact */}
          <div>
            <label style={labelStyle}>Phone / Email *</label>
            <input
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="e.g. +91 98201 34567"
              style={inputStyle}
            />
          </div>
 
          {/* Budget */}
          <div>
            <label style={labelStyle}>Budget *</label>
            <input
              name="budget"
              value={form.budget}
              onChange={handleChange}
              placeholder="e.g. 50 lakhs or 1 crore"
              style={inputStyle}
            />
          </div>
 
          {/* Property Type */}
          <div>
            <label style={labelStyle}>Property Type *</label>
            <select
              name="property_type"
              value={form.property_type}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Plot">Plot</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>
        </div>
 
        <DialogFooter style={{ marginTop: 8, gap: 8 }}>
          <button
            onClick={onClose}
            style={{
              padding: "10px 20px",
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.05)",
              color: "#94A3B8",
              fontFamily: "'DM Sans', sans-serif",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              padding: "10px 24px",
              borderRadius: 8,
              background: loading ? "#064E3B" : "#10B981",
              color: "#fff",
              fontFamily: "'DM Sans', sans-serif",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: 14,
              fontWeight: 500,
              border: "none",
            }}
          >
            {loading ? "Saving..." : "Save Lead ✅"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
 
// ─── STATUS LABELS ────────────────────────────────────────────────────────────
const statusLabels: Record<string, string> = {
  hot: "🔥 Hot", warm: "🌡️ Warm", cold: "❄️ Cold", not_interested: "✗ Not Interested"
};
 
// ─── LEAD DRAWER ──────────────────────────────────────────────────────────────
function LeadDrawer({ lead, onClose }: { lead: Lead; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState("overview");
  const tabs = ["Overview", "Call History", "Transcripts", "Properties", "Notes", "Activity"];
  return (
    <div className="fixed inset-0 z-40 flex">
      <div className="flex-1 bg-black/50" onClick={onClose} />
      <div
        className="w-full max-w-[480px] h-full flex flex-col overflow-hidden animate-in slide-in-from-right duration-300"
        style={{ background: "#1E293B", borderLeft: "1px solid rgba(255,255,255,0.08)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ background: "#6366F1", fontFamily: "'Sora', sans-serif" }}>
              {(lead.firstName?.[0] ?? lead.firstName?.charAt(0) ?? "?")}{(lead.lastName?.[0] ?? lead.lastName?.charAt(0) ?? "")}
            </div>
            <div>
              <h3 className="text-white font-semibold" style={{ fontFamily: "'Sora', sans-serif" }}>{lead.firstName} {lead.lastName}</h3>
              <span className="text-xs px-2 py-0.5 rounded-full capitalize" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <span className={statusColors[lead.status]}>{statusLabels[lead.status]}</span>
              </span>
            </div>
          </div>
          <button onClick={onClose} className="hover:bg-white/5 w-8 h-8 flex items-center justify-center rounded-lg" style={{ color: "#64748B" }}><X size={16} /></button>
        </div>
        {/* Tabs */}
        <div className="flex overflow-x-auto border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t.toLowerCase().replace(" ", "_"))}
              className="px-4 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-colors"
              style={{
                borderColor: activeTab === t.toLowerCase().replace(" ", "_") ? "#10B981" : "transparent",
                color: activeTab === t.toLowerCase().replace(" ", "_") ? "#10B981" : "#64748B",
                fontFamily: "'DM Sans', sans-serif"
              }}
            >
              {t}
            </button>
          ))}
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {activeTab === "overview" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold" style={{ color: "#10B981", fontFamily: "'DM Sans', sans-serif" }}>AI Lead Score</span>
                  <span className="text-2xl font-bold" style={{ color: "#10B981", fontFamily: "'Sora', sans-serif" }}>{lead.score}/100</span>
                </div>
                <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
                  <div className="h-2 rounded-full" style={{ width: `${lead.score}%`, background: "#10B981" }} />
                </div>
                <p className="text-xs mt-2" style={{ color: "#64748B" }}>Recommended: Schedule site visit this week</p>
              </div>
              {[
                { label: "Phone", value: lead.phone },
                { label: "Email", value: lead.email },
                { label: "Source", value: lead.source },
                { label: "Intent", value: lead.intent },
                { label: "Budget", value: `${formatBudget(lead.budget.min)} – ${formatBudget(lead.budget.max)}` },
                { label: "Location", value: lead.location },
                { label: "Property Type", value: lead.propertyType },
                { label: "Best Time to Call", value: lead.bestTime },
                { label: "Last Called", value: lead.lastCalled },
                { label: "Assigned Agent", value: lead.assignedAgent },
                { label: "Campaign", value: lead.campaign },
              ].map((field) => (
                <div key={field.label} className="flex justify-between items-center py-2 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                  <span className="text-xs" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif" }}>{field.label}</span>
                  <span className="text-sm" style={{ color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}>{field.value}</span>
                </div>
              ))}
              {lead.dnd && (
                <div className="text-xs px-3 py-1.5 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444" }}>
                  ⚠️ DND Enabled — Do not call
                </div>
              )}
              <div>
                <p className="text-xs font-semibold mb-1" style={{ color: "#64748B" }}>Notes</p>
                <p className="text-sm" style={{ color: "#94A3B8", fontFamily: "'DM Sans', sans-serif" }}>{lead.notes}</p>
              </div>
            </div>
          )}
          {activeTab === "call_history" && (
            <div className="space-y-3">
              {[
                { date: "Apr 30, 2026 10:23 AM", duration: "4m 32s", outcome: "answered", agent: lead.assignedAgent },
                { date: "Apr 27, 2026 3:15 PM", duration: "2m 10s", outcome: "voicemail", agent: lead.assignedAgent },
                { date: "Apr 24, 2026 11:00 AM", duration: "0m 0s", outcome: "no_answer", agent: lead.assignedAgent },
              ].map((call, i) => (
                <div key={i} className="p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>{call.date}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full capitalize" style={{ color: call.outcome === "answered" ? "#10B981" : call.outcome === "voicemail" ? "#F59E0B" : "#EF4444", fontFamily: "'DM Sans', sans-serif" }}>
                      {call.outcome.replace("_", " ")}
                    </span>
                  </div>
                  <div className="flex gap-4 text-xs" style={{ color: "#64748B" }}>
                    <span>⏱ {call.duration}</span><span>👤 {call.agent}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {(activeTab === "transcripts" || activeTab === "properties" || activeTab === "notes" || activeTab === "activity") && (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">📋</div>
              <p className="text-sm" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif" }}>No data available</p>
            </div>
          )}
        </div>
        {/* Footer */}
        <div className="p-4 border-t flex gap-2" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <button
            onClick={() => toast.success(`Calling ${lead.firstName} ${lead.lastName}...`)}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium text-white"
            style={{ background: "#10B981", fontFamily: "'DM Sans', sans-serif" }}
          >
            <Phone size={14} /> Call Now
          </button>
          <button className="px-4 py-2 rounded-lg text-sm font-medium" style={{ background: "rgba(255,255,255,0.06)", color: "#94A3B8", fontFamily: "'DM Sans', sans-serif", border: "1px solid rgba(255,255,255,0.08)" }}>
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
}
 
// ─── MAIN LEADS PAGE ──────────────────────────────────────────────────────────
export default function Leads() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [leadList, setLeadList] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const perPage = 10;
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    const loadLeads = async () => {
      setLoading(true);
      try {
        const data = await fetchJson<any>("/leads");
        const rawLeads = data?.leads ?? data ?? [];
        setLeadList(Array.isArray(rawLeads) ? rawLeads.map(normalizeLead) : []);
      } catch (error) {
        console.error("Failed to load leads", error);
        toast.error("Unable to load leads from backend.");
      } finally {
        setLoading(false);
      }
    };

    loadLeads();
  }, []);

  const filtered = leadList.filter((l) => {
    const matchSearch = `${l.firstName} ${l.lastName} ${l.phone} ${l.email}`.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || l.status === statusFilter;
    return matchSearch && matchStatus;
  });
 
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);
 
  const toggleSelect = (id: string) => setSelected((s) => s.includes(id) ? s.filter(i => i !== id) : [...s, id]);
  const toggleAll = () => setSelected(selected.length === paginated.length ? [] : paginated.map(l => l.id));
 
  return (
    <div className="p-4 md:p-6">
      {/* Add Lead Modal */}
      <AddLeadModal open={showAddForm} onClose={() => setShowAddForm(false)} onLeadAdded={(lead) => setLeadList((prev) => [lead, ...prev])} />
 
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-white" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 24 }}>Leads</h1>
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={() => toast.success("Importing leads...")} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm" style={{ background: "rgba(255,255,255,0.06)", color: "#94A3B8", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'DM Sans', sans-serif" }}>
            <Download size={14} /> Import
          </button>
          <button onClick={() => toast.success("Exporting CSV...")} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm" style={{ background: "rgba(255,255,255,0.06)", color: "#94A3B8", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'DM Sans', sans-serif" }}>
            <Upload size={14} /> Export
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white"
            style={{ background: "#10B981", fontFamily: "'DM Sans', sans-serif" }}
          >
            <Plus size={14} /> Add Lead
          </button>
        </div>
      </div>
 
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#64748B" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, phone, email..."
            className="w-full pl-9 pr-4 py-2 rounded-lg text-sm outline-none"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-lg text-sm outline-none"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "#94A3B8", fontFamily: "'DM Sans', sans-serif" }}
        >
          <option value="all">All Status</option>
          <option value="hot">🔥 Hot</option>
          <option value="warm">🌡️ Warm</option>
          <option value="cold">❄️ Cold</option>
          <option value="not_interested">✗ Not Interested</option>
        </select>
        {(search || statusFilter !== "all") && (
          <button onClick={() => { setSearch(""); setStatusFilter("all"); }} className="text-xs px-3 py-2 rounded-lg" style={{ color: "#64748B", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", fontFamily: "'DM Sans', sans-serif" }}>
            Clear Filters
          </button>
        )}
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs" style={{ color: "#64748B" }}>{filtered.length} leads</span>
        </div>
      </div>
 
      {/* Bulk action bar */}
      {selected.length > 0 && (
        <div className="mb-4 flex items-center gap-3 px-4 py-2.5 rounded-xl" style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)" }}>
          <span className="text-sm font-medium" style={{ color: "#6366F1", fontFamily: "'DM Sans', sans-serif" }}>{selected.length} selected</span>
          <button onClick={() => toast.success("Assigning to campaign...")} className="text-xs px-3 py-1 rounded-lg" style={{ background: "rgba(16,185,129,0.15)", color: "#10B981" }}>Assign to Campaign</button>
          <button onClick={() => toast.success("Status changed")} className="text-xs px-3 py-1 rounded-lg" style={{ background: "rgba(245,158,11,0.15)", color: "#F59E0B" }}>Change Status</button>
          <button onClick={() => { toast.error("Leads deleted"); setSelected([]); }} className="text-xs px-3 py-1 rounded-lg" style={{ background: "rgba(239,68,68,0.15)", color: "#EF4444" }}>Delete Selected</button>
          <button onClick={() => setSelected([])} className="ml-auto" style={{ color: "#64748B" }}><X size={14} /></button>
        </div>
      )}
 
      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <th className="px-4 py-3">
                  <input type="checkbox" checked={selected.length === paginated.length && paginated.length > 0} onChange={toggleAll} className="accent-emerald-500" />
                </th>
                {["Name", "Phone", "Intent", "Budget", "Status", "Score", "Last Called", "Agent", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#475569", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((lead) => (
                <tr
                  key={lead.id}
                  className="transition-colors hover:bg-white/[0.02] cursor-pointer group"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                  onClick={() => setSelectedLead(lead)}
                >
                  <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" checked={selected.includes(lead.id)} onChange={() => toggleSelect(lead.id)} className="accent-emerald-500" />
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: "#6366F1", fontFamily: "'Sora', sans-serif" }}>
                        {(lead.firstName?.[0] ?? lead.firstName?.charAt(0) ?? "?")}{(lead.lastName?.[0] ?? lead.lastName?.charAt(0) ?? "")}
                      </div>
                      <span className="text-sm font-medium text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>{lead.firstName} {lead.lastName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-sm" style={{ color: "#94A3B8", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>{lead.phone}</td>
                  <td className="px-4 py-3.5 text-sm" style={{ color: "#94A3B8", fontFamily: "'DM Sans', sans-serif" }}>{lead.intent}</td>
                  <td className="px-4 py-3.5 text-sm" style={{ color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>{formatBudget(lead.budget.min)} – {formatBudget(lead.budget.max)}</td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${statusColors[lead.status]}`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {statusLabels[lead.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
                        <div className="h-1.5 rounded-full" style={{ width: `${lead.score}%`, background: lead.score >= 75 ? "#10B981" : lead.score >= 50 ? "#F59E0B" : "#EF4444" }} />
                      </div>
                      <span className="text-xs" style={{ color: "#94A3B8" }}>{lead.score}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-sm" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif" }}>{lead.lastCalled}</td>
                  <td className="px-4 py-3.5 text-sm" style={{ color: "#94A3B8", fontFamily: "'DM Sans', sans-serif" }}>{lead.assignedAgent}</td>
                  <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => toast.success(`Calling ${lead.firstName}...`)} className="p-1.5 rounded-lg hover:bg-emerald-500/10 transition-colors" style={{ color: "#10B981" }}><Phone size={13} /></button>
                      <button onClick={() => setSelectedLead(lead)} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors" style={{ color: "#64748B" }}><Eye size={13} /></button>
                      <button onClick={() => toast.success("Opening edit form...")} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors" style={{ color: "#64748B" }}><Edit2 size={13} /></button>
                      <button onClick={() => toast.error("Lead deleted")} className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors" style={{ color: "#EF4444" }}><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <span className="text-xs" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif" }}>
            Showing {((page - 1) * perPage) + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length} leads
          </span>
          <div className="flex items-center gap-1">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1.5 rounded-lg text-xs disabled:opacity-40 transition-colors hover:bg-white/5" style={{ color: "#94A3B8", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'DM Sans', sans-serif" }}>Prev</button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => setPage(i + 1)} className="w-8 h-8 rounded-lg text-xs transition-colors" style={{ background: page === i + 1 ? "#10B981" : "transparent", color: page === i + 1 ? "#fff" : "#64748B", fontFamily: "'DM Sans', sans-serif" }}>
                {i + 1}
              </button>
            ))}
            <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="px-3 py-1.5 rounded-lg text-xs disabled:opacity-40 transition-colors hover:bg-white/5" style={{ color: "#94A3B8", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'DM Sans', sans-serif" }}>Next</button>
          </div>
        </div>
      </div>
 
      {/* Lead Drawer */}
      {selectedLead && <LeadDrawer lead={selectedLead} onClose={() => setSelectedLead(null)} />}
    </div>
  );
}