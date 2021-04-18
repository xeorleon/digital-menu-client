<template>
  <b-navbar>
    <b-container>
      <b-navbar-brand to="/" class="text-big font-weight-bolder line-height-1 text-expanded py-3">
        <b-img v-if="this.logo" :src="this.logo" class="menu-logo" fluid />
      </b-navbar-brand>
    </b-container>
  </b-navbar>
</template>

<script>
export default {
  props: ["logo"],
};
</script>

<style>
.menu-logo {
  height: 60px !important;
}
</style>