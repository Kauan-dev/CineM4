import { useHomeData } from "@/hooks/useHomeData";

import { Container } from "@/components/layout/Container";
import { MediaSection } from "@/components/sections/MediaSection";

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
    <Container>
      <MediaSection title="Filmes populares" media={popularMovies} />
      <MediaSection title="Séries populares" media={popularSeries} />

      <MediaSection title="Filmes mais bem avaliados" media={topRatedMovies} />
      <MediaSection title="Séries mais bem avaliadas" media={topRatedSeries} />
    </Container>
  );
}
