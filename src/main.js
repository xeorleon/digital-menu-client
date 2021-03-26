import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BootstrapVue from "bootstrap-vue";
import LinearIcons from "linearicons";
import Notifications from "vue-notification";
import VuePageTitle from 'vue-page-title'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "pace-js/pace-theme-default.min.css";
import "@/styles/variables.css";
import "@/styles/styles.css";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(LinearIcons);
Vue.use(Notifications);
Vue.use(VuePageTitle, {
  suffix: " | Digital Menu"
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
