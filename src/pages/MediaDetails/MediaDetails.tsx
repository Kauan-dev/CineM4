import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Play, Plus } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { getMovieDetails } from "@/services/tmdb/movies";
import { getSeriesDetails } from "@/services/tmdb/series";
import type {
  MediaDetailsData,
  MediaImagesResponse,
} from "@/services/tmdb/types";
import { tmdbFetch } from "@/services/tmdb/api";
import {
  isMediaSaved,
  removeMedia,
  saveMedia,
  type WatchlistMediaType,
} from "@/services/firebase/watchlist";

export function MediaDetails() {
  const { media_type, id } = useParams();

  const [media, setMedia] = useState<MediaDetailsData | null>(null);
  const [logoPath, setLogoPath] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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

      setLogoPath(logo?.file_path ?? null);
    };

    fetchMedia();
    fetchLogo();
  }, [id, media_type]);

  useEffect(() => {
    if (!id) return;

    const mediaType: WatchlistMediaType =
      media_type === "movie" ? "movie" : "tv";

    const checkSaved = async () => {
      try {
        const saved = await isMediaSaved(Number(id), mediaType);
        setIsSaved(saved);
      } catch (error) {
        console.error("Erro ao verificar mídia salva:", error);
      }
    };

    checkSaved();
  }, [id, media_type]);

  if (!media) {
    return <p>Carregando...</p>;
  }

  const currentMedia = media;

  const title =
    "title" in currentMedia ? currentMedia.title : currentMedia.name;

  const year = new Date(
    "release_date" in currentMedia
      ? currentMedia.release_date
      : currentMedia.first_air_date,
  ).toLocaleDateString("pt-BR", {
    year: "numeric",
  });

  const runtimeOrSeasons =
    "runtime" in currentMedia
      ? currentMedia.runtime
        ? `${Math.floor(currentMedia.runtime / 60)}h ${
            currentMedia.runtime % 60
          }m`
        : null
      : `${currentMedia.number_of_seasons} ${
          currentMedia.number_of_seasons === 1 ? "temporada" : "temporadas"
        }`;

  async function handleToggleSave() {
    const mediaType: WatchlistMediaType =
      media_type === "movie" ? "movie" : "tv";

    setIsSaving(true);

    try {
      if (isSaved) {
        await removeMedia(currentMedia.id, mediaType);
        setIsSaved(false);
      } else {
        await saveMedia(currentMedia.id, mediaType);
        setIsSaved(true);
      }
    } catch (error) {
      console.error("Erro ao atualizar lista de salvos:", error);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main>
      <div className="relative w-full">
        <div>
          <img
            src={`https://image.tmdb.org/t/p/original${currentMedia.backdrop_path}`}
            alt=""
            className="h-100 w-full overflow-hidden object-cover object-[50%_30%] sm:h-112.5 md:h-[62vh] lg:h-130 xl:h-[calc(100vh-60px)]"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
        </div>

        <Container>
          {logoPath ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${logoPath}`}
              alt={title}
              draggable="false"
              className="absolute bottom-5 max-w-[70%] place-self-center select-none lg:place-self-start"
            />
          ) : (
            <h1 className="absolute z-99 place-self-center text-center text-3xl lg:place-self-start lg:text-start lg:text-[40px]">
              {title}
            </h1>
          )}
        </Container>
      </div>

      <Container className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 text-gray-400">
          <div className="flex gap-0.5 place-self-center lg:place-self-start">
            <div>{year}</div>

            <span>•</span>

            <div>{runtimeOrSeasons}</div>
          </div>

          <div className="mt-2 flex gap-2 place-self-center lg:place-self-start">
            {currentMedia.genres.map((genre) => (
              <span
                key={genre.id}
                className="flex w-fit cursor-pointer items-center justify-center gap-2.25 rounded-full border bg-black px-3 py-3.25 text-sm leading-0 font-medium tracking-tighter text-white"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>

        <p className="max-w-150 place-self-center text-center lg:place-self-start lg:text-start">
          {currentMedia.overview}
        </p>
      </Container>

      <Container className="mt-4 flex items-center justify-center gap-4 py-4 lg:justify-start">
        <button
          type="button"
          className="flex w-fit cursor-pointer items-center justify-center gap-2 rounded-full bg-amber-400 p-3.25 text-sm leading-0 font-semibold tracking-tighter text-black"
        >
          <Play fill="black" size={16} />
          <span>Ver trailer</span>
        </button>

        <button
          type="button"
          className="flex w-fit cursor-pointer items-center justify-center gap-2 rounded-full border bg-black p-3.25 text-sm leading-0 font-semibold tracking-tighter text-white disabled:cursor-not-allowed disabled:opacity-60"
          onClick={handleToggleSave}
          disabled={isSaving}
        >
          <Plus size={16} />
          <span>{isSaving ? "Salvando..." : isSaved ? "Salvo" : "Salvar"}</span>
        </button>
      </Container>
    </main>
  );
}
