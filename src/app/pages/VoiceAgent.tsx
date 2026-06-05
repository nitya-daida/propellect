import { useState } from "react";
import { Play, Plus, Trash2, GripVertical, Phone } from "lucide-react";
import { voices } from "../data/mockData";
import { fetchJson } from "../api";
import { toast } from "sonner";

const objections = [
  { obj: "I'm not interested right now", response: "I completely understand. Would it be okay if I shared just one property that might change your mind? No pressure at all." },
  { obj: "Call me later", response: "Of course! When would be the best time to reach you? I'll make sure to call only at your preferred time." },
  { obj: "The price is too high", response: "I hear you. We do have options across different budget ranges. Can I ask what your ideal budget would be?" },
  { obj: "I'm already working with another agent", response: "That's great! We work alongside other agents too. I just wanted to make sure you've seen our exclusive listings — many aren't on public portals." },
];

const qualificationQuestions = [
  { question: "What type of property are you looking for?", type: "text" },
  { question: "What is your preferred location?", type: "text" },
  { question: "What is your budget range?", type: "text" },
  { question: "Are you looking to buy, sell, or rent?", type: "text" },
  { question: "Have you taken a home loan already?", type: "yes_no" },
  { question: "How soon are you looking to finalize?", type: "text" },
];

export default function VoiceAgent() {
  const [selectedVoice, setSelectedVoice] = useState("V003");
  const [speed, setSpeed] = useState(1.0);
  const [tone, setTone] = useState("Professional");
  const [languages, setLanguages] = useState(["English"]);
  const [agentName, setAgentName] = useState("Priya AI");
  const [openingMsg, setOpeningMsg] = useState("Hi, this is [Agent Name] calling from CallAIhm Realty. I noticed you were looking for properties in [Location]. I have some exciting options that match your preferences. Do you have a couple of minutes?");
  const [closing, setClosing] = useState("Thank you so much for your time! I'll send you the property details on WhatsApp right away. Looking forward to connecting again soon. Have a wonderful day!");
  const [questions, setQuestions] = useState(qualificationQuestions);
  const [testMode, setTestMode] = useState(false);
  const [testTranscript, setTestTranscript] = useState<{ speaker: string; text: string }[]>([]);
  const [chatInput, setChatInput] = useState("What properties do you have in Bandra?");
  const [chatHistory, setChatHistory] = useState<{ speaker: string; text: string }[]>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [expandedObj, setExpandedObj] = useState<number | null>(null);

  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;
    setChatLoading(true);
    const message = chatInput.trim();
    setChatHistory((prev) => [...prev, { speaker: "You", text: message }]);
    setChatInput("");
    try {
      const data = await fetchJson<any>("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const reply = data?.response ?? data?.reply ?? data?.message ?? JSON.stringify(data);
      setChatHistory((prev) => [...prev, { speaker: "AI", text: reply }]);
    } catch (error) {
      console.error("Chat request failed", error);
      toast.error("Unable to send chat message.");
    } finally {
      setChatLoading(false);
    }
  };

  const toggleLanguage = (lang: string) => {
    setLanguages(prev => prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]);
  };

  const startTest = () => {
    setTestMode(true);
    setTestTranscript([]);
    setTimeout(() => setTestTranscript(prev => [...prev, { speaker: "AI", text: openingMsg.replace("[Agent Name]", agentName).replace("[Location]", "Mumbai") }]), 800);
    setTimeout(() => setTestTranscript(prev => [...prev, { speaker: "You", text: "Yes, I have a few minutes. I'm looking for a 3BHK in Bandra." }]), 2500);
    setTimeout(() => setTestTranscript(prev => [...prev, { speaker: "AI", text: "That's perfect! Bandra is one of our strongest markets right now. We have some beautiful sea-facing 3BHKs starting at ₹1.8Cr. What's your approximate budget?" }]), 4000);
    setTimeout(() => setTestTranscript(prev => [...prev, { speaker: "You", text: "Around 2 to 2.5 Crore." }]), 5500);
    setTimeout(() => setTestTranscript(prev => [...prev, { speaker: "AI", text: "Excellent! We have 3 properties within that range. Would you like me to arrange a site visit this weekend?" }]), 7000);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-white" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 24 }}>Voice Agent</h1>
        <button onClick={startTest} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white" style={{ background: "#6366F1", fontFamily: "'DM Sans', sans-serif" }}>
          <Phone size={14} /> Test Voice Agent
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Config Panel */}
        <div className="lg:col-span-2 space-y-5">
          {/* Agent Config */}
          <div className="rounded-xl p-5" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h2 className="text-white font-semibold mb-4" style={{ fontFamily: "'Sora', sans-serif", fontSize: 16 }}>Agent Configuration</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#94A3B8" }}>Agent Name</label>
                <input value={agentName} onChange={(e) => setAgentName(e.target.value)} className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }} />
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#94A3B8" }}>Tone</label>
                <select value={tone} onChange={(e) => setTone(e.target.value)} className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}>
                  {["Professional", "Friendly", "Formal", "Conversational"].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2" style={{ color: "#94A3B8" }}>Languages</label>
              <div className="flex flex-wrap gap-2">
                {["English", "Hindi", "Telugu", "Tamil", "Kannada", "Marathi"].map(lang => (
                  <button key={lang} onClick={() => toggleLanguage(lang)} className="px-3 py-1.5 rounded-lg text-xs transition-colors" style={{ background: languages.includes(lang) ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.06)", color: languages.includes(lang) ? "#10B981" : "#64748B", border: languages.includes(lang) ? "1px solid rgba(16,185,129,0.3)" : "1px solid rgba(255,255,255,0.06)", fontFamily: "'DM Sans', sans-serif" }}>
                    {lang}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm mb-2" style={{ color: "#94A3B8" }}>Speaking Speed: {speed.toFixed(1)}x</label>
              <input type="range" min={0.5} max={2} step={0.1} value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-full accent-emerald-500" />
              <div className="flex justify-between text-xs mt-1" style={{ color: "#475569" }}><span>0.5x (Slow)</span><span>2.0x (Fast)</span></div>
            </div>
          </div>

          {/* Voice Selection */}
          <div className="rounded-xl p-5" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h2 className="text-white font-semibold mb-4" style={{ fontFamily: "'Sora', sans-serif", fontSize: 16 }}>Voice Selection</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {voices.map(v => (
                <div
                  key={v.id}
                  onClick={() => setSelectedVoice(v.id)}
                  className="p-3 rounded-xl cursor-pointer transition-all"
                  style={{
                    background: selectedVoice === v.id ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.04)",
                    border: selectedVoice === v.id ? "2px solid #10B981" : "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>{v.name}</span>
                    <button onClick={(e) => { e.stopPropagation(); toast.info(`Playing ${v.name} preview...`); }} className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: selectedVoice === v.id ? "#10B981" : "rgba(255,255,255,0.1)" }}>
                      <Play size={10} color="#fff" />
                    </button>
                  </div>
                  <p className="text-xs" style={{ color: "#64748B" }}>{v.gender} · {v.accent}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#475569" }}>{v.language}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-yellow-400 text-xs">★</span>
                    <span className="text-xs" style={{ color: "#94A3B8" }}>{v.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Script Builder */}
          <div className="rounded-xl p-5" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h2 className="text-white font-semibold mb-4" style={{ fontFamily: "'Sora', sans-serif", fontSize: 16 }}>Script Builder</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#94A3B8" }}>Opening Message</label>
                <textarea value={openingMsg} onChange={(e) => setOpeningMsg(e.target.value)} rows={3} className="w-full px-3 py-2.5 rounded-lg text-sm outline-none resize-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }} />
                <p className="text-xs mt-1" style={{ color: "#475569" }}>Use [Agent Name], [Lead Name], [Location] as variables</p>
              </div>

              {/* Qualification Questions */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm" style={{ color: "#94A3B8" }}>Qualification Questions</label>
                  <button onClick={() => setQuestions(q => [...q, { question: "New question...", type: "text" }])} className="flex items-center gap-1 text-xs px-2 py-1 rounded" style={{ background: "rgba(99,102,241,0.15)", color: "#6366F1" }}>
                    <Plus size={11} /> Add
                  </button>
                </div>
                <div className="space-y-2">
                  {questions.map((q, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <GripVertical size={14} style={{ color: "#475569", cursor: "grab", flexShrink: 0 }} />
                      <input
                        value={q.question}
                        onChange={(e) => setQuestions(qs => qs.map((x, j) => j === i ? { ...x, question: e.target.value } : x))}
                        className="flex-1 bg-transparent outline-none text-sm"
                        style={{ color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}
                      />
                      <select value={q.type} onChange={(e) => setQuestions(qs => qs.map((x, j) => j === i ? { ...x, type: e.target.value } : x))} className="text-xs px-2 py-1 rounded outline-none flex-shrink-0" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "#94A3B8" }}>
                        <option value="text">Text</option>
                        <option value="yes_no">Yes/No</option>
                        <option value="number">Number</option>
                      </select>
                      <button onClick={() => setQuestions(qs => qs.filter((_, j) => j !== i))} style={{ color: "#EF4444", flexShrink: 0 }}><Trash2 size={13} /></button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Objection Handling */}
              <div>
                <label className="block text-sm mb-2" style={{ color: "#94A3B8" }}>Objection Handling</label>
                <div className="space-y-2">
                  {objections.map((obj, i) => (
                    <div key={i} className="rounded-lg overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                      <button
                        onClick={() => setExpandedObj(expandedObj === i ? null : i)}
                        className="w-full flex items-center justify-between p-3 text-left"
                        style={{ background: "rgba(255,255,255,0.04)" }}
                      >
                        <span className="text-sm" style={{ color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}>"{obj.obj}"</span>
                        <span style={{ color: "#64748B", fontSize: 12 }}>{expandedObj === i ? "▲" : "▼"}</span>
                      </button>
                      {expandedObj === i && (
                        <div className="p-3" style={{ background: "rgba(0,0,0,0.2)" }}>
                          <textarea defaultValue={obj.response} rows={2} className="w-full bg-transparent outline-none text-sm resize-none" style={{ color: "#94A3B8", fontFamily: "'DM Sans', sans-serif" }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#94A3B8" }}>Closing Statement</label>
                <textarea value={closing} onChange={(e) => setClosing(e.target.value)} rows={2} className="w-full px-3 py-2.5 rounded-lg text-sm outline-none resize-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }} />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={() => toast.success("Agent configuration saved!")} className="px-5 py-2 rounded-lg text-sm text-white font-medium" style={{ background: "#10B981", fontFamily: "'DM Sans', sans-serif" }}>Save Configuration</button>
              <button onClick={() => toast.info("Resetting to defaults...")} className="px-5 py-2 rounded-lg text-sm" style={{ background: "rgba(255,255,255,0.06)", color: "#94A3B8", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'DM Sans', sans-serif" }}>Reset</button>
            </div>
          </div>
        </div>

        {/* Live Test Console */}
        <div>
          <div className="rounded-xl overflow-hidden sticky top-6" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <h2 className="text-white font-semibold" style={{ fontFamily: "'Sora', sans-serif", fontSize: 15 }}>Live Test Console</h2>
              {testMode && <span className="text-xs px-2 py-0.5 rounded-full animate-pulse" style={{ background: "rgba(239,68,68,0.15)", color: "#EF4444" }}>● Live</span>}
            </div>
            {!testMode ? (
              <div className="p-6 text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(99,102,241,0.1)" }}>
                  <Phone size={28} style={{ color: "#6366F1" }} />
                </div>
                <p className="text-sm mb-4" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif" }}>Test your voice agent in real-time. Enter your phone number to receive a test call.</p>
                <input placeholder="+91 98765 43210" className="w-full px-3 py-2.5 rounded-lg text-sm mb-3 outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }} />
                <button onClick={startTest} className="w-full py-2.5 rounded-lg text-sm text-white font-medium" style={{ background: "#6366F1", fontFamily: "'DM Sans', sans-serif" }}>
                  Start Test Call
                </button>
                <div className="mt-5 text-left">
                  <p className="text-sm mb-2" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif" }}>Chat Assistant</p>
                  <textarea value={chatInput} onChange={(e) => setChatInput(e.target.value)} rows={3} className="w-full px-3 py-2.5 rounded-lg text-sm mb-3 outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }} />
                  <button onClick={sendChatMessage} disabled={chatLoading} className="w-full py-2.5 rounded-lg text-sm text-white font-medium" style={{ background: "#10B981", fontFamily: "'DM Sans', sans-serif" }}>
                    {chatLoading ? "Sending..." : "Send Chat Prompt"}
                  </button>
                  <div className="mt-4 space-y-3 max-h-48 overflow-y-auto">
                    {chatHistory.map((line, idx) => (
                      <div key={idx} className={`p-3 rounded-xl text-xs ${line.speaker === "AI" ? "bg-[#1E293B] text-[#E2E8F0]" : "bg-[#111827] text-[#94A3B8]"}`}>
                        <div className="font-semibold mb-1" style={{ color: line.speaker === "AI" ? "#6366F1" : "#10B981", fontFamily: "'DM Sans', sans-serif" }}>{line.speaker}</div>
                        <div>{line.text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4">
                <div className="space-y-3 max-h-80 overflow-y-auto mb-4">
                  {testTranscript.map((line, i) => (
                    <div key={i} className={`flex ${line.speaker === "AI" ? "" : "flex-row-reverse"}`}>
                      <div className="max-w-[85%] p-3 rounded-xl text-xs" style={{ background: line.speaker === "AI" ? "rgba(99,102,241,0.15)" : "rgba(16,185,129,0.12)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}>
                        <p className="font-semibold mb-0.5 text-xs" style={{ color: line.speaker === "AI" ? "#6366F1" : "#10B981" }}>{line.speaker}</p>
                        {line.text}
                      </div>
                    </div>
                  ))}
                  {testTranscript.length === 0 && (
                    <div className="text-center py-4">
                      <div className="flex items-center justify-center gap-1">
                        {[0, 1, 2].map(i => (
                          <div key={i} className="w-2 h-2 rounded-full animate-bounce" style={{ background: "#10B981", animationDelay: `${i * 0.1}s` }} />
                        ))}
                      </div>
                      <p className="text-xs mt-2" style={{ color: "#64748B" }}>Connecting...</p>
                    </div>
                  )}
                </div>
                <button onClick={() => { setTestMode(false); setTestTranscript([]); }} className="w-full py-2 rounded-lg text-sm font-medium" style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444", fontFamily: "'DM Sans', sans-serif" }}>
                  End Test Call
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
