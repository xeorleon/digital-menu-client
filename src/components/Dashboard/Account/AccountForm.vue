<template>
  <form class="my-5 px-3" @submit.prevent="submitAccountForm">
    <b-form-group :label="this.$t('username')">
      <b-input v-model.trim="user.username" />
    </b-form-group>
    <b-form-group :label="this.$t('firstName')">
      <b-input v-model.trim="user.firstName" />
    </b-form-group>
    <b-form-group :label="this.$t('lastName')">
      <b-input v-model.trim="user.lastName" />
    </b-form-group>
    <b-form-group :label="this.$t('emailAddress')">
      <b-input v-model.trim="user.emailAddress" />
    </b-form-group>
    <b-form-group :label="this.$t('phoneNumber')">
      <b-input v-model.trim="user.phoneNumber" />
    </b-form-group>
    <b-btn type="submit" variant="landing-secondary" class="mt-4">Hesap Bilgilerini Güncelle</b-btn>
  </form>
</template>

<script>
import accountService from "@/services/accountService";
import { emailRegex } from "@/helper/constants";

export default {
  data() {
    return {
      user: {},
      validationErrors: [],
    };
  },

  mounted() {
    this.user = this.$store.state.user;
  },

  methods: {
    async submitAccountForm() {
      if (this.valiteAccountForm()) {
        var data = await accountService.updateProfile(this.user);
        if (data.code === 200) {
          this.$notify({
            group: "notify-top-right",
            text: "Hesap bilgileri başarıyla güncellendi.",
            duration: 5000,
            type: "success",
          });

          this.$store.dispatch("setToken", data.data.token);
          this.$store.dispatch("setUser", data.data.user);
        }
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

    valiteAccountForm() {
      if (this.user.username === "" || this.user.username === undefined || this.user.username === null) this.validationErrors.push(this.$t("messages.error.usernameRequiredError"));
      else if (this.user.username.length > 16) this.validationErrors.push(this.$t("messages.error.usernameMaxLengthError"));

      if (this.user.firstName === "" || this.user.firstName === undefined || this.user.firstName === null) this.validationErrors.push(this.$t("messages.error.firstNameRequiredError"));
      else if (this.user.firstName.length > 16) this.validationErrors.push(this.$t("messages.error.firstNameMaxLengthError"));

      if (this.user.lastName === "" || this.user.lastName === undefined || this.user.lastName === null) this.validationErrors.push(this.$t("messages.error.lastNameRequiredError"));
      else if (this.user.lastName.length > 16) this.validationErrors.push(this.$t("messages.error.lastNameMaxLengthError"));

      if (this.user.emailAddress === "" || this.user.emailAddress === undefined || this.user.emailAddress === null) this.validationErrors.push(this.$t("messages.error.emailRequiredError"));
      else if (!emailRegex.test(this.user.emailAddress)) this.validationErrors.push(this.$t("messages.error.emailWrongFormatError"));

      if (this.validationErrors.length > 0) return false;
      return true;
    },
  },
};
</script>

<style>
</style>