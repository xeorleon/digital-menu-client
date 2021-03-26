<template>
  <div class="authentication-wrapper authentication-2 px-4">
    <div class="authentication-inner py-5">
      <form class="card" @submit="forgotPassword">
        <div class="p-4 p-sm-5">
          <!-- Logo -->
          <div class="d-flex justify-content-center align-items-center pb-2 mb-4">
            <div class="ui-w-60">
              <div class="w-100 position-relative" style="padding-bottom: 54%"></div>
            </div>
          </div>
          <!-- / Logo -->

          <h5 class="text-center text-muted font-weight-normal mb-4">Reset Your Password</h5>
          <hr class="mt-0 mb-4" />
          <p>Enter your email address and we will send you a link to reset your password.</p>
          <b-form-group>
            <b-input v-model="credentials.emailAddress" placeholder="Enter your email address" />
          </b-form-group>
          <b-btn type="submit" variant="landing-primary" :block="true">Send password reset email</b-btn>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { emailRegex } from "@/helper/constants";
export default {
  data: () => ({
    credentials: {
      emailAddress: "",
    },
  }),
  methods: {
    forgotPassword(event) {
      event.preventDefault();

      if (this.validateForm()) {
        alert("parola sıfırlama maili");
      }
    },

    validateForm() {
      if (this.credentials.emailAddress === "" || this.credentials.emailAddress === undefined || this.credentials.emailAddress === null) {
        this.$notify({
          group: "notify",
          title: "Hata",
          text: "lutfen email giriniz.",
          duration: 10000,
          type: "error",
        });
        return false;
      } else if (!emailRegex.test(this.credentials.emailAddress)) {
        this.$notify({
          group: "notify",
          title: "Hata",
          text: "epostayı dogru formattan giriniz",
          duration: 10000,
          type: "error",
        });
        return false;
      }

      return true;
    },
  },
};
</script>

<style scoped>
.authentication-wrapper.authentication-2 {
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.authentication-wrapper.authentication-2 .authentication-inner {
  max-width: 380px;
}
</style>