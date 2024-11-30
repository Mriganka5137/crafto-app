import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  username: string;
  exp: number;
}

export const setAuthToken = (token: string) => {
  if (typeof window !== "undefined") {
    document.cookie = `token=${token}; path=/; max-age=86400; secure; samesite=strict`;
  }
};

export const getAuthToken = (): string | null => {
  if (typeof window !== "undefined") {
    return (
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1] || null
    );
  }
  return null;
};

export const removeAuthToken = () => {
  if (typeof window !== "undefined") {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
};

export const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch {
    return false;
  }
};
