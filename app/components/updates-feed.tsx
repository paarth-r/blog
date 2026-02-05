import type { ProjectUpdate } from 'app/data/projects'

function formatUpdateDate(dateStr: string) {
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: d.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
  })
}

/** Simple **bold** and [text](url) for update text */
function renderUpdateText(text: string) {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
  const withBold = escaped.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  const withLinks = withBold.replace(
    /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
    '<a href="$2" class="underline decoration-neutral-400 dark:decoration-neutral-600 underline-offset-2" target="_blank" rel="noopener noreferrer">$1</a>'
  )
  return withLinks
}

export function UpdatesFeed({ updates }: { updates: ProjectUpdate[] }) {
  const sorted = [...updates].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <div className="max-h-[420px] overflow-y-auto space-y-0">
      {sorted.map((update, i) => (
        <div
          key={`${update.date}-${i}`}
          className="relative flex flex-col gap-1 py-3 border-b border-neutral-200/80 dark:border-neutral-800/80 last:border-0"
        >
          <time
            dateTime={update.date}
            className="text-[11px] font-medium text-neutral-500 dark:text-neutral-500 tabular-nums"
          >
            {formatUpdateDate(update.date)}
          </time>
          <p
            className="text-sm text-neutral-700 dark:text-neutral-300"
            dangerouslySetInnerHTML={{ __html: renderUpdateText(update.text) }}
          />
        </div>
      ))}
    </div>
  )
}
