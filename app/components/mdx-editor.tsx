'use client';
import React from 'react';
import { mdxPlugins } from '../lib/mdx-plugins';
import { MDXEditor } from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import 'app/components/ui/mdx-editor.css';

interface MdxEditorProps {
  value: string;
  onChange: (newVal: string) => void;
}

export function MdxEditor({ value, onChange }: MdxEditorProps) {
  return (
    <div>
      <MDXEditor 
        markdown={value}
        onChange={onChange}
        contentEditableClassName='mdxeditor-root-content'
        placeholder='[Content]'
        plugins={mdxPlugins}
      />
    </div>
  );
}
