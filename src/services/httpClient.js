import axios from "axios";
import store from "@/store/index";
import router from "@/router/index";
import cookie from "vue-cookie";

const httpClient = axios.create({
  baseURL: "https://localhost:5001",
  withCredentials: true,
});

httpClient.interceptors.request.use(
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

httpClient.interceptors.response.use(
  (success) => {
    return success;
  },
  (error) => {
    if (error.response.status === 401 && router.currentRoute.name !== "Login") {
      httpClient
        .get("/user/refresh-token")
        .then((response) => {
          store.dispatch("setToken", response.data.data.token);
          store.dispatch("setUser", response.data.data.user);
        })
        .catch(() => {
          store.dispatch("setToken", null);
          store.dispatch("setUser", null);
          router.push("/login");
        });
    }

    return error.response;
  }
);

export default httpClient;
