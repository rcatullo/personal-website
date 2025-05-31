import supabase from 'app/utils/supabase/client';
import { Post } from './types'

export async function updatePost(id: number, update: Post): Promise<Post> {
    
    const { data, error } = await supabase
        .from('posts')
        .update(update)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        throw new Error(`Failed to update post: ${error.message}`);
    }
    return data;
}

export async function updateContent(id: number, content: string): Promise<void> {
    const { error } = await supabase
        .from('content')
        .update({ markdown: content })
        .eq('id', id);

    if (error) {
        throw new Error(`Failed to update post content: ${error.message}`);
    }
}
