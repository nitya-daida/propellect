import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./components/layout/Layout";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Campaigns from "./pages/Campaigns";
import CampaignDetail from "./pages/CampaignDetail";
import Calls from "./pages/Calls";
import VoiceAgent from "./pages/VoiceAgent";
import Dialer from "./pages/Dialer";
import Analysis from "./pages/Analysis";
import FollowUp from "./pages/FollowUp";
import Properties from "./pages/Properties";
import Database from "./pages/Database";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Bot from "./pages/Bot";

import Splash from "./pages/Splash";
import Onboarding from "./pages/Onboarding";

import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute requireAuth={false}>
        <Splash />
      </ProtectedRoute>
    ),
  },

  {
    path: "/onboarding",
    element: (
      <ProtectedRoute requireAuth={true} requireOnboarding={false}>
        <Onboarding />
      </ProtectedRoute>
    ),
  },

  {
    path: "/login",
    element: (
      <ProtectedRoute requireAuth={false}>
        <Login />
      </ProtectedRoute>
    ),
  },

  {
    path: "/register",
    element: (
      <ProtectedRoute requireAuth={false}>
        <SignUp />
      </ProtectedRoute>
    ),
  },

  {
    path: "/forgot-password",
    element: (
      <ProtectedRoute requireAuth={false}>
        <ForgotPassword />
      </ProtectedRoute>
    ),
  },

  {
    path: "/reset-password",
    element: (
      <ProtectedRoute requireAuth={false}>
        <ResetPassword />
      </ProtectedRoute>
    ),
  },

  {
    path: "/",
    element: (
      <ProtectedRoute requireAuth={true} requireOnboarding={true}>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },

      { path: "dashboard", Component: Dashboard },
      { path: "leads", Component: Leads },

      { path: "campaigns", Component: Campaigns },
      { path: "campaigns/:id", Component: CampaignDetail },

      { path: "calls", Component: Calls },
      { path: "voice-agent", Component: VoiceAgent },
      { path: "dialer", Component: Dialer },
      { path: "bot", Component: Bot },
      { path: "analysis", Component: Analysis },
      { path: "follow-up", Component: FollowUp },

      { path: "properties", Component: Properties },
      { path: "database", Component: Database },
      { path: "bot", Component: Bot },
      { path: "settings", Component: Settings },
      { path: "profile", Component: Profile },
    ],
  },
]);