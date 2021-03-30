import api from "./api";

export default {
  // 200 => OK, 400 => username or email already taken
  async register(credentials) {
    var response = await api.post("/user", credentials);
    return response.data;
  },
  // 200 => OK, 404 => username or password incorrect
  async authenticate(credentials) {
    var response = await api.post("/user/authenticate", credentials);
    console.log(response);
    return response.data;
  },
  async forgotPassword(credentials) {
    var response = await api.post("/user/forgot-password", credentials);
    return response.data;
  },
};
