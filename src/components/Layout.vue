<template>
  <div>
    <sidenav />
    <layout-container>
      <router-view />
    </layout-container>
  </div>
</template>

<script>
import Sidenav from "./Dashboard/Sidenav.vue";
import LayoutContainer from "./LayoutContainer.vue";
export default {
  components: {
    Sidenav,
    LayoutContainer,
  },

  mounted() {
    if (!this.$store.state.isUserLoggedIn) this.$router.push("/login");
  },
};
</script>

<style>
</style>