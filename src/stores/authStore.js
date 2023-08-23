import axios from "../axios";
import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  user: null,
  token: window.localStorage.getItem("token") || null,
  isLoading: false,
  message: null,

  //Login
  login: async (data) => {
    try {
      set({ isLoading: true, message: null });
      const res = await axios.post("/auth/login", data);
      set({ isLoading: false, user: res.data, token: res.data?.token });
      window.localStorage.setItem("token", res.data.token);
    } catch (error) {
      set({ isLoading: false, message: error.response?.data });
    }
  },
  //Logout
  logout: () => {
    window.localStorage.removeItem("token");
    set({ user: null, token: null });
  },
  //Check auth
  checkAuth: () => {
    return Boolean(get().token);
  },
}));
