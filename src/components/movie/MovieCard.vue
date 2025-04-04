<template>
  <div
    class="bg-gray-700 rounded-xl overflow-hidden max-h-96 min-h-96 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03] hover:-translate-y-2"
    @click="handleSelect"
  >
    <div class="w-full h-3/4 relative bg-gray-800">
      <div
        v-if="!imageLoaded && !imageError"
        class="absolute inset-0 flex items-center justify-center"
      >
        <div
          class="w-10 h-10 border-4 border-gray-500 border-t-purple-500 rounded-full animate-spin"
        ></div>
      </div>

      <img
        :src="movie.primaryImage"
        alt="Poster"
        class="w-full h-full object-cover"
        :class="{ 'opacity-0': !imageLoaded }"
        loading="lazy"
        @load="imageLoaded = true"
        @error="handleImageError"
      />
    </div>

    <div class="p-3">
      <h3 class="text-sm font-bold line-clamp-2 min-h-[3rem]">
        {{ movie.primaryTitle }}
      </h3>
      <div class="flex items-center justify-between text-xs text-gray-400 mt-1">
        <span>{{ movie.startYear || "N/A" }}</span>
        <span class="flex items-center">
          <Clock :size="16" class="text-gray-400 mr-1" />
          {{ movie.runtimeMinutes || "N/A" }} min
        </span>
        <span class="flex items-center">
          <Star :size="16" class="text-yellow-400 mr-1" />
          {{ movie.averageRating || "N/A" }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { Movie } from "../../types/Movie";
import { defineComponent, ref, onMounted } from "vue";
import { Star, Clock } from "lucide-vue-next";

export default defineComponent({
  name: "MovieCard",
  props: {
    movie: {
      type: Object as () => Movie,
      required: true,
    },
  },
  components: {
    Star,
    Clock,
  },
  emits: ["select"],
  setup(props, { emit }) {
    const imageLoaded = ref(false);
    const imageError = ref(false);

    const handleImageError = () => {
      imageError.value = true;
      imageLoaded.value = false;
    };

    const handleSelect = () => {
      emit("select", props.movie.id);
    };

    onMounted(() => {
      setTimeout(() => {
        if (!imageLoaded.value && !imageError.value) {
          const img = new Image();
          img.onload = () => {
            imageLoaded.value = true;
          };
          img.onerror = handleImageError;
          img.src = props.movie.primaryImage;
        }
      }, 3000);
    });

    return {
      handleSelect,
      imageLoaded,
      imageError,
      handleImageError,
    };
  },
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
