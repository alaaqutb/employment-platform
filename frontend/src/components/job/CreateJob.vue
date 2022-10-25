<template>
  <form class="w-50 m-auto mt-5">
    <div class="mb-3">
      <label for="exampleInputText" class="form-label my-form-label"
        >Companies</label
      >
      <select class="form-control" id="exampleFormControlSelect1">
        <option>--select--</option>
        <option></option>
      </select>
    </div>
    <div class="mb-3">
      <label for="exampleInputTitle" class="form-label my-form-label"
        >Title</label
      >
      <input type="text" class="form-control" id="exampleInputTitle" />
    </div>
    <div class="mb-3">
      <div class="form-group">
        <label for="exampleFormControlDescription" class="my-form-label"
          >Description</label
        >
        <textarea
          class="form-control"
          id="exampleFormControlDescription"
          rows="3"
        ></textarea>
      </div>
    </div>
    <div class="mb-3">
      <div class="form-group">
        <label for="exampleFormControlRequirements" class="my-form-label"
          >Requirements</label
        >
        <textarea
          class="form-control"
          id="exampleFormControlRequirements"
          rows="3"
        ></textarea>
      </div>
    </div>
    <button type="submit" class="btn btn-primary">Post</button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      //
    };
  },
  methods: {
    //
  },
};
</script>
<style>
.my-form-label {
  font-weight: bold;
}
</style>
