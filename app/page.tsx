import Link from 'next/link'
import { BlogPosts } from 'app/components/posts'
import { ProjectPortfolio } from 'app/components/projects'
import { GitHubContributionsGrid } from 'app/components/github-contributions-grid'

export default function Page() {
  return (
    <section className="flex flex-col gap-12">
      <div>
        <h1 className="mb-4 text-2xl font-semibold tracking-tighter">
          Paarth Rajpal
        </h1>
        <p className="mb-6 text-neutral-600 dark:text-neutral-400">
          {`I'm a student developer exploring computer vision, robotics, and AI — and their intersection. 
          I spend a lot of my time building, trying to solve real-world problems through research and SOTA technologies
          —whether it's improving how robots see the world, or using CV and AI to make fitness more accessible.
          I'm always experimenting, learning, and striving to turn ideas into things that actually work.`}
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Projects
        </h2>
        <ProjectPortfolio featuredOnly />
        <p className="mt-4">
          <Link
            href="/projects"
            className="font-medium text-neutral-600 underline decoration-neutral-400 underline-offset-2 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
          >
            View all projects →
          </Link>
        </p>
        <div className="mt-8">
          <GitHubContributionsGrid />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Blog Posts
        </h2>
        <p className="mb-4 text-neutral-600 dark:text-neutral-400">
          I write about computer vision, hand pose, AR, and building JARVIS-style interfaces. 
          Full archive and CV research timeline on the blog.
        </p>
        <BlogPosts limit={3} />
        <p className="mt-3">
          <Link
            href="/blog"
            className="font-medium text-neutral-600 underline decoration-neutral-400 underline-offset-2 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
          >
            View all posts→
          </Link>
        </p>
      </div>
    </section>
  )
}
