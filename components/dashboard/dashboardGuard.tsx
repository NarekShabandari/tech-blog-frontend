"use client";

import { useAuth } from "@/hooks/queries/useAuth";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Protects the dashboard routes. While auth is being verified it renders a
 * loading state; if the user turns out to be unauthenticated it redirects to
 * the login page. Otherwise it renders the dashboard shell.
 */
export function DashboardGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-(--muted)">
          <LoaderCircle className="animate-spin" size={20} />
          <span className="text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
