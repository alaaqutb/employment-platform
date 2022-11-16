<template>
  <div class="container w-50 m-auto">
    <div class="container-fluid">
      <form class="d-flex" role="search">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          v-model="keyword"
        />
        <button
          class="btn btn-outline-light"
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
            <ul class="list-group m-3" v-for="item in result" :key="item.id">
              <li class="list-group-item">Title: {{ item.title }}</li>
              <li class="list-group-item">Description: {{ item.description }}</li>
              <li class="list-group-item">Requirement: {{ item.requirements }}</li>
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
  </div>
</template>
<script>
import { instance } from "../axios/axios";
export default {
  props: ["url"],
  data() {
    return {
      keyword: "",
      result: [],
    };
  },
  methods: {
    async sendSearchRequest() {
      //this.keyword = this.$route.query.keyword;
      const token = localStorage.getItem("token");
      console.log(this.url);
      const result = await instance.get(`${this.url}${this.keyword}`, {
        headers: { authorization: token },
      });
      // console.log(result);
      this.result = result.data.data;
    },
  },
};
</script>
<style></style>
