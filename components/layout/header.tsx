"use client";
import { useAuth } from "@/hooks/queries/useAuth";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { LanguageSwitcher } from "../ui/languageSwitch";
import Logo from "../ui/logo";
import { ThemeToggle } from "../ui/themeToggle";
import { useLogout } from "@/hooks/queries/useLogout";

export function Header() {
  const t = useTranslations("nav");
  const { isLoggedIn } = useAuth();
  const { mutate: logout } = useLogout();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-(--border) bg-(--surface)/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        <Logo />

        <div className="hidden md:flex gap-6 ">
          <nav className="md:flex items-center gap-6">
            {[
              { href: "/", label: t("blog") },
              { href: "/about", label: t("about") },
            ]
              .concat(
                !isLoggedIn ? [{ href: "/login", label: t("login") }] : [],
              )
              .map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm font-medium text-(--muted) hover:text-(--text) transition-colors"
                >
                  {label}
                </Link>
              ))}
          </nav>
          {isLoggedIn && (
            <button
              className=" text-sm font-medium text-(--muted) hover:text-(--text) transition-colors cursor-pointer"
              onClick={() => logout()}
            >
              {t("logout")}
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* <button
            aria-label="Search"
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-(--border) bg-(--subtle) text-(--muted) hover:text-(--text) transition-colors"
          >
            <Search size={16} />
          </button> */}
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
