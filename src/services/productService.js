import client from "./httpClient";

export default {
  async insertProduct(userId, product) {
    const response = await client.post(`/product/${userId}`, product);
    return response.data;
  },
};
