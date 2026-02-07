'use client'

import { useState } from 'react'

type ProjectImageProps = {
  src: string
  alt?: string
  /** Center image in frame and show full image (contain) instead of crop (cover) */
  contain?: boolean
  /** Invert colors (e.g. for dark logos on light background) */
  invert?: boolean
}

export function ProjectImage({ src, alt, contain, invert }: ProjectImageProps) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div
        className="flex h-full w-full items-center justify-center bg-neutral-200 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm"
        aria-hidden
      >
        Image unavailable
      </div>
    )
  }

  const objectClass = contain
    ? 'object-contain object-center'
    : 'object-cover object-center'

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt ?? ''}
      className={`h-full w-full ${objectClass} ${invert ? 'invert' : ''}`}
      onError={() => setError(true)}
    />
  )
}
