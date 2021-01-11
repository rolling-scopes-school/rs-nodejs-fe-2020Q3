import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Todo from "@/views/Todo.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Todo",
    component: Todo,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
