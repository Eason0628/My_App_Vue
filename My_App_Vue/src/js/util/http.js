import axios from "axios";

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
    if (res.code !== 200) {
      return Promise.reject(res.message);
    }
    return res;
  },
  (error) => Promise.reject(error)
);

export default http;
