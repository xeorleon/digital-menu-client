<template>
  <div>
    <b-dropdown
      id="languageSwitcher"
      :text="selectLang"
      class="m-md-2"
      variant="outline-light"
    >
      <b-dropdown-item
        v-for="(lang, index) in langs"
        :key="index"
        @click="setLocale(lang)"
        >{{ lang }}</b-dropdown-item
      >
    </b-dropdown>
  </div>
</template>

<script>
import i18n from "../../i18n";
export default {
  data() {
    return {
      langs: ["EN", "TR"],
      selectLang: i18n.locale.toUpperCase(),
    };
  },
  methods: {
    setLocale(locale) {
      this.$i18n.locale = locale;
      this.selectLang = locale.toUpperCase();
      this.$cookie.set("lang", locale, { expires: 14 });
    },
  },
  mounted() {
    if (this.$cookie.get("lang")) {
      let lang = this.$cookie.get("lang");
      i18n.locale = lang;
      this.selectLang = lang.toUpperCase();
    }
  },
};
</script>

<style>
.dropdown-menu .dropdown-item:active {
  background-color: var(--color-landing-secondary) !important;
}
</style>
