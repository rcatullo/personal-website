import supabase from 'app/utils/supabase/client'
import { getPostBySlug, getContentById } from 'app/utils/supabase/get-utils'
import { formatDate } from 'app/utils/utils'
import { baseUrl } from 'app/sitemap'
import { CustomMDX } from 'app/components/mdx'
import Actions from 'app/components/drafting/actions'

// Generate static params at build time
export async function generateStaticParams() {
  const { data: posts } = await supabase
    .from('posts')
    .select('slug')
    .eq('published', true)

  return posts?.map(({ slug }) => ({
    slug,
  })) || []
}

/*export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug)
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
}*/

export const revalidate = 0;

export default async function Page({ params }) {
  
  const { slug } = await params;
  let post;
  let mdx;
  let renderedMdx;
  try {
    post = await getPostBySlug(slug);
    mdx = await getContentById(post.id);
    renderedMdx = await CustomMDX(mdx);
  } catch (err) {
    console.error(err);
    return <p className="text-neutral-600 dark:text-neutral-400">Not found.</p>
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
                {formatDate(post.published_at, false)}
            </p>
            </div>
            <article className="prose">
                { renderedMdx }
            </article>
            <Actions params={{ id: post.id, draft: false }} />
        </section>
    )
}