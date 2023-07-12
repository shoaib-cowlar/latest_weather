
import { createRouter, createWebHistory } from "vue-router";
import WeatherCard from "../views/WeatherCard.vue";
import SignupPage from "../views/SignupPage.vue";
import LoginPage from "../views/LoginPage.vue";
import AdminPage from "../views/AdminPage.vue";
import { getAccessToken } from "@/helpers";

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: "/weather", name:"Weather", component: WeatherCard },
      { path: "/signup", name:"Signup", component: SignupPage },
      { path: "/login", name:"Login", component: LoginPage},
      { path: "/admin", name:"admin", component: AdminPage},
    ],
  });

  router.beforeEach((to, from, next) => {
    const isAuthenticated = getAccessToken() || false;
    const nonAuthPagesNames = ["Login", "Signup"];
    if (!isAuthenticated && !nonAuthPagesNames.includes(to.name)) {
      router.replace({ name: "Login" });
    } else if (isAuthenticated && nonAuthPagesNames.includes(to.name)) {
      next({ path: "/weather" });
    } else if (isAuthenticated && to.path === "/") {
      next({ path: "/weather" });
    } else {
      next();
    }
  });
  
export default router;