import Link from 'next/link'
import type { GitHubCommit, GitHubBranch, RepoHistory } from 'app/lib/github'

function formatCommitDate(dateStr: string) {
  const d = new Date(dateStr)
  const now = new Date()
  const days = Math.floor((now.getTime() - d.getTime()) / (24 * 60 * 60 * 1000))
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 7) return `${days}d ago`
  if (days < 30) return `${Math.floor(days / 7)}w ago`
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined })
}

function firstLine(msg: string) {
  return msg.split('\n')[0].slice(0, 60) + (msg.split('\n')[0].length > 60 ? '…' : '')
}

function branchesAtSha(sha: string, branches: GitHubBranch[]) {
  return branches.filter((b) => b.commit.sha === sha).map((b) => b.name)
}

export function VersionTree({ history }: { history: RepoHistory }) {
  const { commits, branches, defaultBranch } = history

  return (
    <div className="max-h-[420px] overflow-y-auto rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/80 px-3 py-2">
      <div className="space-y-0">
        {commits.map((commit, i) => {
          const isMerge = commit.parents.length > 1
          const branchNames = branchesAtSha(commit.sha, branches)
          const shortSha = commit.sha.slice(0, 7)

          return (
            <div
              key={commit.sha}
              className="relative flex flex-col gap-0.5 py-2 border-b border-neutral-200/80 dark:border-neutral-800/80 last:border-0"
            >
              {i > 0 && (
                <div
                  className="absolute left-[11px] top-0 bottom-0 w-px -translate-x-1/2 bg-neutral-200 dark:bg-neutral-700"
                  aria-hidden
                />
              )}
              <div className="relative flex items-start gap-2">
                <span
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-neutral-400 dark:bg-neutral-500"
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <Link
                    href={commit.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs font-medium text-neutral-700 hover:underline dark:text-neutral-300"
                  >
                    {shortSha}
                  </Link>
                  <p className="mt-0.5 truncate text-xs text-neutral-600 dark:text-neutral-400" title={commit.commit.message}>
                    {firstLine(commit.commit.message)}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] text-neutral-500 dark:text-neutral-500">
                      {formatCommitDate(commit.commit.author.date)}
                    </span>
                    {branchNames.length > 0 && (
                      <>
                        <span className="text-neutral-300 dark:text-neutral-600">·</span>
                        {branchNames.map((name) => (
                          <span
                            key={name}
                            className="rounded bg-neutral-200 px-1.5 py-0.5 font-mono text-[11px] text-neutral-600 dark:bg-neutral-600 dark:text-neutral-300"
                          >
                            {name === defaultBranch ? `${name} (default)` : name}
                          </span>
                        ))}
                      </>
                    )}
                    {isMerge && (
                      <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[11px] font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
                        merge
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
