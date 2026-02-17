import { ProjectPortfolio } from 'app/components/projects'
import { GitHubContributionsGrid } from 'app/components/github-contributions-grid'

export const metadata = {
  title: 'Projects',
  description: 'Projects and builds — CV, robotics, AR, and side projects.',
}

export default function ProjectsPage() {
  return (
    <section>
      <h1 className="mb-2 text-2xl font-semibold tracking-tighter">
        Projects
      </h1>
      <p className="mb-6 text-neutral-600 dark:text-neutral-400">
        Things I&apos;ve built or am building: computer vision, gesture interfaces, fitness tech, and research experiments.
      </p>
      <div className="mb-8">
        <GitHubContributionsGrid />
      </div>
      <ProjectPortfolio featuredOnly={false} />
    </section>
  )
}
