<template>
  <div
    class="bg-gray-700 rounded-xl overflow-hidden max-h-96 min-h-96 shadow-lg"
  >
    <div class="w-full h-3/4 bg-gray-600 animate-pulse"></div>

    <div class="p-3">
      <div class="min-h-[3rem]">
        <div class="h-4 bg-gray-600 animate-pulse w-3/4 mb-1"></div>
        <div class="h-4 bg-gray-600 animate-pulse w-1/2"></div>
      </div>

      <div class="flex items-center justify-between text-xs mt-1">
        <div class="h-3 bg-gray-600 animate-pulse w-10"></div>

        <div class="flex items-center">
          <div
            class="w-4 h-4 bg-gray-600 animate-pulse rounded-full mr-1"
          ></div>
          <div class="h-3 bg-gray-600 animate-pulse w-12"></div>
        </div>

        <div class="flex items-center">
          <div
            class="w-4 h-4 bg-gray-600 animate-pulse rounded-full mr-1"
          ></div>
          <div class="h-3 bg-gray-600 animate-pulse w-6"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "CardSkeleton",
});
</script>
