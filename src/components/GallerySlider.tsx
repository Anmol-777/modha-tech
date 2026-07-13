"use client";

import { useState } from "react";

const slides = 4;

export default function GallerySlider() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="section-label mb-4">Gallery of images</h2>

        <div className="relative overflow-hidden rounded-[15px] border border-black bg-gray-200">
          <div
            className="placeholder-x h-52 w-full md:h-[217px]"
            aria-label={`Gallery slide ${active + 1}`}
          />

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {Array.from({ length: slides }).map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                className={`carousel-dot ${index === active ? "active" : ""}`}
                onClick={() => setActive(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
