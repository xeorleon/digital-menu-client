import api from "./api";

export default {
  async getSubscriptionTypes() {
    var response = await api.get("/subscription/types");
    return response.data;
  },
};
