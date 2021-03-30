<template>
  <div class="authentication-wrapper authentication-3">
    <div class="authentication-inner">
      <b-col lg="8" class="d-none d-lg-flex align-items-center ui-bg-cover ui-bg-overlay-container p-5 login-bg">
        <div class="ui-bg-overlay custom-bg-dark opacity-50"></div>
        <div class="w-100 text-white px-5">
          <h1 class="display-3 font-weight-bolder mb-4" v-html="$t('loginView.pageTitle')"></h1>
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

            <h4 class="text-center custom-text-muted font-weight-normal mt-5 mb-0">{{ $t("loginView.formTitle") }}</h4>
            <form class="my-5" @submit="login">
              <b-form-group :label="this.$t('username')">
                <b-input v-model="credentials.userName" />
              </b-form-group>
              <b-form-group>
                <div slot="label" class="d-flex justify-content-between align-items-end">
                  <div>{{ $t("password") }}</div>
                  <b-link to="/forgot-password" class="d-block small text-landing-primary">{{ $t("forgotPassword") }}</b-link>
                </div>
                <b-input type="password" v-model="credentials.password" />
              </b-form-group>

              <div class="d-flex justify-content-between align-items-center m-0">
                <b-check v-model="credentials.isPersistent" class="m-0">{{ $t("rememberMe") }}</b-check>
                <b-btn type="submit" variant="landing-primary">{{ $t("signin") }}</b-btn>
              </div>
            </form>
            <div class="text-center text-muted">
              {{ $t("loginView.dontHaveAnAccountYet") }}
              <b-link to="/register" class="text-landing-primary">{{ $t("signup") }}</b-link>
            </div>
          </div>
        </b-col>
      </b-col>
    </div>
  </div>
</template>

<script>
// import { emailRegex } from "@/helper/constants";
import authService from "@/services/authService";
export default {
  title: "Login",
  data() {
    return {
      credentials: {
        userName: "",
        password: "",
        isPersistent: false,
      },
      validationErrors: [],
    };
  },

  mounted() {
    this.$title = this.$t("loginView.tabTitle");
  },

  methods: {
    async login(event) {
      event.preventDefault();

      if (this.validateForm()) {
        var data = await authService.authenticate(this.credentials);
        if (data.code === 200) {
          this.$cookie.set("refreshToken", data.data.refreshToken, { expires: this.credentials.isPersistent ? 14 : undefined });
          this.$store.dispatch("setToken", data.data.token);
          this.$store.dispatch("setUser", data.data.user);
          this.$store.dispatch("setPersistent", this.credentials.isPersistent);
          this.$router.push("/dashboard");
        }
      } else {
        this.validationErrors.map((item) => {
          this.$notify({
            group: "notify",
            text: item,
            duration: 5000,
            type: "error",
          });
        });
        this.validationErrors = [];
      }
    },

    validateForm() {
      if (this.credentials.userName === "" || this.credentials.userName === undefined || this.credentials.userName === null) this.validationErrors.push(this.$t("messages.error.usernameRequiredError"));
      // else if (!emailRegex.test(this.credentials.emailAddress)) this.validationErrors.push("E-posta doğru formatta olmalidir");
      if (this.credentials.password === "" || this.credentials.password === undefined || this.credentials.password === null) this.validationErrors.push(this.$t("messages.error.passwordRequiredError"));

      if (this.validationErrors.length > 0) return false;
      return true;
    },
  },
};
</script>

<style>
.login-bg {
  background-image: url("../assets/register-img.jpg");
}
</style>
