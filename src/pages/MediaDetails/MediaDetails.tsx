import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getMovieDetails } from "@/services/tmdb/movies";
import { getSeriesDetails } from "@/services/tmdb/series";
import type {
  MediaDetailsData,
  MediaImagesResponse,
} from "@/services/tmdb/types";
import { tmdbFetch } from "@/services/tmdb/api";
import { Container } from "@/components/layout/Container";

export function MediaDetails() {
  const { media_type, id } = useParams();

  const [media, setMedia] = useState<MediaDetailsData | null>(null);
  const [logoPath, setLogoPath] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchMedia = async () => {
      const data =
        media_type === "movie"
          ? await getMovieDetails(id)
          : await getSeriesDetails(id);

      setMedia(data);
    };

    const fetchLogo = async () => {
      const data = await tmdbFetch<MediaImagesResponse>(
        `/${media_type === "movie" ? "movie" : "tv"}/${id}/images`,
        {},
        false,
      );

      const logo =
        data.logos.find((logo) => logo.iso_3166_1 === "BR") ??
        data.logos.find((logo) => logo.iso_639_1 === "en") ??
        data.logos[0];

      const path = logo?.file_path ?? null;

      setLogoPath(path);
    };

    fetchLogo();
    fetchMedia();
  }, [id, media_type]);

  if (!media) {
    return <p>Carregando...</p>;
  }

  const title = "title" in media ? media.title : media.name;

  const year = new Date(
    "release_date" in media ? media.release_date : media.first_air_date,
  ).toLocaleDateString("pt-BR", {
    year: "numeric",
  });

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
          className="h-100 w-full overflow-hidden object-cover object-[50%_30%] sm:h-112.5 md:h-[62vh] lg:h-130 xl:h-[74vh]"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
      </div>

      <Container>
        {logoPath ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${logoPath}`}
            alt={title}
            draggable="false"
            className="max-w-[70%] place-self-center select-none lg:place-self-start"
          />
        ) : (
          <h1 className="place-self-center text-center text-3xl lg:place-self-start lg:text-start lg:text-[40px]">
            {title}
          </h1>
        )}
      </Container>

      <Container className="mt-14 flex flex-col gap-3">
        <div className="text-gray-400">
          <div className="flex gap-1">
            <div>{year}</div>

            <span>-</span>

            <div>{runtimeOrSeasons}</div>
          </div>

          <div>{media.genres.map((genre) => genre.name).join(", ")}</div>
        </div>

        <p>{media.overview}</p>
      </Container>
    </main>
  );
}
