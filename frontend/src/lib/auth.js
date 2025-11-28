import api from "@/lib/axios";

export const getNewAccessToken = async () => {
  try {
    const res = await api.post("/refresh-token", {}, { withCredentials: true });
    const newAccessToken = res.data.accessToken;
    localStorage.setItem("accessToken", newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("Refresh token failed:", error);
    window.location.href = "/login";
  }
};
