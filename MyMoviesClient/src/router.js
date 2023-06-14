import { createWebHistory, createRouter } from "vue-router";

const routes =  [
    {
        path: "/",
        name: "Movies",
        component: () => import("./components/Movies"),
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;