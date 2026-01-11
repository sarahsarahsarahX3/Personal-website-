"use client";

import Image from "next/image";

export function BioSection() {
  return (
    <section aria-labelledby="home-bio-title" className="py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid grid-cols-12 gap-y-10 md:gap-y-0 md:gap-x-10 items-start">
          <figure className="col-span-8 sm:col-span-6 md:col-span-4 md:col-start-2 md:translate-y-6">
            <div className="relative aspect-[4/5] w-full max-w-[320px]">
              <Image
                src="/images/IMG_5668_edited.jpg"
                alt="Headshot of Sarah Dawson"
                fill
                sizes="(min-width: 768px) 320px, 70vw"
                className="object-cover rounded-3xl"
                priority
              />
            </div>
          </figure>

          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <div className="relative max-w-[60ch]">
              <div aria-hidden="true" className="hidden md:block absolute -left-10 top-3 h-px w-10 bg-white/10" />
              <h2 id="home-bio-title" className="sr-only">
                About
              </h2>
              <p className="text-xl md:text-2xl leading-snug tracking-tight text-text-primary">
                Hi, I’m Sarah Dawson.
              </p>
              <p className="mt-5 text-base md:text-lg leading-relaxed text-text-secondary">
                I lead marketing-driven content that strengthens brand voice, grows audiences, and performs across channels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
