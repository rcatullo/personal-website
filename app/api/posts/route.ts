import { NextResponse } from 'next/server';
import { slugify } from 'app/components/mdx'
import supabase from 'app/lib/supabase';

export async function POST(req) {
  try {
    const { title, content } = await req.json();
    const slug = slugify(title);
    const { data: postData, error: postError } = await supabase.from('posts')
      .insert({ title, slug, published: true }).select().single();

    if (postError) throw postError;

    const { data: contentData, error: contentError } = await supabase.from('content')
      .insert({ id: postData.id, markdown: content }).select().single();

    if (contentError) throw contentError;

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message || String(err) },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { title, content, id } = await req.json();
    const slug = slugify(title);
    const now = new Date().toISOString();
    
    if (id) {
      // Update existing draft
      const { data: postData, error: postError } = await supabase.from('posts')
        .update({
          created_at: now
        }).eq('id', id).select().single();
      
      if (postError) throw postError;
      
      const { data: contentData, error: contentError } = await supabase.from('content')
        .update({markdown: content}).eq('id', id).select().single();

      if (contentError) throw contentError;
      return NextResponse.json({ success: true, data: postData });
    } else {
      // Create new draft
      const { data: postData, error: postError } = await supabase.from('posts')
        .insert([
          {
            title,
            slug,
            published: false,
            created_at: now
          }
        ]).select().single();

      if (postError) throw postError;

      const { data: contentData, error: contentError } = await supabase.from('content')
        .insert({ id: postData.id, markdown: content }).select().single();

      if (contentError) throw contentError;
      return NextResponse.json({ success: true, data: postData });
    }
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message || String(err) },
      { status: 500 }
    );
  }
}