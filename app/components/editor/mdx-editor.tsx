'use client';
import React, { useState, useCallback } from 'react';
import { EditorTabs } from './editor-tabs';
import { EditorContent } from './editor-content';
import { useDebounce } from 'app/hooks/use-debounce';
import { useAutoSave } from './use-auto-save';
import StatusIndicator from '../ui/status-indicator';

type EditorTab = 'edit' | 'preview';

interface MdxEditorProps {
  value: string;
  onChange: (newVal: string) => void;
  title: string;
  postId?: number;
  onSaveSuccess?: (id: number) => void;
}

  /**
   * An editor component for MDX content, with tabs for switching between edit
   * and preview modes.
   *
   * @param {string} value - The initial value of the editor
   * @param {(newVal: string) => void} onChange - A callback to call when the
   *   value of the editor changes
   * @param {string} title - The title of the post being edited
   * @param {number} postId - The ID of the post being edited, if it already exists
   * @param {(id: number) => void} onSaveSuccess - A callback to call when the
   *   post is successfully saved
   */
export function MdxEditor({ value, onChange, title, postId, onSaveSuccess }: MdxEditorProps) {
  const [activeTab, setActiveTab] = useState<EditorTab>('edit');
  const [previewContent, setPreviewContent] = useState(value);
  
  const { saveStatus, handleSave } = useAutoSave(title, postId, onSaveSuccess);
  
  const debouncedSave = useDebounce(async (content: string) => {
    await handleSave(content);
  }, 1000);

  React.useEffect(() => {
    setPreviewContent(value);
  }, [value]);

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
