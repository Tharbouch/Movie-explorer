import { defineStore } from "pinia";
import type { Movie } from "../types/Movie";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/localStorage";

export const useWatchlistStore = defineStore("watchlist", {
  state: () => ({
    watchlist: getFromLocalStorage("watchlist", []) as Movie[],
  }),
  getters: {
    isInWatchlist: (state) => {
      return (movieId: string): boolean => {
        return state.watchlist.some((item) => item.id === movieId);
      };
    },
  },
  actions: {
    addToWatchlist(movie: Movie) {
      if (!this.isInWatchlist(movie.id)) {
        this.watchlist.push(movie);
        saveToLocalStorage("watchlist", this.watchlist);
      } else {
        this.removeFromWatchlist(movie.id);
      }
    },
    removeFromWatchlist(movieId: string) {
      this.watchlist = this.watchlist.filter((item) => item.id !== movieId);
      saveToLocalStorage("watchlist", this.watchlist);
    },
  },
});
