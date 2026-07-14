"use client";

import Image from "next/image";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/918143824009"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#48663F] shadow-lg hover:scale-105 transition-transform"
      aria-label="Contact on WhatsApp"
    >
      <Image
        src="/images/Group 58.jpg"
        alt="WhatsApp"
        width={30}
        height={30}
        className="object-contain"
      />
    </a>
  );
}
