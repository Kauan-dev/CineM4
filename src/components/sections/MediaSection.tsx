import type { Movie, Series } from "@/services/tmdb/types";
import { Container } from "../layout/Container";
import { MediaCard } from "@/components/media/MediaCard";
import { MediaCardSkeleton } from "@/components/media/MediaCardSkeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface MediaSectionProps {
  title: string;
  media: (Movie | Series)[];
  className?: string;
  loading?: boolean;
}

export function MediaSection({
  title,
  media,
  className,
  loading = false,
}: MediaSectionProps) {
  if (!loading && media.length === 0) return null;

  const skeletons = Array.from({ length: 20 });

  return (
    <section
      className={cn(
        "animate-in fade-in my-5 overflow-hidden duration-300",
        className,
      )}
    >
      {" "}
      <Container>
        {" "}
        <h2 className="mb-4 text-xl font-semibold tracking-tight md:text-[26px]">
          {title}{" "}
        </h2>{" "}
      </Container>
      <Carousel
        className="w-full select-none"
        opts={{ align: "start", slidesToScroll: "auto", dragFree: true }}
      >
        <CarouselContent className="pr-5 pl-6 md:pr-7 lg:pr-9 lg:pl-10">
          {loading
            ? skeletons.map((_, index) => (
                <CarouselItem
                  key={index}
                  className="max-w-[45%] basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-60"
                >
                  <MediaCardSkeleton />
                </CarouselItem>
              ))
            : media.map((item, index) => (
                <CarouselItem
                  key={item.id}
                  className={cn(
                    "media-card-enter max-w-[45%] basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-60",
                    "animate-in fade-in slide-in-from-bottom-2 duration-300",
                  )}
                  style={{
                    animationDelay: `${Math.min(index, 7) * 40}ms`,
                  }}
                >
                  <MediaCard media={item} />
                </CarouselItem>
              ))}

          <CarouselItem aria-hidden className="pointer-events-none basis-4" />
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
