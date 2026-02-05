import { type GitHubTreeEntry } from 'app/lib/github'

function TreeRow({
  entry,
  depth,
  isLast,
}: {
  entry: GitHubTreeEntry
  depth: number
  isLast: boolean
}) {
  const name = entry.path.split('/').pop() || entry.path
  const isDir = entry.type === 'tree'
  return (
    <div
      className="flex items-center gap-1.5 py-0.5 font-mono text-xs text-neutral-600 dark:text-neutral-400"
      style={{ paddingLeft: `${depth * 12 + 4}px` }}
    >
      <span className="select-none text-neutral-400 dark:text-neutral-500">
        {isLast ? '└──' : '├──'}
      </span>
      <span
        className={
          isDir
            ? 'font-medium text-neutral-700 dark:text-neutral-300'
            : 'text-neutral-600 dark:text-neutral-400'
        }
      >
        {isDir ? `${name}/` : name}
      </span>
    </div>
  )
}

/** Build a shallow tree view: group by top-level folder, show first N entries per level. */
function buildDisplayList(
  tree: GitHubTreeEntry[],
  maxFiles: number = 80
): { entry: GitHubTreeEntry; depth: number }[] {
  const withDepth = tree.map((entry) => ({
    entry,
    depth: (entry.path.match(/\//g) || []).length,
  }))
  const sorted = withDepth.sort((a, b) => a.entry.path.localeCompare(b.entry.path))
  return sorted.slice(0, maxFiles)
}

export function SourceTree({ tree }: { tree: GitHubTreeEntry[] }) {
  const display = buildDisplayList(tree)

  return (
    <div className="max-h-[420px] overflow-y-auto rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/80 px-2 py-2">
      <div className="font-mono text-xs text-neutral-500 dark:text-neutral-500 mb-1.5 px-1">
        .
      </div>
      {display.map(({ entry, depth }, i) => (
        <TreeRow
          key={entry.sha + entry.path}
          entry={entry}
          depth={depth}
          isLast={i === display.length - 1}
        />
      ))}
      {tree.length > display.length && (
        <div
          className="py-1 font-mono text-xs text-neutral-400 dark:text-neutral-500"
          style={{ paddingLeft: '16px' }}
        >
          … +{tree.length - display.length} more
        </div>
      )}
    </div>
  )
}
