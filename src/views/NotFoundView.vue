<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-4xl font-bold mb-4">404</h1>
    <p class="mb-4">Page not found.</p>
    <router-link to="/" class="text-blue-500 hover:underline"
      >Go back home</router-link
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";
export default defineComponent({
  name: "NotFound",
  components: {
    RouterLink,
  },
});
</script>
