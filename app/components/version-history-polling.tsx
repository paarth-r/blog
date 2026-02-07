'use client'

import { useEffect, useState } from 'react'
import type { RepoHistory } from 'app/lib/github'
import { VersionTree } from 'app/components/version-tree'

const POLL_INTERVAL_MS = 60 * 1000 // 1 minute

export function VersionHistoryPolling({
  slug,
  initialHistory,
}: {
  slug: string
  initialHistory: RepoHistory
}) {
  const [history, setHistory] = useState<RepoHistory>(initialHistory)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const poll = () => {
      fetch(`/api/projects/${slug}/history`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data: RepoHistory | null) => {
          if (data) setHistory(data)
        })
        .catch(() => {})
    }

    const schedule = () => {
      if (document.hidden) return
      poll()
    }

    const id = setInterval(schedule, POLL_INTERVAL_MS)
    schedule()

    const onVisibility = () => {
      if (!document.hidden) poll()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      clearInterval(id)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [slug])

  return <VersionTree history={history} />
}
