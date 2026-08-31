export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
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
  first_air_date: string;
  vote_average: number;
}

export interface SeriesListResponse {
  page: number;
  results: Series[];
  total_pages: number;
  total_results: number;
}
