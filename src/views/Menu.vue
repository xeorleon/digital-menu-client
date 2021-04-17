<template>
  <h1>menu</h1>
</template>

<script>
import menuService from "@/services/menuService";

export default {
  async mounted() {
    const companySlug = this.$route.params.companySlug;
    const menu = await menuService.getMenu(companySlug);
    if (menu.code === 200) {
      console.log("success");
    }
  },
};
</script>