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
};
