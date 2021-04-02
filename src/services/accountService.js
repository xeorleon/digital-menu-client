import api from "./api";

export default {
  async updateProfile(user) {
    var response = await api.put(`/user/${user.userId}/update`, user, {
      headers: {
        "Content-Type": `multipart/form-data;boundary=${user.companyImageFile._boundary}`,
      },
    });
    return response.data;
  },
  async updatePassword(userId, credentials) {
    var response = await api.put(`/user/${userId}/update-password`, credentials);
    return response.data;
  },
};
