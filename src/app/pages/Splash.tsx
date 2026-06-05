import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Phone } from "lucide-react";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="text-center">
        {/* Logo Animation */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto rounded-2xl bg-emerald-500 flex items-center justify-center shadow-2xl animate-pulse">
            <Phone size={48} color="#fff" strokeWidth={2.5} />
          </div>
          <div className="absolute inset-0 w-24 h-24 mx-auto rounded-2xl bg-emerald-400/20 animate-ping" />
        </div>

        {/* Brand */}
        <h1 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
          Propellect
        </h1>
        <p className="text-lg text-slate-300 mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          AI-Powered Real Estate Outreach
        </p>

        {/* Loading Animation */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>

        {/* Tagline */}
        <p className="text-sm text-slate-400 mt-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Loading your experience...
        </p>
      </div>
    </div>
  );
}