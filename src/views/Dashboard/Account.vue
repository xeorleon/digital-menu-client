<template>
  <div>
    <b-card no-body>
      <b-tabs card>
        <form class="my-5" @submit.prevent="submitAccountForm">
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
            <b-btn type="submit" variant="landing-secondary" class="mt-4">Hesap Bilgilerini Güncelle</b-btn>
          </b-tab>
        </form>
        <form class="my-5" @submit.prevent="submitCompanyForm" enctype="multipart/form-data">
          <b-tab title="İşletme" title-link-class="text-secondary">
            <b-row>
              <b-col cols="12" sm="6">
                <b-form-group label="Logo">
                  <b-form-file @input="imagePreview" placeholder="Dosya Seç veya Sürükle" drop-placeholder="Buraya Bırak" />
                </b-form-group>
              </b-col>
              <b-col cols="12" sm="6">
                <b-img v-if="this.imageUrl" :src="imageUrl" class="logo-preview" fluid />
              </b-col>
            </b-row>
            <b-form-group label="Şirket Adı">
              <b-input v-model.trim="company.name" @input="updateCompanySlug" />
            </b-form-group>
            <b-form-group label="Linkimi kendim oluşturacağım.">
              <b-form-checkbox v-model.trim="customSlug" />
            </b-form-group>
            <b-form-group label="Menü Linki (Bu alanı değiştirseniz QR kodunuzu da yenilemeniz gerekmektedir.)">
              <b-input-group prepend="https://www.digitalmenu.com/">
                <b-form-input v-model.trim="company.slug" :disabled="!customSlug" />
              </b-input-group>
            </b-form-group>
            <b-btn type="submit" variant="landing-secondary" class="mt-4">Şirket Bilgilerini Güncelle</b-btn>
          </b-tab>
        </form>
        <form class="my-5" @submit.prevent="submitPasswordForm">
          <b-tab title="Parola" title-link-class="text-secondary">
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
          </b-tab>
        </form>
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
      company: {
        name: "",
        slug: "",
      },
      passwordCredentials: {
        oldPassword: "",
        newPassword: "",
      },
      companyModel: new FormData(),
      newPasswordConfirm: "",
      customSlug: false,
      validationErrors: [],
      imageUrl: "",
    };
  },
  methods: {
    updateCompanySlug() {
      if (!this.customSlug) {
        this.company.slug = this.company.name.toLowerCase().replaceAll("ü", "u").replaceAll("ı", "i").replaceAll("ğ", "g").replaceAll("ş", "s").replaceAll("ö", "o").replaceAll(" ", "-").replaceAll(".", "-");
      }
    },

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

    async submitCompanyForm() {
      this.companyModel.append("name", this.company.name);
      this.companyModel.append("slug", this.company.slug);
      const data = await accountService.updateCompany(this.user.userId, this.companyModel);

      if (data.code === 200) {
        this.company = data.data;

        this.$notify({
          group: "notify-top-right",
          text: "Şirket bilgileri başarıyla güncellendi.",
          duration: 5000,
          type: "success",
        });

        this.companyModel = new FormData();
      }
    },

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

    validatePasswordForm() {
      if (this.passwordCredentials.oldPassword === "" || this.passwordCredentials.oldPassword === undefined || this.user.oldPassword === null) this.validationErrors.push("Lütfen eski parolanızı giriniz.");
      else if (this.passwordCredentials.newPassword.length < 6 || this.passwordCredentials.newPassword.length > 16) this.validationErrors.push("Parola 6-16 karakter aralığında olmalıdır.");
      else if (this.passwordCredentials.newPassword !== this.newPasswordConfirm) this.validationErrors.push("Parolalar uyuşmuyor");

      if (this.validationErrors.length > 0) return false;
      return true;
    },

    imagePreview(event) {
      const fileExtension = event.name.split(".")[1];
      this.companyModel.append("logoFile", event, this.user.userId + "." + fileExtension);
      this.imageUrl = URL.createObjectURL(event);
    },
  },

  async mounted() {
    this.user = this.$store.state.user;
    const companyData = await accountService.getCompany(this.user.userId);
    if (companyData.code === 200) {
      this.company = companyData.data;
      if (companyData.data.logoName) this.imageUrl = companyData.data.logoName;
    }
  },
};
</script>

<style>
.logo-preview {
  max-height: 75px;
}
</style>