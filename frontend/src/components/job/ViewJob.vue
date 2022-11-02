<template>
  <div class="container p-5">
    <div class="card text-center">
      <div class="card-header">
        <i class="fa-solid fa-newspaper"></i>
        <span class="fw-bold">Title: </span>
        <label>{{ job.title }}</label>
      </div>

      <div class="card-header">
        <i class="fa-solid fa-building-user"></i>
        <span class="fw-bold">Company Name: </span> {{ job.name }}
      </div>
      <div class="card-body">
        <h5 class="card-title">
          <i class="fa-solid fa-magnifying-glass"></i>Description
        </h5>
        <p class="card-text">
          {{ job.description }}
        </p>
      </div>
      <div class="card-body">
        <h5 class="card-title">
          <i class="fa-solid fa-list-ol"></i>Requirements
        </h5>
        <p class="card-text">{{ job.requirements }}</p>
      </div>
      <div class="card-footer text-muted">
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Apply
        </button>
        
      </div>
    </div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Thanks for applying in this job</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        You are pending...
      </div>
    </div>
  </div>
</div>
  </div>
</template>
<script>
import { instance } from "./../../axios/axios";
export default {
  data: () => {
    return {
      id: "",
      job: {},
    };
  },
  methods: {},
  created: async function () {
    this.id = this.$route.params.id;
    const result = await instance.get(`/jobs/${this.id}`, {});
    this.job = result.data ? result.data.data : {};
  },
};
</script>
<style></style>
