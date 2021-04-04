<template>
  <form class="px-3 my-5" @submit.prevent="submitPasswordForm">
    <b-form-group label="Eski Parola">
      <b-input type="password" v-model.trim="passwordCredentials.oldPassword" />
    </b-form-group>
    <b-form-group label="Yeni Parola">
      <b-input type="password" v-model.trim="passwordCredentials.newPassword" :disabled="passwordCredentials.oldPassword == ''" />
    </b-form-group>
    <b-form-group label="Yeni Parola Tekrar">
      <b-input type="password" v-model.trim="newPasswordConfirm" :disabled="passwordCredentials.oldPassword == ''" />
    </b-form-group>
    <b-btn type="submit" variant="landing-secondary" class="mt-4">Parolayı Güncelle</b-btn>
  </form>
</template>

<script>
import accountService from "@/services/accountService";
export default {
  data() {
    return {
      passwordCredentials: {
        oldPassword: "",
        newPassword: "",
      },
      newPasswordConfirm: "",
      validationErrors: [],
    };
  },

  methods: {
    async submitPasswordForm() {
      if (this.validatePasswordForm()) {
        var data = await accountService.updatePassword(this.$store.state.user.userId, this.passwordCredentials);
        if (data.code === 200) {
          this.$notify({
            group: "notify-top-right",
            text: "Parola başarıyla güncellendi.",
            duration: 5000,
            type: "success",
          });
        } else if (data.code === 400) {
          this.$notify({
            group: "notify-top-right",
            text: "Eski parola hatalı",
            duration: 5000,
            type: "error",
          });
        }

        this.passwordCredentials = {
          oldPassword: "",
          newPassword: "",
        };
        this.newPasswordConfirm = "";
      } else {
        this.validationErrors.map((error) => {
          this.$notify({
            group: "notify-top-right",
            text: error,
            duration: 5000,
            type: "error",
          });
        });

        this.validationErrors = [];
      }
    },

    validatePasswordForm() {
      if (this.passwordCredentials.oldPassword === "" || this.passwordCredentials.oldPassword === undefined || this.passwordCredentials.oldPassword === null) this.validationErrors.push("Lütfen eski parolanızı giriniz.");
      else if (this.passwordCredentials.newPassword.length < 6 || this.passwordCredentials.newPassword.length > 16) this.validationErrors.push("Parola 6-16 karakter aralığında olmalıdır.");
      else if (this.passwordCredentials.newPassword !== this.newPasswordConfirm) this.validationErrors.push("Parolalar uyuşmuyor");

      if (this.validationErrors.length > 0) return false;
      return true;
    },
  },
};
</script>

<style>
</style>