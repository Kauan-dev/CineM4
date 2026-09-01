import { useEffect, useState } from "react";
import { getPopularSeries, getTopRatedSeries } from "../services/tmdb/series";
import type { Series } from "../services/tmdb/types";

export function useSeriesData() {
  const [popularSeries, setPopularSeries] = useState<Series[]>([]);
  const [topRatedSeries, setTopRatedSeries] = useState<Series[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSeriesData() {
      try {
        const [popularSeriesData, topRatedSeriesData] = await Promise.all([
          getPopularSeries(),
          getTopRatedSeries(),
        ]);

        setPopularSeries(popularSeriesData.results);
        setTopRatedSeries(topRatedSeriesData.results);
      } catch {
        setError("Não foi possível carregar os conteúdos.");
      } finally {
        setLoading(false);
      }
    }

    fetchSeriesData();
  }, []);

  return {
    popularSeries,
    topRatedSeries,
    loading,
    error,
  };
}
