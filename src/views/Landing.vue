<template>
  <div>
    <b-navbar class="landing-navbar" toggleable="lg" type="light">
      <b-container fluid class="px-3">
        <b-navbar-brand to="/" class="text-big font-weight-bolder line-height-1 text-expanded py-3">LANDING</b-navbar-brand>
        <b-navbar-toggle target="landing-navbar-collapse"></b-navbar-toggle>
        <b-collapse id="landing-navbar-collapse" is-nav>
          <b-navbar-nav class="align-items-lg-center ml-auto">
            <b-nav-item href="#" is="a" class="anchor-link nav-link nav-item">Özellikler</b-nav-item>
            <b-nav-item href="#" is="a" class="anchor-link nav-link nav-item">Ekran Görüntüleri</b-nav-item>
            <b-nav-item href="#" is="a" class="anchor-link nav-link nav-item">Fiyatlandırma</b-nav-item>
            <b-nav-item is="div" class="nav-item py-3 py-lg-0 ml-lg-4">
              <b-link to="/register" class="anchor-link btn btn-outline-landing-primary rounded-pill text-expanded">
                <small>ÜCRETSİZ DENE</small>
              </b-link>
              <b-link to="/login" class="anchor-link btn btn-outline-landing-primary rounded-pill text-expanded ml-1">
                <small>GİRİŞ</small>
              </b-link>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
export default {};
</script>