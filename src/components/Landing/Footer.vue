<template>
  <footer class="footer pt-4">
    <div class="container text-center py-4">
      <div class="pb-3">
        <a href="#" class="footer-text font-weight-bolder">LANDING</a>
        <span class="align-top">©</span>
      </div>
      <hr class="mb-4" />
      <div class="row">
        <div class="col-6 col-sm pb-4">
          <div class="footer-text font-secondary text-tiny font-weight-bold mb-3">ABOUT US</div>
          <b-link to="/about" class="footer-link d-block small pb-2">About</b-link>
          <b-link to="/ourstory" class="footer-link d-block small pb-2">Our Story</b-link>
          <b-link to="/crew" class="footer-link d-block small pb-2">Crew</b-link>
        </div>
        <div class="col-6 col-sm pb-4">
          <div class="footer-text font-secondary text-tiny font-weight-bold mb-3">SUPPORT</div>
          <b-link to="/faq" class="footer-link d-block small pb-2">FAQ</b-link>
          <b-link to="/policy" class="footer-link d-block small pb-2">Privacy Policy</b-link>
          <b-link to="/contact" class="footer-link d-block small pb-2">Contact</b-link>
        </div>
        <div class="col-6 col-sm pb-4">
          <div class="footer-text font-secondary text-tiny font-weight-bold mb-3">CONNECT</div>
          <a href="#" class="footer-link d-block small pb-2"> &nbsp;Twitter</a>
          <a href="#" class="footer-link d-block small pb-2"> &nbsp;Facebook</a>
          <a href="#" class="footer-link d-block small pb-2"> &nbsp;Instagram</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
.footer-text {
  color: var(--color-footer-text);
}

.footer-link {
  color: var(--color-footer-link);
}
</style>