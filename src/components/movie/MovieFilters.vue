<template>
  <div
    class="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4"
  >
    <div class="relative w-full md:w-1/3">
      <input
        type="text"
        class="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400"
        placeholder="Search by title..."
        v-model="localSearch"
      />
      <span class="absolute right-3 top-2 text-gray-400">
        <Search />
      </span>
    </div>

    <div class="relative w-full md:w-1/3">
      <select
        v-model="localGenre"
        class="px-4 py-2 rounded bg-gray-700 text-white w-full"
      >
        <option value="">All Genres</option>
        <option v-for="genre in genres" :key="genre" :value="genre">
          {{ genre }}
        </option>
      </select>
    </div>

    <div class="relative w-full md:w-1/3">
      <select
        v-model="localRating"
        class="px-4 py-2 rounded bg-gray-700 text-white w-full"
      >
        <option value="">All Ratings</option>
        <option value="9">9+</option>
        <option value="8">8+</option>
        <option value="7">7+</option>
        <option value="6">6+</option>
      </select>
    </div>
    <BaseButton
      @click="emitFilters"
      class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
    >
      Filter
    </BaseButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Search } from "lucide-vue-next";
import BaseButton from "../base/BaseButton.vue";
export default defineComponent({
  name: "MovieFilters",
  props: {
    genres: {
      type: Array as () => string[],
      required: true,
    },
    initialSearch: {
      type: String,
      default: "",
    },
    initialGenre: {
      type: String,
      default: "",
    },
    initialRating: {
      type: String,
      default: "",
    },
  },
  components: {
    Search,
    BaseButton,
  },
  emits: ["filtersChange"],
  setup(props, { emit }) {
    const localSearch = ref(props.initialSearch || "");
    const localGenre = ref(props.initialGenre || "");
    const localRating = ref(props.initialRating || "");

    // Emit the updated filters to the parent
    const emitFilters = () => {
      emit("filtersChange", {
        search: localSearch.value.trim(),
        genre: localGenre.value,
        rating: localRating.value,
      });
    };

    return {
      localSearch,
      localGenre,
      localRating,
      emitFilters,
    };
  },
});
</script>
