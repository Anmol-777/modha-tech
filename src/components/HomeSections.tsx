"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export function HeroSection() {
  return (
    <section className="relative w-full h-[450px] md:h-[550px] lg:h-[650px] mt-16 overflow-hidden">
      <Image
        src="/images/machine.jpg"
        alt="Modha Pedal Operating Machine"
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/65 via-white/25 to-transparent" />

      <div className="relative h-full w-full px-5 md:px-12 lg:px-24 max-w-7xl mx-auto flex items-center">
        <div className="max-w-[280px] md:max-w-[400px] lg:max-w-[500px]">
          <h1 className="font-heading text-[34px] md:text-[52px] lg:text-[68px] leading-tight text-[#2E2E2E]">
            Modha Technologies
          </h1>
          <p className="mt-4 text-[16px] md:text-xl lg:text-2xl leading-relaxed text-[#2E2E2E]">
            Empowering the <span className="text-[#48663F] font-semibold">hands</span>
            <br />
            that clothe the nation
          </p>
          <Link
            href="/products"
            className="mt-6 inline-flex items-center gap-2 rounded-[999px] bg-[#496C42] px-7 py-3.5 font-heading text-sm md:text-base font-semibold text-white shadow-sm hover:bg-[#3a5a34] transition-all"
          >
            Explore the product
            <span className="text-lg">→</span>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-4 left-5 flex items-center gap-2 rounded-lg bg-[#48663F] px-3 py-1.5">
        <div className="h-4 w-4 rounded-sm bg-[#3a5a34]" />
        <span className="text-[11px] font-semibold text-white">Modha Pedal</span>
      </div>
    </section>
  );
}

export function FeaturesSection() {
  return (
    <section className="w-full bg-[#DDE8D3] py-8 md:py-14 lg:py-18">
      <div className="w-full px-5 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <h2 className="font-heading text-[24px] md:text-[34px] lg:text-[42px] font-bold text-[#48663F] text-center">
          Key Features
        </h2>
        <div className="mt-5 w-full rounded-[20px] overflow-hidden shadow-sm">
          <Image
            src="/images/Group 106.jpg"
            alt="Key Features"
            width={1200}
            height={800}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export function VideoSection() {
  return (
    <section className="w-full bg-[#DDE8D3] py-8 md:py-14 lg:py-18">
      <div className="w-full px-5 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <h2 className="font-heading text-[22px] md:text-[32px] lg:text-[40px] font-bold text-[#48663F] text-center mb-5">
          Installation Video
        </h2>
        <div className="relative w-full aspect-video rounded-[20px] overflow-hidden shadow-sm max-w-3xl mx-auto">
          <Image src="/images/Group 9.jpg" alt="Installation video" fill className="object-cover" />
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              type="button"
              className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-md hover:scale-105 transition-transform"
              aria-label="Play installation video"
            >
              <svg width="20" height="24" viewBox="0 0 24 24" fill="#48663F">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      quote: "It has been really good. I've been using it for 6 months, and it was easy to set up without any tutorial.",
      author: "Weaver",
      image: "/images/Property 1=Default.jpg",
    },
    {
      quote: "I've been using this for 3 years and it's been very effective. My leg pain is gone, and work feels much more comfortable.",
      author: "Weaver, Jangam Jilla",
      image: "/images/Property 1=Default-1.jpg",
    },
  ];

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const idx = Math.round(scrollRef.current.scrollLeft / scrollRef.current.offsetWidth);
    setActiveIndex(idx);
  };

  return (
    <section className="w-full bg-white py-9 md:py-16 lg:py-20">
      <div className="w-full px-5 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <h2 className="font-heading text-[22px] md:text-[32px] lg:text-[40px] font-bold text-[#48663F] text-center mb-6">
          Voices From The Loom
        </h2>
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-5 px-5 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:mx-0 md:px-0"
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="snap-start shrink-0 w-[300px] md:w-auto rounded-[20px] bg-white border border-gray-100 shadow-sm overflow-hidden"
            >
              <div className="relative w-full h-40">
                <Image src={t.image} alt="" fill className="object-cover" />
              </div>
              <div className="p-4">
                <p className="text-sm text-[#2E2E2E] leading-relaxed mb-3">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-xs font-semibold text-[#48663F]">{t.author}</p>
                <button type="button" className="mt-2 text-xs font-medium text-[#48663F] hover:underline">
                  Read more →
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex md:hidden justify-center gap-2 mt-4">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`w-2 h-2 rounded-full transition-colors ${i === activeIndex ? "bg-[#48663F]" : "bg-gray-300"}`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function AwardsSection() {
  const [activeAward, setActiveAward] = useState(0);
  const awards = [
    { title: "National Innovation Award", image: "/images/Group 134.jpg" },
    { title: "Telangana Innovation Award", image: "/images/Group 134.jpg" },
    { title: "Palle Srujana Recognition", image: "/images/Group 134.jpg" },
  ];

  return (
    <section id="awards" className="w-full bg-white py-9 md:py-16 lg:py-20">
      <div className="w-full px-5 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <h2 className="font-heading text-[22px] md:text-[32px] lg:text-[40px] font-bold text-[#48663F] text-center mb-6">
          Awards & Recognition
        </h2>
        <div className="relative w-full aspect-[4/3] md:aspect-[16/7] rounded-[20px] overflow-hidden shadow-sm max-w-4xl mx-auto">
          <Image src={awards[activeAward].image} alt={awards[activeAward].title} fill className="object-cover" />
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {awards.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`w-2 h-2 rounded-full transition-colors ${i === activeAward ? "bg-[#48663F]" : "bg-gray-300"}`}
              aria-label={`Go to award ${i + 1}`}
              onClick={() => setActiveAward(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
