import { apiClient } from "@/lib/axios";
import { clearUser } from "@/store/slices/authSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "./useAppDispatch";

export function useLogout() {
  const router = useRouter();
  const locale = useLocale();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async () => {
      await apiClient.post("/auth/logout");
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["auth", "me"] });
      dispatch(clearUser());
      router.replace(`/${locale}/`);
    },
  });
}
