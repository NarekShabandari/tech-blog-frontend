"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { FileText, Settings, SquarePen } from "lucide-react";
import { useTranslations } from "next-intl";
import { ComponentType } from "react";

interface NavItem {
  href: string;
  labelKey: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  enabled: boolean;
}

/**
 * Dashboard navigation. Only the "My posts" route is enabled for now;
 * "Settings" and "New post" are rendered as disabled placeholders.
 */
const navItems: NavItem[] = [
  { href: "/dashboard", labelKey: "nav.myPosts", icon: FileText, enabled: true },
  {
    href: "/dashboard/settings",
    labelKey: "nav.settings",
    icon: Settings,
    enabled: false,
  },
  {
    href: "/dashboard/new",
    labelKey: "nav.newPost",
    icon: SquarePen,
    enabled: false,
  },
];

export function DashboardSidebar() {
  const t = useTranslations("dashboard");
  const pathname = usePathname();

  return (
    <nav aria-label={t("title")}>
      <h2 className="hidden md:block mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-(--muted)">
        {t("title")}
      </h2>

      <ul className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-1 md:pb-0">
        {navItems.map(({ href, labelKey, icon: Icon, enabled }) => {
          const isActive = enabled && pathname === href;
          const label = t(labelKey);

          const base =
            "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors whitespace-nowrap shrink-0 md:w-full";

          if (!enabled) {
            return (
              <li key={href} className="md:w-full">
                <span
                  aria-disabled="true"
                  role="link"
                  title={`${label} — ${t("comingSoon")}`}
                  className={`${base} cursor-not-allowed text-(--muted) opacity-50`}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                  <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider text-(--muted) rounded bg-(--subtle) px-1.5 py-0.5">
                    {t("comingSoon")}
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
