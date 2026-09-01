import { Container } from "@/components/layout/Container";
import { MediaSection } from "@/components/sections/MediaSection";
import { useMoviesData } from "@/hooks/useMoviesData";

export function Movies() {
  const { upcomingMovies, popularMovies, topRatedMovies, loading, error } =
    useMoviesData();

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container>
      <MediaSection title="Em breve nos cinemas" media={upcomingMovies} />
      <MediaSection title="Filmes populares" media={popularMovies} />
      <MediaSection title="Filmes mais bem avaliados" media={topRatedMovies} />
    </Container>
  );
}
