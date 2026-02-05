import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

export function BlogPosts({ limit }: { limit?: number }) {
  let allBlogs = getBlogPosts()
  const sorted = [...allBlogs].sort((a, b) => {
    const dateA = a.metadata.publishedAt
      ? new Date(a.metadata.publishedAt).getTime()
      : 0
    const dateB = b.metadata.publishedAt
      ? new Date(b.metadata.publishedAt).getTime()
      : 0
    return dateB - dateA
  })
  const posts = limit != null ? sorted.slice(0, limit) : sorted

  return (
    <div>
      {posts.map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums whitespace-nowrap">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.metadata.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
  )
}
