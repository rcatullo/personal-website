import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export { supabase };

export async function getSupabasePosts() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  return posts.map(post => ({
    ...post,
    metadata: {
      title: post.title,
      publishedAt: post.created_at,
      summary: post.summary || '',
      image: post.image || null,
    },
    content: post.content
  }));
}

export async function getSupabasePostBySlug(slug) {
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error || !post) {
    return null;
  }

  return {
    ...post,
    metadata: {
      title: post.title,
      publishedAt: post.created_at,
      summary: post.summary || '',
      image: post.image || null,
    },
    content: post.content
  };
}
