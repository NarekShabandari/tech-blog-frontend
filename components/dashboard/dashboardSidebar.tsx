"use client";

import { FileText, Settings, SquarePen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentType } from "react";

interface NavItem {
  href: string;
  label: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  enabled: boolean;
}

/**
 * Dashboard navigation. Only the "My posts" route is enabled for now;
 * "Settings" and "New post" are rendered as disabled placeholders.
 */
const navItems: NavItem[] = [
  { href: "/dashboard", label: "My posts", icon: FileText, enabled: true },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: Settings,
    enabled: false,
  },
  {
    href: "/dashboard/new",
    label: "New post",
    icon: SquarePen,
    enabled: false,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <nav aria-label="Dashboard">
      <h2 className="hidden md:block mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-(--muted)">
        Dashboard
      </h2>

      <ul className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-1 md:pb-0">
        {navItems.map(({ href, label, icon: Icon, enabled }) => {
          const isActive = enabled && pathname === href;

          const base =
            "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors whitespace-nowrap shrink-0 md:w-full";

          if (!enabled) {
            return (
              <li key={href} className="md:w-full">
                <span
                  aria-disabled="true"
                  role="link"
                  title={`${label} — Soon`}
                  className={`${base} cursor-not-allowed text-(--muted) opacity-50`}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                  <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider text-(--muted) rounded bg-(--subtle) px-1.5 py-0.5">
                    Soon
                  </span>
                </span>
              </li>
            );
          }

          return (
            <li key={href} className="md:w-full">
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`${base} ${
                  isActive
                    ? "bg-(--subtle) text-accent"
                    : "text-(--muted) hover:text-(--text) hover:bg-(--subtle)"
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
