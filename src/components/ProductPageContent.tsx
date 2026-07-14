"use client";

import { useCallback, useEffect, useState } from "react";

import BackButton from "@/components/BackButton";
import ContactForm from "@/components/ContactForm";
import PlaceholderImage from "@/components/PlaceholderImage";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import { VideoSection } from "@/components/HomeSections";
import type { Product, Review } from "@/data/content";

type ProductPageContentProps = {
  product: Product;
  reviews: Review[];
};

export default function ProductPageContent({ product, reviews }: ProductPageContentProps) {
  const [ratingProgress, setRatingProgress] = useState(0);

  useEffect(() => {
    const rating = product.rating || 4.5;
    setRatingProgress(Math.round((rating / 5) * 100));
  }, [product.rating]);

  const thumbnails = useCallback(
    () => [product.image, "/images/thumb-2.jpg", "/images/thumb-3.jpg"],
    [product.image]
  );

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-4 md:px-6">
        <BackButton href="/" />
      </div>

      <section className="py-4 md:py-6">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <PlaceholderImage
            src={product.image}
            alt={product.name}
            label="Product"
            className="h-64 w-full md:h-[266px]"
            rounded="lg"
            priority
          />

          <div className="mt-4 grid grid-cols-3 gap-3">
            {thumbnails().map((src, index) => (
              <PlaceholderImage
                key={index}
                src={src}
                alt={`${product.name} view ${index + 1}`}
                className="h-16 md:h-[75px]"
                rounded="lg"
              />
            ))}
          </div>

          <div className="mt-4">
            <p className="section-label mb-1">Rating</p>
            <div className="h-1.5 w-full overflow-hidden rounded bg-gray-200">
              <div
                className="h-full rounded bg-gray-500 transition-all duration-500"
                style={{ width: `${ratingProgress}%` }}
              />
            </div>
          </div>

          <div className="relative mt-4">
            <div className="rounded-[15px] bg-gray-600 px-4 py-3 text-xs md:text-sm">
              Customization available for your loom setup
            </div>
            <div className="absolute -right-1 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-full bg-gray-800 px-2 py-1">
              <div className="h-8 w-8 rounded-full border border-black bg-gray-200 placeholder-x" />
              <div className="hidden h-1 w-10 rounded bg-white/40 sm:block" />
            </div>
          </div>

          <h1 className="mt-6 max-w-xs text-sm leading-snug md:text-base">{product.name}</h1>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="section-label mb-2">Description</h2>
              <p className="text-xs leading-relaxed md:text-sm">{product.description}</p>
              {product.features && (
                <ul className="mt-3 list-disc space-y-1 pl-4 text-xs md:text-sm">
                  {product.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <h2 className="section-label mb-2">Dimension</h2>
              <p className="text-xs md:text-sm">{product.dimensions}</p>
            </div>
          </div>
        </div>
      </section>

      <ReviewsCarousel reviews={reviews} title="Customer review" />
      <VideoSection />
      <ContactForm />
    </>
  );
}
