// src/api/userApi.js
import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const getUsers = () => API.get("/users");
export const createUser = (userData) => API.post("/users", userData);
export const updateUser = (id, data) => API.put(`/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/users/${id}`);




export const getDashboardURL = async (target) => {
  const response = await API.get('/dashboard-url/dashboard', {
    params: target ? { target } : {},
  });
  return response.data.url;
};

