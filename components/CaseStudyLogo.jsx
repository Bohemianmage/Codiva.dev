'use client';

import { motion } from 'framer-motion';

/**
 * Logos diseñados sobre fondo oscuro: misma silueta que el resto, con contenedor negro.
 */
export function CaseStudyLogo({ item, alt, className, motionProps }) {
  const innerImgClass =
    item.logoSurface === 'dark'
      ? `max-h-full w-auto max-w-full object-contain ${className ?? ''}`.trim()
      : (className ?? '');

  if (item.logoSurface === 'dark') {
    return (
      <div className="flex h-full w-full max-h-full items-center justify-center rounded-lg bg-black px-2 py-1.5 sm:px-3 sm:py-2">
        {motionProps ? (
          <motion.img
            src={item.logo}
            alt={alt}
            className={innerImgClass}
            decoding="async"
            {...motionProps}
          />
        ) : (
          <img src={item.logo} alt={alt} className={innerImgClass} decoding="async" />
        )}
      </div>
    );
  }

  if (motionProps) {
    return (
      <motion.img
        src={item.logo}
        alt={alt}
        className={className}
        decoding="async"
        {...motionProps}
      />
    );
  }

  return <img src={item.logo} alt={alt} className={className} decoding="async" />;
}
