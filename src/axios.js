import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.eyeline.ge/api",
  // baseURL: "http://localhost:3000/api",
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");

  return config;
});

export default instance;
