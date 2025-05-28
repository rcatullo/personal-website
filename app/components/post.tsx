import supabase from 'app/lib/supabase'
import { getPostBySlug, getContentById } from 'app/lib/supabase'
import { formatDate } from 'app/stacks/utils'
import { baseUrl } from 'app/sitemap';
import { MarkdownRenderer } from './editor/markdown-renderer';
import { CustomMDX } from './mdx';

type Metadata = {
    id: number;
    title: string;
    slug: string;
    created_at: string;
    published: boolean;
}

export default async function Post({ slug }: { slug: string }) {

    const post = await getPostBySlug(slug);
    const mdx = await getContentById(post.id);

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
                <CustomMDX post={mdx}/>
            </article>
        </section>
    )
}
