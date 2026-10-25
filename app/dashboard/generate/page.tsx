"use client";

import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import { useGeneratePost } from "@/hooks/queries/usePosts";
import { AlertCircle, CheckCircle2, Heading, Tag, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const iconClass = "absolute left-3 top-1/2 -translate-y-1/2 text-(--muted)";

export default function GeneratePostPage() {
  const {
    mutate: generate,
    data: post,
    isPending,
    isError,
    isSuccess,
    error,
  } = useGeneratePost();

  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState("");
  const [audience, setAudience] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generate({
      topic: title.trim(),
      targetKeyword: keywords.trim(),
      audience: audience.trim() || undefined,
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const apiError = (error as any)?.response?.data?.error;
  const errorMessage =
    typeof apiError === "string"
      ? apiError
      : Array.isArray(apiError)
        ? apiError.map((issue) => `${issue.path?.join(".")}: ${issue.message}`).join(", ")
        : "Failed to generate post";

  const isValid = title.trim().length >= 10 && keywords.trim().length >= 3;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-(--text)">Generate post</h1>
        <p className="mt-1 text-sm text-(--muted)">
          Create an AI-drafted post. It is saved unpublished and sent for
          approval.
        </p>
      </div>

      <div className="max-w-xl">
        <Card>
          {isError && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm mb-5">
              <AlertCircle size={15} className="shrink-0" />
              {errorMessage}
            </div>
          )}

          {isSuccess && post && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm mb-5">
              <CheckCircle2 size={15} className="shrink-0" />
              <span>
                Post generated:{" "}
                <Link href={`/blog/${post.slug}`} className="font-semibold underline">
                  {post.title}
                </Link>
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Title"
              icon={<Heading size={15} className={iconClass} />}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Why TypeScript matters for backends"
              minLength={10}
              maxLength={200}
              required
            />

            <Input
              label="Keywords"
              icon={<Tag size={15} className={iconClass} />}
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="typescript nodejs backend"
              minLength={3}
              maxLength={100}
              required
            />

            <Input
              label="Target audience"
              icon={<Users size={15} className={iconClass} />}
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="backend developers"
            />

            <Button type="submit" disabled={isPending || !isValid}>
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </span>
              ) : (
                "Generate"
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
