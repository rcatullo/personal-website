import React from 'react';
import { MarkdownRenderer } from './MarkdownRenderer';

interface MarkdownPreviewProps {
  content: string;
  className?: string;
}

export const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({
  content,
  className = ''
}) => (
  <div className={`min-h-[300px] ${className}`}>
    <MarkdownRenderer content={content} />
  </div>
);
