import axios from "axios";
import store from "@/store/index";
import cookie from "vue-cookie";
import router from "@/router/index";

const api = axios.create({
  baseURL: "https://localhost:5001",
});

api.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${store.state.token}`;
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
      const refreshtoken = cookie.get("refreshToken");
      if (refreshtoken) {
        api
          .post("/user/refresh-token", { refreshtoken: refreshtoken })
          .then((response) => {
            const isPersistent = store.state.isPersistent;
            store.dispatch("setToken", response.data.data.token);
            store.dispatch("setUser", response.data.data.user);
            cookie.set("refreshToken", response.data.data.refreshToken, { expires: isPersistent ? 14 : undefined });
          })
          .catch((error) => {
            router.push("/login");
          });
      } else {
        router.push("/login");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
