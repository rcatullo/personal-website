'use client';
import Link from 'next/link'
import { formatDate } from 'app/utils/utils'
import { useEffect, useState } from 'react';
import { getPosts } from 'app/lib/supabase';
import { useSession } from "next-auth/react"

export default function Posts({ params }: { params: any[] }) {
  const [posts, setPosts] = useState(params);
  const [drafts, setDrafts] = useState<any[]>([]);
  const { data: session } = useSession();
  
  useEffect(() => {
    const update = async () => {
      const posts = await getPosts()
      setPosts(posts || []);
      if (session) {
        const drafts = await getPosts(true)
        setDrafts(drafts || []);
      }
    };
    update();
  }, [session, posts, drafts]);
  
  return (
    <div>
      {session && drafts.length > 0 && (
        <>
          <div className="flex items-center space-x-2 mt-8 mb-4">
            <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Drafts</h2>
          </div>
          {drafts.map((draft) => (
            <Link
              key={draft.slug}
              className="flex flex-col space-y-1 mb-4"
              href={`/stacks/new-post/${draft.id}`}
            >
              <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
                <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
                  {formatDate(draft.created_at, false)}
                </p>
                <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                  {draft.title}
                </p>
              </div>
            </Link>
          ))}
          <hr className="my-6 border-neutral-200 dark:border-neutral-800" />
        </>
      )}
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
