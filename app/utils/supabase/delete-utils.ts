import supabase from 'app/utils/supabase/client'

export async function deletePost(id: number) {
    const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

    if (error) {
        throw new Error(`Failed to delete post: ${error.message}`);
    }
}

export function validateDeleteRequest(id: number) {
    if (!id && id !== 0) {
        throw new Error('Post ID is required');
    }
}
