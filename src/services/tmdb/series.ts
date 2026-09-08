import { tmdbFetch } from "./api";
import type { SeriesDetails, SeriesListResponse } from "./types";

export function getPopularSeries() {
  return tmdbFetch<SeriesListResponse>("/tv/popular");
}

export function getTopRatedSeries() {
  return tmdbFetch<SeriesListResponse>("/tv/top_rated");
}

export function getSeriesDetails(id: string | number) {
  return tmdbFetch<SeriesDetails>(`/tv/${id}`);
}
