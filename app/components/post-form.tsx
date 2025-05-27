'use client';
import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { MdxEditor } from './editor/mdx-editor';


export function PostForm() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return;
    
    try {
      await fetch('/api/posts', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ title, content })
      });
      router.push('/stacks');
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleFormSubmit}>
        <h1 className="title font-semibold text-2xl tracking-tighter">
        <input
          id="title"
          className="focus:outline-none placeholder-black dark:placeholder-white bg-transparent"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="[Title]"
        />
        </h1>
        <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
        </div>
        <MdxEditor value={content} onChange={setContent} />
        <button 
          type="button" 
          onClick={handleSubmit}
          className="px-4 py-2 mt-6 bg-black text-white dark:bg-white dark:text-black rounded hover:opacity-80 transition-opacity"
        >
          Publish
        </button>
    </form>
  );
}
