<template>
  <nav class="navbar bg-dark border-shadow">
    <div class="container-fluid">
      <div class="d-flex align-items-baseline">
        <RouterLink to="/" class="navbar-brand text-light"
          >Employment Platform</RouterLink
        >
        <RouterLink
          to="/employees"
          v-if="isLoggedIn"
          class="text-light nav-link active mx-3"
          >Employees</RouterLink
        >
        <RouterLink
          to="/jobs"
          v-if="isLoggedIn"
          class="text-light nav-link active mx-3"
          >Jobs</RouterLink
        >
      </div>
      <div class="d-flex" v-if="isLoggedIn">
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
          <div
            class="dropdown-menu"
            aria-labelledby="dropdownMenuButton"
            style="right: 0px; left: auto"
          >
            <!-- <a class="dropdown-item" href="#">Profile</a> -->
            <RouterLink to="/profile" class="dropdown-item">Profile</RouterLink>
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
import { notify } from "@kyvg/vue3-notification";

export default {
  data() {
    return {
      email: "",
      isLoggedIn: false,
    };
  },
  methods: {
    async logout() {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");
      if (email) localStorage.removeItem("email");
      if (token) {
        localStorage.removeItem("token");
        notify({
          title: "You are logged out successfully",
        });
      }
      this.$router.push("/login");
      this.isLoggedIn = false;
    },
    // isLoggedIn() {
    //   const token = localStorage.getItem("token");
    //   return !!token; // if the token exists, return true, otherwise, return false.
    // },
  },
  components: {
    //
  },
  created() {
    this.emitter.on("user-is-logged-in", (e) => {
      this.email = e.email;
      this.isLoggedIn = true;
    });
    
    this.email = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    if (token) this.isLoggedIn = true;
  },
};
</script>
<style>
.border-shadow {
  box-shadow: 1px 1px 10px;
  /* border-radius: 0px 0px 5px 5px; */
}
</style>
