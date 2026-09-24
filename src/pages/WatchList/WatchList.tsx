import { useEffect, useState } from "react";

import { Container } from "@/components/layout/Container";
import { MediaCard } from "@/components/media/MediaCard";
import { MediaCardSkeleton } from "@/components/media/MediaCardSkeleton";
import { getWatchlistItems } from "@/services/firebase/watchlist";
import { getMovieDetails } from "@/services/tmdb/movies";
import { getSeriesDetails } from "@/services/tmdb/series";
import type { MovieDetails, SeriesDetails } from "@/services/tmdb/types";

export function WatchList() {
  const [media, setMedia] = useState<(MovieDetails | SeriesDetails)[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchWatchlist = async () => {
      try {
        const items = await getWatchlistItems();

        const details = await Promise.all(
          items.map((item) =>
            item.media_type === "movie"
              ? getMovieDetails(item.media_id)
              : getSeriesDetails(item.media_id),
          ),
        );

        if (!cancelled) {
          setMedia(details);
        }
      } catch (error) {
        console.error("Erro ao carregar lista de salvos:", error);

        if (!cancelled) {
          setError("Não foi possível carregar seus salvos.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchWatchlist();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Container className="py-6">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight md:text-3xl">
        Salvos
      </h1>

      {error ? (
        <p className="text-gray-400">{error}</p>
      ) : loading ? (
        <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <MediaCardSkeleton key={index} />
          ))}
        </div>
      ) : media.length === 0 ? (
        <p className="text-gray-400">Você ainda não salvou nenhuma mídia.</p>
      ) : (
        <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {media.map((item, index) => (
            <div
              key={`${"title" in item ? "movie" : "tv"}-${item.id}`}
              className="media-card-enter"
              style={{
                animationDelay: `${Math.min(index, 7) * 40}ms`,
              }}
            >
              <MediaCard media={item} />
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}
