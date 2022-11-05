<template>
  <nav class="navbar bg-dark">
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand text-light"
        >Employment Platform</RouterLink
      >
      <div>
        <SearchComponent url="/jobs/title?title="></SearchComponent>
      </div>
      <div class="d-flex">
        <RouterLink to="/employees" class="text-light nav-link active mx-3"
          >Employees</RouterLink
        >
        <RouterLink to="/jobs" class="text-light nav-link active mx-3"
          >Jobs</RouterLink
        >
        <RouterLink to="/register" class="text-light nav-link active mx-3"
          >Register</RouterLink
        >
        <RouterLink to="/login" class="text-light nav-link active mx-3"
          >Login</RouterLink
        >
        <text class="text-light cursor-pointer" @click="logout()">Logout</text>
      </div>
    </div>
  </nav>
</template>
<script>
import { RouterLink } from "vue-router";
import SearchComponent from "./SearchComponent.vue";
export default {
  data() {
    return {
      // isLoggedIn: true,
    };
  },
  methods: {
    async logout() {
      const token = localStorage.getItem("token");
      if (token) {
        localStorage.removeItem("token");
        // this.isLoggedIn = false;
      }
    },
    // isLoggedIn() {
    //   const token = localStorage.getItem("token");
    //   return !!token;
    // },
  },
  components: {
    SearchComponent,
  },
};
</script>
<style></style>
