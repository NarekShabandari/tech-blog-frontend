import { useAuthentication } from "@/providers/AuthProvider";

/** Convenience wrapper around the AuthProvider session state. */
export function useAuth() {
  const { user, loading } = useAuthentication();

  return {
    user,
    isLoggedIn: !!user,
    isLoading: loading,
  };
}
