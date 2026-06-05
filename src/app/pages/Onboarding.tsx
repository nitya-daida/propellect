import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronRight, Phone, Users, BarChart3, Zap, Check } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const onboardingSteps = [
  {
    id: 1,
    title: "Welcome to Propellect",
    subtitle: "Your AI-powered real estate outreach platform",
    description: "Connect with more leads, close more deals, and grow your business with intelligent automation.",
    icon: Phone,
    color: "emerald",
  },
  {
    id: 2,
    title: "Smart Lead Management",
    subtitle: "Organize and prioritize your prospects",
    description: "Our AI analyzes lead data to score prospects and suggest the best outreach strategies.",
    icon: Users,
    color: "blue",
  },
  {
    id: 3,
    title: "Advanced Analytics",
    subtitle: "Track performance and optimize results",
    description: "Get detailed insights into your campaigns, calls, and conversions with comprehensive analytics.",
    icon: BarChart3,
    color: "purple",
  },
  {
    id: 4,
    title: "AI Voice Agents",
    subtitle: "Never miss a lead again",
    description: "Our intelligent voice agents handle initial outreach, qualify leads, and schedule appointments 24/7.",
    icon: Zap,
    color: "orange",
  },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const { completeOnboarding } = useAuth();

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
      navigate("/dashboard");
    }
  };

  const handleSkip = () => {
    completeOnboarding();
    navigate("/dashboard");
  };

  const step = onboardingSteps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index <= currentStep ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-600"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 text-center">
          {/* Icon */}
          <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-${step.color}-100 dark:bg-${step.color}-900/20 flex items-center justify-center`}>
            <step.icon className={`w-8 h-8 text-${step.color}-600 dark:text-${step.color}-400`} />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>
            {step.title}
          </h1>

          {/* Subtitle */}
          <h2 className="text-lg text-slate-600 dark:text-slate-300 mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {step.subtitle}
          </h2>

          {/* Description */}
          <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {step.description}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleSkip}
              className="flex-1 py-3 px-6 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Skip
            </button>
            <button
              onClick={handleNext}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-6 rounded-xl font-semibold transition-all hover:shadow-lg flex items-center justify-center gap-2"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {currentStep === onboardingSteps.length - 1 ? (
                <>
                  <Check size={18} />
                  Get Started
                </>
              ) : (
                <>
                  Next
                  <ChevronRight size={18} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Step Counter */}
        <div className="text-center mt-6">
          <span className="text-sm text-slate-500 dark:text-slate-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {currentStep + 1} of {onboardingSteps.length}
          </span>
        </div>
      </div>
    </div>
  );
}