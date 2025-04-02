import { defineStore } from "pinia";
import type { Movie } from "../types/Movie";

export const useWatchlistStore = defineStore("watchlist", {
  state: () => ({
    watchlist: [] as Movie[],
  }),
  actions: {
    addToWatchlist(movie: Movie) {
      if (!this.watchlist.find((item) => item.id === movie.id)) {
        this.watchlist.push(movie);
      }
    },
    removeFromWatchlist(movieId: string) {
      this.watchlist = this.watchlist.filter((item) => item.id !== movieId);
    },
  },
});
