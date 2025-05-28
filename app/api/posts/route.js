import { NextResponse } from 'next/server';
import { slugify } from 'app/components/mdx'
import supabase from 'app/lib/supabase';

export async function POST(req) {
  try {
    const { title, content } = await req.json();
    const slug = slugify(title);
    const { data, error } = await supabase
      .from('posts')
      .insert({ title, content, slug, published: true })
      .select();

    if (error) throw error;

    return NextResponse.json({ success: true, post: data[0] });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message || String(err) },
      { status: 500 }
    );
  }
}
