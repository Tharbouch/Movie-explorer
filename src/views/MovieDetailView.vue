<template>
  <section class="text-white min-h-screen">
    <div class="container mx-auto px-4 py-8">
      <div v-if="loading">
        <MovieDetailSkeleton />
      </div>
      <div v-else-if="error">
        <p class="text-red-500">{{ error }}</p>
      </div>
      <div v-else-if="selectedMovie">
        <div
          class="flex flex-col md:flex-row bg-gray-700 rounded-xl shadow-lg overflow-hidden"
        >
          <div
            class="md:w-1/3 flex min-h-full justify-center items-start bg-gray-900"
          >
            <img
              :src="selectedMovie.primaryImage"
              alt="Movie Poster"
              class="object-cover w-full h-full"
            />
          </div>

          <div class="md:w-2/3 p-6 space-y-4">
            <div>
              <h1 class="text-3xl md:text-4xl font-bold">
                {{ selectedMovie.primaryTitle }}
              </h1>
              <p class="text-gray-400 italic">
                Original: {{ selectedMovie.originalTitle }}
              </p>
            </div>

            <div
              class="flex flex-wrap text-gray-300 text-sm md:text-base gap-4"
            >
              <div class="flex items-center space-x-1">
                <Star :size="20" class="text-yellow-400" />
                <span>{{ selectedMovie.averageRating }}</span>
                <span class="ml-1 text-xs text-gray-500">IMDb</span>
              </div>
              <span>{{ selectedMovie.releaseDate?.slice(0, 4) }}</span>
              <span>{{ selectedMovie.runtimeMinutes }} min</span>
            </div>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="genre in selectedMovie.genres"
                :key="genre"
                class="px-3 py-1 bg-white/10 rounded-full text-sm"
              >
                {{ genre }}
              </span>
            </div>
            <p class="text-gray-300">
              {{ selectedMovie.description }}
            </p>
            <div class="space-y-2">
              <div>
                <strong>Directors: </strong>
                <span
                  v-if="
                    selectedMovie.directors && selectedMovie.directors.length
                  "
                >
                  <span
                    v-for="(director, index) in selectedMovie.directors"
                    :key="director.id"
                  >
                    {{ director.fullName
                    }}<span v-if="index !== selectedMovie.directors.length - 1"
                      >,
                    </span>
                  </span>
                </span>
                <span v-else>N/A</span>
              </div>
              <div>
                <strong>Writers: </strong>
                <span
                  v-if="selectedMovie.writers && selectedMovie.writers.length"
                >
                  <span
                    v-for="(writer, index) in selectedMovie.writers"
                    :key="writer.id"
                  >
                    {{ writer.fullName
                    }}<span v-if="index !== selectedMovie.writers.length - 1"
                      >,
                    </span>
                  </span>
                </span>
                <span v-else>N/A</span>
              </div>
              <div>
                <strong>Cast: </strong>
                <span v-if="selectedMovie.cast && selectedMovie.cast.length">
                  <span
                    v-for="(member, index) in selectedMovie.cast.slice(0, 5)"
                    :key="member.id"
                  >
                    {{ member.fullName
                    }}<span
                      v-if="
                        index !== Math.min(selectedMovie.cast.length, 5) - 1
                      "
                      >,
                    </span>
                  </span>
                  <span v-if="selectedMovie.cast.length > 5">, ...</span>
                </span>
                <span v-else>N/A</span>
              </div>
            </div>
            <div class="flex gap-4 pt-4">
              <button
                @click="addToWatchList(selectedMovie)"
                :class="
                  inWatchlist
                    ? 'px-4 py-2 gap-1 bg-green-600 hover:bg-green-700 rounded-md inline-flex items-center'
                    : 'px-4 py-2 gap-1 bg-purple-600 hover:bg-purple-700 rounded-md inline-flex items-center'
                "
              >
                <BookmarkPlus />
                Watchlist
              </button>
              <button
                @click="addToFavorites(selectedMovie)"
                :class="
                  inFavoritesList
                    ? 'px-4 py-2 gap-1 bg-white text-red-800 hover:bg-red-500 hover:text-white rounded-md inline-flex items-center'
                    : ' px-4 py-2 gap-1 bg-red-500 text-white hover:bg-white hover:text-red-800 rounded-md inline-flex items-center'
                "
              >
                <Heart />
                Favorite
              </button>
            </div>
          </div>
        </div>
        <div class="flex flex-col w-full items-center justify-center mt-8">
          <h2 class="text-3xl md:text-4xl font-bold mb-4 w-full text-start">
            Trailer
          </h2>
          <iframe
            width="560"
            height="315"
            :src="selectedMovie.trailer + '?si=WGGt-fw4L7-7qGfV'"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <div v-else class="text-center py-8">
        <p>Movie not found.</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { useMovieStore } from "../stores/movie";
import { useFavoritesStore } from "../stores/favorite";
import { useWatchlistStore } from "../stores/watchlist";
import { storeToRefs } from "pinia";
import MovieDetailSkeleton from "../components/movie/MovieDetailSkeleton.vue";
import { Heart, BookmarkPlus, Star } from "lucide-vue-next";
import type { Movie } from "../types/Movie";

export default defineComponent({
  name: "MovieDetailView",
  components: {
    Heart,
    BookmarkPlus,
    Star,
    MovieDetailSkeleton,
  },
  setup() {
    const route = useRoute();
    const movieStore = useMovieStore();
    const favoritesStore = useFavoritesStore();
    const watchListStore = useWatchlistStore();
    const { selectedMovie, loading, error } = storeToRefs(movieStore);

    const fetchMovie = (id: string) => {
      movieStore.fetchMovieDetails(id);
    };

    const addToFavorites = (movie: Movie) => {
      favoritesStore.addToFavorites(movie);
    };
    const addToWatchList = (movie: Movie) => {
      watchListStore.addToWatchlist(movie);
    };

    const inWatchlist = computed(() => {
      return selectedMovie.value
        ? watchListStore.isInWatchlist(selectedMovie.value.id)
        : false;
    });

    const inFavoritesList = computed(() => {
      return selectedMovie.value
        ? favoritesStore.isInFavorites(selectedMovie.value.id)
        : false;
    });

    onMounted(() => {
      if (route.params.id) {
        fetchMovie(route.params.id as string);
      }
    });

    watch(
      () => route.params.id,
      (newId) => {
        if (newId) {
          fetchMovie(newId as string);
        }
      }
    );

    return {
      selectedMovie,
      loading,
      error,
      addToFavorites,
      addToWatchList,
      inWatchlist,
      inFavoritesList,
    };
  },
});
</script>

<style scoped></style>
