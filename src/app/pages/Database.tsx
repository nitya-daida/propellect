import { useState } from "react";
import { Download, Search } from "lucide-react";
import { leads, properties, calls, campaigns, formatBudget, statusColors } from "../data/mockData";
import { toast } from "sonner";

const tabs = ["Leads", "Properties", "Interactions", "Transcripts", "Market Data"];

const interactions = [
  { id: "I001", lead: "Arjun Sharma", type: "Call", date: "Apr 30, 2026", duration: "4:32", outcome: "Qualified", agent: "Priya Mehta" },
  { id: "I002", lead: "Kavya Rao", type: "Call", date: "Apr 30, 2026", duration: "5:48", outcome: "Hot Lead", agent: "Rahul Iyer" },
  { id: "I003", lead: "Priti Agarwal", type: "WhatsApp", date: "Apr 29, 2026", duration: "—", outcome: "Replied", agent: "Sneha Verma" },
  { id: "I004", lead: "Rohit Joshi", type: "Call", date: "Apr 30, 2026", duration: "7:15", outcome: "Site Visit", agent: "Priya Mehta" },
  { id: "I005", lead: "Sunita Reddy", type: "Call", date: "Apr 29, 2026", duration: "0:00", outcome: "No Answer", agent: "Rahul Iyer" },
];

const marketData = [
  { area: "Bandra West, Mumbai", avgPrice: "₹45,000/sqft", trend: "+8.2%", inventory: 234, demand: "High" },
  { area: "Whitefield, Bengaluru", avgPrice: "₹7,200/sqft", trend: "+12.4%", inventory: 456, demand: "Very High" },
  { area: "Koramangala, Bengaluru", avgPrice: "₹9,800/sqft", trend: "+6.8%", inventory: 187, demand: "High" },
  { area: "Powai, Mumbai", avgPrice: "₹22,000/sqft", trend: "+5.1%", inventory: 123, demand: "Medium" },
  { area: "Hitech City, Hyderabad", avgPrice: "₹8,500/sqft", trend: "+15.2%", inventory: 312, demand: "Very High" },
  { area: "Hinjewadi, Pune", avgPrice: "₹6,200/sqft", trend: "+9.7%", inventory: 267, demand: "High" },
];

export default function Database() {
  const [activeTab, setActiveTab] = useState("Leads");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const renderTable = () => {
    switch (activeTab) {
      case "Leads":
        const filteredLeads = leads.filter(l => `${l.firstName} ${l.lastName} ${l.phone} ${l.email}`.toLowerCase().includes(search.toLowerCase()));
        const paginatedLeads = filteredLeads.slice((page - 1) * perPage, page * perPage);
        return (
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {["ID", "Name", "Phone", "Email", "Source", "Intent", "Budget", "Status", "Score", "Agent"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap" style={{ color: "#475569", fontFamily: "'DM Sans', sans-serif" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedLeads.map(l => (
                <tr key={l.id} className="hover:bg-white/[0.02] transition-colors" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td className="px-4 py-3 text-xs" style={{ color: "#475569" }}>{l.id}</td>
                  <td className="px-4 py-3 text-sm font-medium text-white" style={{ fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>{l.firstName} {l.lastName}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#94A3B8", whiteSpace: "nowrap" }}>{l.phone}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#94A3B8" }}>{l.email}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#64748B" }}>{l.source}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#64748B" }}>{l.intent}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#94A3B8", whiteSpace: "nowrap" }}>{formatBudget(l.budget.min)}–{formatBudget(l.budget.max)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${statusColors[l.status]}`}>{l.status}</span>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#E2E8F0" }}>{l.score}/100</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#64748B", whiteSpace: "nowrap" }}>{l.assignedAgent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case "Properties":
        const filteredProps = properties.filter(p => `${p.name} ${p.address}`.toLowerCase().includes(search.toLowerCase()));
        return (
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {["ID", "Name", "Address", "Type", "BHK", "Area", "Price", "Status", "Matched"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap" style={{ color: "#475569", fontFamily: "'DM Sans', sans-serif" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredProps.map(p => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td className="px-4 py-3 text-xs" style={{ color: "#475569" }}>{p.id}</td>
                  <td className="px-4 py-3 text-sm font-medium text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>{p.name}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#64748B", maxWidth: 200 }}>{p.address}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#94A3B8" }}>{p.type}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#94A3B8" }}>{p.bhk}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#94A3B8" }}>{p.area} sqft</td>
                  <td className="px-4 py-3 text-xs font-semibold" style={{ color: "#10B981" }}>{formatBudget(p.price)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${statusColors[p.status]}`}>{p.status}</span>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#6366F1" }}>{p.matchedLeads}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case "Interactions":
        return (
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {["ID", "Lead", "Type", "Date", "Duration", "Outcome", "Agent"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#475569", fontFamily: "'DM Sans', sans-serif" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {interactions.map(i => (
                <tr key={i.id} className="hover:bg-white/[0.02] transition-colors" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td className="px-4 py-3 text-xs" style={{ color: "#475569" }}>{i.id}</td>
                  <td className="px-4 py-3 text-sm font-medium text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>{i.lead}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#6366F1" }}>{i.type}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#94A3B8" }}>{i.date}</td>
                  <td className="px-4 py-3 text-xs font-mono" style={{ color: "#E2E8F0" }}>{i.duration}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#10B981" }}>{i.outcome}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#64748B" }}>{i.agent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case "Transcripts":
        return (
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {["Call ID", "Lead", "Date", "Duration", "Agent", "Sentiment", "Score", "Action"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#475569", fontFamily: "'DM Sans', sans-serif" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {calls.filter(c => c.transcript).map(c => (
                <tr key={c.id} className="hover:bg-white/[0.02] transition-colors" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td className="px-4 py-3 text-xs" style={{ color: "#475569" }}>{c.id}</td>
                  <td className="px-4 py-3 text-sm font-medium text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>{c.leadName}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#94A3B8" }}>{c.date}</td>
                  <td className="px-4 py-3 text-xs font-mono" style={{ color: "#E2E8F0" }}>{c.duration}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#64748B" }}>{c.agent}</td>
                  <td className="px-4 py-3 text-xs capitalize" style={{ color: c.sentiment === "positive" ? "#10B981" : c.sentiment === "neutral" ? "#6366F1" : "#EF4444" }}>{c.sentiment}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#E2E8F0" }}>{c.score}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => toast.info("Opening transcript...")} className="text-xs px-2 py-1 rounded" style={{ background: "rgba(99,102,241,0.1)", color: "#6366F1" }}>📄 View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case "Market Data":
        return (
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {["Area", "Avg Price", "YoY Trend", "Inventory", "Demand"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#475569", fontFamily: "'DM Sans', sans-serif" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {marketData.map((m, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td className="px-4 py-3 text-sm font-medium text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>{m.area}</td>
                  <td className="px-4 py-3 text-sm font-bold" style={{ color: "#10B981", fontFamily: "'Sora', sans-serif" }}>{m.avgPrice}</td>
                  <td className="px-4 py-3 text-sm font-semibold" style={{ color: "#10B981" }}>↑ {m.trend}</td>
                  <td className="px-4 py-3 text-sm" style={{ color: "#94A3B8" }}>{m.inventory}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: m.demand === "Very High" ? "rgba(239,68,68,0.15)" : "rgba(245,158,11,0.15)", color: m.demand === "Very High" ? "#EF4444" : "#F59E0B", fontFamily: "'DM Sans', sans-serif" }}>{m.demand}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-white" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 24 }}>Database</h1>
        <button onClick={() => toast.success("Exporting data...")} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm" style={{ background: "rgba(255,255,255,0.06)", color: "#94A3B8", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'DM Sans', sans-serif" }}>
          <Download size={14} /> Export
        </button>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-1 p-1 rounded-xl w-fit" style={{ background: "rgba(255,255,255,0.04)" }}>
        {tabs.map(tab => (
          <button key={tab} onClick={() => { setActiveTab(tab); setPage(1); setSearch(""); }} className="px-4 py-2 rounded-lg text-sm transition-all whitespace-nowrap" style={{ background: activeTab === tab ? "#1E293B" : "transparent", color: activeTab === tab ? "#E2E8F0" : "#64748B", fontFamily: "'DM Sans', sans-serif" }}>
            {tab}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative w-full max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#64748B" }} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search ${activeTab.toLowerCase()}...`}
          className="w-full pl-9 pr-4 py-2 rounded-lg text-sm outline-none"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}
        />
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="overflow-x-auto">
          {renderTable()}
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <span className="text-xs" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif" }}>{activeTab} database</span>
          <div className="flex items-center gap-1">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1.5 rounded-lg text-xs disabled:opacity-40" style={{ color: "#94A3B8", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'DM Sans', sans-serif" }}>Prev</button>
            <span className="text-xs px-3 py-1.5" style={{ color: "#64748B" }}>Page {page}</span>
            <button onClick={() => setPage(p => p + 1)} className="px-3 py-1.5 rounded-lg text-xs" style={{ color: "#94A3B8", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'DM Sans', sans-serif" }}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
