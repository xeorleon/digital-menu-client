import api from "./api";

export default {
  async updateProfile(user) {
    var response = await api.put(`/user/${user.userId}/update`, user);
    return response.data;
  },
  async updatePassword(userId, credentials) {
    var response = await api.put(`/user/${userId}/update-password`, credentials);
    return response.data;
  },
  async getCompany(userId) {
    var response = await api.get(`/user/${userId}/company`);
    return response.data;
  },
  async updateCompany(userId, company) {
    var response = await api.post(`/user/${userId}/company`, company);
    return response.data;
  },
};
