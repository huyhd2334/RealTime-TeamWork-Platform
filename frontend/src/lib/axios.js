// /lib/axios.js
import axios from "axios";
import { getNewAccessToken } from "@/lib/auth";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8386/api"
    : "/api";

// Tạo instance axios
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // gửi cookie refresh token
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: nếu 401 → refresh token → retry request
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Chỉ retry 1 lần
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await getNewAccessToken();
        if (!newToken) throw new Error("Refresh token failed");

        // Gắn token mới cho request này
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newToken}`,
        };

        return api(originalRequest);
      } catch (err) {
        // nếu refresh fail → redirect login
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
