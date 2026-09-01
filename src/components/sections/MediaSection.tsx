import type { Movie, Series } from "@/services/tmdb/types";
import { Container } from "../layout/Container";
import { MediaCard } from "@/components/media/MediaCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface MediaSectionProps {
  title: string;
  media: (Movie | Series)[];
}

export function MediaSection({ title, media }: MediaSectionProps) {
  if (media.length === 0) return null;

  return (
    <section className="overflow-hidden py-3">
      <Container>
        <h2 className="mb-4 text-xl font-semibold md:text-2xl">{title}</h2>
      </Container>

      <Carousel
        className="w-full select-none"
        opts={{
          align: "start",
          slidesToScroll: "auto",
          dragFree: true,
        }}
      >
        <CarouselContent className="pr-5 pl-6 md:pr-7 md:pl-8 lg:pr-9 lg:pl-10">
          {media.map((item) => (
            <CarouselItem
              key={item.id}
              className="max-w-[45%] basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
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
