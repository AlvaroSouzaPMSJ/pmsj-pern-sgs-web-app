// frontend/src/features/users/api/userApi.js
import axios from "axios";
import { useUserStore } from "../store/user.store.js";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
});

// Attach token on every request, pulled from the Zustand store
apiClient.interceptors.request.use((config) => {
  const token = useUserStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const userApi = {
  createUser: async (formData) => {
    // Map form field names → backend field names
    const payload = {
      fullName: formData.name,
      email: formData.email,
      password: formData.password,
      cpf: formData.cpf,
      phone: formData.phone,
      role: formData.role,
    };
    const { data } = await apiClient.post("/users/register", payload);
    return data;
  },

  login: async ({ email, password }) => {
    const { data } = await apiClient.post("/users/login", { email, password });
    return data;
  },

  getAllUsers: async () => {
    const { data } = await apiClient.get("/users");
    return data;
  },

  getUserById: async (id) => {
    const { data } = await apiClient.get(`/users/${id}`);
    return data;
  },

  updateUser: async (id, payload) => {
    const { data } = await apiClient.patch(`/users/${id}`, payload);
    return data;
  },

  deleteUser: async (id) => {
    const { data } = await apiClient.delete(`/users/${id}`);
    return data;
  },
};

export { apiClient };