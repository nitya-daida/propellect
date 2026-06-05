import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: any) => Promise<boolean>;
  logout: () => void;
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("propellect_user");
    const storedOnboarding = localStorage.getItem("propellect_onboarding_completed");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }

    if (storedOnboarding === "true") {
      setHasCompletedOnboarding(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (password === "wrong") {
      return false;
    }

    const userData = {
      id: "1",
      email,
      name: "Nitya Daida",
      role: "Admin"
    };

    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("propellect_user", JSON.stringify(userData));
    return true;
  };

  const signup = async (userData: any): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newUser = {
      id: Date.now().toString(),
      email: userData.email,
      name: `${userData.firstName} ${userData.lastName}`,
      role: "Agent"
    };

    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem("propellect_user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setHasCompletedOnboarding(false);
    localStorage.removeItem("propellect_user");
    localStorage.removeItem("propellect_onboarding_completed");
  };

  const completeOnboarding = () => {
    setHasCompletedOnboarding(true);
    localStorage.setItem("propellect_onboarding_completed", "true");
  };

  const value = {
    isAuthenticated,
    user,
    login,
    signup,
    logout,
    hasCompletedOnboarding,
    completeOnboarding,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};