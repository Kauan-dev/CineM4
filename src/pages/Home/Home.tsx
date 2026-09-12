import { useHomeData } from "@/hooks/useHomeData";

import { MediaSection } from "@/components/sections/MediaSection";
import { Featured } from "@/components/sections/Featured";

export function Home() {
  const {
    popularMovies,
    popularSeries,
    topRatedMovies,
    topRatedSeries,
    loading,
    error,
  } = useHomeData();

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="animate-in fade-in duration-300">
      {" "}
      <Featured image="https://image.tmdb.org/t/p/original/twiVn9oFXOVR0uoYgawyEBlnFu8.jpg" />
      <div>
        <MediaSection
          title="Filmes populares"
          media={popularMovies}
          loading={loading}
          className="mt-0"
        />

        <MediaSection
          title="Séries populares"
          media={popularSeries}
          loading={loading}
        />

        <MediaSection
          title="Filmes mais bem avaliados"
          media={topRatedMovies}
          loading={loading}
        />

        <MediaSection
          title="Séries mais bem avaliadas"
          media={topRatedSeries}
          loading={loading}
        />
      </div>
    </div>
  );
}
