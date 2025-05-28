import { notFound } from 'next/navigation'
import { baseUrl } from 'app/sitemap'
import { getPostBySlug } from 'app/lib/supabase'
import supabase from 'app/lib/supabase'
import Post from 'app/components/post'

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

export default async function Page({ params }) {

  return (
    <Post slug={ params.slug } />
  )
}