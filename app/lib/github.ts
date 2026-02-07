export type GitHubTreeEntry = {
  path: string
  type: 'blob' | 'tree'
  sha: string
}

export type GitHubTree = {
  sha: string
  tree: GitHubTreeEntry[]
}

export type GitHubCommit = {
  sha: string
  html_url: string
  commit: {
    message: string
    author: { date: string; name: string }
  }
  parents: { sha: string }[]
}

export type GitHubBranch = {
  name: string
  commit: { sha: string }
}

export type RepoHistory = {
  commits: GitHubCommit[]
  branches: GitHubBranch[]
  defaultBranch: string
}

const GITHUB_API = 'https://api.github.com'

/** Fetch repo default branch, then tree recursively. Returns null on error or rate limit. */
export async function fetchRepoTree(
  owner: string,
  repo: string
): Promise<GitHubTree | null> {
  try {
    const repoRes = await fetch(`${GITHUB_API}/repos/${owner}/${repo}`, {
      next: { revalidate: 3600 },
      headers: { Accept: 'application/vnd.github.v3+json' },
    })
    if (!repoRes.ok) return null
    const repoJson = await repoRes.json()
    const defaultBranch = repoJson.default_branch || 'main'

    const treeRes = await fetch(
      `${GITHUB_API}/repos/${owner}/${repo}/git/trees/${defaultBranch}?recursive=1`,
      {
        next: { revalidate: 3600 },
        headers: { Accept: 'application/vnd.github.v3+json' },
      }
    )
    if (!treeRes.ok) return null
    const treeJson = await treeRes.json()
    return {
      sha: treeJson.sha,
      tree: treeJson.tree || [],
    }
  } catch {
    return null
  }
}

/** Fetch commit history and branches for version tree (no file list). */
export async function fetchRepoHistory(
  owner: string,
  repo: string,
  /** Override cache: use 0 for fresh data (e.g. when polling). Default 3600 (1 hour). */
  revalidateSeconds: number = 3600
): Promise<RepoHistory | null> {
  const cacheOpt = revalidateSeconds === 0 ? { cache: 'no-store' as RequestCache } : { next: { revalidate: revalidateSeconds } }
  try {
    const [repoRes, commitsRes, branchesRes] = await Promise.all([
      fetch(`${GITHUB_API}/repos/${owner}/${repo}`, {
        ...cacheOpt,
        headers: { Accept: 'application/vnd.github.v3+json' },
      }),
      fetch(`${GITHUB_API}/repos/${owner}/${repo}/commits?per_page=25`, {
        ...cacheOpt,
        headers: { Accept: 'application/vnd.github.v3+json' },
      }),
      fetch(`${GITHUB_API}/repos/${owner}/${repo}/branches?per_page=10`, {
        ...cacheOpt,
        headers: { Accept: 'application/vnd.github.v3+json' },
      }),
    ])
    if (!repoRes.ok || !commitsRes.ok) return null
    const repoJson = await repoRes.json()
    const defaultBranch = repoJson.default_branch || 'main'
    const commits: GitHubCommit[] = await commitsRes.json()
    const branches: GitHubBranch[] = branchesRes.ok ? await branchesRes.json() : []

    return {
      commits,
      branches,
      defaultBranch,
    }
  } catch {
    return null
  }
}
