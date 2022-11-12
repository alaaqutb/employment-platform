<template>
  <div class="w-50 m-auto pt-5">
    <h3 class="mb-3">Register</h3>
    <form>
      <div class="row d-flex">
        <div class="mb-3 col-6">
          <label class="form-label my-form-label">Name</label>
          <input
            type="text"
            class="form-control"
            :class="this.errors.name"
            @blur="validateName()"
            v-model="employee.name"
          />
          <div class="invalid-feedback">Invalid Name</div>
        </div>
        <div class="mb-3 col-6">
          <label class="form-label my-form-label">Email Address</label>
          <input
            type="email"
            class="form-control"
            :class="this.errors.email"
            @blur="validateEmail()"
            aria-describedby="emailHelp"
            v-model="employee.email"
          />
          <div class="invalid-feedback">Invalid Email</div>
        </div>
      </div>
      <div class="row d-flex">
        <div class="mb-3 col-6">
          <label class="form-label my-form-label">Password</label>
          <input
            type="password"
            class="form-control"
            :class="this.errors.password"
            @blur="validatePassword()"
            v-model="employee.password"
          />
          <div class="invalid-feedback">Invalid Password</div>
        </div>
        <div class="mb-3 col-6">
          <label class="form-label my-form-label">Confirm Password</label>
          <input
            type="password"
            class="form-control"
            :class="this.confirm_password"
            @blur="validateConfirmPassword()"
            v-model="confirm_password"
          />
          <div class="invalid-feedback">Invalid Confirm Password</div>
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label my-form-label">Experience Level</label>
        <select
          class="form-control"
          @blur="validateExperienceLevel()"
          v-model="this.errors.experience_level"
        >
          <option value="junior">Junior</option>
          <option value="mid">Mid</option>
          <option value="senior">Senior</option>
        </select>
        <div class="invalid-feedback">Invalid Experience Level</div>
      </div>

      <div class="row d-flex">
        <div class="mb-3 col-4">
          <label class="form-label my-form-label">City</label>
          <!-- <input
            type="text"
            class="form-control"
            v-model="employee.city"
          /> -->
          <select
            class="form-select"
            :class="this.errors.city"
            @blur="validateCity()"
            v-model="employee.city"
          >
            <option :value="city.id" v-for="city in cities" :key="city.id">
              {{ city.name }}
            </option>
          </select>
          <div class="invalid-feedback">Invalid City</div>
        </div>
        <div class="mb-3 col-4">
          <label class="form-label my-form-label">Skills</label>
          <input
            type="text"
            class="form-control"
            :class="this.errors.skills"
            @blur="validateSkills()"
            v-model="employee.skills"
          />
          <div class="invalid-feedback">Invalid Skills</div>
        </div>
        <div class="mb-3 col-4">
          <label class="form-label my-form-label">National ID</label>
          <input
            type="text"
            class="form-control"
            :class="this.errors.national_id"
            @blur="validateNationalID()"
            v-model="employee.national_id"
          />
          <div class="invalid-feedback">Invalid National ID</div>
        </div>
      </div>

      <div class="mb-3">
        <div class="form-group">
          <label class="my-form-label">Bio Text</label>
          <textarea
            class="form-control"
            :class="this.errors.bio_text"
            @blur="validateBioText()"
            rows="3"
            v-model="employee.bio_text"
          ></textarea>
          <div class="invalid-feedback">Invalid Bio</div>
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
  </div>
</template>
<script>
import { instance } from "../axios/axios";
import { notify } from "@kyvg/vue3-notification";
/*
name -> required, max length = 50, min length = 3
email -> required, valid email
password ->  required, strong, password = confirm password
level -> required
city -> required
skills -> required
national id -> required, valid id
bio -> required, max length = 100
*/
export default {
  data() {
    return {
      cities: [
        // it should come from the backend
        // { id: xxx, name: 'xxx' }
      ],
      confirm_password: null,
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
      errors: {
        name: null,
        email: null,
        password: null,
        experience_level: null,
        city: null,
        skills: null,
        national_id: null,
        bio_text: null,
      },
    };
  },
  methods: {
    async register() {
      const result = await instance.post("employees/register", this.employee);
      if (result.data.success) {
        this.$router.push("/");
        notify({
          title: result.data.message,
        });
      }
    },
    disableSubmit() {
      // return (
      //   this.employee.password !== this.confirm_password ||
      //   !this.confirm_password ||
      //   !this.employee.password
      // );
    },
    validateName() {
      if (this.employee.name.length >= 50 || this.employee.name.length < 3) {
        this.errors.name = "is-invalid";
      } else {
        this.errors.name = null;
      }
    },
    validateEmail() {
      const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!this.employee.email.match(regex)) {
        this.errors.email = "is-invalid";
      } else {
        this.errors.email = null;
      }
    },
    validatePassword() {
      const regex =
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
      if (!this.employee.password.match(regex)) {
        this.errors.password = "is-invalid";
      } else {
        this.errors.password = null;
      }
    },
    validateConfirmPassword() {
      if (!(this.confirm_password == this.employee.password)) {
        this.confirm_password = "is-invalid";
      } else {
        this.confirm_password = null;
      }
    },
    validateExperienceLevel() {
      if (this.employee.experience_level) {
        this.errors.experience_level = null;
      } else {
        this.errors.experience_level = "is-invalid";
      }
    },
    validateCity() {
      if (this.employee.city) {
        this.errors.city = null;
      } else {
        this.errors.city = "is-invalid";
      }
    },
    validateSkills() {
      if (this.employee.skills) {
        this.errors.skills = null;
      } else {
        this.errors.skills = "is-invalid";
      }
    },
    validateNationalID() {
      const regex =
        /^(2|3)[0-9][1-9][0-1][1-9][0-3][1-9](01|02|03|04|11|12|13|14|15|16|17|18|19|21|22|23|24|25|26|27|28|29|31|32|33|34|35|88)\d\d\d\d\d$/;
      if (!this.employee.national_id.match(regex)) {
        this.errors.national_id = "is-invalid";
      } else {
        this.errors.national_id = null;
      }
    },
    validateBioText() {
      if (this.employee.bio_text.length >= 100) {
        this.errors.bio_text = "is-invalid";
      } else {
        this.errors.bio_text = null;
      }
    },
  },
  created() {
    // get cities from the backend
  },
};
</script>
<style>
.my-form-label {
  font-weight: bold;
}
</style>
