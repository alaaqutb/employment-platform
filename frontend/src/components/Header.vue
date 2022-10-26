<template>
  <nav class="navbar bg-dark">
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand text-light">Employment Platform</RouterLink>
      <!-- <form class="d-flex" role="search">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form> -->
      <div class="d-flex">
        <RouterLink to="/register" class="text-light nav-link active mx-3">Register</RouterLink>
        <RouterLink to="/login" class="text-light nav-link active mx-3">Login</RouterLink>
      </div>
    </div>
  </nav>
</template>
<script>
import { RouterLink } from 'vue-router';

export default {
    data() {
        return {
        //
        };
    },
    methods: {
    //
    },
    components: {
      //
    }
};
</script>
<style></style>
