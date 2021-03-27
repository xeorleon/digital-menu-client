<template>
  <div>
    <b-dropdown
      id="languageSwitcher"
      text="TR"
      class="m-md-2"
      variant="outline-light"
    >
      <b-dropdown-item>EN</b-dropdown-item>
      <b-dropdown-item>TR</b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
export default {};
</script>

<style>
.dropdown-menu .dropdown-item:active {
  background-color: var(--color-landing-secondary) !important;
}
</style>
