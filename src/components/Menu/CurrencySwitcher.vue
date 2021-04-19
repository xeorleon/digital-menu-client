<template>
  <div>
    <b-dropdown id="currencySwitcher" :text="selectedCurrency.symbol" class="mr-2" :variant="variant" :size="size">
      <b-dropdown-item v-for="(currency, index) in currencies" :key="index" @click="setCurrency(currency)">{{ currency.symbol }}</b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
export default {
  props: ["variant", "size"],

  data() {
    return {
      currencies: [
        { name: "try", symbol: "₺" },
        { name: "eur", symbol: "€" },
        { name: "usd", symbol: "$" },
      ],

      selectedCurrency: { name: "try", symbol: "₺" },
    };
  },

  mounted() {
    const cookie = this.$cookie.get("currency");
    this.selectedCurrency = cookie ? this.currencies.find((x) => x.name === cookie) : this.currencies.find((x) => x.name === "try");
  },

  methods: {
    setCurrency(currency) {
      this.$cookie.set("currency", currency.name, { expires: 365 });
      this.selectedCurrency = currency
    },
  },
};
</script>

<style>
#currencySwitcher .dropdown-menu .dropdown-item:active {
  background-color: var(--color-landing-secondary) !important;
  overflow: hidden;
}

@media screen and (max-width: 768px) {
  #currencySwitcher .dropdown-menu {
    min-width: 50px !important;
  }
}
</style>