<template>
  <b-card no-body>
    <b-tabs card>
      <b-tab title="Hesap" title-link-class="text-secondary" active>
        <account-form />
      </b-tab>
      <b-tab title="İşletme" title-link-class="text-secondary">
        <company-form />
      </b-tab>
      <b-tab title="Parola" title-link-class="text-secondary">
        <password-form />
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import AccountForm from "../../components/Dashboard/Account/AccountForm.vue";
import CompanyForm from "../../components/Dashboard/Account/CompanyForm.vue";
import PasswordForm from "../../components/Dashboard/Account/PasswordForm.vue";
export default {
  components: { AccountForm, CompanyForm, PasswordForm },
  async mounted() {
    this.$title = "Account";
  },
};
</script>
