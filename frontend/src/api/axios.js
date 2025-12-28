// import axios from "axios";

// export const api = axios.create({
//   baseURL: "http://localhost:8000",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000", // backend
  withCredentials: false,
});

// Interceptor request → agrega token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// Interceptor response → maneja errores auth
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("admin_token");
      window.location.href = "/login";
    }
    if (error.response?.status === 403) {
      alert("No tenés permisos para esta acción");
    }
    return Promise.reject(error);
  }
);

export default api;
