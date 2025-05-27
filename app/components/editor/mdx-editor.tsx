'use client';
import React, { useState, useCallback } from 'react';
import { EditorTabs } from './EditorTabs';
import { MarkdownPreview } from './MarkdownPreview';

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
    <div className="bg-white dark:bg-gray-900 flex flex-col h-full">
      <div className="flex-1 min-h-[300px] mx-0">
        {activeTab === 'edit' ? (
          <textarea
            value={value}
            onChange={handleEditorChange}
            className="w-full h-full min-h-[300px] font-mono text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 border-0 focus:ring-0 focus:outline-none resize-none"
            placeholder="Start writing your markdown here..."
            spellCheck="false"
          />
        ) : (
          <MarkdownPreview content={previewContent} />
        )}
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700">
        <EditorTabs 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
        />
      </div>
    </div>
  );
}
