import { useState } from "react";
import { Camera, Check, Eye, EyeOff, QrCode } from "lucide-react";
import { toast } from "sonner";

export default function Profile() {
  const [showOldPwd, setShowOldPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfPwd, setShowConfPwd] = useState(false);
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "Nitya",
    lastName: "Daida",
    email: "nityadaida.d@callaihm.com",
    phone: "+91 98765 43210",
    timezone: "Asia/Kolkata (IST)",
    language: "English",
  });
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confPwd, setConfPwd] = useState("");

  const pwdStrength = !newPwd ? 0 : newPwd.length < 6 ? 1 : newPwd.length < 10 ? 2 : 3;
  const strengthLabels = ["", "Weak", "Fair", "Strong"];
  const strengthColors = ["", "#EF4444", "#F59E0B", "#10B981"];

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-2xl">
      <h1 className="text-white" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 24 }}>Profile</h1>

      {/* Avatar */}
      <div className="rounded-xl p-6" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl" style={{ background: "#6366F1", fontFamily: "'Sora', sans-serif" }}>
              ND
            </div>
            <button onClick={() => toast.info("Opening photo picker...")} className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#10B981" }}>
              <Camera size={13} color="#fff" />
            </button>
          </div>
          <div>
            <h2 className="text-white font-bold text-xl" style={{ fontFamily: "'Sora', sans-serif" }}>Nitya Daida</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm" style={{ color: "#64748B" }}>nityadaida.d@gmail.com</span>
              <span className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1" style={{ background: "rgba(16,185,129,0.15)", color: "#10B981" }}>
                <Check size={10} /> Verified
              </span>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full mt-2 inline-block" style={{ background: "rgba(99,102,241,0.15)", color: "#6366F1" }}>Admin</span>
          </div>
        </div>
      </div>

      {/* Personal Info */}
      <div className="rounded-xl p-5" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
        <h2 className="text-white font-semibold mb-4" style={{ fontFamily: "'Sora', sans-serif", fontSize: 16 }}>Personal Information</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {[
            { label: "First Name", key: "firstName" },
            { label: "Last Name", key: "lastName" },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-sm mb-1.5" style={{ color: "#94A3B8" }}>{f.label}</label>
              <input value={formData[f.key as keyof typeof formData]} onChange={(e) => setFormData(d => ({ ...d, [f.key]: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }} />
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1.5" style={{ color: "#94A3B8" }}>Email Address</label>
            <input value={formData.email} onChange={(e) => setFormData(d => ({ ...d, email: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }} />
          </div>
          <div>
            <label className="block text-sm mb-1.5" style={{ color: "#94A3B8" }}>Phone Number</label>
            <input value={formData.phone} onChange={(e) => setFormData(d => ({ ...d, phone: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1.5" style={{ color: "#94A3B8" }}>Timezone</label>
              <select value={formData.timezone} onChange={(e) => setFormData(d => ({ ...d, timezone: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}>
                <option>Asia/Kolkata (IST)</option>
                <option>Asia/Dubai (GST)</option>
                <option>America/New_York (EST)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1.5" style={{ color: "#94A3B8" }}>Language</label>
              <select value={formData.language} onChange={(e) => setFormData(d => ({ ...d, language: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}>
                <option>English</option>
                <option>Hindi</option>
                <option>Telugu</option>
                <option>Tamil</option>
              </select>
            </div>
          </div>
        </div>
        <button onClick={() => toast.success("Profile updated!")} className="mt-4 px-5 py-2 rounded-lg text-sm text-white" style={{ background: "#10B981", fontFamily: "'DM Sans', sans-serif" }}>Save Changes</button>
      </div>

      {/* Change Password */}
      <div className="rounded-xl p-5" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
        <h2 className="text-white font-semibold mb-4" style={{ fontFamily: "'Sora', sans-serif", fontSize: 16 }}>Change Password</h2>
        <div className="space-y-4">
          {[
            { label: "Current Password", val: oldPwd, set: setOldPwd, show: showOldPwd, setShow: setShowOldPwd },
            { label: "New Password", val: newPwd, set: setNewPwd, show: showNewPwd, setShow: setShowNewPwd },
            { label: "Confirm New Password", val: confPwd, set: setConfPwd, show: showConfPwd, setShow: setShowConfPwd },
          ].map((f, i) => (
            <div key={i}>
              <label className="block text-sm mb-1.5" style={{ color: "#94A3B8" }}>{f.label}</label>
              <div className="relative">
                <input
                  type={f.show ? "text" : "password"}
                  value={f.val}
                  onChange={(e) => f.set(e.target.value)}
                  className="w-full pr-10 px-3 py-2.5 rounded-lg text-sm outline-none"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}
                />
                <button onClick={() => f.setShow(!f.show)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#64748B" }}>
                  {f.show ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              {i === 1 && newPwd && (
                <div className="mt-1.5">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3].map(l => (
                      <div key={l} className="flex-1 h-1 rounded-full" style={{ background: pwdStrength >= l ? strengthColors[pwdStrength] : "rgba(255,255,255,0.1)" }} />
                    ))}
                  </div>
                  <span className="text-xs" style={{ color: strengthColors[pwdStrength] }}>{strengthLabels[pwdStrength]}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <button onClick={() => { if (!oldPwd || !newPwd || newPwd !== confPwd) { toast.error("Please check your passwords"); return; } toast.success("Password changed!"); setOldPwd(""); setNewPwd(""); setConfPwd(""); }} className="mt-4 px-5 py-2 rounded-lg text-sm text-white" style={{ background: "#10B981", fontFamily: "'DM Sans', sans-serif" }}>
          Update Password
        </button>
      </div>

      {/* 2FA */}
      <div className="rounded-xl p-5" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-white font-semibold" style={{ fontFamily: "'Sora', sans-serif", fontSize: 16 }}>Two-Factor Authentication</h2>
          <div className="w-10 h-5 rounded-full relative cursor-pointer transition-colors" style={{ background: twoFAEnabled ? "#10B981" : "rgba(255,255,255,0.1)" }} onClick={() => { setTwoFAEnabled(!twoFAEnabled); if (!twoFAEnabled) setShowQR(true); }}>
            <div className="w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all" style={{ left: twoFAEnabled ? 22 : 2 }} />
          </div>
        </div>
        <p className="text-sm mb-4" style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif" }}>Add an extra layer of security to your account using a TOTP authenticator app like Google Authenticator.</p>
        {showQR && (
          <div className="p-4 rounded-xl text-center" style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}>
            <QrCode size={64} className="mx-auto mb-3" style={{ color: "#6366F1" }} />
            <p className="text-sm font-semibold text-white mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Scan with Google Authenticator</p>
            <p className="text-xs mb-3" style={{ color: "#64748B" }}>Or enter the key manually: <code className="text-emerald-400">JBSWY3DPEHPK3PXP</code></p>
            <input placeholder="Enter 6-digit code..." className="px-3 py-2 rounded-lg text-sm text-center outline-none mb-3 w-40" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }} />
            <br />
            <button onClick={() => { toast.success("2FA enabled! ✓"); setShowQR(false); }} className="px-5 py-2 rounded-lg text-sm text-white" style={{ background: "#6366F1", fontFamily: "'DM Sans', sans-serif" }}>Verify & Enable</button>
          </div>
        )}
      </div>

      {/* Connected Accounts */}
      <div className="rounded-xl p-5" style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}>
        <h2 className="text-white font-semibold mb-4" style={{ fontFamily: "'Sora', sans-serif", fontSize: 16 }}>Connected Accounts</h2>
        <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(234,67,53,0.15)" }}>
              <span className="text-xl">G</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>Google</p>
              <p className="text-xs" style={{ color: "#64748B" }}>nityadaida.d@gmail.com</p>
            </div>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1" style={{ background: "rgba(16,185,129,0.15)", color: "#10B981" }}>
            <Check size={10} /> Connected
          </span>
        </div>
      </div>
    </div>
  );
}
