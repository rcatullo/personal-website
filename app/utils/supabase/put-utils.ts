import supabase from 'app/utils/supabase/client';
import { slugify } from 'app/components/mdx';

interface UpdatePostInput {
    id: string;
    title?: string;
    published?: boolean;
    [key: string]: any;
}

interface PostData {
    id: string;
    title: string;
    slug: string;
    published: boolean;
    published_at?: string | null;
    updated_at?: string;
}

export async function updatePost(postId: string, updates: Partial<PostData>): Promise<PostData> {
    const { data, error } = await supabase
        .from('posts')
        .update(updates)
        .eq('id', postId)
        .select()
        .single();

    if (error) {
        throw new Error(`Failed to update post: ${error.message}`);
    }
    return data;
}

export async function updateContent(postId: string, content: string): Promise<void> {
    const { error } = await supabase
        .from('content')
        .update({ markdown: content })
        .eq('id', postId);

    if (error) {
        throw new Error(`Failed to update post content: ${error.message}`);
    }
}

export function formUpdateReq(
    currentData: PostData,
    request: UpdatePostInput,
    updatedAt: string
): Partial<PostData> {
    const updates: Partial<PostData> = { ...request, updated_at: updatedAt };

    // Update published_at if post is being published for the first time
    if (request.published && !currentData.published) {
        updates.published_at = updatedAt;
    }

    // Update slug if title has changed
    if (request.title && request.title !== currentData.title) {
        updates.slug = slugify(request.title);
    }

    return updates;
}

