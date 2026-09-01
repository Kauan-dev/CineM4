import { tmdbFetch } from "./api";
import type { MovieListResponse } from "./types";

export function getPopularMovies() {
  return tmdbFetch<MovieListResponse>("/movie/popular");
}

export function getTopRatedMovies() {
  return tmdbFetch<MovieListResponse>("/movie/top_rated");
}

export function getUpcomingMovies() {
  return tmdbFetch<MovieListResponse>("/movie/upcoming");
}
