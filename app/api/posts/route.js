import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function slugify(title) {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
}

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
