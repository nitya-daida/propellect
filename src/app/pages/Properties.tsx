import { useState, useEffect } from "react";
import { Plus, Upload, LayoutGrid, List, X, MapPin, Maximize2 } from "lucide-react";
import { formatBudget, statusColors } from "../data/mockData";
import { fetchJson } from "../api";
import { toast } from "sonner";

const colors = ["#10B981", "#6366F1", "#F59E0B", "#EF4444", "#3B82F6", "#8B5CF6", "#EC4899", "#14B8A6"];

type Property = {
  id: string;
  name: string;
  address: string;
  type: string;
  bhk: number;
  area: number;
  price: number;
  status: string;
  amenities: string[];
  description: string;
  matchedLeads: number;
  image?: string | null;
};

function normalizeProperty(item: any): Property {
  return {
    id: String(item.id ?? item._id ?? ""),
    name: item.name ?? "Untitled Property",
    address: item.address ?? "Address not available",
    type: String(item.property_type ?? item.type ?? "Apartment"),
    bhk: Number(item.bhk ?? 2) || 2,
    area: Number(item.area ?? item.square_feet ?? 1000) || 1000,
    price: Number(item.price ?? 0) || 0,
    status: item.status ?? "available",
    amenities: Array.isArray(item.amenities) ? item.amenities : [],
    description: item.description ?? "Description is unavailable.",
    matchedLeads: Number(item.matched_leads ?? item.matchedLeads ?? 0),
    image: item.image ?? null,
  };
}

function AddPropertyModal({ open, onClose, onPropertyAdded }: { open: boolean; onClose: () => void; onPropertyAdded: (property: Property) => void }) {
  const [form, setForm] = useState({
    name: "",
    address: "",
    type: "Apartment",
    bhk: 2,
    area: 1000,
    price: 0,
    status: "available",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "bhk" || name === "area" || name === "price" ? Number(value) : value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.address || !form.price) {
      toast.error("Please fill name, address, and price.");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        name: form.name,
        address: form.address,
        type: form.type,
        bhk: form.bhk,
        area: form.area,
        price: form.price,
        status: form.status,
        description: form.description,
      };
      const result = await fetchJson<Property>("/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      toast.success("Property added successfully.");
      onPropertyAdded(normalizeProperty(result));
      onClose();
      setForm({ name: "", address: "", type: "Apartment", bhk: 2, area: 1000, price: 0, status: "available", description: "" });
    } catch (error) {
      console.error("Failed to add property", error);
      toast.error("Unable to add property.");
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
    <div className={`fixed inset-0 z-50 ${open ? "flex" : "hidden"} items-center justify-center px-4`} style={{ background: "rgba(15,23,42,0.85)", backdropFilter: "blur(4px)" }}>
      <div className="w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <h2 className="text-white font-semibold" style={{ fontFamily: "'Sora', sans-serif", fontSize: 18 }}>Add Property</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/5" style={{ color: "#64748B" }}><X size={16} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label style={labelStyle}>Name</label>
            <input name="name" value={form.name} onChange={handleChange} style={inputStyle} placeholder="Lodha World Towers" />
          </div>
          <div>
            <label style={labelStyle}>Address</label>
            <textarea name="address" value={form.address} onChange={handleChange} style={{ ...inputStyle, resize: "vertical" }} rows={2} placeholder="Lower Parel, Mumbai" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>Type</label>
              <select name="type" value={form.type} onChange={handleChange} style={inputStyle}>
                <option>Apartment</option>
                <option>Villa</option>
                <option>Commercial</option>
                <option>Plot</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Status</label>
              <select name="status" value={form.status} onChange={handleChange} style={inputStyle}>
                <option value="available">Available</option>
                <option value="sold">Sold</option>
                <option value="rented">Rented</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>BHK</label>
              <input name="bhk" type="number" value={form.bhk} onChange={handleChange} style={inputStyle} min={1} />
            </div>
            <div>
              <label style={labelStyle}>Area (sqft)</label>
              <input name="area" type="number" value={form.area} onChange={handleChange} style={inputStyle} min={100} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Price</label>
            <input name="price" type="number" value={form.price} onChange={handleChange} style={inputStyle} min={0} />
          </div>
          <div>
            <label style={labelStyle}>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} style={{ ...inputStyle, resize: "vertical" }} placeholder="Description..." />
          </div>
          <div className="flex justify-end gap-3 pt-2 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <button onClick={onClose} className="px-5 py-2 rounded-lg text-sm" style={{ background: "rgba(255,255,255,0.06)", color: "#94A3B8", fontFamily: "'DM Sans', sans-serif" }}>Cancel</button>
            <button onClick={handleSubmit} disabled={loading} className="px-5 py-2 rounded-lg text-sm text-white" style={{ background: "#10B981", fontFamily: "'DM Sans', sans-serif" }}>{loading ? "Saving..." : "Save Property"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PropertyModal({ property, onClose }: { property: Property; onClose: () => void }) {
  const [tab, setTab] = useState("details");
  const colorIndex = Number(property.id.replace(/\D/g, "")) % colors.length;
  const matchedLeads = property.matchedLeads;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(15,23,42,0.85)", backdropFilter: "blur(4px)" }}>
      <div className="w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)" }}>
        {/* Image Gallery */}
        <div className="h-48 relative flex-shrink-0" style={{ background: `linear-gradient(135deg, ${colors[colorIndex]}44, rgba(30,41,59,1))` }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl">🏠</span>
          </div>
          <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.4)", color: "#fff" }}><X size={16} /></button>
          <div className="absolute bottom-3 left-3 flex gap-2">
            <span className="text-xs px-2 py-1 rounded-full" style={{ background: "rgba(0,0,0,0.6)", color: "#fff" }}>{property.type}</span>
            <span className="text-xs px-2 py-1 rounded-full capitalize" style={{ background: statusColors[property.status]?.split(" ")[0] || "rgba(0,0,0,0.4)", color: property.status === "available" ? "#10B981" : property.status === "sold" ? "#6366F1" : "#F59E0B" }}>
              {property.status}
            </span>
          </div>
        </div>
        {/* Header */}
        <div className="px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <h2 className="text-white font-semibold" style={{ fontFamily: "'Sora', sans-serif", fontSize: 18 }}>{property.name}</h2>
          <p className="text-sm mt-0.5 flex items-center gap-1" style={{ color: "#64748B" }}><MapPin size={12} />{property.address}</p>
        </div>
        {/* Tabs */}
        <div className="flex border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          {["Details", "Matched Leads", "Activity"].map(t => (
            <button key={t} onClick={() => setTab(t.toLowerCase().replace(" ", "_"))} className="px-4 py-3 text-xs font-medium border-b-2 transition-colors" style={{ borderColor: tab === t.toLowerCase().replace(" ", "_") ? "#10B981" : "transparent", color: tab === t.toLowerCase().replace(" ", "_") ? "#10B981" : "#64748B", fontFamily: "'DM Sans', sans-serif" }}>{t}</button>
          ))}
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {tab === "details" && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Price", value: formatBudget(property.price), color: "#10B981" },
                  { label: "BHK", value: `${property.bhk} BHK`, color: "#6366F1" },
                  { label: "Area", value: `${property.area} sqft`, color: "#F59E0B" },
                ].map(s => (
                  <div key={s.label} className="p-3 rounded-xl text-center" style={{ background: "rgba(255,255,255,0.04)" }}>
                    <p className="font-bold" style={{ color: s.color, fontFamily: "'Sora', sans-serif", fontSize: 16 }}>{s.value}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>{s.label}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm mb-2" style={{ color: "#94A3B8" }}>{property.description}</p>
              </div>
              <div>
                <p className="text-xs font-semibold mb-2" style={{ color: "#64748B" }}>AMENITIES</p>
                <div className="flex flex-wrap gap-2">
                  {(property.amenities ?? []).map(a => (
                    <span key={a} className="text-xs px-2.5 py-1 rounded-full" style={{ background: "rgba(16,185,129,0.1)", color: "#10B981", fontFamily: "'DM Sans', sans-serif" }}>✓ {a}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
          {tab === "matched_leads" && (
            <div className="space-y-2">
              <p className="text-sm mb-3" style={{ color: "#64748B" }}>{matchedLeads} leads matched this property's criteria</p>
              {matchedLeads > 0 ? Array.from({ length: Math.min(matchedLeads, 5) }, (_, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: colors[i % colors.length], fontFamily: "'Sora', sans-serif" }}>
                      {["AS", "KR", "RJ", "PM", "DK"][i]}
                    </div>
                    <div>
                      <p className="text-sm text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>{["Arjun Sharma", "Kavya Rao", "Rohit Joshi", "Priti Mehta", "Deepa Kumar"][i]}</p>
                      <p className="text-xs" style={{ color: "#64748B" }}>Budget: {formatBudget(property.price - 2000000)}–{formatBudget(property.price + 5000000)}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold" style={{ color: "#10B981", fontFamily: "'Sora', sans-serif" }}>{85 + i * 2}%</span>
                </div>
              )) : <p className="text-sm text-center py-8" style={{ color: "#475569" }}>No matched leads yet</p>}
            </div>
          )}
          {tab === "activity" && (
            <div className="text-center py-8">
              <p className="text-sm" style={{ color: "#475569" }}>No recent activity for this property</p>
            </div>
          )}
        </div>
        <div className="p-4 border-t flex gap-2" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <button onClick={() => { toast.success("Matching leads..."); onClose(); }} className="flex-1 py-2 rounded-lg text-sm text-white font-medium" style={{ background: "#10B981", fontFamily: "'DM Sans', sans-serif" }}>Match Leads</button>
          <button onClick={() => toast.info("Opening edit form...")} className="px-4 py-2 rounded-lg text-sm" style={{ background: "rgba(255,255,255,0.06)", color: "#94A3B8", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'DM Sans', sans-serif" }}>Edit</button>
        </div>
      </div>
    </div>
  );
}

export default function Properties() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [propertyList, setPropertyList] = useState<Property[]>([]);
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const data = await fetchJson<any>("/properties");
        const rawProps = data?.properties ?? data ?? [];
        setPropertyList(Array.isArray(rawProps) ? rawProps.map(normalizeProperty) : []);
      } catch (error) {
        console.error("Failed to load properties", error);
        toast.error("Unable to load properties from backend.");
      }
    };

    loadProperties();
  }, []);

  const filtered = propertyList.filter(p => {
    const matchType = typeFilter === "all" || p.type.toLowerCase() === typeFilter;
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.address.toLowerCase().includes(search.toLowerCase());
    return matchType && matchStatus && matchSearch;
  });

  return (
    <div className="p-4 md:p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-white" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 24 }}>Properties</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => toast.info("Importing from MLS...")} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm" style={{ background: "rgba(255,255,255,0.06)", color: "#94A3B8", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'DM Sans', sans-serif" }}>
            <Upload size={14} /> Import MLS
          </button>
          <button onClick={() => setShowAddForm(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white" style={{ background: "#10B981", fontFamily: "'DM Sans', sans-serif" }}>
            <Plus size={14} /> Add Property
          </button>
        </div>
        <AddPropertyModal open={showAddForm} onClose={() => setShowAddForm(false)} onPropertyAdded={(property) => setPropertyList((prev) => [property, ...prev])} />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <input placeholder="Search properties..." value={search} onChange={(e) => setSearch(e.target.value)} className="px-3 py-2 rounded-lg text-sm outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif", minWidth: 200 }} />
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-3 py-2 rounded-lg text-sm outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#94A3B8", fontFamily: "'DM Sans', sans-serif" }}>
          <option value="all">All Types</option>
          <option value="apartment">Apartment</option>
          <option value="villa">Villa</option>
          <option value="commercial">Commercial</option>
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-lg text-sm outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#94A3B8", fontFamily: "'DM Sans', sans-serif" }}>
          <option value="all">All Status</option>
          <option value="available">Available</option>
          <option value="sold">Sold</option>
          <option value="rented">Rented</option>
        </select>
        <div className="ml-auto flex gap-1">
          <button onClick={() => setViewMode("grid")} className="p-2 rounded-lg" style={{ background: viewMode === "grid" ? "rgba(16,185,129,0.12)" : "rgba(255,255,255,0.04)", color: viewMode === "grid" ? "#10B981" : "#64748B" }}><LayoutGrid size={16} /></button>
          <button onClick={() => setViewMode("list")} className="p-2 rounded-lg" style={{ background: viewMode === "list" ? "rgba(16,185,129,0.12)" : "rgba(255,255,255,0.04)", color: viewMode === "list" ? "#10B981" : "#64748B" }}><List size={16} /></button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((p, idx) => (
            <div
              key={p.id}
              className="rounded-xl overflow-hidden cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-xl"
              style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}
              onClick={() => setSelectedProperty(p)}
            >
              {/* Image */}
              <div className="h-36 relative flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${colors[idx % colors.length]}33, rgba(15,23,42,0.8))` }}>
                <span className="text-4xl">{p.type.toLowerCase() === "villa" ? "🏡" : p.type.toLowerCase() === "commercial" ? "🏢" : "🏠"}</span>
                <div className="absolute top-3 right-3 flex gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(0,0,0,0.6)", color: "#E2E8F0" }}>{p.bhk} BHK</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 px-3 py-2" style={{ background: "linear-gradient(to top, rgba(30,41,59,1), transparent)" }}>
                  <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${statusColors[p.status]}`} style={{ fontFamily: "'DM Sans', sans-serif" }}>{p.status}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold mb-1" style={{ fontFamily: "'Sora', sans-serif", fontSize: 15 }}>{p.name}</h3>
                <p className="text-xs mb-3 flex items-center gap-1" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif" }}>
                  <MapPin size={11} />{p.address.split(",").slice(0, 2).join(",")}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold" style={{ color: "#10B981", fontFamily: "'Sora', sans-serif", fontSize: 18 }}>{formatBudget(p.price)}</span>
                  <span className="text-xs" style={{ color: "#64748B" }}>{p.area} sqft</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: "#64748B" }}>{p.matchedLeads} matched leads</span>
                  <div className="flex gap-2">
                    <button onClick={(e) => { e.stopPropagation(); setSelectedProperty(p); }} className="text-xs px-2 py-1 rounded" style={{ background: "rgba(255,255,255,0.06)", color: "#94A3B8" }}>View</button>
                    <button onClick={(e) => { e.stopPropagation(); toast.success("Matching leads..."); }} className="text-xs px-2 py-1 rounded" style={{ background: "rgba(16,185,129,0.1)", color: "#10B981" }}>Match</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl overflow-hidden" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {["Property", "Type", "BHK", "Area", "Price", "Status", "Matched Leads", "Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#475569", fontFamily: "'DM Sans', sans-serif" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, idx) => (
                <tr key={p.id} className="hover:bg-white/[0.02] cursor-pointer transition-colors" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }} onClick={() => setSelectedProperty(p)}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0" style={{ background: `${colors[idx % colors.length]}22` }}>
                        {p.type.toLowerCase() === "villa" ? "🏡" : p.type.toLowerCase() === "commercial" ? "🏢" : "🏠"}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>{p.name}</p>
                        <p className="text-xs" style={{ color: "#64748B" }}>{p.address.split(",").slice(0, 2).join(",")}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#94A3B8" }}>{p.type}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#94A3B8" }}>{p.bhk}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#94A3B8" }}>{p.area} sqft</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: "#10B981", fontFamily: "'Sora', sans-serif", fontSize: 13 }}>{formatBudget(p.price)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${statusColors[p.status]}`}>{p.status}</span>
                  </td>
                  <td className="px-4 py-3 text-sm" style={{ color: "#94A3B8" }}>{p.matchedLeads}</td>
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <div className="flex gap-1">
                      <button onClick={() => setSelectedProperty(p)} className="text-xs px-2 py-1 rounded" style={{ background: "rgba(255,255,255,0.06)", color: "#94A3B8" }}>View</button>
                      <button onClick={() => toast.success("Matching...")} className="text-xs px-2 py-1 rounded" style={{ background: "rgba(16,185,129,0.1)", color: "#10B981" }}>Match</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedProperty && <PropertyModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />}
    </div>
  );
}
