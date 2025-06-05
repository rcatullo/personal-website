import { NextResponse } from 'next/server';
import { slugify } from 'app/components/mdx'
import { getContentById, getPostById } from 'app/utils/supabase/get-utils';
import { insertContent, insertPost, validate } from 'app/utils/supabase/post-utils';
import { updatePost, updateContent } from 'app/utils/supabase/put-utils';
import { deletePost, validateDeleteRequest } from 'app/utils/supabase/delete-utils';
import { Post, fullPost } from 'app/utils/supabase/types';

export async function POST(req: Request) {
  try {
    const input = await req.json();
    validate(input);
    
    const { title, content, published } = input;
    const post: Post = await fullPost({ partial: { title, published } });
    const data = await insertPost(post);
    await insertContent(data.id, content);

    return NextResponse.json(
      { success: true, data },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    console.error('Error creating post:', error);
    
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: error instanceof Error && error.message.includes('Failed to create') ? 400 : 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { id, title, content, published } = await req.json();
    const update: Post = await fullPost({ partial: { id, title, published } });
    const data = await updatePost(update);
    await updateContent(id, content);
    
    return NextResponse.json(
      { success: true, data},
      { status: 200 }
    );
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    console.error('Error updating post:', error);
    
    const statusCode = error instanceof Error && error.message.includes('Failed to fetch post') 
      ? 404 
      : error instanceof Error && error.message.includes('Failed to update') 
        ? 400 
        : 500;
    
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: statusCode }
    );
  }
}


export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    
    validateDeleteRequest(id);
    
    await deletePost(id);
    
    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    console.error('Error deleting post:', error);
    
    const statusCode = errorMessage.includes('not found') ? 404 : 500;
    
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: statusCode }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get('id'));
    
    if (!id || isNaN(id)) {
      throw new Error('Post ID is required and must be a number');
    }

    const post = await fullPost({ partial: { id } });
    const content = await getContentById(id);

    return NextResponse.json(
      { success: true, data: { ...post, content } },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    console.error('Error fetching post:', error);
    
    const statusCode = error instanceof Error && error.message.includes('not found') ? 404 : 500;
    
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: statusCode }
    );
  }
}
