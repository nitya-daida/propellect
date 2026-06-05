import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setEmailSent(true);
    toast.success("Password reset email sent!");
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex" style={{ background: "#0F172A", fontFamily: "'DM Sans', sans-serif" }}>
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-sm text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-500 flex items-center justify-center">
              <CheckCircle size={32} color="#fff" />
            </div>

            <h1 className="text-white text-2xl font-bold mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
              Check your email
            </h1>
            <p className="text-slate-300 mb-8 leading-relaxed">
              We've sent a password reset link to <strong className="text-white">{email}</strong>
            </p>

            <button
              onClick={() => navigate("/login")}
              className="w-full py-3 rounded-xl text-sm text-white font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: "#10B981", fontFamily: "'DM Sans', sans-serif" }}
            >
              Back to Sign In
            </button>

            <p className="text-center text-sm mt-6 text-slate-400">
              Didn't receive the email?{" "}
              <button
                onClick={() => setEmailSent(false)}
                className="text-emerald-400 hover:text-emerald-300"
              >
                Try again
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" style={{ background: "#0F172A", fontFamily: "'DM Sans', sans-serif" }}>
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Sign In
          </button>

          <h1 className="text-white text-2xl font-bold mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>
            Forgot your password?
          </h1>
          <p className="text-slate-300 mb-8">
            No worries! Enter your email address and we'll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1.5 text-slate-300">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rajesh@propellect.com"
                  className="w-full px-4 py-3 pr-12 rounded-xl text-sm outline-none transition-all"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif" }}
                />
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !email}
              className="w-full py-3 rounded-xl text-sm text-white font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ background: "#10B981", fontFamily: "'DM Sans', sans-serif" }}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending reset link...
                </div>
              ) : "Send Reset Link"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}