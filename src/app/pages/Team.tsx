import { useState } from "react";
import { Plus, Edit2, MailIcon, Trash2, X, Check } from "lucide-react";
import { teamMembers } from "../data/mockData";
import { toast } from "sonner";

const roles = ["Admin", "Manager", "Agent", "Viewer"];
const permissions: Record<string, Record<string, boolean>> = {
  "Admin": { "View Leads": true, "Edit Leads": true, "Delete Leads": true, "Manage Campaigns": true, "View Reports": true, "Manage Team": true, "Billing": true, "API Keys": true },
  "Manager": { "View Leads": true, "Edit Leads": true, "Delete Leads": true, "Manage Campaigns": true, "View Reports": true, "Manage Team": false, "Billing": false, "API Keys": false },
  "Agent": { "View Leads": true, "Edit Leads": true, "Delete Leads": false, "Manage Campaigns": false, "View Reports": false, "Manage Team": false, "Billing": false, "API Keys": false },
  "Viewer": { "View Leads": true, "Edit Leads": false, "Delete Leads": false, "Manage Campaigns": false, "View Reports": true, "Manage Team": false, "Billing": false, "API Keys": false },
};

const statusColors: Record<string, string> = {
  active: "bg-[#10B981]/20 text-[#10B981]",
  invited: "bg-[#F59E0B]/20 text-[#F59E0B]",
  suspended: "bg-[#EF4444]/20 text-[#EF4444]",
};

function InviteModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Agent");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(15,23,42,0.85)", backdropFilter: "blur(4px)" }}>
      <div className="w-full max-w-md rounded-2xl shadow-2xl" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <h2 className="text-white font-semibold" style={{ fontFamily: "'Sora', sans-serif" }}>Invite Team Member</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5" style={{ color: "#64748B" }}><X size={16} /></button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-sm mb-1.5" style={{ color: "#94A3B8" }}>Email Address</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="colleague@company.com" className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }} />
          </div>
          <div>
            <label className="block text-sm mb-1.5" style={{ color: "#94A3B8" }}>Role</label>
            <div className="grid grid-cols-2 gap-2">
              {roles.map(r => (
                <button key={r} onClick={() => setRole(r)} className="py-2 rounded-lg text-sm transition-all" style={{ background: role === r ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.06)", color: role === r ? "#10B981" : "#64748B", border: role === r ? "1px solid rgba(16,185,129,0.3)" : "1px solid rgba(255,255,255,0.08)", fontFamily: "'DM Sans', sans-serif" }}>
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div className="p-3 rounded-lg text-xs" style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.15)", color: "#94A3B8", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>
            An invitation email will be sent to this address with a link to join CallAIhm as a <strong style={{ color: "#6366F1" }}>{role}</strong>.
          </div>
        </div>
        <div className="px-5 py-4 border-t flex justify-end gap-3" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm" style={{ background: "rgba(255,255,255,0.06)", color: "#94A3B8", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'DM Sans', sans-serif" }}>Cancel</button>
          <button onClick={() => { if (!email) { toast.error("Please enter an email"); return; } toast.success(`Invite sent to ${email}! ✉️`); onClose(); }} className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm text-white" style={{ background: "#10B981", fontFamily: "'DM Sans', sans-serif" }}>
            <MailIcon size={14} /> Send Invite
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Team() {
  const [members, setMembers] = useState(teamMembers);
  const [showInvite, setShowInvite] = useState(false);
  const [activeTab, setActiveTab] = useState("members");

  const bgColors = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#3B82F6", "#8B5CF6", "#EC4899", "#14B8A6"];

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-white" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 24 }}>Team</h1>
        <button onClick={() => setShowInvite(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white" style={{ background: "#10B981", fontFamily: "'DM Sans', sans-serif" }}>
          <Plus size={14} /> Invite Member
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Members", value: members.length, color: "#6366F1" },
          { label: "Active", value: members.filter(m => m.status === "active").length, color: "#10B981" },
          { label: "Invited", value: members.filter(m => m.status === "invited").length, color: "#F59E0B" },
          { label: "Suspended", value: members.filter(m => m.status === "suspended").length, color: "#EF4444" },
        ].map(s => (
          <div key={s.label} className="rounded-xl p-4" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-2xl font-bold" style={{ color: s.color, fontFamily: "'Sora', sans-serif" }}>{s.value}</p>
            <p className="text-xs mt-0.5" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tab nav */}
      <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: "rgba(255,255,255,0.04)" }}>
        {["members", "permissions"].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className="px-4 py-2 rounded-lg text-sm capitalize transition-all" style={{ background: activeTab === tab ? "#1E293B" : "transparent", color: activeTab === tab ? "#E2E8F0" : "#64748B", fontFamily: "'DM Sans', sans-serif" }}>
            {tab === "members" ? "Team Members" : "Roles & Permissions"}
          </button>
        ))}
      </div>

      {activeTab === "members" && (
        <div className="rounded-xl overflow-hidden" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {["Member", "Role", "Status", "Last Active", "Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#475569", fontFamily: "'DM Sans', sans-serif" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {members.map((member, i) => (
                <tr key={member.id} className="hover:bg-white/[0.02] transition-colors" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: bgColors[i % bgColors.length], fontFamily: "'Sora', sans-serif" }}>
                        {member.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>{member.name}</p>
                        <p className="text-xs" style={{ color: "#64748B" }}>{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      defaultValue={member.role}
                      onChange={(e) => { setMembers(prev => prev.map(m => m.id === member.id ? { ...m, role: e.target.value } : m)); toast.success("Role updated"); }}
                      className="text-xs px-2 py-1 rounded-lg outline-none"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {roles.map(r => <option key={r}>{r}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${statusColors[member.status]}`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif" }}>{member.lastActive}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {member.status === "invited" && (
                        <button onClick={() => toast.success(`Invite resent to ${member.email}`)} className="text-xs px-2 py-1 rounded" style={{ background: "rgba(245,158,11,0.1)", color: "#F59E0B" }}>Resend</button>
                      )}
                      {member.role !== "Admin" && (
                        <button
                          onClick={() => { setMembers(prev => prev.filter(m => m.id !== member.id)); toast.error(`${member.name} removed`); }}
                          className="p-1.5 rounded" style={{ color: "#EF4444" }}
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "permissions" && (
        <div className="rounded-xl overflow-hidden" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#475569", fontFamily: "'DM Sans', sans-serif" }}>Permission</th>
                  {roles.map(r => (
                    <th key={r} className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider" style={{ color: "#475569", fontFamily: "'DM Sans', sans-serif" }}>{r}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(permissions.Admin).map(perm => (
                  <tr key={perm} className="hover:bg-white/[0.02] transition-colors" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <td className="px-4 py-3 text-sm" style={{ color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}>{perm}</td>
                    {roles.map(role => (
                      <td key={role} className="px-4 py-3 text-center">
                        <div className="flex justify-center">
                          {permissions[role][perm] ? (
                            <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: "rgba(16,185,129,0.2)" }}>
                              <Check size={12} style={{ color: "#10B981" }} />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)" }}>
                              <X size={12} style={{ color: "#EF4444" }} />
                            </div>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <button onClick={() => toast.success("Permissions saved!")} className="px-5 py-2 rounded-lg text-sm text-white" style={{ background: "#10B981", fontFamily: "'DM Sans', sans-serif" }}>
              Save Permissions
            </button>
          </div>
        </div>
      )}

      {showInvite && <InviteModal onClose={() => setShowInvite(false)} />}
    </div>
  );
}
