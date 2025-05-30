export type EditorTab = 'edit' | 'preview';
export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export interface MdxEditorProps {
  value: string;
  onChange: (newVal: string) => void;
  title: string;
  postId?: number;
  onSaveSuccess?: (id: number) => void;
}
