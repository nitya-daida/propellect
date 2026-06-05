import { useState } from "react";
import { X, Key, Check } from "lucide-react";
import { toast } from "sonner";

const integrations = [
  {
    category: "Telephony",
    items: [
      { id: "twilio", name: "Twilio", desc: "Voice calling & SMS infrastructure", logo: "📞", connected: true, type: "key" },
      { id: "exotel", name: "Exotel", desc: "India-first cloud telephony platform", logo: "☎️", connected: false, type: "key" },
    ],
  },
  {
    category: "LLM / AI",
    items: [
      { id: "claude", name: "Claude (Anthropic)", desc: "Advanced AI for call analysis & insights", logo: "🤖", connected: true, type: "key" },
      { id: "openai", name: "OpenAI GPT-4", desc: "Language model for transcript analysis", logo: "🧠", connected: false, type: "key" },
    ],
  },
  {
    category: "Speech",
    items: [
      { id: "google_asr", name: "Google ASR", desc: "Automatic speech recognition for transcription", logo: "🎙️", connected: true, type: "key" },
      { id: "elevenlabs", name: "ElevenLabs TTS", desc: "Text-to-speech for AI voice generation", logo: "🔊", connected: true, type: "key" },
    ],
  },
  {
    category: "Messaging",
    items: [
      { id: "gupshup", name: "Gupshup", desc: "WhatsApp Business API integration", logo: "💬", connected: false, type: "oauth" },
      { id: "meta", name: "Meta (SMS)", desc: "Facebook Business Messaging & SMS", logo: "📱", connected: false, type: "oauth" },
    ],
  },
  {
    category: "CRM",
    items: [
      { id: "salesforce", name: "Salesforce", desc: "Enterprise CRM sync for leads & deals", logo: "☁️", connected: false, type: "oauth" },
      { id: "hubspot", name: "HubSpot", desc: "Inbound marketing & CRM platform", logo: "🟠", connected: false, type: "oauth" },
      { id: "zoho", name: "Zoho CRM", desc: "Popular SMB CRM for Indian businesses", logo: "🔵", connected: true, type: "oauth" },
    ],
  },
  {
    category: "MLS / Property",
    items: [
      { id: "magicbricks", name: "MagicBricks", desc: "India's largest property portal", logo: "🏠", connected: true, type: "key" },
      { id: "housing", name: "Housing.com", desc: "Premium property listings integration", logo: "🏡", connected: false, type: "key" },
      { id: "99acres", name: "99Acres", desc: "Real estate classifieds and MLS data", logo: "🏘️", connected: false, type: "key" },
    ],
  },
  {
    category: "Monitoring",
    items: [
      { id: "prometheus", name: "Prometheus", desc: "Metrics collection and alerting", logo: "📊", connected: false, type: "config" },
      { id: "elk", name: "ELK Stack", desc: "Elasticsearch, Logstash & Kibana logging", logo: "📝", connected: false, type: "config" },
    ],
  },
];

function ConfigModal({ integration, onClose, onConnect }: { integration: any; onClose: () => void; onConnect: () => void }) {
  const [apiKey, setApiKey] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(15,23,42,0.85)", backdropFilter: "blur(4px)" }}>
      <div className="w-full max-w-md rounded-2xl shadow-2xl" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{integration.logo}</span>
            <div>
              <h2 className="text-white font-semibold" style={{ fontFamily: "'Sora', sans-serif" }}>Connect {integration.name}</h2>
              <p className="text-xs" style={{ color: "#64748B" }}>{integration.desc}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5" style={{ color: "#64748B" }}><X size={16} /></button>
        </div>
        <div className="p-5 space-y-4">
          {integration.type === "oauth" ? (
            <div className="text-center py-4">
              <p className="text-sm mb-4" style={{ color: "#94A3B8", fontFamily: "'DM Sans', sans-serif" }}>Click below to authorize CallAIhm to connect with {integration.name}</p>
              <button onClick={() => { toast.info("Redirecting to OAuth..."); onConnect(); onClose(); }} className="px-6 py-2.5 rounded-lg text-sm text-white font-medium" style={{ background: "#6366F1", fontFamily: "'DM Sans', sans-serif" }}>
                🔐 Authorize with {integration.name}
              </button>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#94A3B8" }}>API Key</label>
                <div className="relative">
                  <Key size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#64748B" }} />
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-••••••••••••••••••••"
                    className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm outline-none"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>
              </div>
              {integration.id === "twilio" && (
                <>
                  <div>
                    <label className="block text-sm mb-1.5" style={{ color: "#94A3B8" }}>Account SID</label>
                    <input placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }} />
                  </div>
                  <div>
                    <label className="block text-sm mb-1.5" style={{ color: "#94A3B8" }}>Phone Number</label>
                    <input placeholder="+1 555 123 4567" className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }} />
                  </div>
                </>
              )}
            </>
          )}
        </div>
        {integration.type !== "oauth" && (
          <div className="px-5 py-4 border-t flex justify-end gap-3" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm" style={{ background: "rgba(255,255,255,0.06)", color: "#94A3B8", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'DM Sans', sans-serif" }}>Cancel</button>
            <button onClick={() => { if (!apiKey) { toast.error("Please enter an API key"); return; } toast.success(`${integration.name} connected! ✓`); onConnect(); onClose(); }} className="px-5 py-2 rounded-lg text-sm text-white" style={{ background: "#10B981", fontFamily: "'DM Sans', sans-serif" }}>
              Connect
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Integrations() {
  const [states, setStates] = useState<Record<string, boolean>>(() => {
    const s: Record<string, boolean> = {};
    integrations.forEach(cat => cat.items.forEach(item => { s[item.id] = item.connected; }));
    return s;
  });
  const [configItem, setConfigItem] = useState<any | null>(null);

  const connect = (id: string) => setStates(s => ({ ...s, [id]: true }));
  const disconnect = (id: string) => { setStates(s => ({ ...s, [id]: false })); toast.info("Integration disconnected"); };

  const connectedCount = Object.values(states).filter(Boolean).length;
  const totalCount = Object.keys(states).length;

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 24 }}>Integrations</h1>
          <p className="text-sm mt-1" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif" }}>{connectedCount}/{totalCount} services connected</p>
        </div>
      </div>

      {/* Overall status */}
      <div className="p-4 rounded-xl" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold" style={{ color: "#10B981" }}>Integration Health</span>
          <span className="text-sm font-bold" style={{ color: "#10B981", fontFamily: "'Sora', sans-serif" }}>{Math.round((connectedCount / totalCount) * 100)}%</span>
        </div>
        <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
          <div className="h-2 rounded-full transition-all" style={{ width: `${(connectedCount / totalCount) * 100}%`, background: "#10B981" }} />
        </div>
      </div>

      {integrations.map((group) => (
        <div key={group.category}>
          <h2 className="text-white font-semibold mb-4" style={{ fontFamily: "'Sora', sans-serif", fontSize: 16 }}>{group.category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {group.items.map((item) => {
              const connected = states[item.id];
              return (
                <div key={item.id} className="rounded-xl p-4" style={{ background: "#1E293B", border: `1px solid ${connected ? "rgba(16,185,129,0.2)" : "rgba(255,255,255,0.06)"}` }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.logo}</span>
                      <div>
                        <h3 className="text-white font-semibold" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>{item.name}</h3>
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: connected ? "rgba(16,185,129,0.15)" : "rgba(100,116,139,0.15)", color: connected ? "#10B981" : "#64748B", fontFamily: "'DM Sans', sans-serif" }}>
                          {connected ? "● Connected" : "○ Not connected"}
                        </span>
                      </div>
                    </div>
                    {connected && <Check size={16} style={{ color: "#10B981" }} />}
                  </div>
                  <p className="text-xs mb-4 leading-5" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</p>
                  <div className="flex gap-2">
                    {connected ? (
                      <>
                        <button onClick={() => setConfigItem(item)} className="flex-1 py-1.5 rounded-lg text-xs" style={{ background: "rgba(255,255,255,0.06)", color: "#94A3B8", fontFamily: "'DM Sans', sans-serif", border: "1px solid rgba(255,255,255,0.08)" }}>Configure</button>
                        <button onClick={() => disconnect(item.id)} className="py-1.5 px-3 rounded-lg text-xs" style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444", fontFamily: "'DM Sans', sans-serif" }}>Disconnect</button>
                      </>
                    ) : (
                      <button onClick={() => setConfigItem(item)} className="flex-1 py-1.5 rounded-lg text-xs text-white" style={{ background: "#10B981", fontFamily: "'DM Sans', sans-serif" }}>Connect</button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {configItem && <ConfigModal integration={configItem} onClose={() => setConfigItem(null)} onConnect={() => connect(configItem.id)} />}
    </div>
  );
}
