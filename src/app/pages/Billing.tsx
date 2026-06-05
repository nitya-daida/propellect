import { useState } from "react";
import { CreditCard, Download, TrendingUp, Phone, Users, X, Check } from "lucide-react";
import { billingHistory } from "../data/mockData";
import { toast } from "sonner";

const plans = [
  {
    name: "Free",
    price: 0,
    period: "forever",
    color: "#64748B",
    features: [
      { label: "100 calls/month", included: true },
      { label: "50 leads", included: true },
      { label: "1 campaign", included: true },
      { label: "AI voice agent", included: false },
      { label: "Call recording", included: false },
      { label: "Team members", included: false },
      { label: "Analytics", included: false },
      { label: "Priority support", included: false },
    ],
  },
  {
    name: "Starter",
    price: 4999,
    period: "month",
    color: "#6366F1",
    features: [
      { label: "2,000 calls/month", included: true },
      { label: "500 leads", included: true },
      { label: "5 campaigns", included: true },
      { label: "AI voice agent", included: true },
      { label: "Call recording", included: true },
      { label: "2 team members", included: true },
      { label: "Basic analytics", included: true },
      { label: "Priority support", included: false },
    ],
  },
  {
    name: "Pro",
    price: 14999,
    period: "month",
    color: "#10B981",
    current: true,
    features: [
      { label: "10,000 calls/month", included: true },
      { label: "5,000 leads", included: true },
      { label: "Unlimited campaigns", included: true },
      { label: "AI voice agent", included: true },
      { label: "Call recording + transcription", included: true },
      { label: "10 team members", included: true },
      { label: "Full analytics + AI insights", included: true },
      { label: "Priority support", included: true },
    ],
  },
  {
    name: "Enterprise",
    price: null,
    period: "custom",
    color: "#F59E0B",
    features: [
      { label: "Unlimited calls", included: true },
      { label: "Unlimited leads", included: true },
      { label: "Unlimited campaigns", included: true },
      { label: "Custom AI voice agents", included: true },
      { label: "All recordings + transcripts", included: true },
      { label: "Unlimited team members", included: true },
      { label: "Custom analytics + reports", included: true },
      { label: "Dedicated account manager", included: true },
    ],
  },
];

export default function Billing() {
  const [showUpdateCard, setShowUpdateCard] = useState(false);

  const usageCalls = { used: 8234, limit: 10000 };
  const usageLeads = { used: 1847, limit: 5000 };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-white" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 24 }}>Billing</h1>

      {/* Current Plan */}
      <div className="rounded-xl p-6" style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(30,41,59,1) 60%)", border: "1px solid rgba(16,185,129,0.3)" }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.15)", color: "#10B981", fontFamily: "'DM Sans', sans-serif" }}>Current Plan</span>
            </div>
            <h2 className="text-white text-2xl font-bold" style={{ fontFamily: "'Sora', sans-serif" }}>Pro Plan</h2>
            <p className="mt-1" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>₹14,999/month · Renews June 1, 2026</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => toast.info("Upgrade options...")} className="px-4 py-2 rounded-lg text-sm text-white" style={{ background: "#10B981", fontFamily: "'DM Sans', sans-serif" }}>Upgrade Plan</button>
            <button onClick={() => toast.info("Are you sure you want to cancel?")} className="px-4 py-2 rounded-lg text-sm" style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444", fontFamily: "'DM Sans', sans-serif" }}>Cancel</button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <div className="flex justify-between text-xs mb-1.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <span style={{ color: "#94A3B8" }}>Calls this month</span>
              <span style={{ color: "#E2E8F0" }}>{usageCalls.used.toLocaleString("en-IN")} / {usageCalls.limit.toLocaleString("en-IN")}</span>
            </div>
            <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
              <div className="h-2 rounded-full transition-all" style={{ width: `${(usageCalls.used / usageCalls.limit) * 100}%`, background: usageCalls.used / usageCalls.limit > 0.8 ? "#F59E0B" : "#10B981" }} />
            </div>
            <p className="text-xs mt-1" style={{ color: "#64748B" }}>{Math.round((usageCalls.used / usageCalls.limit) * 100)}% used</p>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <span style={{ color: "#94A3B8" }}>Leads stored</span>
              <span style={{ color: "#E2E8F0" }}>{usageLeads.used.toLocaleString("en-IN")} / {usageLeads.limit.toLocaleString("en-IN")}</span>
            </div>
            <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
              <div className="h-2 rounded-full transition-all" style={{ width: `${(usageLeads.used / usageLeads.limit) * 100}%`, background: "#6366F1" }} />
            </div>
            <p className="text-xs mt-1" style={{ color: "#64748B" }}>{Math.round((usageLeads.used / usageLeads.limit) * 100)}% used</p>
          </div>
        </div>
      </div>

      {/* Plan Comparison */}
      <div>
        <h2 className="text-white font-semibold mb-4" style={{ fontFamily: "'Sora', sans-serif", fontSize: 16 }}>Plan Comparison</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="rounded-xl p-5 transition-all"
              style={{
                background: plan.current ? `linear-gradient(135deg, rgba(16,185,129,0.1), #1E293B)` : "#1E293B",
                border: plan.current ? "2px solid #10B981" : "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {plan.current && (
                <span className="text-xs px-2 py-0.5 rounded-full block w-fit mb-2" style={{ background: "rgba(16,185,129,0.2)", color: "#10B981" }}>Current</span>
              )}
              <h3 className="font-bold text-white mb-1" style={{ fontFamily: "'Sora', sans-serif", fontSize: 18 }}>{plan.name}</h3>
              <div className="mb-4">
                {plan.price === null ? (
                  <span className="font-bold" style={{ color: plan.color, fontFamily: "'Sora', sans-serif", fontSize: 20 }}>Custom</span>
                ) : plan.price === 0 ? (
                  <span className="font-bold text-white" style={{ fontFamily: "'Sora', sans-serif", fontSize: 20 }}>Free</span>
                ) : (
                  <span className="font-bold" style={{ color: plan.color, fontFamily: "'Sora', sans-serif", fontSize: 20 }}>₹{plan.price.toLocaleString("en-IN")}<span className="text-xs font-normal" style={{ color: "#64748B" }}>/mo</span></span>
                )}
              </div>
              <div className="space-y-1.5 mb-4">
                {plan.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {f.included ? <Check size={12} style={{ color: "#10B981", flexShrink: 0 }} /> : <X size={12} style={{ color: "#EF4444", flexShrink: 0 }} />}
                    <span className="text-xs" style={{ color: f.included ? "#94A3B8" : "#475569", fontFamily: "'DM Sans', sans-serif" }}>{f.label}</span>
                  </div>
                ))}
              </div>
              {!plan.current && (
                <button onClick={() => toast.success(`Upgrading to ${plan.name}...`)} className="w-full py-2 rounded-lg text-xs text-white transition-all" style={{ background: plan.color, fontFamily: "'DM Sans', sans-serif" }}>
                  {plan.price === null ? "Contact Sales" : plan.price === 0 ? "Downgrade" : "Upgrade"}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl p-5" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 className="text-white font-semibold mb-4" style={{ fontFamily: "'Sora', sans-serif", fontSize: 16 }}>Payment Method</h2>
          <div className="flex items-center gap-4 p-4 rounded-xl mb-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <CreditCard size={24} style={{ color: "#6366F1" }} />
            <div>
              <p className="text-sm text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>•••• •••• •••• 4242</p>
              <p className="text-xs" style={{ color: "#64748B" }}>Visa · Expires 12/27</p>
            </div>
          </div>
          <button onClick={() => setShowUpdateCard(true)} className="px-4 py-2 rounded-lg text-sm" style={{ background: "rgba(255,255,255,0.06)", color: "#94A3B8", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'DM Sans', sans-serif" }}>
            Update Card
          </button>
        </div>

        {/* Billing History */}
        <div className="rounded-xl overflow-hidden" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <h2 className="text-white font-semibold" style={{ fontFamily: "'Sora', sans-serif", fontSize: 16 }}>Billing History</h2>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {["Date", "Invoice", "Amount", "Status", ""].map(h => (
                  <th key={h} className="px-4 py-2 text-left text-xs font-semibold uppercase" style={{ color: "#475569", fontFamily: "'DM Sans', sans-serif" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {billingHistory.map(b => (
                <tr key={b.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td className="px-4 py-2.5 text-xs" style={{ color: "#64748B" }}>{b.date}</td>
                  <td className="px-4 py-2.5 text-xs" style={{ color: "#94A3B8" }}>{b.id}</td>
                  <td className="px-4 py-2.5 text-sm font-medium" style={{ color: "#E2E8F0", fontFamily: "'Sora', sans-serif" }}>₹{b.amount.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-2.5">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.1)", color: "#10B981" }}>Paid</span>
                  </td>
                  <td className="px-4 py-2.5">
                    <button onClick={() => toast.success("Downloading PDF...")} className="p-1 rounded" style={{ color: "#64748B" }}><Download size={12} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
