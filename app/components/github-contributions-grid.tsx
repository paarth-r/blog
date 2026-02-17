'use client'

import { useEffect, useState } from 'react'
import type { ContributionsResponse } from 'app/api/github/contributions/route'

const POLL_INTERVAL_MS = 10 * 60 * 1000 // 10 minutes

function intensityClass(count: number): string {
  if (count === 0) {
    return 'bg-neutral-200 dark:bg-neutral-800'
  }
  if (count <= 2) {
    return 'bg-emerald-300 dark:bg-emerald-900'
  }
  if (count <= 5) {
    return 'bg-emerald-400 dark:bg-emerald-700'
  }
  if (count <= 9) {
    return 'bg-emerald-500 dark:bg-emerald-600'
  }
  return 'bg-emerald-600 dark:bg-emerald-500'
}

export function GitHubContributionsGrid() {
  const [data, setData] = useState<ContributionsResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchData = () => {
    fetch('/api/github/contributions')
      .then(async (res) => {
        const json = await res.json().catch(() => ({}))
        if (!res.ok) {
          const msg = json?.error ?? (res.status === 503 ? 'Contributions API needs GITHUB_TOKEN' : 'Failed to load')
          throw new Error(msg)
        }
        return json as ContributionsResponse
      })
      .then((json) => {
        setData(json)
        setError(null)
      })
      .catch((err) => setError(err?.message ?? 'Could not load contributions'))
  }

  useEffect(() => {
    fetchData()
    const id = setInterval(() => {
      if (!document.hidden) fetchData()
    }, POLL_INTERVAL_MS)
    const onVisibility = () => {
      if (!document.hidden) fetchData()
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      clearInterval(id)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  if (error) {
    return (
      <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 p-4">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">{error}</p>
        {error.includes('GITHUB_TOKEN') && (
          <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">
            Add a GitHub personal access token as <code className="rounded bg-neutral-200 px-1 dark:bg-neutral-700">GITHUB_TOKEN</code> in your environment (e.g. Vercel).
          </p>
        )}
      </div>
    )
  }

  if (!data) {
    return (
      <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 p-4">
        <div className="flex gap-0.5">
          {Array.from({ length: 7 * 20 }).map((_, i) => (
            <div
              key={i}
              className="h-2.5 w-2.5 rounded-sm bg-neutral-200 dark:bg-neutral-800 animate-pulse"
              style={{ animationDelay: `${i * 20}ms` }}
            />
          ))}
        </div>
      </div>
    )
  }

  const { weeks, totalContributions } = data
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? 'paarth-r'

  return (
    <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          GitHub contributions
        </span>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
        >
          @{username}
        </a>
      </div>
      <p className="mb-3 text-xs text-neutral-500 dark:text-neutral-400">
        {totalContributions} contributions in the last year
      </p>
      <div className="overflow-x-auto">
        <div className="inline-flex gap-0.5">
          {weeks.map((week, col) => (
            <div key={col} className="flex flex-col gap-0.5">
              {[0, 1, 2, 3, 4, 5, 6].map((row) => {
                const day = week.contributionDays.find((d) => d.weekday === row)
                const count = day?.count ?? 0
                const title = day
                  ? `${day.date}: ${count} contribution${count !== 1 ? 's' : ''}`
                  : ''
                return (
                  <div
                    key={`${col}-${row}`}
                    className={`h-2.5 w-2.5 rounded-sm ${intensityClass(count)}`}
                    title={title}
                    aria-label={title || 'No contributions'}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 flex items-center justify-end gap-2 text-[10px] text-neutral-400 dark:text-neutral-500">
        <span>Less</span>
        <div className="flex gap-0.5">
          {[0, 1, 5, 10].map((n) => (
            <div
              key={n}
              className={`h-2 w-2 rounded-sm ${intensityClass(n)}`}
              aria-hidden
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  )
}
