import client from "./httpClient";

export default {
  async getMenu(companySlug) {
    const response = await client.get(`/menu/${companySlug}`);
    return response.data;
  },
};
