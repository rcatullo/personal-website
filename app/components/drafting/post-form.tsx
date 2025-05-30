'use client';
import React, { useCallback, useEffect, useState, FormEvent } from 'react';
import { MdxEditor } from '../editor/mdx-editor';
import { getDraft } from 'app/lib/supabase';
import Actions from './actions';
import { useRouter } from "next/navigation";


interface PostFormProps {
  params?: { id: number };
}

export function PostForm({ params }: PostFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [id, setId] = useState<number | undefined>(params?.id);
  const router = useRouter();
  
  const handleContentChange = useCallback((newContent: string) => {
    setContent(newContent);
  }, []);
  
  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
  }, []);

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
          onChange={handleTitleChange}
          placeholder="[Title]"
        />
        </h1>
        <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
        </div>
        <MdxEditor 
          value={content} 
          onChange={handleContentChange}
          title={title}
          postId={id}
          onSaveSuccess={(newId) => {
            if (!id && newId) {
              setId(newId);
              router.push(`/stacks/new-post/${newId}`);
            }
          }}
        />
        <Actions params={{ id, title, content, draft: true }} setId={setId} />
    </form>
  );
}
