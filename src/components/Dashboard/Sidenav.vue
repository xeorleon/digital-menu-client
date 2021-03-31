<template>
  <sidebar-menu :menu="sidenavOptions.menu" :relative="sidenavOptions.isRelative" :width="sidenavOptions.width" :hideToggle="sidenavOptions.hideToggle" :collapsed="sidenavOptions.collapsed" />
</template>

<script>
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import { SidebarMenu } from "vue-sidebar-menu";
import authService from "@/services/authService";
export default {
  components: {
    SidebarMenu,
  },
  data() {
    return {
      sidenavOptions: {
        menu: [
          {
            header: true,
            title: "Digital Menu",
            hiddenOnCollapse: true,
          },
          {
            href: "/dashboard",
            title: "Anasayfa",
            icon: "lnr lnr-home",
          },
          {
            href: "/account",
            title: "Profil",
            icon: "lnr lnr-user",
          },
          {
            class: "logout",
            title: "Çıkış Yap",
            icon: "lnr lnr-exit",
          },
        ],
        isRelative: false,
        width: "15%",
        hideToggle: true,
        collapsed: window.outerWidth < 768,
      },
    };
  },
  destroyed() {
    window.removeEventListener("resize", this.withChanged);
    var logoutBtn = document.getElementsByClassName("logout")[0];
    logoutBtn.removeEventListener("click", this.logout);
  },
  mounted() {
    window.addEventListener("resize", this.withChanged, false);
    var logoutBtn = document.getElementsByClassName("logout")[0];
    logoutBtn.addEventListener("click", this.logout);
  },
  methods: {
    withChanged(event) {
      this.sidenavOptions.collapsed = event.target.outerWidth < 768;
    },
    async logout() {
      const userId = this.$store.state.user.userId;
      this.$store.dispatch("setUser", null);
      this.$store.dispatch("setToken", null);
      await authService.logout(userId);
      this.$router.push("/");
    },
  },
};
</script>

<style>
.v-sidebar-menu {
  background-color: var(--color-landing-secondary);
}
.v-sidebar-menu .vsm--icon {
  background-color: var(--color-landing-secondary) !important;
}

.v-sidebar-menu .vsm--link.vsm--link_hover {
  background-color: var(--color-landing-secondary-hover) !important;
}
</style>