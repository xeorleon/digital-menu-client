<template>
  <div>
    <b-dropdown id="languageSwitcher" :text="selectedLang" :variant="variant" :size="size">
      <b-dropdown-item v-for="(lang, index) in langs" :key="index" @click="setLocale(lang)">{{ lang }}</b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
import i18n from "../../i18n";
export default {
  props: ["variant", "size"],

  data() {
    return {
      langs: ["EN", "TR"],
      selectedLang: i18n.locale.toUpperCase(),
    };
  },

  methods: {
    setLocale(locale) {
      this.$i18n.locale = locale;
      this.selectedLang = locale.toUpperCase();
      this.$cookie.set("lang", locale, { expires: 365 });

      this.$emit("languageChanged");
    },
  },

  mounted() {
    if (this.$cookie.get("lang")) {
      let lang = this.$cookie.get("lang");
      i18n.locale = lang;
      this.selectedLang = lang.toUpperCase();
    }
  },
};
</script>

<style>
#languageSwitcher .dropdown-menu .dropdown-item:active {
  background-color: var(--color-landing-secondary) !important;
}
</style>
