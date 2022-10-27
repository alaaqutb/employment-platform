<template></template>
<script>
import { RouterLink } from 'vue-router';
import { instance } from "../../axios/axios";

export default {
    data() {
        return {
        //
        };
    },
    methods: {
    //
    },
    components: {
      //
    },
    created: async () => {
      const result = await instance.get("jobs", {});
      console.log(result);
    },
}
</script>
<style></style>