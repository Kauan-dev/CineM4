type FeaturedProps = {
  image: string;
};

export function Featured({ image }: FeaturedProps) {
  return (
    <section className="relative h-100 w-full overflow-hidden sm:h-112.5 lg:h-130">
      {/* Imagem */}
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Sombreamento lateral */}
      <div className="absolute inset-0 bg-linear-to-r from-black via-black/45 to-transparent" />

      {/* Sombreamento inferior */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black to-transparent" />

      {/* Sombreamento superior suave */}
      <div className="absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-black/20 to-transparent" />
    </section>
  );
}
