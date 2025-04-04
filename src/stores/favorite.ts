import { defineStore } from "pinia";
import type { Movie } from "../types/Movie";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/localStorage";
export const useFavoritesStore = defineStore("favorites", {
  state: () => ({
    favorites: getFromLocalStorage("favorites", []) as Movie[],
  }),
  getters: {
    isInFavorites: (state) => {
      return (movieId: string): boolean => {
        return state.favorites.some((item) => item.id === movieId);
      };
    },
  },
  actions: {
    addToFavorites(movie: Movie) {
      if (!this.favorites?.find((item: Movie) => item.id === movie.id)) {
        this.favorites.push(movie);
        saveToLocalStorage("favorites", this.favorites);
      } else {
        this.removeFromFavorites(movie.id);
      }
    },
    removeFromFavorites(movieId: string) {
      this.favorites = this.favorites.filter(
        (item: Movie) => item.id !== movieId
      );
      saveToLocalStorage("favorites", this.favorites);
    },
  },
});
