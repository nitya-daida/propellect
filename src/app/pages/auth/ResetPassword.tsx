import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Eye, EyeOff, Lock, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setResetSuccess(true);
    toast.success("Password reset successfully!");
  };

  if (resetSuccess) {
    return (
      <div className="min-h-screen flex" style={{ background: "#0F172A", fontFamily: "'DM Sans', sans-serif" }}>
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-sm text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-500 flex items-center justify-center">
              <CheckCircle size={32} color="#fff" />
            </div>

            <h1 className="text-white text-2xl font-bold mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
              Password Reset Successful
            </h1>
            <p className="text-slate-300 mb-8 leading-relaxed">
              Your password has been successfully reset. You can now sign in with your new password.
            </p>

            <button
              onClick={() => navigate("/login")}
              className="w-full py-3 rounded-xl text-sm text-white font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: "#10B981", fontFamily: "'DM Sans', sans-serif" }}
            >
              Sign In Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen flex" style={{ background: "#0F172A", fontFamily: "'DM Sans', sans-serif" }}>
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-sm text-center">
            <h1 className="text-white text-2xl font-bold mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
              Invalid Reset Link
            </h1>
            <p className="text-slate-300 mb-8">
              This password reset link is invalid or has expired.
            </p>
            <button
              onClick={() => navigate("/forgot-password")}
              className="w-full py-3 rounded-xl text-sm text-white font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: "#10B981", fontFamily: "'DM Sans', sans-serif" }}
            >
              Request New Reset Link
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" style={{ background: "#0F172A", fontFamily: "'DM Sans', sans-serif" }}>
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <h1 className="text-white text-2xl font-bold mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>
            Reset your password
          </h1>
          <p className="text-slate-300 mb-8">
            Enter your new password below.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1.5 text-slate-300">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl text-sm outline-none transition-all"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1.5 text-slate-300">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl text-sm outline-none transition-all"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !formData.password || !formData.confirmPassword}
              className="w-full py-3 rounded-xl text-sm text-white font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ background: "#10B981", fontFamily: "'DM Sans', sans-serif" }}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Resetting password...
                </div>
              ) : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}