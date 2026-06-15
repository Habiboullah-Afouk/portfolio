"use client";

import { ImageLoader } from "@/components/ui/ImageLoader";

export function Avatar({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-lg">
        <ImageLoader
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-black/40 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
