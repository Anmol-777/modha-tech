"use client";

import { useMemo, useState } from "react";

import type { Innovation } from "@/data/content";

import PlaceholderImage from "./PlaceholderImage";

const filters = [
  { id: "all", label: "All" },
  { id: "patented", label: "Patented" },
  { id: "pending", label: "Pending" },
] as const;

type InnovationListProps = {
  innovations: Innovation[];
};

export default function InnovationList({ innovations }: InnovationListProps) {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return innovations;
    return innovations.filter((item) => item.status === filter);
  }, [filter, innovations]);

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2 md:gap-3">
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            className={`rounded-full px-5 py-1.5 text-xs transition md:text-sm ${
              filter === item.id
                ? "bg-modha-green text-white"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filtered.map((innovation) => (
          <article
            key={innovation._id}
            className="grid gap-4 rounded-[18px] border border-black/10 bg-gray-200 p-4 md:grid-cols-[126px_1fr] md:gap-6 md:p-5"
          >
            <PlaceholderImage
              src={innovation.image}
              alt={innovation.title}
              label="Product"
              className="h-44 w-full md:h-[184px] md:w-[126px]"
              rounded="xl"
            />

            <div className="relative pb-8">
              <p className="text-xs leading-relaxed md:text-sm">{innovation.description}</p>
              <span className="absolute bottom-0 right-0 rounded-full bg-gray-700 px-4 py-1 text-xs capitalize text-white">
                {innovation.status}
              </span>
            </div>
          </article>
        ))}

        {!filtered.length && (
          <p className="text-sm text-black/60">No innovations found for this filter.</p>
        )}
      </div>
    </>
  );
}
