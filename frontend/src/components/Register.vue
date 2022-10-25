<template>
  <form class="w-50 m-auto mt-5">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label my-form-label"
        >Email address</label
      >
      <input
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label my-form-label"
        >Password</label
      >
      <input type="password" class="form-control" id="exampleInputPassword1" />
    </div>
    <div class="mb-3">
      <label for="exampleInputText" class="form-label my-form-label"
        >Name</label
      >
      <input type="text" class="form-control" id="exampleInputText" />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlSelect1" class="form-label my-form-label"
        >Experience Level</label
      >
      <select class="form-control" id="exampleFormControlSelect1">
        <option>--select--</option>
        <option>Junior</option>
        <option>Mid</option>
        <option>Senior</option>
      </select>
    </div>
    <div class="mb-3">
      <label for="exampleInputCity" class="form-label my-form-label"
        >City</label
      >
      <input type="text" class="form-control" id="exampleInputCity" />
    </div>
    <div class="mb-3">
      <label for="exampleInputSkills" class="form-label my-form-label"
        >Skills</label
      >
      <input type="text" class="form-control" id="exampleInputSkills" />
    </div>
    <div class="mb-3">
      <label for="exampleInputNational" class="form-label my-form-label"
        >National Id</label
      >
      <input type="text" class="form-control" id="exampleInputNational" />
    </div>
    <div class="mb-3">
      <div class="form-group">
        <label for="exampleFormControlTextarea1" class="my-form-label">Bio Text</label>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
      </div>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
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
