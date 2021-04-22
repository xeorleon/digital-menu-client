import client from "./httpClient";

export default {
  async updateProfile(user) {
    const response = await client.put(`/user/${user.userId}/update`, user);
    return response.data;
  },
  async updatePassword(userId, credentials) {
    const response = await client.put(`/user/${userId}/update-password`, credentials);
    return response.data;
  },
  async getCompany(userId) {
    const response = await client.get(`/user/${userId}/company`);
    return response.data;
  },
  async updateCompany(userId, company) {
    const response = await client.post(`/user/${userId}/company`, company);
    return response.data;
  },
};
