<template>
  <footer class="footer pt-4">
    <b-container class="text-center py-4">
      <div class="pb-3">
        <span class="footer-text font-weight-bolder">LANDING</span>
        <span class="align-top">©</span>
      </div>
      <hr class="mb-4" />
      <b-row>
        <div class="col-6 col-sm pb-4">
          <div class="footer-text font-secondary font-weight-bold mb-3">{{ $t("footer.whoWeAre").toLocaleUpperCase() }}</div>
          <b-link to="/about" class="footer-link d-block small pb-2">{{ $t("footer.aboutus") }}</b-link>
          <b-link to="/ourstory" class="footer-link d-block small pb-2">{{ $t("footer.ourstory") }}</b-link>
          <b-link to="/crew" class="footer-link d-block small pb-2">{{ $t("footer.crew") }}</b-link>
        </div>
        <div class="col-6 col-sm pb-4">
          <div class="footer-text font-secondary font-weight-bold mb-3">{{ $t("footer.support").toLocaleUpperCase() }}</div>
          <b-link to="/faq" class="footer-link d-block small pb-2">{{ $t("footer.faq").toLocaleUpperCase() }}</b-link>
          <b-link to="/policy" class="footer-link d-block small pb-2">{{ $t("footer.privacyPolicy") }}</b-link>
          <b-link to="/contact" class="footer-link d-block small pb-2">{{ $t("footer.contact") }}</b-link>
        </div>
        <div class="col-6 offset-3 offset-sm-0 col-sm pb-4">
          <div class="footer-text font-secondary font-weight-bold mb-3">{{ $t("footer.socialMedia").toLocaleUpperCase() }}</div>
          <a href="#" class="footer-link d-block small pb-2" target="_blank"> &nbsp;Twitter</a>
          <a href="#" class="footer-link d-block small pb-2" target="_blank"> &nbsp;Facebook</a>
          <a href="#" class="footer-link d-block small pb-2" target="_blank"> &nbsp;Instagram</a>
        </div>
      </b-row>
    </b-container>
  </footer>
</template>

<style scoped>
.footer-text {
  color: var(--color-footer-text);
}

.footer-link {
  color: var(--color-footer-text);
}
</style>
