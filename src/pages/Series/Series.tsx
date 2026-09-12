import { MediaSection } from "@/components/sections/MediaSection";
import { useSeriesData } from "@/hooks/useSeriesData";

export function Series() {
  const { popularSeries, topRatedSeries, loading, error } = useSeriesData();

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="animate-in fade-in duration-300">
      {" "}
      <MediaSection
        title="Series populares"
        media={popularSeries}
        loading={loading}
      />
      <MediaSection
        title="Series mais bem avaliadas"
        media={topRatedSeries}
        loading={loading}
      />
    </div>
  );
}
