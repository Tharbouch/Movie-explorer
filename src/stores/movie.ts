import { defineStore } from "pinia";
import { ref } from "vue";
import type { Movie, MovieDetail } from "../types/Movie";
import { getMovies, getMovieDetails } from "../services/movieService";

export const useMovieStore = defineStore("movie", () => {
  const movies = ref<Movie[]>([]);
  const selectedMovie = ref<MovieDetail | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchMovies = async () => {
    if (movies.value.length > 0) {
      return;
    }
    loading.value = true;
    error.value = null;
    try {
      movies.value = await getMovies();
    } catch (err) {
      error.value = "Failed to fetch movies";
    } finally {
      loading.value = false;
    }
  };

  const fetchMovieDetails = async (movieId: string) => {
    loading.value = true;
    error.value = null;
    try {
      selectedMovie.value = await getMovieDetails(movieId);
      if (selectedMovie.value && selectedMovie.value.trailer) {
        selectedMovie.value.trailer = selectedMovie.value.trailer.replace(
          "watch?v=",
          "embed/"
        );
      }
    } catch (err) {
      error.value = "Failed to fetch movie details";
    } finally {
      loading.value = false;
    }
  };

  return {
    movies,
    selectedMovie,
    loading,
    error,
    fetchMovies,
    fetchMovieDetails,
  };
});
