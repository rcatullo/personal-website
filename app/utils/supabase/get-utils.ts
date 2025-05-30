import supabase from 'app/utils/supabase/client';

type Post = {
  "id": number;
  "title": string;
  "slug": string;
  "published": boolean;
  "published_at": string;
  "created_at": string;
  "updated_at": string;
}

export async function getPosts(): Promise<Post[]> {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (error || !posts) {
    throw new Error('Error fetching posts: ' + error);
  }

  return posts as Post[];
}

export async function getDrafts(): Promise<Post[]> {
  const { data: drafts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', false)
    .order('updated_at', { ascending: false });

  if (error || !drafts) {
    throw new Error('Error fetching drafts: ' + error);
  }

  return drafts as Post[];
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error || !post) {
    throw new Error('Error fetching post by slug: ' + error);
  }

  return post as Post;
}

export async function getContentById(id: number): Promise<string> {
  const { data, error } = await supabase
    .from('content')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    throw new Error('Error fetching content by ID: ' + error);
  }

  return data.markdown;
}

export async function getPostById(id: number): Promise<Post> {
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !post) {
    throw new Error('Error fetching post by ID: ' + error);
  }

  return post as Post;
}

export async function getDraft(id: number): Promise<{ title: string; content: string }> {
    if (!id) {
      throw new Error('ID is required');
    }

    const draft = await getPostById(id);
    
    if (!draft) {
      throw new Error(`Draft with ID ${id} not found`);
    }

    const content = await getContentById(id);
    
    if (!content) {
      throw new Error(`Content for draft ${id} not found`);
    }

    return { title: draft.title, content };
}