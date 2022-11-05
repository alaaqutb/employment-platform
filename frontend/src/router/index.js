import { createRouter, createWebHistory } from "vue-router";
import HomeComponent from "../components/Home.vue";
import LoginComponent from "../components/Login.vue";
import RegisterComponent from "../components/Register.vue";
import JobsComponent from "../components/job/JobsList.vue";
import JobComponent from "../components/job/ViewJob.vue";
import EmployeesComponent from "../components/EmployeesProfiles.vue";
import EmployeeComponent from "../components/Profile.vue";
import SearchComponent from "../components/SearchComponent.vue";
import NotFoundComponent from "../components/NotFoundComponent.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeComponent,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterComponent,
    },
    {
      path: "/login",
      name: "login",
      component: LoginComponent,
    },
    {
      path: "/jobs",
      name: "jobs",
      component: JobsComponent,
    },
    {
      path: "/jobs/:id",
      name: "job",
      component: JobComponent,
    },
    {
      path: "/employees",
      name: "employees",
      component: EmployeesComponent,
    },
    {
      path: "/employees/:id",
      name: "employee",
      component: EmployeeComponent,
    },
    {
      path: "/jobs/title?title=:title",
      name: "search",
      component: SearchComponent,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notfound",
      component: NotFoundComponent
      
    }
  ],
});
//Guard
router.beforeEach((to, from) => {
  if (!isAuthenticated() && to.name !== "login" && to.name !== "register") {
    return { name: "login" };
  }
  if (isAuthenticated() && to.name === "login" || to.name === "register") {
    return { name: "notfound" };
  }
});

function isAuthenticated() {
  const token = localStorage.getItem("token");
  return !!token;
}
export default router;
