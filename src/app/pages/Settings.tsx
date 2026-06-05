import { useState } from "react";
import { Plus, Copy, Eye, EyeOff, Trash2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const tabs = ["General", "Notifications", "Call Settings", "AI Preferences", "API Keys", "Danger Zone"];

function Toggle({ checked, onChange, label, sub }: { checked: boolean; onChange: (v: boolean) => void; label: string; sub?: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="text-sm text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>{label}</p>
        {sub && <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>{sub}</p>}
      </div>
      <div className="w-10 h-5 rounded-full relative cursor-pointer transition-colors flex-shrink-0" style={{ background: checked ? "#10B981" : "rgba(255,255,255,0.1)" }} onClick={() => onChange(!checked)}>
        <div className="w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all" style={{ left: checked ? 22 : 2 }} />
      </div>
    </div>
  );
}

const notifEvents = [
  { id: "call_completed", label: "Call Completed" },
  { id: "hot_lead", label: "Hot Lead Detected" },
  { id: "campaign_finished", label: "Campaign Finished" },
  { id: "system_error", label: "System Error" },
  { id: "new_lead", label: "New Lead Added" },
  { id: "low_answer_rate", label: "Low Answer Rate Alert" },
];

const apiKeys = [
  { id: "K001", name: "Production Key", key: "sk-callaihm-prod-••••••••••••••••", created: "Jan 15, 2026" },
  { id: "K002", name: "Development Key", key: "sk-callaihm-dev-••••••••••••••••", created: "Mar 1, 2026" },
  { id: "K003", name: "Analytics Integration", key: "sk-callaihm-anl-••••••••••••••••", created: "Apr 10, 2026" },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("General");
  const [notifSettings, setNotifSettings] = useState<Record<string, Record<string, boolean>>>(() => {
    const s: Record<string, Record<string, boolean>> = {};
    notifEvents.forEach(e => { s[e.id] = { email: true, sms: false, app: true }; });
    return s;
  });
  const [recording, setRecording] = useState(true);
  const [transcription, setTranscription] = useState(true);
  const [maxDuration, setMaxDuration] = useState(20);
  const [aiVoice, setAiVoice] = useState("Priya Pro");
  const [aiLang, setAiLang] = useState("English");
  const [qualStrict, setQualStrict] = useState(70);
  const [sentThreshold, setSentThreshold] = useState(60);
  const [keys, setKeys] = useState(apiKeys);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-white" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 24 }}>Settings</h1>

      <div className="flex gap-1 overflow-x-auto p-1 rounded-xl w-fit" style={{ background: "rgba(255,255,255,0.04)" }}>
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className="px-3 py-2 rounded-lg text-xs transition-all whitespace-nowrap" style={{ background: activeTab === tab ? "#1E293B" : "transparent", color: activeTab === tab ? "#E2E8F0" : "#64748B", fontFamily: "'DM Sans', sans-serif" }}>
            {tab}
          </button>
        ))}
      </div>

      <div className="max-w-2xl">
        {activeTab === "General" && (
          <div className="rounded-xl p-5 space-y-4" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h2 className="text-white font-semibold" style={{ fontFamily: "'Sora', sans-serif", fontSize: 16 }}>General Settings</h2>
            {[
              { label: "Company Name", val: "CallAIhm Pvt. Ltd.", type: "text" },
              { label: "Timezone", val: "Asia/Kolkata (IST)", type: "select", opts: ["Asia/Kolkata (IST)", "Asia/Dubai (GST)", "America/New_York (EST)"] },
              { label: "Date Format", val: "DD/MM/YYYY", type: "select", opts: ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"] },
              { label: "Language", val: "English", type: "select", opts: ["English", "Hindi", "Telugu", "Tamil"] },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-sm mb-1.5" style={{ color: "#94A3B8" }}>{f.label}</label>
                {f.type === "select" ? (
                  <select defaultValue={f.val} className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}>
                    {(f.opts || []).map(o => <option key={o}>{o}</option>)}
                  </select>
                ) : (
                  <input defaultValue={f.val} className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }} />
                )}
              </div>
            ))}
            <div>
              <label className="block text-sm mb-1.5" style={{ color: "#94A3B8" }}>Company Logo</label>
              <button onClick={() => toast.info("Opening file picker...")} className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm w-full" style={{ background: "rgba(255,255,255,0.04)", border: "1px dashed rgba(255,255,255,0.15)", color: "#64748B", fontFamily: "'DM Sans', sans-serif" }}>
                📁 Click to upload logo (PNG, SVG — max 2MB)
              </button>
            </div>
            <button onClick={() => toast.success("Settings saved!")} className="px-5 py-2 rounded-lg text-sm text-white" style={{ background: "#10B981", fontFamily: "'DM Sans', sans-serif" }}>Save Changes</button>
          </div>
        )}

        {activeTab === "Notifications" && (
          <div className="rounded-xl overflow-hidden" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <h2 className="text-white font-semibold" style={{ fontFamily: "'Sora', sans-serif", fontSize: 16 }}>Notification Preferences</h2>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase" style={{ color: "#475569", fontFamily: "'DM Sans', sans-serif" }}>Event</th>
                  {["Email", "SMS", "In-App"].map(h => <th key={h} className="px-4 py-3 text-center text-xs font-semibold uppercase" style={{ color: "#475569" }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {notifEvents.map(evt => (
                  <tr key={evt.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <td className="px-5 py-3 text-sm" style={{ color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}>{evt.label}</td>
                    {(["email", "sms", "app"] as const).map(ch => (
                      <td key={ch} className="px-4 py-3 text-center">
                        <div className="flex justify-center">
                          <div
                            className="w-9 h-5 rounded-full relative cursor-pointer transition-colors"
                            style={{ background: notifSettings[evt.id][ch] ? "#10B981" : "rgba(255,255,255,0.1)" }}
                            onClick={() => setNotifSettings(s => ({ ...s, [evt.id]: { ...s[evt.id], [ch]: !s[evt.id][ch] } }))}
                          >
                            <div className="w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all" style={{ left: notifSettings[evt.id][ch] ? 18 : 2 }} />
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-5 py-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <button onClick={() => toast.success("Notification preferences saved!")} className="px-5 py-2 rounded-lg text-sm text-white" style={{ background: "#10B981", fontFamily: "'DM Sans', sans-serif" }}>Save</button>
            </div>
          </div>
        )}

        {activeTab === "Call Settings" && (
          <div className="rounded-xl p-5 space-y-4" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h2 className="text-white font-semibold" style={{ fontFamily: "'Sora', sans-serif", fontSize: 16 }}>Call Settings</h2>
            <Toggle checked={recording} onChange={setRecording} label="Enable Call Recording" sub="All calls will be recorded by default" />
            <Toggle checked={transcription} onChange={setTranscription} label="Enable Transcription" sub="AI-powered real-time call transcription" />
            <div className="border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <label className="block text-sm mb-2" style={{ color: "#94A3B8" }}>Max Call Duration: {maxDuration} minutes</label>
              <input type="range" min={5} max={60} value={maxDuration} onChange={(e) => setMaxDuration(Number(e.target.value))} className="w-full accent-emerald-500" />
              <div className="flex justify-between text-xs mt-1" style={{ color: "#475569" }}><span>5 min</span><span>60 min</span></div>
            </div>
            <div>
              <label className="block text-sm mb-1.5" style={{ color: "#94A3B8" }}>Voicemail Drop Message</label>
              <button onClick={() => toast.info("Opening audio recorder...")} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm" style={{ background: "rgba(255,255,255,0.06)", color: "#94A3B8", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'DM Sans', sans-serif" }}>
                🎙️ Record Voicemail Drop
              </button>
            </div>
            <button onClick={() => toast.success("Call settings saved!")} className="px-5 py-2 rounded-lg text-sm text-white" style={{ background: "#10B981", fontFamily: "'DM Sans', sans-serif" }}>Save</button>
          </div>
        )}

        {activeTab === "AI Preferences" && (
          <div className="rounded-xl p-5 space-y-4" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h2 className="text-white font-semibold" style={{ fontFamily: "'Sora', sans-serif", fontSize: 16 }}>AI Preferences</h2>
            <div>
              <label className="block text-sm mb-1.5" style={{ color: "#94A3B8" }}>Default Voice</label>
              <select value={aiVoice} onChange={(e) => setAiVoice(e.target.value)} className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}>
                {["Priya Pro", "Arjun Pro", "Kavitha Pro", "Raj Pro"].map(v => <option key={v}>{v}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1.5" style={{ color: "#94A3B8" }}>Default Language</label>
              <select value={aiLang} onChange={(e) => setAiLang(e.target.value)} className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}>
                {["English", "Hindi", "Telugu", "Tamil"].map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2" style={{ color: "#94A3B8" }}>Qualification Strictness: {qualStrict}%</label>
              <input type="range" min={0} max={100} value={qualStrict} onChange={(e) => setQualStrict(Number(e.target.value))} className="w-full accent-emerald-500" />
              <p className="text-xs mt-1" style={{ color: "#64748B" }}>Higher = fewer but more accurate qualified leads</p>
            </div>
            <div>
              <label className="block text-sm mb-2" style={{ color: "#94A3B8" }}>Positive Sentiment Threshold: {sentThreshold}%</label>
              <input type="range" min={0} max={100} value={sentThreshold} onChange={(e) => setSentThreshold(Number(e.target.value))} className="w-full accent-emerald-500" />
              <p className="text-xs mt-1" style={{ color: "#64748B" }}>Calls above this score will be flagged as positive</p>
            </div>
            <button onClick={() => toast.success("AI preferences saved!")} className="px-5 py-2 rounded-lg text-sm text-white" style={{ background: "#10B981", fontFamily: "'DM Sans', sans-serif" }}>Save</button>
          </div>
        )}

        {activeTab === "API Keys" && (
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <h2 className="text-white font-semibold" style={{ fontFamily: "'Sora', sans-serif", fontSize: 16 }}>API Keys</h2>
                <button onClick={() => { setKeys(k => [...k, { id: `K00${k.length + 1}`, name: "New Key", key: "sk-callaihm-new-••••••••••••••••", created: "May 1, 2026" }]); toast.success("API key generated!"); }} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-white" style={{ background: "#10B981", fontFamily: "'DM Sans', sans-serif" }}>
                  <Plus size={12} /> Generate Key
                </button>
              </div>
              <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                {keys.map(key => (
                  <div key={key.id} className="px-5 py-4 flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>{key.name}</p>
                      <p className="text-xs font-mono mt-0.5" style={{ color: "#64748B" }}>{key.key}</p>
                      <p className="text-xs mt-0.5" style={{ color: "#475569" }}>Created {key.created}</p>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <button onClick={() => { toast.success("API key copied!"); }} className="p-1.5 rounded" style={{ background: "rgba(99,102,241,0.1)", color: "#6366F1" }}><Copy size={13} /></button>
                      <button onClick={() => { setKeys(k => k.filter(x => x.id !== key.id)); toast.error("API key revoked"); }} className="p-1.5 rounded" style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444" }}><Trash2 size={13} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "Danger Zone" && (
          <div className="rounded-xl p-5" style={{ background: "#1E293B", border: "1px solid rgba(239,68,68,0.3)" }}>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={18} style={{ color: "#EF4444" }} />
              <h2 className="text-white font-semibold" style={{ fontFamily: "'Sora', sans-serif", fontSize: 16, color: "#EF4444" }}>Danger Zone</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)" }}>
                <div>
                  <p className="text-sm font-medium text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>Export All Data</p>
                  <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>Download a complete export of all your CallAIhm data</p>
                </div>
                <button onClick={() => toast.success("Export started. Download link will be emailed.")} className="px-4 py-2 rounded-lg text-sm" style={{ background: "rgba(99,102,241,0.1)", color: "#6366F1", fontFamily: "'DM Sans', sans-serif" }}>Export</button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)" }}>
                <div>
                  <p className="text-sm font-medium" style={{ color: "#EF4444", fontFamily: "'DM Sans', sans-serif" }}>Delete Account</p>
                  <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>Permanently delete your account and all data. This cannot be undone.</p>
                </div>
                <button onClick={() => setShowDeleteConfirm(true)} className="px-4 py-2 rounded-lg text-sm text-white" style={{ background: "#EF4444", fontFamily: "'DM Sans', sans-serif" }}>Delete Account</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirm Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(15,23,42,0.85)" }}>
          <div className="w-full max-w-sm rounded-2xl p-6" style={{ background: "#1E293B", border: "1px solid rgba(239,68,68,0.4)" }}>
            <AlertTriangle size={32} className="mx-auto mb-3" style={{ color: "#EF4444" }} />
            <h3 className="text-white font-bold text-center mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>Delete Account?</h3>
            <p className="text-sm text-center mb-4" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif" }}>This will permanently delete all your data, campaigns, leads, and recordings. This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 py-2 rounded-lg text-sm" style={{ background: "rgba(255,255,255,0.06)", color: "#94A3B8", fontFamily: "'DM Sans', sans-serif" }}>Cancel</button>
              <button onClick={() => { toast.error("Account deletion email sent for confirmation"); setShowDeleteConfirm(false); }} className="flex-1 py-2 rounded-lg text-sm text-white" style={{ background: "#EF4444", fontFamily: "'DM Sans', sans-serif" }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
