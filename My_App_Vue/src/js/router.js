import { createRouter, createWebHistory } from "vue-router";
import MainWindow from "@/components/home/index.vue";
import DashBoard from "@/page/dashboard/index.vue";
import Login from "@/page/login/index.vue";
import { DASHBOARD_URL } from "./contant.js";

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

export default router;
