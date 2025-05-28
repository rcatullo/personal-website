'use client';
import supabase from 'app/lib/supabase'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { formatDate } from 'app/stacks/utils'

type Post = {
  id: number;
  title: string;
  slug: string;
  created_at: string;
  content: string;
  published: boolean;
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
      const getPosts = async () => {
      const { data: posts, error } = await supabase
        .from('posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
    
      if (error) {
        console.error('Error fetching posts:', error);
      }
    
      setPosts(posts || [])
      }
  
      getPosts()
    }, []);

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
