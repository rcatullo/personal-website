'use client';
import React, { useState, useCallback } from 'react';
import { EditorTabs } from './editor-tabs';
import { EditorContent } from './editor-content';
import { useDebounce } from 'app/hooks/use-debounce';
import { MdxEditorProps, EditorTab } from './types';
import { useAutoSave } from './use-auto-save';

export function MdxEditor({ value, onChange, title, postId, onSaveSuccess }: MdxEditorProps) {
  const [activeTab, setActiveTab] = useState<EditorTab>('edit');
  const [previewContent, setPreviewContent] = useState(value);
  
  const { saveStatus, handleSave } = useAutoSave(title, postId, onSaveSuccess);
  
  const debouncedSave = useDebounce(async (content: string) => {
    await handleSave(content);
  }, 1000);

  const handleEditorChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setPreviewContent(newValue);
    onChange(newValue);
    debouncedSave(newValue);
  }, [onChange, debouncedSave]);

  const handleTabChange = useCallback((tab: EditorTab) => {
    setActiveTab(tab);
  }, []);

  return (
    <div className="flex flex-col h-full">
      
      <div className="flex-1 overflow-auto">
        <EditorContent 
          activeTab={activeTab} 
          value={value} 
          onChange={handleEditorChange} 
          previewContent={previewContent}
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <EditorTabs activeTab={activeTab} onTabChange={handleTabChange} />
        <StatusIndicator status={saveStatus} />
      </div>
    </div>
  );
}

function StatusIndicator({ status }: { status: string }) {
  const statusText = {
    saving: 'Saving...',
    saved: 'Saved',
    error: 'Error saving',
    idle: ''
  }[status];

  if (!statusText) return null;
  
  return (
    <div className="text-sm text-gray-500">
      {statusText}
    </div>
  );
}
