<template>
  <div class="container p-5" v-if="job">
    <div class="card w-50 m-auto">
      <div class="card-body">
        <h5 class="card-title">{{ job.title }}</h5>
        <p class="card-text">{{ job.description }}</p>
        <table class="table m-auto">
          <tbody>
            <tr>
              <th scope="row" class="w-25">Company Name:</th>
              <td class="w-75">{{ job.name }}</td>
            </tr>
            <tr>
              <th scope="row">Requirements:</th>
              <td>{{ job.requirements }}</td>
            </tr>
          </tbody>
        </table>
        <div class="d-flex mt-3 justify-content-center">
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
    </div>

    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Confirmation
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">Are you sure ?</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="apply()"
            >
              Submit
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else style="text-align: center;">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>
<script>
import { instance } from "./../../axios/axios";
import { notify } from "@kyvg/vue3-notification";
// import $ from "jQuery";

export default {
  data: () => {
    return {
      id: "",
      job: null,
    };
  },
  methods: {
    async apply() {
      const token = localStorage.getItem("token");
      const result = await instance.post(
        `/jobs/${this.id}/apply`,
        {},
        {
          headers: { authorization: token },
        }
      );
       if (result) {
         notify({
           title: result.data.message,
         });
         // $('#exampleModal').hide();
         // this.$forceUpdate();
         // this.$router.go(this.$router.currentRoute);
       }
    },
  },
  created: async function () {
    this.id = this.$route.params.id;
    const result = await instance.get(`/jobs/${this.id}`, {});
    this.job = result.data ? result.data.data : {};
  },
};
</script>
<style></style>
