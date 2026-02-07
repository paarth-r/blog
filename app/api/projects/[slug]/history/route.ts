import { getProjectBySlug } from 'app/data/projects'
import { fetchRepoHistory } from 'app/lib/github'
import { NextResponse } from 'next/server'

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params
  const project = getProjectBySlug(slug)
  if (!project?.githubRepo) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  const [owner, repo] = project.githubRepo.split('/')
  const history = await fetchRepoHistory(owner, repo, 0)
  if (!history) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 502 })
  }
  return NextResponse.json(history)
}
