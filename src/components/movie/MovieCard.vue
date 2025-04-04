<template>
  <div
    class="bg-gray-700 rounded-xl overflow-hidden max-h-96 min-h-96 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03] hover:-translate-y-2"
    @click="handleSelect"
  >
    <img
      :src="movie.primaryImage"
      alt="Poster"
      class="w-full h-3/4 object-cover"
    />
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
import { defineComponent } from "vue";
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
    const handleSelect = () => {
      emit("select", props.movie.id);
    };
    return {
      handleSelect,
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
