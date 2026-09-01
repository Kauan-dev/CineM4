import { useEffect, useState } from "react";
import {
  getUpcomingMovies,
  getPopularMovies,
  getTopRatedMovies,
} from "../services/tmdb/movies";
import type { Movie } from "../services/tmdb/types";

export function useMoviesData() {
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMoviesData() {
      try {
        const [upcomingMoviesData, popularMoviesData, topRatedMoviesData] =
          await Promise.all([
            getUpcomingMovies(),
            getPopularMovies(),
            getTopRatedMovies(),
          ]);

        setUpcomingMovies(upcomingMoviesData.results);
        setPopularMovies(popularMoviesData.results);
        setTopRatedMovies(topRatedMoviesData.results);
      } catch {
        setError("Não foi possível carregar os conteúdos.");
      } finally {
        setLoading(false);
      }
    }

    fetchMoviesData();
  }, []);

  return {
    upcomingMovies,
    popularMovies,
    topRatedMovies,
    loading,
    error,
  };
}
