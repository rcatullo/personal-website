'use client';
import Link from 'next/link'
import { formatDate } from 'app/stacks/utils'
import { useEffect, useState } from 'react';
import { getPosts } from 'app/lib/supabase';

export default function Posts({ params }: { params: any[] }) {
  const [posts, setPosts] = useState(params);
  
  useEffect(() => {
    const update = async () => {
      const posts = await getPosts()
      setPosts(posts || []);
    };
    update();
  }, []);
  
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
