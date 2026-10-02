import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const userApi = {
  createUser: async (formData) => {
    // Map form field names to backend field names
    const payload = {
      fullName: formData.name,
      email: formData.email,
      password: formData.password,
      cpf: formData.cpf,
      phone: formData.phone,
      role: formData.role,
    };
    const response = await apiClient.post("/users/register", payload);
    return response.data;
  },

  login: async ({ email, password }) => {
    const response = await apiClient.post("/users/login", { email, password });
    return response.data;
  },

  getAllUsers: async () => {
    const response = await apiClient.get("/users");
    return response.data;
  },

  getUserById: async (id) => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },

  updateUser: async (id, data) => {
    const response = await apiClient.patch(`/users/${id}`, data);
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  },
};