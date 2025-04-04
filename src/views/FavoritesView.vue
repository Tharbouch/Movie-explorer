<template>
  <section class="flex flex-col gap-2 text-white min-h-screen">
    <section class="relative w-full h-64 md:h-80 overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent flex flex-col justify-center p-8"
      >
        <h1 class="text-3xl md:text-5xl font-bold">My Favorites</h1>
      </div>
    </section>

    <div class="container mx-auto px-4 pb-8">
      <div
        v-if="favorites.length > 0"
        class="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
      >
        <MovieCard
          v-for="movie in favorites"
          :key="movie.id"
          :movie="movie"
          @select="goToMovieDetail"
        />
      </div>
      <div v-else>
        <p class="mt-8 text-red-500">No movies in your favorites.</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { defineComponent } from "vue";
import MovieCard from "../components/movie/MovieCard.vue";
import { useFavoritesStore } from "../stores/favorite";

export default defineComponent({
  name: "FavoritesView",
  components: {
    MovieCard,
  },
  setup() {
    const favoritesStore = useFavoritesStore();
    const router = useRouter();

    const favorites = favoritesStore.favorites;
    const goToMovieDetail = (id: string) => {
      router.push({ name: "MovieDetail", params: { id } });
    };

    return {
      favorites,
      goToMovieDetail,
    };
  },
});
</script>

<style scoped></style>
