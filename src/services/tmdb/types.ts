export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
}

export interface MovieListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Series {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
}

export interface SeriesListResponse {
  page: number;
  results: Series[];
  total_pages: number;
  total_results: number;
}

export interface MovieDetails extends Movie {
  overview: string;
  tagline: string | null;
  genres: Genre[];
  runtime: number | null;
  status: string;
  original_title: string;
  homepage: string | null;
}

export interface SeriesDetails extends Series {
  overview: string;
  tagline: string | null;
  genres: Genre[];
  episode_run_time: number[];
  number_of_episodes: number;
  number_of_seasons: number;
  status: string;
  original_name: string;
  homepage: string | null;
}

export interface MediaLogo {
  iso_3166_1: string | null;
  iso_639_1: string | null;
  file_path: string;
}

export interface MediaImagesResponse {
  logos: MediaLogo[];
}

export type MediaDetailsData = MovieDetails | SeriesDetails;
