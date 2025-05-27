'use client';

import React, { useEffect } from 'react';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { generateMacros } from 'app/stacks/katex-utils';
import * as mdxComponents from '../mdx';

const katexCSS = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" integrity="sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+" crossOrigin="anonymous"/>
`;

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  const [renderedContent, setRenderedContent] = React.useState<React.ReactNode>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const renderMarkdown = async () => {
      try {
        const macros = await generateMacros();
        const options = {
          macros,
          trust: true,
          strict: false,
          throwOnError: false,
          globalGroup: true,
        };

        const { content: compiledContent } = await compileMDX({
          source: content + katexCSS,
          options: {
            parseFrontmatter: false,
            mdxOptions: {
              remarkPlugins: [remarkMath],
              rehypePlugins: [[rehypeKatex, options]],
            },
          },
          components: mdxComponents.components,
        });

        if (isMounted) {
          setRenderedContent(compiledContent);
          setError(null);
        }
      } catch (err) {
        console.error('Error rendering markdown:', err);
        if (isMounted) {
          setError('Failed to render markdown preview');
          setRenderedContent(<div className="text-red-500">Error rendering markdown preview</div>);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    renderMarkdown();

    return () => {
      isMounted = false;
    };
  }, [content]);

  if (isLoading) {
    return <div className="p-4 text-gray-500">Loading preview...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return renderedContent;
}
