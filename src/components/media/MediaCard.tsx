import { Link } from "react-router";
import type { Movie, Series } from "../../services/tmdb/types";

interface MediaCardProps {
  media: Movie | Series;
}

export function MediaCard({ media }: MediaCardProps) {
  const isMovie = "title" in media;
  const title = isMovie ? media.title : media.name;
  const type = isMovie ? "movie" : "series";

  return (
    <Link
      to={`/${type}/${media.id}`}
      title={title}
      className="w-ful block shrink-0 rounded-sm outline-2 outline-offset-3 outline-transparent transition-all duration-300 ease-in-out hover:outline-neutral-50 focus-visible:outline-neutral-50"
    >
      {media.poster_path && (
        <img
          className="aspect-2/3 w-full rounded-sm object-cover"
          src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
          title={title}
          alt={title}
          loading="lazy"
        />
      )}
    </Link>
  );
}
