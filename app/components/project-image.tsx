'use client'

import { useState } from 'react'

export function ProjectImage({ src, alt }: { src: string; alt?: string }) {
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

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt ?? ''}
      className="h-full w-full object-cover object-top"
      onError={() => setError(true)}
    />
  )
}
