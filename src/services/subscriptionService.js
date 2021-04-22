import client from "./httpClient";

export default {
  async getSubscriptionTypes() {
    const response = await client.get("/subscription/types");
    return response.data;
  },
};
