import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.token = token;
  }
  return config;
});

api.interceptors.response.use(undefined, (error) => {
  if (error.response?.status === 401) {
    const isLogin = error.config?.url?.includes("/auth/login");
    if (!isLogin) {
      localStorage.clear();
      window.location.href = "/login";
    }
  }

  if (error.response?.data?.message) {
    return Promise.reject(error.response.data.message);
  }
  return Promise.reject(
    error.message || "Network error. Is the backend running on port 3010?"
  );
});

export default api;
