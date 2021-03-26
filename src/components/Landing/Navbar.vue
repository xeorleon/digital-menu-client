<template>
  <b-navbar class="landing-navbar pt-lg-4" toggleable="lg" type="dark" fixed="top">
    <b-container fluid class="px-3">
      <b-navbar-brand to="/" class="text-big font-weight-bolder line-height-1 text-expanded py-3">LANDING</b-navbar-brand>
      <b-navbar-toggle target="landing-navbar-collapse" @click="navbarToggle"></b-navbar-toggle>
      <b-collapse id="landing-navbar-collapse" is-nav>
        <b-navbar-nav class="align-items-lg-center ml-auto">
          <b-nav-item href="#features" is="a" class="anchor-link nav-link nav-item">Özellikler</b-nav-item>
          <b-nav-item href="#screenshots" is="a" class="anchor-link nav-link nav-item">Ekran Görüntüleri</b-nav-item>
          <b-nav-item href="#pricing" is="a" class="anchor-link nav-link nav-item">Fiyatlandırma</b-nav-item>
          <language-switcher />
          <b-nav-item is="div" class="nav-item py-3 py-lg-0 ml-lg-4">
            <b-link to="/login" class="btn-login anchor-link btn btn-outline-light rounded-pill text-expanded ml-1">
              <small>GİRİŞ</small>
            </b-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
import LanguageSwitcher from "./LanguageSwitcher.vue";
export default {
  components: { LanguageSwitcher },

  created() {
    document.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    document.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const navbar = document.getElementsByClassName("landing-navbar")[0];
      const navbarCollapse = document.getElementById("landing-navbar-collapse");
      const container = navbar.getElementsByTagName("div")[0];
      const loginBtn = document.getElementsByClassName("btn-login")[0];
      const languageSwitcher = document.querySelector("#languageSwitcher button");
      const navbarScrollThreshold = 20;
      const navbarBreakPoint = 992;
      const navbarCustomClasses = {
        default: {
          variant: "navbar-dark",
          classes: "pt-lg-4",
        },
        alt: {
          navbar: "navbar-light",
          variant: "bg-white",
          classes: "py-1",
        },
      };

      const scrollTop = window.scrollY;
      if (scrollTop > navbarScrollThreshold && !navbar.classList.contains("landing-navbar-alt")) {
        navbar.classList.add("landing-navbar-alt");
        navbar.classList.remove(navbarCustomClasses.default.variant);
        navbar.classList.remove(navbarCustomClasses.default.classes);
        navbar.classList.add(navbarCustomClasses.alt.variant);
        navbar.classList.add(navbarCustomClasses.alt.classes);
        navbar.classList.add(navbarCustomClasses.alt.navbar);
        container.classList.remove("container-fluid");
        container.classList.add("container");
        loginBtn.classList.add("btn-landing-primary");
        loginBtn.classList.remove("btn-outline-light");
        languageSwitcher.classList.add("btn-landing-primary");
        languageSwitcher.classList.remove("btn-outline-light");
      } else if (scrollTop <= navbarScrollThreshold && navbar.classList.contains("landing-navbar-alt")) {
        navbar.classList.remove("landing-navbar-alt");
        navbar.classList.add(navbarCustomClasses.default.classes);
        navbar.classList.add(navbarCustomClasses.default.variant);
        navbar.classList.remove(navbarCustomClasses.alt.classes);
        navbar.classList.remove(navbarCustomClasses.alt.variant);
        container.classList.remove("container");
        container.classList.add("container-fluid");
        loginBtn.classList.add("btn-outline-light");
        loginBtn.classList.remove("btn-landing-primary");
        languageSwitcher.classList.add("btn-outline-light");
        languageSwitcher.classList.remove("btn-landing-primary");

        if (window.outerWidth >= navbarBreakPoint || navbarCollapse.classList.contains("show")) {
          navbar.classList.remove(navbarCustomClasses.alt.variant);
        }
      }
    },
    navbarToggle() {
      const navbar = document.getElementsByClassName("landing-navbar")[0];
      const navbarCollapse = document.getElementById("landing-navbar-collapse");
      const loginBtn = document.getElementsByClassName("btn-login")[0];
      const languageSwitcher = document.querySelector("#languageSwitcher button");
      const navbarScrollThreshold = 20;
      const scrollTop = window.scrollY;

      if (!navbarCollapse.classList.contains("show")) {
        navbar.classList.add("bg-white");
        navbar.classList.add("navbar-light");
        navbar.classList.remove("navbar-dark");
        loginBtn.classList.add("btn-landing-primary");
        loginBtn.classList.remove("btn-outline-light");
        languageSwitcher.classList.add("btn-landing-primary");
        languageSwitcher.classList.remove("btn-outline-light");
      } else if (navbarCollapse.classList.contains("show") && scrollTop <= navbarScrollThreshold) {
        navbar.classList.remove("bg-white");
        navbar.classList.remove("navbar-light");
        navbar.classList.add("navbar-dark");
      }
    },
  },
};
</script>

<style>
.landing-navbar {
  transition: all 0.2s;
}

.landing-navbar .navbar-brand {
  color: var(--color-white);
}

.landing-navbar .nav-link {
  font-size: var(--navbar-link);
}

.landing-navbar-alt .nav-link {
  color: var(--color-black-opacity);
}

.landing-navbar-alt .navbar-brand {
  color: var(--color-black-brand);
}

.landing .landing-navbar-alt {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05), 0 1px 0 rgba(24, 28, 33, 0.04) !important;
}

.bg-light .navbar-toggler-icon {
  background-image: var(--navbar-toggler-dark);
}
</style>