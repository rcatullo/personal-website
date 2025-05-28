import { getPosts } from 'app/lib/supabase'
import Link from 'next/link'
import { formatDate } from 'app/stacks/utils'

export default async function Posts() {
  const posts = await getPosts();

  if (!posts || posts.length === 0) {
    return <p className="text-neutral-600 dark:text-neutral-400">No posts found.</p>
  }

  return (
    <div>
      {posts.map((post) => (
        <Link
          key={post.slug}
          className="flex flex-col space-y-1 mb-4"
          href={`/stacks/${post.slug}`}
        >
          <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
            <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
              {formatDate(post.created_at, false)}
            </p>
            <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
              {post.title}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
