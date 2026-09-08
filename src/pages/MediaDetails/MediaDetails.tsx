import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { getMovieDetails } from "@/services/tmdb/movies";
import { getSeriesDetails } from "@/services/tmdb/series";
import type { MediaDetailsData } from "@/services/tmdb/types";

export function MediaDetails() {
  const { media_type, id } = useParams();

  const [media, setMedia] = useState<MediaDetailsData | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchMedia = async () => {
      const data =
        media_type === "movie"
          ? await getMovieDetails(id)
          : await getSeriesDetails(id);

      setMedia(data);
    };

    fetchMedia();
  }, [id, media_type]);

  if (!media) {
    return <p>Carregando...</p>;
  }

  const title = "title" in media ? media.title : media.name;

  return (
    <main>
      <h1>{title}</h1>
      <p>{media.overview}</p>
    </main>
  );
}
