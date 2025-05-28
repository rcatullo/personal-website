import { getPosts } from 'app/lib/supabase'

export const baseUrl = 'https://rcatullo.com'

export default async function sitemap() {
  let blogs = (await getPosts()).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let routes = ['', '/blog'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs]
}
