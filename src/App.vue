<template>
  <div id="app">
    <page-loader />
    <notifications group="notify" position="top left" />
    <notifications group="notify-top-right" position="top right" />
    <router-view />
  </div>
</template>

<script>
import PageLoader from "./components/PageLoader.vue";
export default {
  components: { PageLoader },
};
</script>

<style></style>
