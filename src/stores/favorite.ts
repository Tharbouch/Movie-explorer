import { defineStore } from "pinia";
import type { Movie } from "../types/Movie";

export const useFavoritesStore = defineStore("favorites", {
  state: () => ({
    favorites: [] as Movie[],
  }),
  actions: {
    addToFavorites(movie: Movie) {
      if (!this.favorites.find((item) => item.id === movie.id)) {
        this.favorites.push(movie);
      }
    },
    removeFromFavorites(movieId: string) {
      this.favorites = this.favorites.filter((item) => item.id !== movieId);
    },
  },
});
