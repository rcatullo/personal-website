'use client';
import React, { useEffect, useState, FormEvent } from 'react';
import { MdxEditor } from './editor/mdx-editor';
import { getDraft } from 'app/lib/supabase';
import { publish, save } from 'app/utils/post-actions';
import { useRouter } from "next/navigation";
export function PostForm({ draftId }: { draftId?: number }) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [id, setId] = useState(draftId);

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
        <button 
          type="button" 
          onClick={async () => {await publish(title, content, id); router.push('/stacks');}}
          className="px-4 py-2 mt-6 bg-black text-white dark:bg-white dark:text-black rounded hover:opacity-80 transition-opacity"
        >
          Publish
        </button>
        <button 
          type="button" 
          onClick={async () => {const newId = await save(title, content, id); setId(newId)}}
          className="px-4 py-2 mt-6 bg-white text-black dark:bg-black dark:text-white rounded hover:opacity-80 transition-opacity"
        >
          Save Draft
        </button>
    </form>
  );
}
