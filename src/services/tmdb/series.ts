import { tmdbFetch } from "./api";
import type { SeriesListResponse } from "./types";

export function getPopularSeries() {
  return tmdbFetch<SeriesListResponse>("/tv/popular");
}

export function getTopRatedSeries() {
  return tmdbFetch<SeriesListResponse>("/tv/top_rated");
}
