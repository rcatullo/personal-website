'use client';
import React, { useEffect, useState, FormEvent } from 'react';
import { MdxEditor } from './editor/mdx-editor';
import { getDraft } from 'app/lib/supabase';
import Actions from './post-actions';
import { useRouter } from "next/navigation";


export function PostForm({ params }: { params?: { id: number } }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [id, setId] = useState(params?.id);

  useEffect(() => {
    if (id) {
      getDraft(id).then(res => {
        setTitle(res.title ? res.title : '');
        setContent(res.content ? res.content : '');
      })
    }
  }, [id]);

  const handlePublish = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handlePublish}>
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
        <Actions params={{ id, title, content, draft: true }} setId={setId} />
    </form>
  );
}
