import axios from "axios";
import store from "@/store/index";
import router from "@/router/index";

const api = axios.create({
  baseURL: "https://localhost:5001",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    if (store.state.token) {
      config.headers["Authorization"] = `Bearer ${store.state.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      api
        .get("/user/refresh-token")
        .then((response) => {
          store.dispatch("setToken", response.data.data.token);
          store.dispatch("setUser", response.data.data.user);
        })
        .catch((error) => {
          router.push("/login");
        });
    }
    return Promise.reject(error);
  }
);

export default api;
