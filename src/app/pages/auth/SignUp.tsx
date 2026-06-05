import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff, Phone } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../../contexts/AuthContext";

export default function SignUp() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: false }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, boolean> = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = true;
    });

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = true;
      newErrors.password = true;
    }

    if (!agreeToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    const success = await signup(formData);
    setLoading(false);
    if (!success) {
      toast.error("Failed to create account");
      return;
    }
    toast.success("Account created successfully! Welcome to Propellect!");
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#0F172A", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Left Panel */}
      <div className="hidden lg:flex flex-1 flex-col items-center justify-center p-12 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)" }}>
        {/* Animated background circles */}
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full opacity-10 animate-pulse" style={{ background: "#10B981", filter: "blur(60px)" }} />
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full opacity-10 animate-pulse" style={{ background: "#6366F1", filter: "blur(80px)", animationDelay: "1s" }} />

        <div className="relative z-10 text-center max-w-md">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "#10B981" }}>
              <Phone size={24} color="#fff" strokeWidth={2.5} />
            </div>
            <span className="text-white text-3xl font-bold" style={{ fontFamily: "'Sora', sans-serif" }}>Propellect</span>
          </div>

          {/* Animated waveform */}
          <div className="flex items-center justify-center gap-1 mb-8 h-16">
            {Array.from({ length: 32 }, (_, i) => (
              <div
                key={i}
                className="rounded-full"
                style={{
                  width: 4,
                  background: i % 3 === 0 ? "#10B981" : i % 3 === 1 ? "#6366F1" : "#F59E0B",
                  animation: `wave ${0.8 + i * 0.05}s ease-in-out infinite alternate`,
                  animationDelay: `${i * 0.04}s`,
                  height: `${16 + Math.sin(i * 0.5) * 20 + 20}px`,
                  opacity: 0.7,
                }}
              />
            ))}
          </div>

          <h2 className="text-white text-3xl font-bold mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
            AI-Powered Real Estate Calling
          </h2>
          <p className="text-lg leading-relaxed mb-8" style={{ color: "#64748B" }}>
            Propellect helps real estate teams close more deals with intelligent AI voice agents, smart lead scoring, and automated follow-ups.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: "10M+", label: "Calls Made" },
              { value: "34%", label: "Higher Conversion" },
              { value: "500+", label: "Teams Trust Us" },
            ].map(s => (
              <div key={s.label} className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <p className="text-2xl font-bold" style={{ color: "#10B981", fontFamily: "'Sora', sans-serif" }}>{s.value}</p>
                <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes wave {
            from { transform: scaleY(0.5); }
            to { transform: scaleY(1); }
          }
        `}</style>
      </div>

      {/* Right Panel */}
      <div className="flex-1 lg:max-w-md flex flex-col items-center justify-center p-8">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#10B981" }}>
            <Phone size={16} color="#fff" />
          </div>
          <span className="text-white text-xl font-bold" style={{ fontFamily: "'Sora', sans-serif" }}>Propellect</span>
        </div>

        <div className="w-full max-w-sm">
          <h1 className="text-white text-2xl font-bold mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>Create your account</h1>
          <p className="mb-8" style={{ color: "#64748B" }}>Join Propellect and start closing more deals</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#94A3B8" }}>First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  placeholder="John"
                  className={`w-full px-4 py-3 rounded-xl text-sm outline-none transition-all ${errors.firstName ? "animate-shake" : ""}`}
                  style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${errors.firstName ? "#EF4444" : "rgba(255,255,255,0.1)"}`, color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#94A3B8" }}>Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  placeholder="Doe"
                  className={`w-full px-4 py-3 rounded-xl text-sm outline-none transition-all ${errors.lastName ? "animate-shake" : ""}`}
                  style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${errors.lastName ? "#EF4444" : "rgba(255,255,255,0.1)"}`, color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1.5" style={{ color: "#94A3B8" }}>Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="john.doe@propellect.com"
                className={`w-full px-4 py-3 rounded-xl text-sm outline-none transition-all ${errors.email ? "animate-shake" : ""}`}
                style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${errors.email ? "#EF4444" : "rgba(255,255,255,0.1)"}`, color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}
              />
            </div>
            <div>
              <label className="block text-sm mb-1.5" style={{ color: "#94A3B8" }}>Password</label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 pr-12 rounded-xl text-sm outline-none transition-all ${errors.password ? "animate-shake" : ""}`}
                  style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${errors.password ? "#EF4444" : "rgba(255,255,255,0.1)"}`, color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: "#64748B" }}>
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1.5" style={{ color: "#94A3B8" }}>Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPwd ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 pr-12 rounded-xl text-sm outline-none transition-all ${errors.confirmPassword ? "animate-shake" : ""}`}
                  style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${errors.confirmPassword ? "#EF4444" : "rgba(255,255,255,0.1)"}`, color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}
                />
                <button type="button" onClick={() => setShowConfirmPwd(!showConfirmPwd)} className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: "#64748B" }}>
                  {showConfirmPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {(errors.password || errors.confirmPassword) && (
              <p className="text-sm" style={{ color: "#EF4444" }}>Passwords do not match.</p>
            )}

            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" checked={agreeToTerms} onChange={(e) => setAgreeToTerms(e.target.checked)} className="accent-emerald-500 mt-0.5" />
              <span className="text-sm" style={{ color: "#64748B" }}>
                I agree to the{" "}
                <button type="button" className="underline" style={{ color: "#10B981" }}>Terms of Service</button>{" "}
                and{" "}
                <button type="button" className="underline" style={{ color: "#10B981" }}>Privacy Policy</button>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm text-white font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ background: "#10B981", fontFamily: "'DM Sans', sans-serif" }}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating account...
                </div>
              ) : "Create Account"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.1)" }} />
            <span className="text-xs" style={{ color: "#475569" }}>or</span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.1)" }} />
          </div>

          <button
            onClick={() => { toast.info("Redirecting to Google OAuth..."); setTimeout(() => navigate("/dashboard"), 800); }}
            className="w-full py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all hover:bg-white/10"
            style={{ background: "rgba(255,255,255,0.06)", color: "#E2E8F0", border: "1px solid rgba(255,255,255,0.1)", fontFamily: "'DM Sans', sans-serif" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>

          <p className="text-center text-sm mt-6" style={{ color: "#64748B" }}>
            Already have an account?{" "}
            <button onClick={() => navigate("/login")} className="font-semibold" style={{ color: "#10B981" }}>
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}