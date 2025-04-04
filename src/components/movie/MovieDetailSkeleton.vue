<template>
  <section class="text-white min-h-screen">
    <div class="container mx-auto px-4 py-8">
      <div
        class="flex flex-col md:flex-row bg-gray-700 rounded-xl shadow-lg overflow-hidden"
      >
        <div
          class="md:w-1/3 flex min-h-[500px] justify-center items-start bg-gray-800"
        >
          <div class="bg-gray-600 animate-pulse w-full h-full"></div>
        </div>

        <div class="md:w-2/3 p-6 space-y-4">
          <div>
            <div class="h-8 bg-gray-600 animate-pulse w-3/4 mb-2"></div>
            <div class="h-4 bg-gray-600 animate-pulse w-1/2"></div>
          </div>

          <div class="flex flex-wrap gap-4">
            <div class="flex items-center space-x-1">
              <div class="w-5 h-5 bg-gray-600 animate-pulse rounded-full"></div>
              <div class="w-8 h-4 bg-gray-600 animate-pulse"></div>
            </div>
            <div class="w-12 h-4 bg-gray-600 animate-pulse"></div>
            <div class="w-16 h-4 bg-gray-600 animate-pulse"></div>
          </div>

          <div class="flex flex-wrap gap-2">
            <div
              class="px-3 py-1 bg-gray-600 animate-pulse rounded-full w-16 h-6"
            ></div>
            <div
              class="px-3 py-1 bg-gray-600 animate-pulse rounded-full w-20 h-6"
            ></div>
            <div
              class="px-3 py-1 bg-gray-600 animate-pulse rounded-full w-14 h-6"
            ></div>
          </div>

          <div class="space-y-1">
            <div class="h-3 bg-gray-600 animate-pulse w-full"></div>
            <div class="h-3 bg-gray-600 animate-pulse w-full"></div>
            <div class="h-3 bg-gray-600 animate-pulse w-3/4"></div>
            <div class="h-3 bg-gray-600 animate-pulse w-full"></div>
            <div class="h-3 bg-gray-600 animate-pulse w-2/3"></div>
          </div>

          <div class="space-y-2">
            <div class="flex items-center">
              <div class="w-20 h-4 bg-gray-600 animate-pulse mr-2"></div>
              <div class="w-36 h-4 bg-gray-600 animate-pulse"></div>
            </div>
            <div class="flex items-center">
              <div class="w-16 h-4 bg-gray-600 animate-pulse mr-2"></div>
              <div class="w-40 h-4 bg-gray-600 animate-pulse"></div>
            </div>
            <div class="flex items-center">
              <div class="w-12 h-4 bg-gray-600 animate-pulse mr-2"></div>
              <div class="w-48 h-4 bg-gray-600 animate-pulse"></div>
            </div>
          </div>

          <div class="flex gap-4 pt-4">
            <div
              class="px-4 py-2 bg-gray-600 animate-pulse rounded-md w-28 h-10"
            ></div>
            <div
              class="px-4 py-2 bg-gray-600 animate-pulse rounded-md w-28 h-10"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MovieDetailSkeleton",
});
</script>
