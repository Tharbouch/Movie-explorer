<template>
  <section class="flex flex-col gap-2 text-white min-h-screen">
    <section class="relative w-full h-64 md:h-80 overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent flex flex-col justify-center p-8"
      >
        <h1 class="text-3xl md:text-5xl font-bold">Discover Movies & Shows</h1>
        <p class="mt-2 text-gray-300 max-w-md">
          Watch the most popular and new releases. Filter by genre, rating, or
          search for a specific title.
        </p>
      </div>
    </section>

    <div class="container mx-auto px-4 pb-8">
      <MovieFilters :genres="allGenres" @filtersChange="onFiltersChange" />

      <div
        v-if="loading"
        class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
      >
        <CardSkeleton v-for="i in 10" :key="i" />
      </div>

      <div v-else-if="error">
        <p class="text-red-500 my-4">{{ error }}</p>
      </div>
      <div v-else>
        <div
          class="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          <MovieCard
            v-for="movie in paginatedMovies"
            :key="movie.id"
            :movie="movie"
            @select="goToMovieDetail"
          />
        </div>

        <div class="mt-8 flex justify-center items-center space-x-4 py-4">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>{{ currentPage }} / {{ totalPages }}</span>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { ref, computed, onMounted, defineComponent, watch } from "vue";
import { useRouter } from "vue-router";
import { useMovieStore } from "../stores/movie";
import MovieFilters from "../components/movie/MovieFilters.vue";
import CardSkeleton from "../components/movie/CardSkeleton.vue";
import MovieCard from "../components/movie/MovieCard.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    MovieFilters,
    CardSkeleton,
    MovieCard,
  },
  setup() {
    const movieStore = useMovieStore();
    const router = useRouter();

    const loading = computed(() => movieStore.loading);
    const error = computed(() => movieStore.error);

    onMounted(() => {
      movieStore.fetchMovies();
    });

    const searchTerm = ref("");
    const selectedGenre = ref("");
    const selectedRating = ref("");

    const onFiltersChange = (filters: {
      search: string;
      genre: string;
      rating: string;
    }) => {
      searchTerm.value = filters.search;
      selectedGenre.value = filters.genre;
      selectedRating.value = filters.rating;
      currentPage.value = 1;
    };

    const allGenres = computed(() => {
      const genreSet = new Set<string>();
      movieStore.movies.forEach((m) => {
        m.genres.forEach((g) => genreSet.add(g));
      });
      return Array.from(genreSet).sort();
    });

    const filteredMovies = computed(() => {
      return movieStore.movies.filter((movie) => {
        const matchesSearch =
          !searchTerm.value ||
          movie.primaryTitle
            .toLowerCase()
            .includes(searchTerm.value.toLowerCase());

        const matchesGenre =
          !selectedGenre.value || movie.genres.includes(selectedGenre.value);

        const movieRating = movie.averageRating || 0;
        const ratingThreshold = selectedRating.value
          ? parseInt(selectedRating.value)
          : 0;
        const matchesRating =
          !ratingThreshold || movieRating >= ratingThreshold;

        return matchesSearch && matchesGenre && matchesRating;
      });
    });

    const currentPage = ref(1);
    const itemsPerPage = 20;

    const totalPages = computed(() =>
      Math.ceil(filteredMovies.value.length / itemsPerPage)
    );

    const paginatedMovies = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      return filteredMovies.value.slice(start, start + itemsPerPage);
    });

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value += 1;
      }
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value -= 1;
      }
    };

    const goToMovieDetail = (id: string) => {
      router.push({ name: "MovieDetail", params: { id } });
    };

    watch(filteredMovies, () => {
      if (currentPage.value > totalPages.value) {
        currentPage.value = 1;
      }
    });

    return {
      loading,
      error,
      paginatedMovies,
      onFiltersChange,
      goToMovieDetail,
      allGenres,
      currentPage,
      totalPages,
      nextPage,
      prevPage,
    };
  },
});
</script>

<style scoped></style>
