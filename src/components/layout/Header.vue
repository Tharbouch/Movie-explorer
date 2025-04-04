<template>
  <header class="bg-gray-700 text-white p-4 flex justify-between items-center">
    <router-link to="/" class="text-xl font-bold">Movie Explorer</router-link>
    <nav class="flex gap-2">
      <router-link to="/watchlist" class="font-bold">Watchlist</router-link>
      <router-link to="/favorites" class="font-bold">Favorites</router-link>
    </nav>
  </header>
</template>

<script lang="ts">
import { RouterLink } from "vue-router";
export default {
  name: "Header",
  components: {
    RouterLink,
  },
};
</script>
