import React from 'react';
import clsx from 'clsx';

/**
 * Paragraph with flexible tag
 */
export default function Paragraph({
  as: Tag = 'p',
  size = 'text-base md:text-lg',
  className = '',
  children,
  ...props
}) {
  return (
    <Tag className={clsx('font-inter text-zinc-700 leading-relaxed', size, className)} {...props}>
      {children}
    </Tag>
  );
}