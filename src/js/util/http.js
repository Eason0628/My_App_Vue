import axios from "axios";
import store from "@/store";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

// 请求拦截
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截
http.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.data.token) {
     store.commit("user/setToken", res.data.token);
    }
    return res;
  },
  (error) => Promise.reject(error)
);

export default http;
