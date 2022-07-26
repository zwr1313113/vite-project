import { createRouter, createWebHashHistory } from "vue-router";
import index from "../views/index.vue";

const routes = [
  {
    path: "/",
    name: "index",
    component: index,
  },
];
export default createRouter({
  history: createWebHashHistory(),
  routes: routes,
});
