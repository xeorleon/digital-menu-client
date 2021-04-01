<template>
  <div>
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Hesap" title-link-class="text-secondary" active>
          <form class="my-5">
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
            <b-btn type="submit" variant="landing-secondary" class="mt-4">{{ $t("saveAccountButtonText") }}</b-btn>
          </form>
        </b-tab>
        <b-tab title="İşletme" title-link-class="text-secondary">
          <form class="my-5">
            <b-form-group label="Şirket Adı">
              <b-input v-model.trim="user.companyName" @input="updateCompanySlug" />
            </b-form-group>
            <b-form-group :label="this.$t('phoneNumber')">
              <b-input v-model.trim="user.companySlug" />
            </b-form-group>
            <b-btn type="submit" variant="landing-secondary" class="mt-4">{{ $t("saveAccountButtonText") }}</b-btn>
          </form>
        </b-tab>
        <b-tab title="Parola" title-link-class="text-secondary">
          <b-card-text>Tab contents 3</b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      passwordCredentials: {
        oldPassword: "",
        newPassword: "",
        newPasswordConfirm: "",
      },
    };
  },
  methods: {
    updateCompanySlug() {
      this.user.companySlug = this.user.companyName.toLowerCase().replaceAll("ü", "u").replaceAll("ı", "i").replaceAll("ğ", "g").replaceAll("ş", "s").replaceAll("ö", "o").replaceAll(" ", "-").replaceAll(".", "-");
    },
  },

  mounted() {
    this.user = this.$store.state.user;
  },
};
</script>

<style>
</style>