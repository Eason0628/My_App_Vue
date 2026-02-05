import { createRouter, createWebHistory } from "vue-router";
import MainWindow from "@/components/home/index.vue";
import DashBoard from "@/page/dashboard/index.vue";
import Login from "@/page/login/index.vue";
import { DASHBOARD_URL } from "./contant.js";
import store from "@/store/index.js";

export const MULTIOPT_BASE_PATH = "/layout/dashboard";
const routes = [
  {
    path: "/",
    name: "index",
    component: MainWindow,
    redirect: DASHBOARD_URL,
    children: [
      {
        path: DASHBOARD_URL,
        component: DashBoard,
        name: "menu.staging",
        meta: { closable: false },
      }
    ],
  },
  {
    path: "/login",
    component: Login,
    name: "login",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  debugger;
  let token = store.getters["user/getToken"];
  if (token) {
    if (Object.keys(store.getters["user/getUserInfo"]).length === 0) {
      store.dispatch("user/SetMenus").then((asyncRoutes) => {
        asyncRoutes.forEach((route) => {
          if (route.component && route.path) router.addRoute("index", route);
        });
        router.addRoute("index", {
          path: "/:pathMatch(.*)*",
          name: "未找到",
          component: () => import("@/page/NotFound.vue"),
          meta: { closable: true },
        });
        next({ ...to, replace: true });
      });
    } else {
      if (to.path === "/login") next("/");
      else {
        next();
        store.commit("user/setRoute", to);
      }
    }
  } else {
    if (to.path === "/login") {
      next();
      store.commit("user/setRoute", to);
    }
    else next({ path: "/login", query: { redirect: to.fullPath } });
  }
});

export default router;
