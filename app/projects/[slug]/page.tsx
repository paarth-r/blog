import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProjectBySlug, getAllProjects } from 'app/data/projects'
import { fetchRepoHistory } from 'app/lib/github'
import { VersionHistoryPolling } from 'app/components/version-history-polling'
import { UpdatesFeed } from 'app/components/updates-feed'
import { ProjectImage } from 'app/components/project-image'

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 inline"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  )
}

/** Simple markdown-like: **bold**, [text](url), newlines -> paragraphs */
function renderAbstract(text: string) {
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
  const paragraphs = withLinks.split(/\n\n+/).filter(Boolean)
  return paragraphs.map((p, i) => (
    <p key={i} className="my-4 text-neutral-800 dark:text-neutral-200" dangerouslySetInnerHTML={{ __html: p }} />
  ))
}

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.description,
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  let history: Awaited<ReturnType<typeof fetchRepoHistory>> = null
  if (project.githubRepo) {
    const [owner, repo] = project.githubRepo.split('/')
    // Fetch fresh on every page open/refresh; polling keeps it updated while viewing
    history = await fetchRepoHistory(owner, repo, 0)
  }

  const githubUrl = project.githubRepo
    ? `https://github.com/${project.githubRepo}`
    : project.href?.startsWith('https://github.com')
      ? project.href
      : null

  return (
    <section className="flex flex-col gap-8">
      <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
        <Link
          href="/projects"
          className="transition-colors hover:text-neutral-700 dark:hover:text-neutral-300"
        >
          Projects
        </Link>
        <span>/</span>
        <span className="text-neutral-700 dark:text-neutral-300">
          {project.title}
        </span>
      </div>

      {project.image && (
        <div className="relative -mx-2 aspect-video w-[calc(100%+16px)] overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800 md:mx-0 md:w-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
          <ProjectImage
            src={project.image}
            contain={project.id === 'hyperform'}
            invert={project.id === 'hyperform'}
          />
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        <article>
          <h1 className="mb-2 text-2xl font-semibold tracking-tighter text-neutral-900 dark:text-neutral-100">
            {project.title}
          </h1>
          {project.year && (
            <p className="mb-6 text-sm text-neutral-500 dark:text-neutral-400">
              {project.year}
            </p>
          )}
          {project.abstract ? (
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              {renderAbstract(project.abstract)}
            </div>
          ) : (
            <p className="text-neutral-600 dark:text-neutral-400">
              {project.description}
            </p>
          )}
          {project.tech && project.tech.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded bg-neutral-200/80 px-2 py-1 text-xs font-medium text-neutral-700 dark:bg-neutral-700/80 dark:text-neutral-300"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </article>

        <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
          {githubUrl && (
            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 p-4">
              <h3 className="mb-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                GitHub
              </h3>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              >
                <ArrowIcon />
                <span>View repository</span>
              </a>
            </div>
          )}
          {history && githubUrl && (
            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 p-4">
              <h3 className="mb-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                Version history
              </h3>
              <VersionHistoryPolling slug={slug} initialHistory={history} />
            </div>
          )}
          {project.updates && project.updates.length > 0 && (
            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 p-4">
              <h3 className="mb-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                Updates
              </h3>
              <UpdatesFeed updates={project.updates} />
            </div>
          )}
        </aside>
      </div>
    </section>
  )
}
