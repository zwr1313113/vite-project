import { createRouter, createWebHashHistory } from "vue-router";
import index from "../views/index.vue";
import tinymce from "../views/tinymce/index.vue";

const routes = [
  {
    path: "/",
    name: "index",
    component: index,
  },
  {
    path: "/tinymce",
    name: "tinymce",
    component: tinymce,
  },
];
export default createRouter({
  history: createWebHashHistory(),
  routes: routes,
});
