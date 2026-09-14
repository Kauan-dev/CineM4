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

  const year = new Date(
    "release_date" in media ? media.release_date : media.first_air_date,
  ).toLocaleDateString("pt-BR", { year: "numeric" });

  const runtimeOrSeasons =
    "runtime" in media
      ? media.runtime
        ? `${Math.floor(media.runtime / 60)}h ${media.runtime % 60}m`
        : null
      : `${media.number_of_seasons} ${
          media.number_of_seasons === 1 ? "temporada" : "temporadas"
        }`;

  return (
    <main>
      <div className="relative w-full">
        <img
          src={`https://image.tmdb.org/t/p/original${media.backdrop_path}`}
          alt=""
          className="h-[36vh] w-full object-cover object-[50%_30%] sm:h-[50vh] md:h-[62vh] lg:h-[72vh]"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
      </div>

      <h1>{title}</h1>

      <div className="flex gap-1">
        <div>{year}</div>
        <span>-</span>
        <div>{runtimeOrSeasons}</div>
      </div>

      <div>{media.genres.map((genre) => genre.name).join(", ")}</div>

      <p>{media.overview}</p>
    </main>
  );
}
