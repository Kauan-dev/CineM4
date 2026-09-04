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

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Featured image="https://image.tmdb.org/t/p/original/twiVn9oFXOVR0uoYgawyEBlnFu8.jpg" />

      <div>
        <MediaSection title="Filmes populares" media={popularMovies} />

        <MediaSection title="Séries populares" media={popularSeries} />

        <MediaSection
          title="Filmes mais bem avaliados"
          media={topRatedMovies}
        />

        <MediaSection
          title="Séries mais bem avaliadas"
          media={topRatedSeries}
        />
      </div>
    </div>
  );
}
