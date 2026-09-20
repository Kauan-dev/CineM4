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

import { db } from "../../firebaseConnection";
import { addDoc, collection } from "firebase/firestore";
import { Play, Plus } from "lucide-react";

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

  async function handleAdd() {
    if (!media) return;

    const typeMedia = media_type === "movie" ? "movie" : "tv";

    await addDoc(collection(db, "favorites"), {
      media_id: media.id,
      media_type: typeMedia,
    });
  }

  return (
    <main>
      <div className="relative w-full">
        <div>
          <img
            src={`https://image.tmdb.org/t/p/original${media.backdrop_path}`}
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
            {media.genres.map((genre) => (
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
          {media.overview}
        </p>
      </Container>

      <Container className="mt-4 flex items-center justify-center gap-4 py-4 lg:justify-start">
        <button
          className="text-md flex w-40 cursor-pointer items-center justify-center gap-2.25 rounded-full bg-amber-400 py-3.25 leading-0 font-semibold tracking-tighter text-black"
          onClick={handleAdd}
        >
          <Play fill="black" size={20} />
          <span>Ver trailer</span>
        </button>

        <button
          className="text-md flex w-35 cursor-pointer items-center justify-center gap-2.25 rounded-full border bg-black py-3.25 leading-0 font-semibold tracking-tighter text-white"
          onClick={handleAdd}
        >
          <Plus color="white" size={20} />
          <span>Salvar</span>
        </button>
      </Container>
    </main>
  );
}
