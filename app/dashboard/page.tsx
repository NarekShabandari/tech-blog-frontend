"use client";

import { BlogGrid } from "@/components/blog/blogGrid";
import { useMyPosts } from "@/hooks/queries/usePosts";

export default function DashboardPage() {
  const { data: posts, isLoading } = useMyPosts();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-(--text)">My posts</h1>
        <p className="mt-1 text-sm text-(--muted)">Posts you have authored</p>
      </div>

      {isLoading ? (
        <p className="text-(--muted)">Loading your posts...</p>
      ) : posts?.length ? (
        <BlogGrid posts={posts} />
      ) : (
        <div className="rounded-xl border border-dashed border-(--border) p-12 text-center">
          <p className="text-(--muted)">You haven&apos;t published any posts yet.</p>
        </div>
      )}
    </div>
  );
}
