<template>
  <form class="w-50 m-auto mt-5">
    <div class="row d-flex">
      <div class="mb-3 col-6">
        <label for="exampleInputText" class="form-label my-form-label"
          >Name</label
        >
        <input
          type="text"
          class="form-control"
          id="exampleInputText"
          v-model="employee.name"
        />
      </div>
      <div class="mb-3 col-6">
        <label for="exampleInputEmail1" class="form-label my-form-label"
          >Email Address</label
        >
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model="employee.email"
        />
      </div>
    </div>
    <div class="row d-flex">
      <div class="mb-3 col-6">
        <label for="exampleInputPassword1" class="form-label my-form-label"
          >Password</label
        >
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          v-model="employee.password"
        />
      </div>
      <div class="mb-3 col-6">
        <label for="exampleInputPassword2" class="form-label my-form-label"
          >Confirm Password</label
        >
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword2"
          v-model="confirm_password"
        />
      </div>
    </div>

    <div class="mb-3">
      <label for="exampleFormControlSelect1" class="form-label my-form-label"
        >Experience Level</label
      >
      <select
        class="form-control"
        id="exampleFormControlSelect1"
        v-model="employee.experience_level"
      >
        <option value="junior">Junior</option>
        <option value="mid">Mid</option>
        <option value="senior">Senior</option>
      </select>
    </div>

    <div class="row d-flex">
      <div class="mb-3 col-4">
        <label for="exampleInputCity" class="form-label my-form-label"
          >City</label
        >
        <input
          type="text"
          class="form-control"
          id="exampleInputCity"
          v-model="employee.city"
        />
      </div>
      <div class="mb-3 col-4">
        <label for="exampleInputSkills" class="form-label my-form-label"
          >Skills</label
        >
        <input
          type="text"
          class="form-control"
          id="exampleInputSkills"
          v-model="employee.skills"
        />
      </div>
      <div class="mb-3 col-4">
        <label for="exampleInputNational" class="form-label my-form-label"
          >National Id</label
        >
        <input
          type="text"
          class="form-control"
          id="exampleInputNational"
          v-model="employee.national_id"
        />
      </div>
    </div>

    <div class="mb-3">
      <div class="form-group">
        <label for="exampleFormControlTextarea1" class="my-form-label"
          >Bio Text</label
        >
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          v-model="employee.bio_text"
        ></textarea>
      </div>
    </div>
    <button
      type="submit"
      class="btn btn-primary mb-5 w-100"
      @click.prevent="register"
      :disabled="disableSubmit()"
    >
      Register
    </button>
  </form>
</template>
<script>
import { instance } from "../axios/axios";

export default {
  data() {
    return {
      confirm_password: "",
      employee: {
        name: "",
        email: "",
        password: "",
        experience_level: "",
        city: "",
        skills: "",
        national_id: "",
        bio_text: "",
      },
    };
  },
  methods: {
    async register() {
      const result = await instance.post("employees/register", this.employee);
      alert(result.data.message);
      if (result.data.success) {
        this.$router.push("/");
      }
    },
    disableSubmit() {
      return (
        this.employee.password !== this.confirm_password ||
        !this.confirm_password ||
        !this.employee.password
      );
    },
  },
};
</script>
<style>
.my-form-label {
  font-weight: bold;
}
</style>
