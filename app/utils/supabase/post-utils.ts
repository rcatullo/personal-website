import supabase from 'app/utils/supabase/client'
import { Post } from './types'

export async function insertPost(post: Post): Promise<Post> {
  const { id, ...postData } = post;
  const { data, error } = await supabase
    .from('posts')
    .insert(postData)
    .select()
    .single();

  if (error) throw new Error(`Failed to create post: ${error.message}`);
  return data;
}

export async function insertContent(id: number, content: string): Promise<void> {
  const { error } = await supabase
    .from('content')
    .insert({ id, markdown: content });

  if (error) throw new Error(`Failed to save post content: ${error.message}`);
}

export function validate({ title, published }: Post): void {
  if (!title?.trim()) throw new Error('Title is required');
  if (typeof published !== 'boolean') throw new Error('Published status must be a boolean');
}