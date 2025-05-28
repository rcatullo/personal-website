'use client';
import supabase from 'app/lib/supabase'
import { useEffect, useState } from 'react'
import { formatDate } from 'app/stacks/utils'
import { baseUrl } from 'app/sitemap';
import { MarkdownRenderer } from './editor/markdown-renderer';

type Post = {
    id: number;
    title: string;
    slug: string;
    created_at: string;
    content: string;
    published: boolean;
}

export default function Post({ slug }: { slug: string }) {
    const [post, setPost] = useState<Post>()

    useEffect(() => {
        const getPost = async () => {
            const { data: post, error } = await supabase
                .from('posts')
                .select('*')
                .eq('published', true)
                .eq('slug', slug)
                .single();
            
            if (error) {
                console.error('Error fetching posts:', error);
            }
            
            setPost(post)
        }
        getPost()
        }, []);

    if (!post) {
        return <p className="text-neutral-600 dark:text-neutral-400"></p>
    }

    return (
        <section>
            <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                '@type': 'BlogPosting',
                //headline: post.metadata.title,
                //datePublished: post.metadata.publishedAt,
                //dateModified: post.metadata.publishedAt,
                //description: post.metadata.summary,
                url: `${baseUrl}/stacks/${post.slug}`,
                author: {
                    '@type': 'Person',
                    name: 'Ryan Catullo',
                },
                }),
            }}
            />
            <h1 className="title font-semibold text-2xl tracking-tighter">
            {post.title}
            </h1>
            <div className="flex justify-between items-center mt-2 mb-8 text-sm">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {formatDate(post.created_at, false)}
            </p>
            </div>
            <article className="prose">
            <MarkdownRenderer content={post.content}/>
            </article>
        </section>
    )
}
