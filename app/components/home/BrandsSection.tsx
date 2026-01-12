"use client";

type Brand = {
  name: string;
  logoSrc: string;
};

const brands: Brand[] = [
  { name: "Discovery Channel", logoSrc: "/images/Discovery%20Channel.png" },
  { name: "USA Network", logoSrc: "/images/USA%20Network.png" },
  { name: "Bell Media", logoSrc: "/images/Bell%20Media.png" },
  { name: "L’Oréal", logoSrc: "/images/L%27OREAL.png" },
  { name: "SalonCentric", logoSrc: "/images/SalonCentric.png" },
  { name: "New York Fashion Week", logoSrc: "/images/New%20York%20Fashion%20Week.png" },
  { name: "P&G", logoSrc: "/images/P%26G.jpg" },
  { name: "P&G Beauty", logoSrc: "/images/P%26G%20Beauty.png" },
];

function BrandMark({ brand }: { brand: Brand }) {
  return (
    <li className="flex w-full items-center justify-center px-6 py-6">
      <img
        src={brand.logoSrc}
        alt={`${brand.name} logo`}
        loading="lazy"
        decoding="async"
        className="block h-10 md:h-12 w-auto max-w-full object-contain"
      />
    </li>
  );
}

export function BrandsSection() {
  return (
    <section id="brands" aria-labelledby="brands-title" className="py-24 md:py-32 lg:py-36">
      <div className="mx-auto w-full max-w-6xl px-6">
        <header className="max-w-3xl mx-auto text-center">
          <h2
            id="brands-title"
            className="text-xl md:text-2xl font-display tracking-tight text-text-secondary/60"
          >
            Working With Industry Leaders
          </h2>
        </header>

        <div className="mt-12 rounded-3xl border border-black/10 bg-[#fafafa] px-6 py-8 md:px-10 md:py-10">
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-10 items-center justify-items-center">
            {brands.map((brand) => (
              <BrandMark key={brand.name} brand={brand} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
