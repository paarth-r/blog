import Link from 'next/link'
import {
  type Project,
  getFeaturedProjects,
  getAllProjects,
} from 'app/data/projects'

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function ProjectCard({ project }: { project: Project }) {
  const content = (
    <div className="group flex flex-col gap-1 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 p-4 transition-colors hover:border-neutral-300 hover:bg-neutral-100/80 dark:hover:border-neutral-700 dark:hover:bg-neutral-800/80">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          {project.title}
        </h3>
        {project.year && (
          <span className="tabular-nums text-xs text-neutral-500 dark:text-neutral-400">
            {project.year}
          </span>
        )}
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        {project.description}
      </p>
      {project.tech && project.tech.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded bg-neutral-200/80 px-1.5 py-0.5 text-xs font-medium text-neutral-700 dark:bg-neutral-700/80 dark:text-neutral-300"
            >
              {t}
            </span>
          ))}
        </div>
      )}
      <span className="mt-2 flex items-center text-sm font-medium text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100">
        <ArrowIcon />
        <span className="ml-1.5">View project</span>
      </span>
    </div>
  )

  return (
    <Link href={`/projects/${project.id}`} className="block">
      {content}
    </Link>
  )
}

export function ProjectPortfolio({ featuredOnly = true }: { featuredOnly?: boolean }) {
  const list = featuredOnly ? getFeaturedProjects() : getAllProjects()

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
      {list.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
