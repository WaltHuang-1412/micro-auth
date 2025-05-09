import axios from "axios";
import HttpsStatusCode from "./http-status-code";
const isProd = location.pathname.startsWith("/micro-root");
const instance = axios.create({
  baseURL: isProd ? "https://api.hex-studio.live/api/v1" : "/api/v1",
  withCredentials: true, // 若使用 cookie 登入請保留
  timeout: 10000,
});

// ✅ 請求攔截器（自動帶 token）
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ 回應攔截器（可統一處理錯誤）
instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const { response } = error;
    if (response?.status === HttpsStatusCode.ClientErrorUnauthorized) {
      console.warn("未授權，請重新登入");
      // 可以在這裡導頁或跳通知
    }
    return Promise.reject(error);
  }
);

export default instance;
