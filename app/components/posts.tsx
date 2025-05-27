import Link from 'next/link'
import { formatDate } from 'app/stacks/utils'
import { getSupabasePosts } from 'app/lib/supabase'

export async function BlogPosts() {
  const allBlogs = await getSupabasePosts()

  if (!allBlogs || allBlogs.length === 0) {
    return <p className="text-neutral-600 dark:text-neutral-400">No posts found.</p>
  }

  return (
    <div>
      {allBlogs.map((post) => (
        <Link
          key={post.slug}
          className="flex flex-col space-y-1 mb-4"
          href={`/stacks/${post.slug}`}
        >
          <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
            <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
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
