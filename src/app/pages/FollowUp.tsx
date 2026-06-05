import { useState } from "react";
import { Plus, Phone, MessageSquare, Calendar, X, GripVertical, Trash2 } from "lucide-react";
import { leads, formatBudget, statusColors } from "../data/mockData";
import { toast } from "sonner";

const hotLeads = leads.filter(l => l.status === "hot");
const warmLeads = leads.filter(l => l.status === "warm");
const coldLeads = leads.filter(l => l.status === "cold");

const tasks = [
  { id: 1, lead: "Arjun Sharma", type: "Call", campaign: "Mumbai Premium", priority: "High", status: "Pending", due: "Today, 10:00 AM" },
  { id: 2, lead: "Kavya Rao", type: "WhatsApp", campaign: "Bengaluru Tech", priority: "High", status: "Pending", due: "Today, 11:30 AM" },
  { id: 3, lead: "Priti Agarwal", type: "Call", campaign: "Pune Growth", priority: "Medium", status: "Pending", due: "Today, 2:00 PM" },
  { id: 4, lead: "Rohit Joshi", type: "Email", campaign: "Mumbai Premium", priority: "High", status: "Done", due: "Yesterday, 3:00 PM" },
  { id: 5, lead: "Sunita Reddy", type: "SMS", campaign: "Bengaluru Sellers", priority: "Low", status: "Snoozed", due: "May 3, 10:00 AM" },
  { id: 6, lead: "Amit Kulkarni", type: "Call", campaign: "Pune Growth", priority: "Medium", status: "Pending", due: "Today, 4:00 PM" },
];

const sequenceSteps = [
  { type: "Call", delay: "Immediately", template: "Hi [lead_name], following up on your property inquiry..." },
  { type: "WhatsApp", delay: "1 day", template: "Hey [lead_name]! Sending over the property brochures as promised 🏡" },
  { type: "Call", delay: "3 days", template: "Hi [lead_name], checking if you had a chance to review the brochures..." },
  { type: "Email", delay: "7 days", template: "Dear [lead_name], we've just listed new properties matching your criteria..." },
  { type: "Wait", delay: "14 days", template: "" },
  { type: "Call", delay: "Re-engagement", template: "Hi [lead_name], it's been a while. We have some exciting new options..." },
];

function LeadCard({ lead, column }: { lead: typeof leads[0]; column: string }) {
  return (
    <div className="p-3.5 rounded-xl mb-2.5 transition-all" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: "#6366F1", fontFamily: "'Sora', sans-serif", fontSize: 10 }}>
          {lead.firstName[0]}{lead.lastName[0]}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate" style={{ fontFamily: "'DM Sans', sans-serif" }}>{lead.firstName} {lead.lastName}</p>
          <p className="text-xs" style={{ color: "#64748B" }}>{lead.phone}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-2.5">
        <span className="text-xs" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif" }}>Last: {lead.lastCalled}</span>
        <span className="text-xs ml-auto" style={{ color: "#94A3B8" }}>{formatBudget(lead.budget.min)}–{formatBudget(lead.budget.max)}</span>
      </div>
      <div className="flex gap-1.5 flex-wrap">
        <button onClick={() => toast.success(`Calling ${lead.firstName}...`)} className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition-colors" style={{ background: "rgba(16,185,129,0.1)", color: "#10B981", fontFamily: "'DM Sans', sans-serif" }}>
          <Phone size={10} /> Call
        </button>
        <button onClick={() => toast.success("Opening SMS...")} className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg" style={{ background: "rgba(99,102,241,0.1)", color: "#6366F1" }}>
          <MessageSquare size={10} /> SMS
        </button>
        <button onClick={() => toast.success("Scheduling...")} className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg" style={{ background: "rgba(245,158,11,0.1)", color: "#F59E0B" }}>
          <Calendar size={10} /> Schedule
        </button>
        <button onClick={() => toast.info("Suppressed")} className="text-xs px-2 py-1 rounded-lg" style={{ background: "rgba(100,116,139,0.1)", color: "#64748B" }}>
          Suppress
        </button>
      </div>
    </div>
  );
}

export default function FollowUp() {
  const [activeTaskFilter, setActiveTaskFilter] = useState("today");
  const [showSequenceModal, setShowSequenceModal] = useState(false);
  const [steps, setSteps] = useState(sequenceSteps);
  const [activeTab, setActiveTab] = useState("segmentation");
  const [templateChannel, setTemplateChannel] = useState("WhatsApp");
  const [templateMsg, setTemplateMsg] = useState("Hi [lead_name], this is [agent_name] from CallAIhm Realty. I have some exciting properties matching your requirement for [property]. Would love to connect!");

  const charCount = templateMsg.length;

  const filteredTasks = tasks.filter(t => {
    if (activeTaskFilter === "today") return t.due.startsWith("Today") && t.status === "Pending";
    if (activeTaskFilter === "overdue") return t.status === "Pending";
    if (activeTaskFilter === "done") return t.status === "Done";
    return true;
  });

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-white" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 24 }}>Follow-up</h1>
        <button onClick={() => toast.success("Opening task creation...")} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white" style={{ background: "#10B981", fontFamily: "'DM Sans', sans-serif" }}>
          <Plus size={14} /> Create Task
        </button>
      </div>

      {/* Tab navigation */}
      <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: "rgba(255,255,255,0.04)" }}>
        {[
          { id: "segmentation", label: "Lead Segments" },
          { id: "tasks", label: "Tasks" },
          { id: "sequences", label: "Sequences" },
          { id: "templates", label: "Templates" },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="px-4 py-2 rounded-lg text-sm transition-all" style={{ background: activeTab === tab.id ? "#1E293B" : "transparent", color: activeTab === tab.id ? "#E2E8F0" : "#64748B", fontFamily: "'DM Sans', sans-serif" }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Lead Segmentation */}
      {activeTab === "segmentation" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "🔥 Hot", leads: hotLeads, color: "#10B981", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.2)" },
            { title: "🌡️ Warm", leads: warmLeads, color: "#F59E0B", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)" },
            { title: "❄️ Cold", leads: coldLeads, color: "#6366F1", bg: "rgba(99,102,241,0.08)", border: "rgba(99,102,241,0.2)" },
          ].map((col) => (
            <div key={col.title}>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold" style={{ fontFamily: "'Sora', sans-serif", fontSize: 16, color: col.color }}>{col.title}</h2>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: col.bg, color: col.color, border: `1px solid ${col.border}` }}>{col.leads.length}</span>
              </div>
              <div>
                {col.leads.map(lead => <LeadCard key={lead.id} lead={lead} column={col.title} />)}
                {col.leads.length === 0 && (
                  <div className="text-center py-8 rounded-xl" style={{ border: "1px dashed rgba(255,255,255,0.1)" }}>
                    <p className="text-sm" style={{ color: "#475569" }}>No leads in this segment</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tasks */}
      {activeTab === "tasks" && (
        <div>
          <div className="flex gap-2 mb-4 flex-wrap">
            {[
              { id: "today", label: "Due Today" },
              { id: "overdue", label: "Overdue" },
              { id: "all", label: "All Tasks" },
              { id: "done", label: "Completed" },
            ].map(f => (
              <button key={f.id} onClick={() => setActiveTaskFilter(f.id)} className="px-3 py-1.5 rounded-lg text-xs transition-colors" style={{ background: activeTaskFilter === f.id ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.04)", color: activeTaskFilter === f.id ? "#10B981" : "#64748B", border: activeTaskFilter === f.id ? "1px solid rgba(16,185,129,0.3)" : "1px solid rgba(255,255,255,0.06)", fontFamily: "'DM Sans', sans-serif" }}>
                {f.label}
              </button>
            ))}
          </div>
          <div className="rounded-xl overflow-hidden" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {["Due", "Lead", "Type", "Campaign", "Priority", "Status", "Actions"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#475569", fontFamily: "'DM Sans', sans-serif" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map(task => (
                  <tr key={task.id} className="hover:bg-white/[0.02] transition-colors" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <td className="px-4 py-3 text-xs" style={{ color: task.due.startsWith("Today") ? "#10B981" : "#94A3B8", fontFamily: "'DM Sans', sans-serif" }}>{task.due}</td>
                    <td className="px-4 py-3 text-sm font-medium text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>{task.lead}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(99,102,241,0.1)", color: "#6366F1" }}>{task.type}</span>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: "#64748B" }}>{task.campaign}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs" style={{ color: task.priority === "High" ? "#EF4444" : task.priority === "Medium" ? "#F59E0B" : "#64748B" }}>{task.priority}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: task.status === "Done" ? "rgba(16,185,129,0.1)" : task.status === "Snoozed" ? "rgba(245,158,11,0.1)" : "rgba(100,116,139,0.1)", color: task.status === "Done" ? "#10B981" : task.status === "Snoozed" ? "#F59E0B" : "#94A3B8" }}>{task.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button onClick={() => toast.success("Task completed!")} className="text-xs px-2 py-1 rounded" style={{ background: "rgba(16,185,129,0.1)", color: "#10B981" }}>✓</button>
                        <button onClick={() => toast.info("Snoozed for 1 hour")} className="text-xs px-2 py-1 rounded" style={{ background: "rgba(245,158,11,0.1)", color: "#F59E0B" }}>⏰</button>
                        <button onClick={() => toast.info("Reassigned")} className="text-xs px-2 py-1 rounded" style={{ background: "rgba(255,255,255,0.06)", color: "#64748B" }}>↗</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Nurture Sequences */}
      {activeTab === "sequences" && (
        <div className="max-w-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold" style={{ fontFamily: "'Sora', sans-serif", fontSize: 16 }}>Hot Lead Nurture Sequence</h2>
            <button onClick={() => setShowSequenceModal(true)} className="text-xs px-3 py-1.5 rounded-lg" style={{ background: "rgba(16,185,129,0.1)", color: "#10B981" }}>+ New Sequence</button>
          </div>
          <div className="space-y-3">
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: step.type === "Call" ? "#10B981" : step.type === "WhatsApp" ? "#22C55E" : step.type === "Email" ? "#6366F1" : step.type === "SMS" ? "#F59E0B" : "#64748B", fontFamily: "'Sora', sans-serif" }}>
                    {step.type === "Call" ? "📞" : step.type === "WhatsApp" ? "💬" : step.type === "Email" ? "📧" : step.type === "SMS" ? "📱" : "⏳"}
                  </div>
                  {i < steps.length - 1 && <div className="w-px h-6 mt-1" style={{ background: "rgba(255,255,255,0.1)" }} />}
                </div>
                <div className="flex-1 p-3 rounded-xl mb-2" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>{step.type}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs" style={{ color: "#64748B" }}>{step.delay}</span>
                      <button onClick={() => setSteps(s => s.filter((_, j) => j !== i))} style={{ color: "#EF4444" }}><Trash2 size={12} /></button>
                    </div>
                  </div>
                  {step.template && <p className="text-xs" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif" }}>{step.template}</p>}
                </div>
              </div>
            ))}
            <button onClick={() => setSteps(s => [...s, { type: "Call", delay: "Custom", template: "New follow-up message..." }])} className="w-full py-2.5 rounded-xl text-sm border-dashed transition-colors" style={{ border: "1px dashed rgba(255,255,255,0.15)", color: "#64748B", fontFamily: "'DM Sans', sans-serif" }}>
              + Add Step
            </button>
          </div>
          <button onClick={() => toast.success("Sequence saved!")} className="mt-4 px-5 py-2.5 rounded-lg text-sm text-white font-medium" style={{ background: "#10B981", fontFamily: "'DM Sans', sans-serif" }}>
            Save Sequence
          </button>
        </div>
      )}

      {/* SMS/WhatsApp Templates */}
      {activeTab === "templates" && (
        <div className="max-w-2xl space-y-5">
          <div className="rounded-xl p-5" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h2 className="text-white font-semibold mb-4" style={{ fontFamily: "'Sora', sans-serif", fontSize: 16 }}>Template Editor</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#94A3B8" }}>Template Name</label>
                <input defaultValue="Property Follow-up v1" className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }} />
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#94A3B8" }}>Channel</label>
                <div className="flex gap-2">
                  {["SMS", "WhatsApp"].map(ch => (
                    <button key={ch} onClick={() => setTemplateChannel(ch)} className="px-4 py-2 rounded-lg text-sm transition-colors" style={{ background: templateChannel === ch ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.06)", color: templateChannel === ch ? "#10B981" : "#64748B", border: templateChannel === ch ? "1px solid rgba(16,185,129,0.3)" : "1px solid rgba(255,255,255,0.08)", fontFamily: "'DM Sans', sans-serif" }}>
                      {ch}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm" style={{ color: "#94A3B8" }}>Message Body</label>
                  <span className="text-xs" style={{ color: charCount > 140 ? "#EF4444" : "#64748B" }}>{charCount}{templateChannel === "SMS" ? "/160" : ""} chars</span>
                </div>
                <textarea value={templateMsg} onChange={(e) => setTemplateMsg(e.target.value)} rows={4} className="w-full px-3 py-2.5 rounded-lg text-sm outline-none resize-none" style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${charCount > 140 ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.1)"}`, color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }} />
                <div className="flex gap-2 mt-2 flex-wrap">
                  {["[lead_name]", "[property]", "[agent_name]", "[location]", "[budget]"].map(v => (
                    <button key={v} onClick={() => setTemplateMsg(m => m + v)} className="text-xs px-2 py-1 rounded" style={{ background: "rgba(99,102,241,0.1)", color: "#6366F1", fontFamily: "'DM Sans', sans-serif" }}>{v}</button>
                  ))}
                </div>
                {templateChannel === "SMS" && charCount > 140 && (
                  <p className="text-xs mt-1" style={{ color: "#F59E0B" }}>⚠ Message exceeds 140 chars — may be split into 2 SMS</p>
                )}
              </div>
              <div className="flex gap-3">
                <button onClick={() => toast.success("Template saved!")} className="px-5 py-2 rounded-lg text-sm text-white" style={{ background: "#10B981", fontFamily: "'DM Sans', sans-serif" }}>Save Template</button>
                <button onClick={() => toast.info("Test message sent!")} className="px-5 py-2 rounded-lg text-sm" style={{ background: "rgba(255,255,255,0.06)", color: "#94A3B8", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'DM Sans', sans-serif" }}>Send Test</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
