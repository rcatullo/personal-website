import { useState, useCallback } from 'react';
import { save } from 'app/utils/post-actions';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export function useAutoSave(
  title: string,
  postId?: number,
  onSaveSuccess?: (id: number) => void
): {
  saveStatus: SaveStatus;
  handleSave: (content: string) => Promise<void>;
} {
  const [status, setStatus] = useState<SaveStatus>('idle');

  const handleSave = useCallback(
    async (content: string) => {
      if (!title.trim() || !content.trim()) return;

      setStatus('saving');

      try {
        const id = await save(title, content, postId);
        if (id) {
          setStatus('saved');
          onSaveSuccess?.(id);
          setTimeout(() => setStatus('idle'), 2000);
        } else {
          throw new Error('Save returned no ID');
        }
      } catch (error) {
        setStatus('error');
        throw error;
      }
    },
    [title, postId, onSaveSuccess]
  );

  return { saveStatus: status, handleSave };
}
