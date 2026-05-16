import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "./contexts/AuthContext";
import { router } from "./routes";

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1E293B",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#E2E8F0",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
            },
          }}
          richColors
        />
      </AuthProvider>
    </ThemeProvider>
  );
}
