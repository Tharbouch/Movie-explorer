import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import HomeView from "../src/views/HomeView.vue";
import { useMovieStore } from "../src/stores/movie";
import { MoviesList } from "../mock-data/Movies";

describe("HomeView Filtering", () => {
  let pinia: ReturnType<typeof createPinia>;
  let movieStore: ReturnType<typeof useMovieStore>;

  beforeEach(() => {
    pinia = createPinia();
    // Activate this Pinia instance globally for our tests.
    setActivePinia(pinia);
    movieStore = useMovieStore();
    // Override the store movies with our mock data.
    movieStore.movies = MoviesList;
  });

  it("filters movies by search term", async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [pinia],
      },
    });
    const vm = wrapper.vm as any;

    // Initially, with no filters, expect all movies to be present.
    expect(vm.paginatedMovies.length).toBe(MoviesList.length);

    // Apply search filter: "The"
    vm.onFiltersChange({ search: "The", genre: "", rating: "" });
    await wrapper.vm.$nextTick();

    // Determine the expected movies by filtering our mock data.
    const expected = MoviesList.filter((movie) =>
      movie.primaryTitle.toLowerCase().includes("the".toLowerCase())
    );
    expect(vm.paginatedMovies.length).toBe(expected.length);
  });

  it("filters movies by genre", async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [pinia],
      },
    });
    const vm = wrapper.vm as any;

    // Apply genre filter: "Drama"
    vm.onFiltersChange({ search: "", genre: "Drama", rating: "" });
    await wrapper.vm.$nextTick();

    const expected = MoviesList.filter((movie) =>
      movie.genres.includes("Drama")
    );
    expect(vm.paginatedMovies.length).toBe(expected.length);
  });

  it("filters movies by rating", async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [pinia],
      },
    });
    const vm = wrapper.vm as any;

    // Apply rating filter: "8" (movies with rating >= 8)
    vm.onFiltersChange({ search: "", genre: "", rating: "8" });
    await wrapper.vm.$nextTick();

    const expected = MoviesList.filter(
      (movie) => (movie.averageRating || 0) >= 8
    );
    expect(vm.paginatedMovies.length).toBe(expected.length);
  });

  it("applies combined filters", async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [pinia],
      },
    });
    const vm = wrapper.vm as any;

    // Combined filter: search "The", genre "Crime", rating "8"
    vm.onFiltersChange({ search: "The", genre: "Crime", rating: "8" });
    await wrapper.vm.$nextTick();

    const expected = MoviesList.filter((movie) => {
      const matchesSearch = movie.primaryTitle
        .toLowerCase()
        .includes("the".toLowerCase());
      const matchesGenre = movie.genres.includes("Crime");
      const matchesRating = (movie.averageRating || 0) >= 8;
      return matchesSearch && matchesGenre && matchesRating;
    });
    expect(vm.paginatedMovies.length).toBe(expected.length);
  });
});
