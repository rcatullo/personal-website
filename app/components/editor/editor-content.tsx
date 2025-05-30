import React from 'react';
import { MarkdownPreview } from './markdown-preview';
import { EditorTab } from './types';

interface EditorContentProps {
  activeTab: EditorTab;
  value: string;
  previewContent: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function EditorContent({ 
  activeTab, 
  value, 
  previewContent, 
  onChange 
}: EditorContentProps) {
  if (activeTab === 'preview') {
    return <MarkdownPreview content={previewContent} />;
  }

  return (
    <article className="prose">
    <textarea
      className="w-full min-h-[400px] bg-white text-black dark:bg-black dark:text-white font-mono text-sm resize-none focus:outline-none focus:ring-0 focus:border-transparent"
      value={value}
      onChange={onChange}
      placeholder="Write your markdown here..."
    />
    </article>
  );
}
