<template>
  <div id="app" class="flex flex-col min-h-screen bg-gray-900">
    <Header />

    <main class="flex-grow">
      <router-view />
    </main>

    <Footer />
  </div>
</template>

<script lang="ts" setup>
import Header from "./components/layout/Header.vue";
import Footer from "./components/layout/Footer.vue";
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
