import { useState } from 'react';
import { Building2 } from 'lucide-react';

interface HospitalImageProps {
  src: string;
  alt: string;
  className?: string;
  focusClass?: string;
  fit?: 'cover' | 'contain';
  loading?: 'eager' | 'lazy';
}

export function HospitalImage({
  src,
  alt,
  className = '',
  focusClass = 'object-center',
  fit = 'cover',
  loading = 'eager',
}: HospitalImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-slate-100 to-blue-50 text-slate-500 p-6 text-center ${className}`}
      >
        <Building2 className="h-8 w-8 text-blue-600/60" aria-hidden="true" />
        <span className="text-xs font-medium text-slate-600 max-w-[22ch]">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`w-full h-full ${fit === 'contain' ? 'object-contain' : 'object-cover'} ${focusClass} ${className}`}
    />
  );
}
