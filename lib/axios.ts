import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// The access token lives only in memory; the refresh token is an httpOnly cookie
let accessToken: string | null = null;
export const setAccessToken = (t: string | null) => (accessToken = t);

// Lets the AuthProvider know when the session could not be refreshed
let onAuthFailure: (() => void) | null = null;
export const setOnAuthFailure = (fn: (() => void) | null) =>
  (onAuthFailure = fn);

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

export interface RefreshResponse {
  accessToken: string;
  user: { id: string; email: string; username: string };
}

let refreshPromise: Promise<RefreshResponse> | null = null;

/**
 * Exchanges the refresh cookie for a new access token. Concurrent callers share
 * a single request, since the backend rotates the refresh token on every use.
 */
export const refreshSession = () =>
  (refreshPromise ??= apiClient
    .post<RefreshResponse>("/auth/refresh")
    .then((r) => {
      setAccessToken(r.data.accessToken);
      return r.data;
    })
    .finally(() => (refreshPromise = null)));

// Endpoints where a 401 means "bad credentials / no session", not "token expired"
const NO_REFRESH_URLS = [
  "/auth/login",
  "/auth/register",
  "/auth/refresh",
  "/auth/logout",
];

apiClient.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;
    const skipRefresh = NO_REFRESH_URLS.some((u) => original?.url?.includes(u));

    if (
      original &&
      error.response?.status === 401 &&
      !original._retry &&
      !skipRefresh
    ) {
      original._retry = true;
      try {
        const { accessToken: newToken } = await refreshSession();
        original.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(original);
      } catch {
        setAccessToken(null);
        onAuthFailure?.();
      }
    }
    return Promise.reject(error);
  },
);

export const getErrorMessage = (error: unknown, fallback: string) =>
  (axios.isAxiosError(error) && error.response?.data?.error) || fallback;
