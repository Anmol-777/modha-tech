"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white shadow-sm">
        <div className="flex items-center justify-between h-full pl-5 pr-5 max-w-7xl mx-auto md:px-12 lg:px-24">
          <Link href="/" className="flex items-center" aria-label="Modha Technologies home">
            <Image
              src="/images/Group 84.jpg"
              alt="Modha Technologies"
              width={100}
              height={32}
              className="object-contain"
              style={{ maxHeight: "32px", width: "auto" }}
              priority
            />
          </Link>

          <div className="flex items-center gap-3">
            <button type="button" className="flex items-center gap-1 text-sm font-medium text-[#2E2E2E]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </button>
            <span className="text-sm font-medium text-[#2E2E2E]">EN</span>
            <button
              type="button"
              className="flex flex-col items-center justify-center w-8 h-8 gap-1"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <span className="block w-5 h-0.5 bg-[#2E2E2E]" />
              <span className="block w-5 h-0.5 bg-[#2E2E2E]" />
              <span className="block w-5 h-0.5 bg-[#2E2E2E]" />
            </button>
          </div>
        </div>
      </header>

      <div className="hidden md:flex fixed top-0 left-0 right-0 z-50 h-16 items-center justify-center pointer-events-none">
        <nav className="pointer-events-auto flex items-center gap-8 text-sm font-medium text-[#2E2E2E] ml-48">
          <Link href="/" className="hover:text-[#48663F] transition-colors">Home</Link>
          <Link href="/products" className="hover:text-[#48663F] transition-colors">Product</Link>
          <Link href="/innovations" className="hover:text-[#48663F] transition-colors">Innovations</Link>
          <Link href="/about" className="hover:text-[#48663F] transition-colors">About Us</Link>
        </nav>
      </div>

      {menuOpen && (
        <>
          <div className="fixed inset-0 bg-black/30 z-50 md:hidden" onClick={() => setMenuOpen(false)} />
          <div className="fixed top-0 right-0 bottom-0 w-[280px] z-50 bg-white shadow-lg md:hidden">
            <div className="flex justify-end p-4">
              <button type="button" className="text-2xl text-[#2E2E2E]" aria-label="Close menu" onClick={() => setMenuOpen(false)}>✕</button>
            </div>
            <nav className="px-6">
              <ul className="flex flex-col gap-6">
                <li><Link href="/" className="font-heading text-lg text-[#2E2E2E]" onClick={() => setMenuOpen(false)}>Home</Link></li>
                <li><Link href="/products" className="font-heading text-lg text-[#2E2E2E]" onClick={() => setMenuOpen(false)}>Product</Link></li>
                <li><Link href="/innovations" className="font-heading text-lg text-[#2E2E2E]" onClick={() => setMenuOpen(false)}>Innovations</Link></li>
                <li><Link href="/about" className="font-heading text-lg text-[#2E2E2E]" onClick={() => setMenuOpen(false)}>Our Story</Link></li>
                <li><Link href="/contact" className="font-heading text-lg text-[#2E2E2E]" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
