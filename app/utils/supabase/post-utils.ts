import supabase from 'app/utils/supabase/client'

interface PostInput {
  title: string;
  content: string;
  published: boolean;
}

interface PostData {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

export async function insertPost(postData: Omit<PostData, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('posts')
    .insert(postData)
    .select()
    .single();

  if (error) throw new Error(`Failed to create post: ${error.message}`);
  return data;
}

export async function insertContent(postId: string, content: string) {
  const { error } = await supabase
    .from('content')
    .insert({ id: postId, markdown: content });

  if (error) throw new Error(`Failed to save post content: ${error.message}`);
}

export function validate({ title, content, published }: PostInput): void {
  if (!title?.trim()) throw new Error('Title is required');
  if (typeof published !== 'boolean') throw new Error('Published status must be a boolean');
}