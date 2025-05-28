import { NextResponse } from 'next/server';
import { slugify } from 'app/components/mdx'
import supabase from 'app/lib/supabase';

export async function POST(req) {
  try {
    const { title, content, published } = await req.json();
    const slug = slugify(title);
    const { data: post, error } = await supabase.from('posts')
      .insert({ title, slug, published }).select().single();

    if (error) throw error;

    const { error: contentError } = await supabase.from('content')
      .insert({ id: post.id, markdown: content }).select().single();

    if (contentError) throw contentError;

    return NextResponse.json({ success: true, data: post });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message || String(err) },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { content, ...request } = await req.json();
    const updated_at = new Date().toISOString();
    const { data, error } = await supabase.from('posts')
      .select('*').eq('id', request.id).single();
    
    if (error) throw error;

    let post = {...request, updated_at};

    if (request.published && data.published === false) {
      post = {...post, published_at: updated_at};
    }

    if (request.title && request.title !== data.title) {
      post = {...post, slug: slugify(request.title)};
    }

    const { error: updateErr } = await supabase.from('posts')
      .update(post)
      .eq('id', request.id);
    
    if (updateErr) throw updateErr;

    if (content) {
      const { error: contentError } = await supabase.from('content')
        .update({ markdown: content })
        .eq('id', request.id);
      
      if (contentError) throw contentError;
    }
    
    return NextResponse.json({ success: true, data: post });
    
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message || String(err) },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    const { error } = await supabase.from('posts')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return NextResponse.json({ success: true });
  } catch(err) {
    return NextResponse.json(
      { success: false, error: err.message || String(err) },
      { status: 500 }
    )
  }
}