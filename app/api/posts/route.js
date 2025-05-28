import { NextResponse } from 'next/server';
import { slugify } from 'app/components/mdx'
import supabase from 'app/lib/supabase';

export async function POST(req) {
  try {
    const { title, content } = await req.json();
    const slug = slugify(title);
    const { data, error } = await supabase
      .from('posts')
      .insert({ title, slug, published: true })
      .select()
      .single();

    if (error) throw error;

    const { data: contentData, error: contentError } = await supabase
    .from('content')
    .insert({ id: data.id, markdown: content })
    .select()
    .single();

    if (contentError) throw contentError;

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message || String(err) },
      { status: 500 }
    );
  }
}
