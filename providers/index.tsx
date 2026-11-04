"use client";

import { AuthProvider } from "./AuthProvider";
import { QueryProvider } from "./QueryProvider";
import { ReduxProvider } from "./ReduxProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <QueryProvider>
        <AuthProvider>{children}</AuthProvider>
      </QueryProvider>
    </ReduxProvider>
  );
}
