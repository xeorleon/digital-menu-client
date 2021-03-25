<template>
  <div id="app">
    <page-loader />
    <router-view />
  </div>
</template>

<script>
import PageLoader from "./components/PageLoader.vue";
export default {
  components: { PageLoader },
};
</script>

<style>
</style>
