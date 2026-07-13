import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/data/content";

export default function Footer() {
  return (
    <footer className="w-full relative">
      <div className="relative w-full h-[300px] md:h-[400px]">
        <Image
          src="/images/Group 116.jpg"
          alt="Footer"
          fill
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-12 lg:p-24 max-w-7xl mx-auto text-white">
        <div className="grid md:grid-cols-3 gap-6 mb-4">
          <div>
            <h3 className="font-heading text-lg font-bold">{siteConfig.name}</h3>
            <p className="text-sm text-white/80 mt-2">{siteConfig.description}</p>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Contact</p>
            <p className="text-sm text-white/80">{siteConfig.contact.email}</p>
            <p className="text-sm text-white/80">{siteConfig.contact.phone}</p>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Links</p>
            <div className="flex flex-col gap-1 text-sm text-white/80">
              <Link href="/" className="hover:text-white">Home</Link>
              <Link href="/products" className="hover:text-white">Product</Link>
              <Link href="/innovations" className="hover:text-white">Innovations</Link>
              <Link href="/about" className="hover:text-white">About Us</Link>
            </div>
          </div>
        </div>
        <div className="text-xs text-white/60 text-center pt-4 border-t border-white/20">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
