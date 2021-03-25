<template>
  <div class="page-loader"></div>
</template>

<script>
import Pace from "pace-js";

export default {
  mounted() {
    Pace.start();
  },
};
</script>

<style>
.pace .pace-progress {
  background-color: var(--color-landing-primary) !important;
}
</style>