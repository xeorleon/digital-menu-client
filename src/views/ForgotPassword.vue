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

          <h5 class="text-center text-muted font-weight-normal mb-4">{{ $t("forgotPasswordFormTitle") }}</h5>
          <hr class="mt-0 mb-4" />
          <p>{{ $t("forgotPasswordFormDescription") }}</p>
          <b-form-group>
            <b-input v-model="credentials.emailAddress" :placeholder="this.$t('forgotPasswordInputPlaceholder')" />
          </b-form-group>
          <b-btn type="submit" variant="landing-primary" :block="true">{{ $t("forgotPasswordSendEmailButtonText") }}</b-btn>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { emailRegex } from "@/helper/constants";
import authService from "@/services/authService";
export default {
  data: () => ({
    credentials: {
      emailAddress: "",
    },
  }),

  mounted() {
    this.$title = this.$t("forgotPasswordTabTitle");
  },

  methods: {
    async forgotPassword(event) {
      event.preventDefault();

      if (this.validateForm()) {
        var data = await authService.forgotPassword(this.credentials);
        console.log(data);
      }
    },

    validateForm() {
      if (this.credentials.emailAddress === "" || this.credentials.emailAddress === undefined || this.credentials.emailAddress === null) {
        this.$notify({
          group: "notify",
          text: this.$t("emailRequiredError"),
          duration: 5000,
          type: "error",
        });
        return false;
      } else if (!emailRegex.test(this.credentials.emailAddress)) {
        this.$notify({
          group: "notify",
          text: this.$t("emailWrongFormatError"),
          duration: 5000,
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
