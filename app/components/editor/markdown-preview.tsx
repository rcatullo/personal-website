import React from 'react';
import { MarkdownRenderer } from './markdown-renderer';

interface MarkdownPreviewProps {
  content: string;
  className?: string;
}

export const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({
  content,
}) => (
  <article className="prose">
    <div className={`min-h-[300px]`}>
      <MarkdownRenderer content={content} />
    </div>
  </article>
);
