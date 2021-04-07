import client from "./httpClient";

export default {
  async insertProduct(userId, product) {
    const response = await client.post(`/product/${userId}`, product);
    return response.data;
  },
  async getAllProducts(userId) {
    const response = await client.get(`/product/${userId}`);
    return response.data;
  },
};
