<template>
  <div class="container p-5 wrapper" v-if="jobs">
    <div class="container-fluid w-50">
      <form class="d-flex" role="search">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          v-model="keyword"
        />
        <button
          class="btn btn-outline-secondary"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          @click.prevent="sendSearchRequest()"
        >
          Search
        </button>
      </form>
    </div>
    <!-- Modal -->
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
            <h1 class="modal-title fs-5" id="exampleModalLabel">result:</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <ul class="list-group m-3" v-for="item in result" :key="item.jobID">
              <li class="list-group-item">Title: {{ item.title }}</li>
              <li class="list-group-item">
                Description: {{ item.description }}
              </li>
              <li class="list-group-item">
                Requirement: {{ item.requirements }}
              </li>
            </ul>
          </div>
          <div class="modal-footer">
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
    <!-- <form class="form-inline d-flex">
      <input
        class="form-control mr-sm-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        :v-model="keyword"
      />
      <button class="btn btn-outline-secondary my-2 my-sm-0 m-2" type="submit" @click="getJobTitle()">
        Search
      </button>
    </form> -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Requirements</th>
          <th scope="col">Company Name</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(job, index) in jobs"
          :key="job.jobID"
          class="cursor-pointer"
          @click="goToJobProfile(job.jobID)"
        >
          <th scope="row">{{ (pageNumber - 1) * 10 + index + 1 }}</th>
          <td>{{ job.title }}</td>
          <td>{{ job.description }}</td>
          <td>{{ job.requirements }}</td>
          <td>{{ job.name }}</td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation example mx-auto">
      <ul class="pagination">
        <li
          class="page-item"
          v-for="index in pages"
          :key="index"
          @click="getJobs(index)"
        >
          <span class="page-link cursor-pointer">{{ index }}</span>
        </li>
      </ul>
    </nav>
  </div>
  <div v-else style="text-align: center">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>
<script>
import { instance } from "../../axios/axios";

export default {
  data() {
    return {
      jobs: null,
      pageNumber: 1,
      totalCount: 0,
      pages: 0,
      result: [],
      keyword: ''
    };
  },
  methods: {
    async getJobs(number) {
      try {
        this.pageNumber = number;
        let token = localStorage.getItem("token");
        const result = await instance.get(`/jobs?page=${number}`, {
          headers: { authorization: token },
        });
        this.jobs = result.data.data;
        console.log(this.jobs)
        this.totalCount = result.data.totalCount;
        this.pages =
          this.totalCount / 10 > parseInt(this.totalCount / 10)
            ? parseInt(this.totalCount / 10) + 1
            : parseInt(this.totalCount / 10);
      } catch (err) {
        this.jobs = null;
        this.totalCount = null;
      }
    },
    async sendSearchRequest() {
      //this.keyword = this.$route.query.keyword;
      const token = localStorage.getItem("token");
      //console.log(this.url);
      const result = await instance.get(`/jobs/title?title=${this.keyword}`, {
        headers: { authorization: token },
      });
      console.log(result);
      this.result = result.data.data;
    },
    goToJobProfile(jobId) {
      this.$router.push(`/jobs/${jobId}`);
    },
  },
  created: async function () {
    this.getJobs(this.pageNumber);
  },
};
</script>

<style>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
