import Vue from "vue";
import VueRouter from "vue-router";
import Landing from "../views/Landing.vue";
import Dashboard from "../views/Dashboard.vue";
import Layout from "../components/Layout";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Landing",
    component: Landing,
  },
  {
    path: "/register",
    name: "Register",
    component: () => import(/* webpackChunkName: "register" */ "@/views/Register.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ "@/views/Login.vue"),
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () => import(/* webpackChunkName: "forgot-password" */ "@/views/ForgotPassword.vue"),
  },
  {
    path: "/dashboard",
    component: Layout, // dashboardın layout'unu belirtiyoruz ve layout içinde router view diyip gönderdigimiz viewları
    //Layoutun içinde gösteriyoruz.
    children: [
      {
        path: "/dashboard",
        component: Dashboard,
      },
      // {
      //   path: "/dashboard/ornek",
      //   component: () => import(/* webpackChunkName: "forgot-password" */ "@/views/Ornek")
      // }
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
