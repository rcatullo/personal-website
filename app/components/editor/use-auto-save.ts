import { useState, useCallback } from 'react';
import { save } from 'app/utils/post-actions';
import { SaveStatus } from './types';

export function useAutoSave(title: string, postId?: number, onSaveSuccess?: (id: number) => void) {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');

  const handleSave = useCallback(async (content: string) => {
    if (!title.trim() || !content.trim()) return;

    setSaveStatus('saving');
    
    try {
      const id = await save(title, content, postId);
      if (id) {
        setSaveStatus('saved');
        onSaveSuccess?.(id);
        
        setTimeout(() => {
          setSaveStatus('idle');
        }, 2000);
        
        return id;
      }
      throw new Error('Save returned no ID');
    } catch (error) {
      setSaveStatus('error');
      throw error;
    }
  }, [title, postId, onSaveSuccess]);

  return { saveStatus, handleSave };
}
