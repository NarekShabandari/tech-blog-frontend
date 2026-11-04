"use client";

import { useAppDispatch } from "@/hooks/queries/useAppDispatch";
import { postKeys } from "@/hooks/queries/usePosts";
import {
  apiClient,
  refreshSession,
  setAccessToken,
  setOnAuthFailure,
} from "@/lib/axios";
import {
  clearUser,
  setUser as setReduxUser,
  User,
} from "@/store/slices/authSlice";
import { useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  // Keeps the Redux auth slice in sync with this provider
  const setUser = useCallback(
    (next: User | null) => {
      setUserState(next);
      dispatch(next ? setReduxUser(next) : clearUser());
    },
    [dispatch],
  );

  const resetSession = useCallback(() => {
    setAccessToken(null);
    setUser(null);
    queryClient.removeQueries({ queryKey: postKeys.mine() });
  }, [setUser, queryClient]);

  // Restore the session from the refresh cookie on first load
  useEffect(() => {
    refreshSession()
      .then(({ user }) => setUser(user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [setUser]);

  // The axios interceptor calls this when a refresh fails mid-session
  useEffect(() => {
    setOnAuthFailure(resetSession);
    return () => {
      setOnAuthFailure(null);
    };
  }, [resetSession]);

  const login = useCallback(
    async (email: string, password: string) => {
      const { data } = await apiClient.post("/auth/login", { email, password });
      setAccessToken(data.accessToken);
      setUser(data.user);
      return data.user as User;
    },
    [setUser],
  );

  const logout = useCallback(async () => {
    // Clear the local session even if the request fails
    await apiClient.post("/auth/logout").catch(() => {});
    resetSession();
  }, [resetSession]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthentication = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
