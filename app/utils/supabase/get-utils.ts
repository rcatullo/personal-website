import supabase from 'app/utils/supabase/client';

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

export async function getPostBySlug(slug: string) {
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

export async function getContentById(id: number) {
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
  if (id === null || id === undefined) {
    console.error('Error: ID is required');
    return { title: null, content: null, error: 'ID is required' };
  }

  try {
    const draft = await getPostById(id);
    
    if (!draft) {
      console.error(`Error: Draft with ID ${id} not found`);
      return { title: null, content: null, error: 'Draft not found' };
    }

    const content = await getContentById(id);
    
    if (!content) {
      console.error(`Error: Content for draft ${id} not found`);
      return { title: draft.title, content: null, error: 'Content not found' };
    }

    return { title: draft.title, content, error: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error fetching draft:', errorMessage);
    return { title: null, content: null, error: errorMessage };
  }
}