'use client';
import React, { useState, FormEvent } from 'react';
import { MdxEditor } from './editor/mdx-editor';

async function handleSubmit(e: FormEvent, title: string, content: string) {
  e.preventDefault();
  await fetch('/api/posts', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ title, mdx: content })
  });
  // reset or navigate...
}

export function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <form onSubmit={(e) => handleSubmit(e, title, content)} className="space-y-6">
        <h1 className="title font-semibold text-2xl tracking-tighter">
        <input
          id="title"
          className="focus:outline-none placeholder-black"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="[Title]"
          required
        />
        </h1>
        <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
        </div>
        <article className="prose">
        <MdxEditor value={content} onChange={setContent} />
        </article>
        <button type="submit" className="px-4 py-2 bg-black text-white rounded">
        Publish
      </button>
    </form>
  );
}
