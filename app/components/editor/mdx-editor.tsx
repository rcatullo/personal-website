'use client';
import React, { useState, useCallback } from 'react';
import { EditorTabs } from './editor-tabs';
import { MarkdownPreview } from './markdown-preview';

type EditorTab = 'edit' | 'preview';

interface MdxEditorProps {
  value: string;
  onChange: (newVal: string) => void;
}

export function MdxEditor({ value, onChange }: MdxEditorProps) {
  const [activeTab, setActiveTab] = useState<EditorTab>('edit');
  const [previewContent, setPreviewContent] = useState(value);

  const handleEditorChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setPreviewContent(newValue);
    onChange(newValue);
  }, [onChange]);

  const handleTabChange = useCallback((tab: EditorTab) => {
    setActiveTab(tab);
  }, []);

  return (
    <>
      {activeTab === 'edit' ? (
          <textarea
            value={value}
            onChange={handleEditorChange}
            className="bg-transparent min-w-full min-h-[300px] font-mono text-sm text-gray-900 dark:text-gray-100 border-0 focus:ring-0 focus:outline-none resize-none"
            placeholder="Start writing your markdown here..."
            spellCheck="false"
          />
        ) : (
          <MarkdownPreview content={previewContent} />
        )}
      <div className="border-t border-gray-200 dark:border-gray-700">
        <EditorTabs 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
        />
      </div>
    </>
  );
}
