import { apiClient } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface UpdatePostInput {
  id: string;
  title?: string;
  content?: string;
  published?: boolean;
}

interface GeneratePostInput {
  topic: string;
  targetKeyword: string;
  audience?: string;
}

export const postKeys = {
  all: ["posts"] as const,
  lists: () => [...postKeys.all, "list"] as const,
  list: (f: object) => [...postKeys.lists(), f] as const,
  detail: (slug: string) => [...postKeys.all, "detail", slug] as const,
};

export function usePosts(params?: { category?: string; search?: string }) {
  return useQuery({
    queryKey: postKeys.list(params ?? {}),
    queryFn: async () => {
      const { data } = await apiClient.get("/posts", { params });
      return data.posts;
    },
    staleTime: 60_000,
  });
}

export function useMyPosts(params?: { category?: string; search?: string }) {
  return useQuery({
    queryKey: postKeys.list(params ?? {}),
    queryFn: async () => {
      const { data } = await apiClient.get("/posts/my", { params });
      return data.posts;
    },
    staleTime: 60_000,
  });
}

export function usePost(slug: string) {
  return useQuery({
    queryKey: postKeys.detail(slug),
    queryFn: async () => {
      const { data } = await apiClient.get(`/posts/${slug}`);
      return data.post;
    },
    enabled: !!slug,
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...body }: UpdatePostInput) => {
      const { data } = await apiClient.patch(`/posts/${id}`, body);
      return data.post;
    },
    onSuccess: (post) => {
      queryClient.invalidateQueries({ queryKey: postKeys.detail(post.slug) });
      queryClient.invalidateQueries({ queryKey: postKeys.all });
    },
  });
}

export function useGeneratePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: GeneratePostInput) => {
      const { data } = await apiClient.post("/posts/generate", body);
      return data.post;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.all });
    },
  });
}
