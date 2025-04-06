import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  supabase,
  supabaseService,
  UserData,
} from "../services/supabaseService";

type User = {
  id?: string;
  name?: string;
  email: string;
  needsOnboarding?: boolean;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  completeOnboarding: () => void;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is authenticated on mount
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    if (authStatus) {
      const userId = localStorage.getItem("userId") || undefined;
      const userName = localStorage.getItem("userName") || undefined;
      const userEmail = localStorage.getItem("userEmail") || "";
      const needsOnboarding =
        localStorage.getItem("needsOnboarding") === "true";
      setUser({
        id: userId,
        name: userName,
        email: userEmail,
        needsOnboarding,
      });
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // In a real app, this would validate credentials with an API
      // For now, we'll simulate a successful login if email and password are provided
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Check if user exists in Supabase
      const { data: userData, error: userError } =
        await supabaseService.getUserByEmail(email);

      if (userError) {
        console.error("Error fetching user:", userError);
        throw new Error("Login failed");
      }

      if (!userData) {
        throw new Error("User not found");
      }

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userId", userData.id);
      localStorage.setItem("userName", userData.name || "");
      localStorage.setItem("userEmail", email);
      localStorage.setItem(
        "needsOnboarding",
        userData.needs_onboarding ? "true" : "false",
      );

      setUser({
        id: userData.id,
        name: userData.name,
        email: email,
        needsOnboarding: userData.needs_onboarding,
      });
      setIsAuthenticated(true);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      throw err;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      // Validate input
      if (!name || !email || !password) {
        throw new Error("Name, email, and password are required");
      }

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Generate a unique ID for the user (in a real app, this would come from auth)
      const userId = `user_${Date.now()}`;

      // Create user in Supabase
      const { data: userData, error: createError } =
        await supabaseService.createUser({
          id: userId,
          name,
          email,
          needs_onboarding: true,
        });

      if (createError) {
        console.error("Error creating user in database:", createError);
        throw new Error("Failed to create user account");
      }

      // Store in localStorage
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userId", userId);
      localStorage.setItem("userName", name);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("needsOnboarding", "true");

      // Update state
      setUser({ id: userId, name, email, needsOnboarding: true });
      setIsAuthenticated(true);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
      throw err;
    }
  };

  const completeOnboarding = () => {
    if (user && user.id) {
      // Update local storage
      localStorage.setItem("needsOnboarding", "false");

      // Update user in Supabase
      supabaseService
        .updateUserAfterOnboarding(user.id, {
          needs_onboarding: false,
        })
        .catch((err) => {
          console.error("Error updating user onboarding status:", err);
        });

      // Update local state
      setUser({ ...user, needsOnboarding: false });
    }
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("needsOnboarding");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        signup,
        logout,
        completeOnboarding,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Export as a named constant to avoid Fast Refresh issues
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
