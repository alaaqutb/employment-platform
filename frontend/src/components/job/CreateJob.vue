<template>
  <form class="w-50 m-auto mt-5">
    <div class="mb-3">
      <label class="form-label my-form-label">Companies</label>
      <select class="form-select" v-model="job.company_id">
        <option
          v-for="company in companies"
          :value="company.id"
          :key="company.id"
        >
          {{ company.name }}
        </option>
      </select>
    </div>
    <div class="mb-3">
      <label class="form-label my-form-label">Title</label>
      <input type="text" class="form-control" v-model="job.title" />
    </div>
    <div class="mb-3">
      <div class="form-group">
        <label class="my-form-label">Description</label>
        <textarea
          class="form-control"
          rows="3"
          v-model="job.description"
        ></textarea>
      </div>
    </div>
    <div class="mb-3">
      <div class="form-group">
        <label class="my-form-label">Requirements</label>
        <textarea
          class="form-control"
          rows="3"
          v-model="job.requirements"
        ></textarea>
      </div>
    </div>
    <button
      type="submit"
      class="btn btn-primary mb-3"
      @click.prevent="postJob()"
    >
      Post
    </button>
  </form>
</template>
<script>
import { instance } from "../../axios/axios";
import { notify } from "@kyvg/vue3-notification";
export default {
  data() {
    return {
      companies: [],
      job: {
        company_id: "",
        description: "",
        requirements: "",
        title: "",
      },
    };
  },
  methods: {
    async postJob() {
      const token = localStorage.getItem("token");
      const result = await instance.post(
        "/jobs",
        this.job ,
        {
          headers: { authorization: token },
        }
      );
      if (result) {
        notify({
          title: result.data.message,
        });
      }
    },
  },
  created: async function () {
    const result = await instance.get("/companies", {});
    this.companies = result.data.data;
    console.log(this.companies);
  },
};
</script>
<style>
.my-form-label {
  font-weight: bold;
}
</style>
