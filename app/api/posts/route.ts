import { NextResponse } from 'next/server';
import { slugify } from 'app/components/mdx'
import { getPostById } from 'app/utils/supabase/get-utils';
import { insertContent, insertPost, validate } from 'app/utils/supabase/post-utils';
import { updatePost, updateContent, formUpdateReq } from 'app/utils/supabase/put-utils';
import { deletePost, validateDeleteRequest } from 'app/utils/supabase/delete-utils';

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
    const { content, ...request } = await req.json();
    const updatedAt = new Date().toISOString();
    
    const currentPost = await getPostById(request.id);
    const updates = formUpdateReq(currentPost, request, updatedAt);
    const data = await updatePost(request.id, updates);
    
    if (content) {
      await updateContent(request.id, content);
    }
    
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
