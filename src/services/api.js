import axios from "axios";
import store from "@/store/index";
import router from "@/router/index";
import cookie from "vue-cookie";
import Vue from "vue";

const api = axios.create({
  baseURL: "https://localhost:5001",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    if (store.state.token) config.headers["Authorization"] = `Bearer ${store.state.token}`;
    if (cookie.get("lang")) config.headers["X-Language"] = cookie.get("lang").toLowerCase();
    else config.headers["X-Language"] = "tr";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (success) => {
    return success;
  },
  (error) => {
    if (error.response.status === 401 && router.currentRoute.name !== "Login") {
      api
        .get("/user/refresh-token")
        .then((response) => {
          store.dispatch("setToken", response.data.data.token);
          store.dispatch("setUser", response.data.data.user);
        })
        .catch(() => {
          router.push("/login");
        });
    }
    
    return error.response;
  }
);

export default api;
