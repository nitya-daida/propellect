import { useState } from "react";
import { Shield, Check, Upload, Download, AlertTriangle, Lock } from "lucide-react";
import { toast } from "sonner";

const auditLog = [
  { id: 1, time: "May 1, 2026 10:23 AM", user: "Rajesh Kapoor", action: "Updated campaign settings", ip: "103.21.45.67" },
  { id: 2, time: "May 1, 2026 9:45 AM", user: "Priya Mehta", action: "Exported lead CSV (234 records)", ip: "122.167.89.12" },
  { id: 3, time: "Apr 30, 2026 8:12 PM", user: "System", action: "DND check completed — 3 leads flagged", ip: "Internal" },
  { id: 4, time: "Apr 30, 2026 6:30 PM", user: "Rahul Iyer", action: "Logged in", ip: "49.207.123.45" },
  { id: 5, time: "Apr 30, 2026 5:15 PM", user: "Rajesh Kapoor", action: "Invited team member: kavita@callaihm.com", ip: "103.21.45.67" },
  { id: 6, time: "Apr 30, 2026 3:00 PM", user: "Anita Singh", action: "Deleted lead: Suresh Gupta (L008)", ip: "117.96.231.88" },
  { id: 7, time: "Apr 30, 2026 12:45 PM", user: "System", action: "Monthly backup completed successfully", ip: "Internal" },
];

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm" style={{ color: "#94A3B8", fontFamily: "'DM Sans', sans-serif" }}>{label}</span>
      <div
        className="w-10 h-5 rounded-full relative cursor-pointer transition-colors"
        style={{ background: checked ? "#10B981" : "rgba(255,255,255,0.1)" }}
        onClick={() => onChange(!checked)}
      >
        <div className="w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all" style={{ left: checked ? 22 : 2 }} />
      </div>
    </div>
  );
}

export default function Security() {
  const [dnd, setDnd] = useState(true);
  const [dpdp, setDpdp] = useState(true);
  const [gdpr, setGdpr] = useState(false);
  const [retention, setRetention] = useState("90");
  const [auditSearch, setAuditSearch] = useState("");

  const filteredLog = auditLog.filter(l =>
    `${l.user} ${l.action} ${l.ip}`.toLowerCase().includes(auditSearch.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-white" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 24 }}>Security & Compliance</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* TRAI/DND Compliance */}
        <div className="rounded-xl p-5" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-2 mb-4">
            <Shield size={18} style={{ color: "#10B981" }} />
            <h2 className="text-white font-semibold" style={{ fontFamily: "'Sora', sans-serif", fontSize: 16 }}>TRAI / DND Compliance</h2>
          </div>
          <div className="space-y-4">
            <Toggle checked={dnd} onChange={setDnd} label="Enable DND auto-check before each call" />
            <div className="p-3 rounded-lg" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)" }}>
              <p className="text-xs" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif" }}>Last DND check: <span style={{ color: "#10B981" }}>May 1, 2026 8:00 AM</span> · 3 leads flagged</p>
            </div>
            <div>
              <p className="text-sm mb-2" style={{ color: "#94A3B8" }}>Upload DND List (CSV)</p>
              <button onClick={() => toast.info("Opening file picker...")} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm" style={{ background: "rgba(255,255,255,0.06)", color: "#94A3B8", border: "1px dashed rgba(255,255,255,0.15)", fontFamily: "'DM Sans', sans-serif" }}>
                <Upload size={14} /> Upload DND CSV
              </button>
            </div>
          </div>
        </div>

        {/* Encryption Status */}
        <div className="rounded-xl p-5" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-2 mb-4">
            <Lock size={18} style={{ color: "#6366F1" }} />
            <h2 className="text-white font-semibold" style={{ fontFamily: "'Sora', sans-serif", fontSize: 16 }}>Encryption & Security</h2>
          </div>
          <div className="space-y-3">
            {[
              { label: "Data at Rest", status: "Encrypted (AES-256)", ok: true },
              { label: "Data in Transit", status: "TLS 1.3", ok: true },
              { label: "Call Recordings", status: "Encrypted (AES-256)", ok: true },
              { label: "Transcripts", status: "Encrypted (AES-256)", ok: true },
              { label: "API Communications", status: "HTTPS Only", ok: true },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between py-1.5">
                <span className="text-sm" style={{ color: "#94A3B8", fontFamily: "'DM Sans', sans-serif" }}>{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs" style={{ color: "#10B981" }}>{item.status}</span>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "rgba(16,185,129,0.2)" }}>
                    <Check size={11} style={{ color: "#10B981" }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Privacy */}
        <div className="rounded-xl p-5" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 className="text-white font-semibold mb-4" style={{ fontFamily: "'Sora', sans-serif", fontSize: 16 }}>Data Privacy</h2>
          <div className="space-y-4">
            <Toggle checked={dpdp} onChange={setDpdp} label="DPDP Act 2023 compliance mode" />
            <Toggle checked={gdpr} onChange={setGdpr} label="GDPR compliance mode" />
            <div className="pt-2 space-y-2">
              <button onClick={() => toast.success("Export request submitted. You'll receive an email within 24 hours.")} className="w-full py-2 rounded-lg text-sm" style={{ background: "rgba(99,102,241,0.1)", color: "#6366F1", border: "1px solid rgba(99,102,241,0.2)", fontFamily: "'DM Sans', sans-serif" }}>
                📦 Export All My Data
              </button>
              <button onClick={() => toast.error("⚠ Account deletion requires email confirmation. Check your inbox.")} className="w-full py-2 rounded-lg text-sm" style={{ background: "rgba(239,68,68,0.08)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.2)", fontFamily: "'DM Sans', sans-serif" }}>
                🗑 Request Account Deletion
              </button>
            </div>
          </div>
        </div>

        {/* Call Retention Policy */}
        <div className="rounded-xl p-5" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 className="text-white font-semibold mb-4" style={{ fontFamily: "'Sora', sans-serif", fontSize: 16 }}>Call Retention Policy</h2>
          <p className="text-sm mb-3" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif" }}>Set how long call recordings and transcripts are retained before automatic deletion.</p>
          <div className="mb-4">
            <label className="block text-sm mb-2" style={{ color: "#94A3B8" }}>Retention Period</label>
            <select value={retention} onChange={(e) => setRetention(e.target.value)} className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}>
              <option value="30">30 days</option>
              <option value="60">60 days</option>
              <option value="90">90 days</option>
              <option value="180">180 days</option>
              <option value="365">365 days (1 year)</option>
            </select>
          </div>
          <div className="p-3 rounded-lg flex items-start gap-2 mb-4" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}>
            <AlertTriangle size={14} style={{ color: "#F59E0B", flexShrink: 0, marginTop: 2 }} />
            <p className="text-xs" style={{ color: "#94A3B8", fontFamily: "'DM Sans', sans-serif" }}>Recordings and transcripts older than {retention} days will be permanently deleted. This cannot be undone.</p>
          </div>
          <button onClick={() => toast.success("Retention policy saved!")} className="px-5 py-2 rounded-lg text-sm text-white" style={{ background: "#10B981", fontFamily: "'DM Sans', sans-serif" }}>
            Save Policy
          </button>
        </div>
      </div>

      {/* Audit Log */}
      <div className="rounded-xl overflow-hidden" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <h2 className="text-white font-semibold" style={{ fontFamily: "'Sora', sans-serif", fontSize: 16 }}>Audit Log</h2>
          <div className="flex items-center gap-2">
            <input
              value={auditSearch}
              onChange={(e) => setAuditSearch(e.target.value)}
              placeholder="Search logs..."
              className="px-3 py-1.5 rounded-lg text-xs outline-none"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}
            />
            <button onClick={() => toast.success("Exporting audit log...")} className="p-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.06)", color: "#64748B" }}>
              <Download size={14} />
            </button>
          </div>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              {["Timestamp", "User", "Action", "IP Address"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#475569", fontFamily: "'DM Sans', sans-serif" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredLog.map((log) => (
              <tr key={log.id} className="hover:bg-white/[0.02] transition-colors" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <td className="px-4 py-3 text-xs" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>{log.time}</td>
                <td className="px-4 py-3 text-sm font-medium" style={{ color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}>{log.user}</td>
                <td className="px-4 py-3 text-sm" style={{ color: "#94A3B8", fontFamily: "'DM Sans', sans-serif" }}>{log.action}</td>
                <td className="px-4 py-3 text-xs font-mono" style={{ color: log.ip === "Internal" ? "#6366F1" : "#64748B" }}>{log.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
