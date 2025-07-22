import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/Home.vue";
import Register from "@/components/Register.vue";
import Login from "@/components/Login.vue";
import { useAuthStore } from "@/stores/auth";
import CreateView from "@/components/Post/CreateView.vue";
import ShowView from "@/components/Post/ShowView.vue";
import UpdateView from "@/components/Post/UpdateView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: { guest: true },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { guest: true },
    },
    {
      path: "/create",
      name: "create",
      component: CreateView,
      meta: { auth: true },
    },
    {
      path: "/post/:id",
      name: "show",
      component: ShowView,
    },
    {
      path: "/post/update/:id",
      name: "update",
      component: UpdateView,
      meta: { auth: true },
    },
  ],
});

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();
  await authStore.getUser();

  if (authStore.user && to.meta.guest) {
    return { name: "home" };
  }

  if (!authStore.user && to.meta.auth) {
    return { name: "login" };
  }
});

export default router;
