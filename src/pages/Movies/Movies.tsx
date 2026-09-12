import { MediaSection } from "@/components/sections/MediaSection";
import { useMoviesData } from "@/hooks/useMoviesData";

export function Movies() {
  const { upcomingMovies, popularMovies, topRatedMovies, loading, error } =
    useMoviesData();

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="animate-in fade-in duration-300">
      {" "}
      <MediaSection
        title="Em breve nos cinemas"
        media={upcomingMovies}
        loading={loading}
      />
      <MediaSection
        title="Filmes populares"
        media={popularMovies}
        loading={loading}
      />
      <MediaSection
        title="Filmes mais bem avaliados"
        media={topRatedMovies}
        loading={loading}
      />
    </div>
  );
}
