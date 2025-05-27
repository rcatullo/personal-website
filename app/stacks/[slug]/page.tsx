import { notFound } from 'next/navigation'
import { formatDate } from 'app/stacks/utils'
import { baseUrl } from 'app/sitemap'
import { CustomMDX } from 'app/components/mdx'
import { getSupabasePostBySlug } from 'app/lib/supabase'

// Generate static params at build time
export async function generateStaticParams() {
  const { supabase } = await import('app/lib/supabase')
  const { data: posts } = await supabase
    .from('posts')
    .select('slug')
    .eq('published', true)

  return posts?.map(({ slug }) => ({
    slug,
  })) || []
}

export async function generateMetadata({ params }) {
  const post = await getSupabasePostBySlug(params.slug)
  if (!post) {
    notFound()
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
  } = post.metadata

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/stacks/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function BlogPost({ params }) {
  const post = await getSupabasePostBySlug(params.slug)
  if (!post) {
    notFound()
  }
  
  let content: React.ReactElement | null = null
  try {
    content = await CustomMDX(post.content)
  } catch (error) {
    console.error('Error rendering MDX content:', error)
    notFound()
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            url: `${baseUrl}/stacks/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'My Portfolio',
            },
          }),
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
      </div>
      <article className="prose">
        {content}
      </article>
    </section>
  )
}