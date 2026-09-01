import { MediaSection } from "@/components/sections/MediaSection";
import { useSeriesData } from "@/hooks/useSeriesData";

export function Series() {
  const { popularSeries, topRatedSeries, loading, error } = useSeriesData();

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <MediaSection title="Series populares" media={popularSeries} />
      <MediaSection title="Series mais bem avaliadas" media={topRatedSeries} />
    </div>
  );
}
