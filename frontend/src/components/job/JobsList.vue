<template>
  <div class="container p-5">
    <div class="row d-flex">
      <div
        class="list-group p-2 w-75 m-auto bg-dark text-white"
        v-for="job in jobs"
        :key="job.id"
      >
        <RouterLink
          :to="{ path: `/jobs/${job.id}` }"
          class="list-group-item list-group-item-action"
          aria-current="true"
        >
          <div class="d-flex w-100 justify-content-between">
            <label><span class="fw-bold">Title:</span> {{ job.title }}</label>
          </div>
          <p class="mb-1">
            <span class="fw-bold">Description:</span> {{ job.description }}
          </p>
          <p class="mb-1">
            <span class="fw-bold">Requirements:</span> {{ job.requirements }}
          </p>
          <p class="mb-1">
            <span class="fw-bold">Company Name:</span> {{ job.name }}
          </p>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
<script>
import { RouterLink } from "vue-router";
import { instance } from "../../axios/axios";
import { store } from "../../axios/store";

export default {
  data() {
    return {
      jobs: [],
    };
  },
  methods: {
    //
  },
  components: {
    //
  },
  created: async function () {
    const token = localStorage.getItem("token");
    const result = await instance.get("jobs", {
      headers: { authorization: token },
    });
    this.jobs = result.data.data;
  },
};
</script>
<style></style>
