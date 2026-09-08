import { useState } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

/** Image with its own loading shimmer and a graceful fallback. */
export function ProductImage({ src, alt, className = '' }: ProductImageProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-white ${className}`}>
      {status === 'loading' && <div className="absolute inset-0 animate-pulse bg-[#F0EEF6]" />}
      {status === 'error' ? (
        <div className="flex h-full w-full items-center justify-center text-xs text-muted">
          Image unavailable
        </div>
      ) : (
        <img
          key={src}
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={`h-full w-full object-contain transition-opacity duration-200 ${
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
}
