import type { Movie, Series } from "@/services/tmdb/types";
import { MediaCard } from "@/components/media/MediaCard";

interface MediaSectionProps {
  title: string;
  media: (Movie | Series)[];
}

export function MediaSection({ title, media }: MediaSectionProps) {
  return (
    <section>
      <h2>{title}</h2>

      <div className="flex gap-4 overflow-x-auto">
        {media.map((item) => (
          <MediaCard key={item.id} media={item} />
        ))}
      </div>
    </section>
  );
}
