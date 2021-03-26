<template>
  <div id="app">
    <page-loader />
    <notifications group="notify" position="top left"/>
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
