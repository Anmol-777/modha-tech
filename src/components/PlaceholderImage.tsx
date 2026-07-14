import Image from "next/image";

type PlaceholderImageProps = {
  src?: string;
  alt: string;
  label?: string;
  className?: string;
  rounded?: "sm" | "md" | "lg" | "xl";
  priority?: boolean;
};

const roundedMap = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-[15px]",
  xl: "rounded-[18px]",
};

export default function PlaceholderImage({
  src,
  alt,
  label,
  className = "",
  rounded = "lg",
  priority = false,
}: PlaceholderImageProps) {
  const roundedClass = roundedMap[rounded];

  if (src) {
    return (
      <div className={`relative overflow-hidden border border-black ${roundedClass} ${className}`}>
        <Image src={src} alt={alt} fill className="object-cover" priority={priority} />
      </div>
    );
  }

  return (
    <div
      className={`placeholder-x relative flex items-center justify-center overflow-hidden border border-black ${roundedClass} ${className}`}
      aria-label={alt}
    >
      {label && (
        <span className="relative z-10 bg-white/80 px-2 py-0.5 text-xs text-black">{label}</span>
      )}
    </div>
  );
}
