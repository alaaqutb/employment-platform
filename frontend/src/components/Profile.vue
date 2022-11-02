<template>
  <div class="container p-5">
    <div class="card text-center w-50 m-auto">
      <div class="card-header">
        <i class="fa-solid fa-user"></i>
        <span class="fw-bold">Name: </span>
        <label>{{ employee.name }}</label>
      </div>

      <div class="card-header">
        <i class="fa-solid fa-envelope"></i>
        <span class="fw-bold">Email: </span> {{ employee.email }}
      </div>
      <div class="card-body">
        <i class="fa-solid fa-user-pen"></i>
        <span class="fw-bold">Bio: </span> {{ employee.bio_text }}
      </div>
      <div class="card-body">
        <i class="fa-solid fa-city"></i>
        <span class="fw-bold">City: </span> {{ employee.city }}
      </div>
      <div class="card-body">
          <i class="fa-solid fa-gears"></i>
           <span class="fw-bold">Skills:</span> {{ employee.skills }}
      </div>
      <div class="card-body">
          <i class="fa-solid fa-user-gear"></i>
          <span class="fw-bold">Experience Level:</span> {{ employee.experience_level}}
      </div>
    </div>
  </div>
</template>
<script>
import { instance } from "../axios/axios";
export default {
  data() {
    return {
      id: "",
      employee: {},
    };
  },
  methods: {},
  created: async function () {
    this.id = this.$route.params.id;
    const result = await instance.get(`/employees/${this.id}`, {});
    this.employee = result.data ? result.data.data : {};
  },
};
</script>
<style scoped></style>
