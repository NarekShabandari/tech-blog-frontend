"use client";

import Card from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { Moon } from "lucide-react";

export default function SettingsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-(--text)">Settings</h1>
        <p className="mt-1 text-sm text-(--muted)">
          Manage your preferences and account settings
        </p>
      </div>

      <div className="max-w-2xl space-y-4">
        <Card>
          <h2 className="text-lg font-semibold text-(--text) mb-4">
            Appearance
          </h2>
          
          <div className="flex items-center justify-between py-3 border-b border-(--border) last:border-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-(--subtle) flex items-center justify-center text-(--muted)">
                <Moon size={18} />
              </div>
              <div>
                <div className="font-medium text-(--text)">Theme</div>
                <div className="text-sm text-(--muted)">
                  Choose between light and dark mode
                </div>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </Card>
      </div>
    </div>
  );
}
