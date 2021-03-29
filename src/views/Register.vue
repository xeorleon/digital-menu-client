<template>
  <div class="authentication-wrapper authentication-3">
    <div class="authentication-inner">
      <b-col lg="8" class="d-none d-lg-flex align-items-center ui-bg-cover ui-bg-overlay-container p-5 register-bg">
        <div class="ui-bg-overlay custom-bg-dark opacity-50"></div>
        <div class="w-100 text-white px-5">
          <h1 class="display-3 font-weight-bolder mb-4">JOIN OUR<br />COMMUNITY</h1>
          <div class="text-large font-weight-light">{{ $t("registerPageDescription") }}</div>
        </div>
      </b-col>
      <b-col lg="4" class="theme-bg-white d-flex align-items-center p-5">
        <b-col sm="7" md="5" lg="12" class="d-flex px-0 px-xl-4 mx-auto">
          <div class="w-100">
            <!-- Logo -->
            <div class="d-flex justify-content-center align-items-center">
              <div class="ui-w-60">
                <div class="w-100 position-relative" style="padding-bottom: 54%"></div>
              </div>
            </div>
            <!-- / Logo -->

            <h4 class="text-center custom-text-muted font-weight-normal mt-5 mb-0">{{ $t("registerFormTitle") }}</h4>
            <form class="my-5" @submit="register">
              <b-form-group :label="this.$t('username')">
                <b-input v-model.trim="credentials.username" />
              </b-form-group>
              <b-form-group :label="this.$t('firstName')">
                <b-input v-model.trim="credentials.firstName" />
              </b-form-group>
              <b-form-group :label="this.$t('lastName')">
                <b-input v-model.trim="credentials.lastName" />
              </b-form-group>
              <b-form-group :label="this.$t('emailAddress')">
                <b-input v-model.trim="credentials.emailAddress" />
              </b-form-group>
              <b-form-group :label="this.$t('phoneNumber')">
                <b-input v-model.trim="credentials.phoneNumber" />
              </b-form-group>
              <b-form-group :label="this.$t('password')">
                <b-input type="password" v-model.trim="credentials.password" />
              </b-form-group>
              <b-form-group :label="this.$t('passwordConfirm')">
                <b-input type="password" v-model.trim="passwordConfirm" />
              </b-form-group>
              <b-btn type="submit" variant="landing-primary" :block="true" class="mt-4">{{ $t("signup") }}</b-btn>
              <div class="custom-text-muted small mt-4">
                {{ $t("registerDisclaimer") }}
                <b-link to="/privacy-policy" class="text-landing-primary">{{ $t("moreInformation") }}</b-link>
              </div>
            </form>
            <div class="text-center text-muted">
              {{ $t("alreadyHaveAnAccount") }}
              <b-link to="/login" class="text-landing-primary">{{ $t("signin") }}</b-link>
            </div>
          </div>
        </b-col>
      </b-col>
    </div>
  </div>
</template>

<script>
import { emailRegex } from "@/helper/constants";
import authService from "@/services/authService";
export default {
  data() {
    return {
      credentials: {
        username: "asd",
        firstName: "asd",
        lastName: "asd",
        emailAddress: "asd@gmail.com",
        phoneNumber: "123",
        password: "123",
      },
      validationErrors: [],
      passwordConfirm: "123",
    };
  },

  mounted() {
    this.$title = this.$t("registerTabTitle");
  },

  methods: {
    async register(event) {
      event.preventDefault();
      if (this.validateForm()) {
        const data = await authService.register(this.credentials);
        if (data.code == 200) {
          this.$cookie.set("refreshToken", data.data.refreshToken);
          this.$store.dispatch("setToken", data.data.token);
          this.$store.dispatch("setUser", data.data.user);
          this.$router.push("/dashboard");
        }
      } else {
        this.validationErrors.map((item) => {
          this.$notify({
            group: "notify",
            title: "Hata",
            text: item,
            duration: 5000,
            type: "error",
          });
        });
        this.validationErrors = [];
      }
    },

    validateForm() {
      if (this.credentials.username === "" || this.credentials.username === undefined || this.credentials.username === null) this.validationErrors.push(this.$t("usernameRequiredError"));
      else if (this.credentials.username.length > 16) this.validationErrors.push(this.$t("usernameMaxLengthError"));

      if (this.credentials.firstName === "" || this.credentials.firstName === undefined || this.credentials.firstName === null) this.validationErrors.push(this.$t("firstNameRequiredError"));
      else if (this.credentials.firstName.length > 16) this.validationErrors.push(this.$t("firstNameMaxLengthError"));

      if (this.credentials.lastName === "" || this.credentials.lastName === undefined || this.credentials.lastName === null) this.validationErrors.push(this.$t("lastNameRequiredError"));
      else if (this.credentials.lastName.length > 16) this.validationErrors.push(this.$t("lastNameMaxLengthError"));

      if (this.credentials.emailAddress === "" || this.credentials.emailAddress === undefined || this.credentials.emailAddress === null) this.validationErrors.push(this.$t("emailRequiredError"));
      else if (!emailRegex.test(this.credentials.emailAddress)) this.validationErrors.push(this.$t("emailWrongFormatError"));

      if (this.credentials.password === "" || this.credentials.password === undefined || this.credentials.password === null) this.validationErrors.push(this.$t("passwordRequiredError"));
      else if (this.credentials.password != this.passwordConfirm) this.validationErrors.push(this.$t("passwordsDontMatchError"));

      if (this.validationErrors.length > 0) return false;
      return true;
    },
  },
};
</script>

<style>
.register-bg {
  background-image: url("../assets/register-img.jpg");
}
</style>
