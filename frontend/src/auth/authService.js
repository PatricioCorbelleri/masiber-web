import api from "../api/axios";

export const loginAdmin = async (username, password) => {
  const res = await api.post("/admin/auth/login", {
    username,
    password,
  });

  const { token, admin } = res.data;

  localStorage.setItem("admin_token", token);
  localStorage.setItem("admin_user", JSON.stringify(admin));

  return admin;
};

export const logoutAdmin = () => {
  localStorage.removeItem("admin_token");
  localStorage.removeItem("admin_user");
};
