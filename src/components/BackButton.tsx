import Link from "next/link";

export default function BackButton({ href = "/" }: { href?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-black bg-gray-200 text-xs hover:bg-gray-300"
      aria-label="Go back"
    >
      ←
    </Link>
  );
}
