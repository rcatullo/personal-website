import supabase from 'app/utils/supabase/client'

export interface DeletePostResponse {
    success: boolean;
    error?: string;
}

export async function deletePost(postId: string): Promise<void> {
    const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

    if (error) {
        throw new Error(`Failed to delete post: ${error.message}`);
    }
}

export function validateDeleteRequest(id: string): void {
    if (!id?.trim()) {
        throw new Error('Post ID is required');
    }
    
    if (typeof id !== 'string' || id.length < 1) {
        throw new Error('Invalid post ID format');
    }
}