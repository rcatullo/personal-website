import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default supabase;

export async function getPosts(drafts: boolean = false) {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', !drafts)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  return posts;
}

export async function getPostBySlug(slug) {
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error || !post) {
    return null;
  }

  return post;
}

export async function getContentById(id) {
  const { data, error } = await supabase
    .from('content')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return null;
  }

  return data.markdown;
}

export async function getPostById(id: number) {
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !post) {
    return null;
  }

  return post;
}

export async function getDraft(id: number) {
  try {
    const draft = await getPostById(id);
    const title = draft.title;
    const content = await getContentById(id);
    return { title, content };
  } catch (error) {
    console.error('Error fetching draft:', error);
    return { title: null, content: null };
  }
}