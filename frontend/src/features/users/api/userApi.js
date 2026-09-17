import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
});

export const userApi = {
  createUser: async (userData) => {
    const response = await apiClient.post("/users", userData);
    return response.data;
  },

  getAllUsers: async () => {

  },
}