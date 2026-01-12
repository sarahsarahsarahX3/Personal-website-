"use client";

import styles from "./BrandsSection.module.css";

type Brand = {
  name: string;
  logoSrc: string;
};

const brands: Brand[] = [
  { name: "Discovery Channel", logoSrc: "/images/brands/discovery-channel.svg" },
  { name: "USA Network", logoSrc: "/images/brands/usa-network.svg" },
  { name: "Bell Media", logoSrc: "/images/brands/bell-media.svg" },
  { name: "L’Oréal", logoSrc: "/images/brands/loreal.svg" },
  { name: "SalonCentric", logoSrc: "/images/brands/saloncentric.svg" },
  { name: "New York Fashion Week", logoSrc: "/images/brands/new-york-fashion-week.svg" },
  { name: "P&G", logoSrc: "/images/brands/pg.svg" },
  { name: "P&G Beauty", logoSrc: "/images/brands/pg-beauty.svg" },
];

function BrandMark({ brand }: { brand: Brand }) {
  return (
    <div className={styles.cell}>
      <span
        role="img"
        aria-label={`${brand.name} logo`}
        className={styles.logoMask}
        style={{ ["--logo-url" as string]: `url(${brand.logoSrc})` }}
      />
      <img
        src={brand.logoSrc}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className={styles.logoImg}
      />
    </div>
  );
}

export function BrandsSection() {
  return (
    <section id="brands" aria-labelledby="brands-title" className="py-24 md:py-32 lg:py-36">
      <div className="mx-auto w-full max-w-6xl px-6">
        <header className="max-w-3xl">
          <h2 id="brands-title" className="text-3xl md:text-4xl font-display tracking-tight">
            Working With Industry Leaders
          </h2>
        </header>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-12 gap-y-12 items-center">
          {brands.map((brand) => (
            <BrandMark key={brand.name} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
}
