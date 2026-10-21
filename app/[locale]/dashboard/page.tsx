"use client";

import { BlogGrid } from "@/components/blog/blogGrid";
import { useMyPosts } from "@/hooks/queries/usePosts";
import { useTranslations } from "next-intl";

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  const { data: posts, isLoading } = useMyPosts();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-(--text)">
          {t("myPosts.title")}
        </h1>
        <p className="mt-1 text-sm text-(--muted)">{t("myPosts.subtitle")}</p>
      </div>

      {isLoading ? (
        <p className="text-(--muted)">{t("myPosts.loading")}</p>
      ) : posts?.length ? (
        <BlogGrid posts={posts} />
      ) : (
        <div className="rounded-xl border border-dashed border-(--border) p-12 text-center">
          <p className="text-(--muted)">{t("myPosts.empty")}</p>
        </div>
      )}
    </div>
  );
}
