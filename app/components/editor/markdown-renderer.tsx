'use client';

import React, { useEffect } from 'react';
import { CustomMDX } from 'app/components/mdx'

const katexCSS = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" integrity="sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+" crossOrigin="anonymous"/>
`;

interface MarkdownRendererProps {
  content: string;
}

  /**
   * A React component that renders a markdown string using `next-mdx-remote` on the client.
   *
   * This component takes a single prop, `content`, which is a markdown string.
   * It renders the markdown as HTML, with math support using KaTeX.
   *
   * The component also handles errors when rendering the markdown,
   * and displays a loading message while the markdown is being rendered.
   *
   * The component uses the `CustomMDX` function from the `app/components/mdx` module
   * to render the markdown with custom components and math support.
   *
   * @param {string} content - The markdown string to render.
   * @return {React.ReactElement} The rendered markdown as HTML.
   */
export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [renderedContent, setRenderedContent] = React.useState<React.ReactNode>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const compileContent = async () => {
      try {
        const compiledContent = await CustomMDX(content);
        if (isMounted) {
          setRenderedContent(compiledContent);
          setError(null);
        }
      } catch (err) {
        handleCompileError(err, isMounted);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    compileContent();

    return () => {
      isMounted = false;
    };
  }, [content]);

  const handleCompileError = (err: any, isMounted: boolean) => {
    console.error('Error rendering markdown:', err);
    if (isMounted) {
      setError('Failed to render markdown preview');
      setRenderedContent(<div className="text-red-500">Error rendering markdown preview</div>);
    }
  };

  if (isLoading) {
    return <div className="text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return renderedContent;
}
