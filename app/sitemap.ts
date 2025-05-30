import { getPosts } from 'app/utils/supabase/get-utils'

export const baseUrl = 'https://rcatullo.com'

export default async function sitemap() {
  let blogs = (await getPosts()).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.created_at,
  }))

  let routes = ['', '/blog'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs]
}
