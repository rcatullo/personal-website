import { NextResponse } from 'next/server';
import { slugify } from 'app/components/mdx'
import { getContentById, getPostById } from 'app/utils/supabase/get-utils';
import { insertContent, insertPost, validate } from 'app/utils/supabase/post-utils';
import { updatePost, updateContent } from 'app/utils/supabase/put-utils';
import { deletePost, validateDeleteRequest } from 'app/utils/supabase/delete-utils';
import { Post } from 'app/utils/supabase/types';

export async function POST(req: Request) {
  try {
    const input = await req.json();
    validate(input);
    
    const { title, content, published } = input;
    const slug = slugify(title);
    const post = await insertPost({ title, slug, published });
    await insertContent(post.id, content);

    return NextResponse.json(
      { success: true, data: post },
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
    const updated_at = new Date().toISOString();
    
    const post = await getPostById(id);
    let published_at = post.published_at;
    if (published && !post.published) {
        published_at = updated_at;
    }
    const slug = slugify(title);
    const update: Post = { id, title, slug, published, updated_at, published_at, created_at: post.created_at }
    const data = await updatePost(id, update);
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
    const { id } = await req.json();

    const post = await getPostById(id);
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
