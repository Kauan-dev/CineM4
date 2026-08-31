import { useEffect, useState } from "react";
import { getPopularMovies, getTopRatedMovies } from "../services/tmdb/movies";
import { getPopularSeries, getTopRatedSeries } from "../services/tmdb/series";
import type { Movie, Series } from "../services/tmdb/types";

export function useHomeData() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [popularSeries, setPopularSeries] = useState<Series[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [topRatedSeries, setTopRatedSeries] = useState<Series[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHomeData() {
      try {
        const [
          popularMoviesData,
          popularSeriesData,
          topRatedMoviesData,
          topRatedSeriesData,
        ] = await Promise.all([
          getPopularMovies(),
          getPopularSeries(),
          getTopRatedMovies(),
          getTopRatedSeries(),
        ]);

        setPopularMovies(popularMoviesData.results);
        setPopularSeries(popularSeriesData.results);
        setTopRatedMovies(topRatedMoviesData.results);
        setTopRatedSeries(topRatedSeriesData.results);
      } catch {
        setError("Não foi possível carregar os conteúdos.");
      } finally {
        setLoading(false);
      }
    }

    fetchHomeData();
  }, []);

  return {
    popularMovies,
    popularSeries,
    topRatedMovies,
    topRatedSeries,
    loading,
    error,
  };
}
