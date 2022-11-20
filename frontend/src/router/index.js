import { createRouter, createWebHistory } from "vue-router";
import HomeComponent from "../components/Home.vue";
import LoginComponent from "../components/Login.vue";
import RegisterComponent from "../components/Register.vue";
import JobsComponent from "../components/job/JobsList.vue";
import JobComponent from "../components/job/ViewJob.vue";
import EmployeesComponent from "../components/employees/EmployeesList.vue";
import EmployeeComponent from "../components/employees/Profile.vue";
import SearchComponent from "../components/SearchComponent.vue";
import jobEmployeeComponent from "../components/job/jobEmployee.vue";
import NotFoundComponent from "../components/NotFoundComponent.vue";
import CreateJobComponent from "../components/job/CreateJob.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeComponent,
    },
    {
      path: "/login",
      name: "login",
      component: LoginComponent,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterComponent,
    },
    {
      path: "/jobs",
      name: "jobs",
      component: JobsComponent,
    },
    {
      path: "/jobs",
      name: "postJobs",
      component: CreateJobComponent,
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
      path: "/profile",
      name: "profile",
      component: EmployeeComponent,
    },
    {
      path: "/jobs/:id/employees",
      name: "job-employee",
      component:  jobEmployeeComponent,
    },
    // {
    //   path: "/companies",
    //   name: "jobs",
    //   component: CreateJobComponent,
    // },
    {
      path: "/:pathMatch(.*)*",
      name: "notfound",
      component: NotFoundComponent
    }
  ],
});
// Guard
router.beforeEach((to, from) => {
  if (!isAuthenticated() && to.name !== "login" && to.name !== "register") {
    // any page except login and register, redirect it to login page
    return { name: "login" };
  }
  if (isAuthenticated() && (to.name === "login" || to.name === "register")) {
    // false && (false || true)
    // when i already logged in, don't let me to go to login or register page
    return { name: "notfound" };
  }
});

function isAuthenticated() {
  const token = localStorage.getItem("token");
  return !!token;
}
export default router;
