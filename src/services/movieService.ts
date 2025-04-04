import apiClient from "./api";
import type { Movie, MovieDetail } from "../types/Movie";

export const getMovies = async (): Promise<Movie[]> => {
  try {
    const response = await apiClient.get("/imdb/top250-movies");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const getTopBoxOffice = async (): Promise<Movie[]> => {
  try {
    const response = await apiClient.get("/imdb/topBoxOffice");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching top box office movies:", error);
    throw error;
  }
};

export const getMovieDetails = async (
  movieId: string
): Promise<MovieDetail> => {
  try {
    const response = await apiClient.get(`/imdb/${movieId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for movie ${movieId}:`, error);
    throw error;
  }
};
