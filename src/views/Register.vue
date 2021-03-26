<template>
  <div class="authentication-wrapper authentication-3">
    <div class="authentication-inner">
      <b-col lg="8" class="d-none d-lg-flex align-items-center ui-bg-cover ui-bg-overlay-container p-5 register-bg">
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

            <h4 class="text-center custom-text-muted font-weight-normal mt-5 mb-0">Create an Account</h4>
            <form class="my-5" @submit="register">
              <b-form-group label="Username">
                <b-input v-model.trim="credentials.username" />
              </b-form-group>
              <b-form-group label="First Name">
                <b-input v-model.trim="credentials.firstName" />
              </b-form-group>
              <b-form-group label="Last Name">
                <b-input v-model.trim="credentials.lastName" />
              </b-form-group>
              <b-form-group label="Email Address">
                <b-input v-model.trim="credentials.emailAddress" />
              </b-form-group>
              <b-form-group label="Phone Number">
                <b-input v-model.trim="credentials.phoneNumber" />
              </b-form-group>
              <b-form-group label="Password">
                <b-input type="password" v-model.trim="credentials.password" />
              </b-form-group>
              <b-form-group label="Password Confirm">
                <b-input type="password" v-model.trim="passwordConfirm" />
              </b-form-group>
              <b-btn type="submit" variant="landing-primary" :block="true" class="mt-4">Sign Up</b-btn>
              <div class="custom-text-muted small mt-4">
                By clicking "Sign Up", you agree to our
                <b-link to="/privacy-policy" class="text-landing-primary">terms of service and privacy policy</b-link>. We’ll occasionally send you account related emails.
              </div>
            </form>
            <div class="text-center text-muted">Already have an account? <b-link to="/login" class="text-landing-primary">Sign In</b-link></div>
          </div>
        </b-col>
      </b-col>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    credentials: {
      username: "",
      firstName: "",
      lastName: "",
      emailAddress: "",
      phoneNumber: "",
      password: "",
    },
    validationErrors: [],
    passwordConfirm: "",
  }),

  methods: {
    register(event) {
      event.preventDefault();
      if (this.validateForm()) {
        alert("kayıt işlemi");
      } else {
        this.validationErrors.map((item) => {
          this.$notify({
            group: "notify",
            title: "Hata",
            text: item,
            duration: 10000,
            type: "error",
          });
        });
        this.validationErrors = [];
      }
    },

    validateForm() {
      if (this.credentials.username === "" || this.credentials.username === undefined || this.credentials.username === null) this.validationErrors.push("kullanici adi zorunludur.");
      if (this.credentials.firstName === "" || this.credentials.firstName === undefined || this.credentials.firstName === null) this.validationErrors.push("İsim zorunludur.");
      if (this.credentials.lastName === "" || this.credentials.lastName === undefined || this.credentials.lastName === null) this.validationErrors.push("Soyisim zorunludur.");
      if (this.credentials.emailAddress === "" || this.credentials.emailAddress === undefined || this.credentials.emailAddress === null) this.validationErrors.push("E-posta zorunludur.");
      if (this.credentials.password === "" || this.credentials.password === undefined || this.credentials.password === null) this.validationErrors.push("Parola zorunludur.");
      if (this.credentials.password != this.passwordConfirm) this.validationErrors.push("parolalar uyuşmuyor");
      if (this.credentials.username.length > 16) this.validationErrors.push("kullanici adi 16 karakterden uzun olamaz.");
      if (this.credentials.firstName.length > 16) this.validationErrors.push("İsim 16 karakterden uzun olamaz.");
      if (this.credentials.lastName.length > 16) this.validationErrors.push("Soyisim 16 karakterden uzun olamaz.");

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