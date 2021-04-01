<template>
  <div>
    <b-card no-body>
      <b-tabs card>
        <form class="my-5" @submit="submitAccountForm">
          <b-tab title="Hesap" title-link-class="text-secondary" active>
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
            <b-btn type="submit" variant="landing-secondary" class="mt-4">Kaydet</b-btn>
          </b-tab>
          <b-tab title="İşletme" title-link-class="text-secondary">
            <b-form-group label="Şirket Adı">
              <b-input v-model.trim="user.companyName" @input="updateCompanySlug" />
            </b-form-group>
            <b-form-group label="Linkimi kendim oluşturacağım.">
              <b-form-checkbox v-model.trim="customSlug" />
            </b-form-group>
            <b-form-group label="Menü Linki (Bu alanı değiştirseniz QR kodunuzu da yenilemeniz gerekmektedir.)">
              <b-input-group prepend="https://www.digitalmenu.com/">
                <b-form-input v-model.trim="user.companySlug" :disabled="!customSlug"></b-form-input>
              </b-input-group>
            </b-form-group>
            <b-btn type="submit" variant="landing-secondary" class="mt-4">Kaydet</b-btn>
          </b-tab>
        </form>
        <b-tab title="Parola" title-link-class="text-secondary">
          <form class="my-5" @submit="submitPasswordForm">
            <b-form-group label="Eski Parola">
              <b-input v-model.trim="passwordCredentials.oldPassword" />
            </b-form-group>
            <b-form-group label="Yeni Parola">
              <b-input v-model.trim="passwordCredentials.newPassword" :disabled="passwordCredentials.oldPassword == ''" />
            </b-form-group>
            <b-form-group label="Yeni Parola Tekrar">
              <b-input v-model.trim="passwordCredentials.newPasswordConfirm" :disabled="passwordCredentials.oldPassword == ''" />
            </b-form-group>
            <b-btn type="submit" variant="landing-secondary" class="mt-4">Parolayı Güncelle</b-btn>
          </form>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import accountService from "@/services/accountService";
import { emailRegex } from "@/helper/constants";
export default {
  data() {
    return {
      user: {},
      passwordCredentials: {
        oldPassword: "",
        newPassword: "",
        newPasswordConfirm: "",
      },
      customSlug: false,
      validationErrors: [],
    };
  },
  methods: {
    updateCompanySlug() {
      if (!this.customSlug) {
        this.user.companySlug = this.user.companyName.toLowerCase().replaceAll("ü", "u").replaceAll("ı", "i").replaceAll("ğ", "g").replaceAll("ş", "s").replaceAll("ö", "o").replaceAll(" ", "-").replaceAll(".", "-");
      }
    },
    async submitAccountForm(event) {
      event.preventDefault();

      if (!this.valiteAccountForm()) {
        this.validationErrors.map((error) => {
          this.$notify({
            group: "notify-top-right",
            text: error,
            duration: 5000,
            type: "error",
          });
        });
        this.validationErrors = [];
      } else {
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
    submitPasswordForm() {},
  },

  mounted() {
    this.user = this.$store.state.user;
  },
};
</script>