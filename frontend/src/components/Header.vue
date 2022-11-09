<template>
  <nav class="navbar bg-dark">
    <div class="container-fluid">
      <div class="d-flex align-items-baseline">
        <RouterLink to="/" class="navbar-brand text-light"
          >Employment Platform</RouterLink
        >
        <RouterLink
          to="/employees"
          v-if="isLoggedIn()"
          class="text-light nav-link active mx-3"
          >Employees</RouterLink
        >
        <RouterLink
          to="/jobs"
          v-if="isLoggedIn()"
          class="text-light nav-link active mx-3"
          >Jobs</RouterLink
        >
      </div>
      <div class="d-flex" v-if="isLoggedIn()">
        <div class="dropdown">
          <button
            class="text-white bg-dark border-0 dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {{ email }}
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#">Profile</a>
            <a class="dropdown-item" href="#" @click.prevent="logout()"
              >Logout</a
            >
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import { RouterLink } from "vue-router";
// import { EventBus } from "../event-bus";
export default {
  data() {
    return {
      email: "email@email.com",
    };
  },
  methods: {
    async logout() {
      const token = localStorage.getItem("token");
      if (token) {
        localStorage.removeItem("token");
      }
      this.$router.push("/login");
    },
    isLoggedIn() {
      const token = localStorage.getItem("token");
      return !!token; // if the token exists, return true, otherwise, return false.
    },
  },
  components: {
    //
  },
  mounted() {
    console.log("user-is-logged-in")
  },
};
</script>
<style></style>
