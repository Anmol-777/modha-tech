"use client";

import { useCallback, useEffect, useState } from "react";

import type { Review } from "@/data/content";

type ReviewsCarouselProps = {
  reviews: Review[];
  title?: string;
};

export default function ReviewsCarousel({
  reviews,
  title = "Customer Reviews",
}: ReviewsCarouselProps) {
  const [active, setActive] = useState(1);

  const go = useCallback(
    (direction: -1 | 1) => {
      setActive((current) => (current + direction + reviews.length) % reviews.length);
    },
    [reviews.length]
  );

  useEffect(() => {
    if (reviews.length <= 1) return;
    const timer = setInterval(() => go(1), 6000);
    return () => clearInterval(timer);
  }, [go, reviews.length]);

  if (!reviews.length) return null;

  return (
    <section className="py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="section-label mb-6">{title}</h2>

        <div className="relative">
          <button
            type="button"
            onClick={() => go(-1)}
            className="absolute left-0 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 rounded-full border border-black bg-gray-200 md:block"
            aria-label="Previous review"
          >
            ‹
          </button>

          <div className="flex items-end justify-center gap-3 overflow-hidden md:gap-4">
            {reviews.map((review, index) => {
              const isCenter = index === active;
              const offset = index - active;

              return (
                <article
                  key={review._id}
                  className={`shrink-0 rounded-[15px] border border-black bg-gray-200 transition-all duration-300 ${
                    isCenter
                      ? "z-10 w-[45%] scale-100 p-4 md:w-[182px] md:p-5"
                      : "w-[30%] scale-95 opacity-80 md:w-[122px] md:p-3"
                  } ${Math.abs(offset) > 1 ? "hidden md:block" : ""}`}
                  style={{
                    transform: isCenter ? "scale(1)" : `scale(${offset === 0 ? 1 : 0.92})`,
                  }}
                >
                  <div
                    className={`mb-3 border border-black bg-gray-400 ${
                      isCenter ? "h-24 md:h-[142px]" : "h-16 md:h-[106px]"
                    } placeholder-x rounded-md`}
                  />
                  <p className="text-[10px] leading-snug md:text-xs">&ldquo;{review.quote}&rdquo;</p>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            className="absolute right-0 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 rounded-full border border-black bg-gray-200 md:block"
            aria-label="Next review"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
