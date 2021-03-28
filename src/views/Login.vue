<template>
  <div class="authentication-wrapper authentication-3">
    <div class="authentication-inner">
      <b-col lg="8" class="d-none d-lg-flex align-items-center ui-bg-cover ui-bg-overlay-container p-5 login-bg">
        <div class="ui-bg-overlay custom-bg-dark opacity-50"></div>
        <div class="w-100 text-white px-5">
          <h1 class="display-3 font-weight-bolder mb-4">JOIN OUR<br />COMMUNITY</h1>
          <div class="text-large font-weight-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu gravida faucibus. Suspendisse viverra pharetra purus. Proin fringilla ac lorem at sagittis. Proin tincidunt dui et nunc ultricies dignissim.
          </div>
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

            <h4 class="text-center custom-text-muted font-weight-normal mt-5 mb-0">Login to Your Account</h4>
            <form class="my-5" @submit="login">
              <b-form-group label="Username">
                <b-input v-model="credentials.userName" />
              </b-form-group>
              <b-form-group>
                <div slot="label" class="d-flex justify-content-between align-items-end">
                  <div>Password</div>
                  <b-link to="/forgot-password" class="d-block small text-landing-primary">Forgot password?</b-link>
                </div>
                <b-input type="password" v-model="credentials.password" />
              </b-form-group>

              <div class="d-flex justify-content-between align-items-center m-0">
                <b-check v-model="credentials.isPersistent" class="m-0">Remember me</b-check>
                <b-btn type="submit" variant="landing-primary">Login</b-btn>
              </div>
            </form>
            <div class="text-center text-muted">
              Don't have an account yet?
              <b-link to="/register" class="text-landing-primary">Sign Up</b-link>
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
  data: () => ({
    credentials: {
      userName: "",
      password: "",
      isPersistent: false,
    },
    validationErrors: [],
  }),
  methods: {
    async login(event) {
      event.preventDefault();

      if (this.validateForm()) {
        await authService.authenticate(this.credentials);
        this.$router.push("/dashboard");
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
      if (this.credentials.userName === "" || this.credentials.userName === undefined || this.credentials.userName === null) this.validationErrors.push("kullanici adi giriniz.");
      // else if (!emailRegex.test(this.credentials.emailAddress)) this.validationErrors.push("E-posta doğru formatta olmalidir");
      if (this.credentials.password === "" || this.credentials.password === undefined || this.credentials.password === null) this.validationErrors.push("parola giriniz.");

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
