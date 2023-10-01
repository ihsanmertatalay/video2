import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import Anlat from "./Anlat.vue";
import Dinle from "./Dinle.vue";
import Sor from "./Sor.vue";
import Cevapla from "./Cevapla.vue";
import Home from "./Home.vue";
import oldHome from "./oldHome.vue";
import Login from "./Login.vue";
import Admin from "./Admin.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      component: Login,
      path: "",
    },
    {
      component: Home,
      path: "/home",
    }
    ,
    {
      component: oldHome,
      path: "/oldHome",
    },
    {
      path: "/home/:id",
      component: Home,
    },
    {
      component: Anlat,
      path: "/anlat",
    },
    {
      path: "/anlat/:id",
      component: Anlat,
    },
    {
      component: Dinle,
      path: "/Dinle",
    },
    {
      component: Dinle,
      path: "/Dinle/:id",
    },
    {
      component: Cevapla,
      path: "/Cevapla",
    },
    {
      component: Sor,
      path: "/Sor/:id",
    },

    {
      component: Cevapla,
      path: "/Cevapla/:id",
    },
    {
      component: Sor,
      path: "/Sor",
    },
    {
      component: Admin,
      path: "/admin",
    },
  ],
  linkActiveClass: "active",
  scrollBehavior(_, _2, savedPosition) {
    // console.log(to, from, savedPosition);
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
  },
});

export default router;
