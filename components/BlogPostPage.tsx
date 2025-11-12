import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import type { BlogPost } from '../types';

interface BlogPostPageProps {
  post: BlogPost;
  onBack: () => void;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, onBack }) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        setLoading(true);
        const response = await fetch(post.markdownFile);
        if (!response.ok) {
          throw new Error('Failed to load blog post content');
        }
        let text = await response.text();
        // Remove frontmatter (YAML between --- delimiters)
        text = text.replace(/^---\n[\s\S]*?\n---\n/, '');
        setContent(text);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMarkdown();
  }, [post.markdownFile]);

  if (loading) {
    return <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-12 text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-12">
        <button 
          onClick={onBack}
          className="mb-6 text-neutral-400 hover:text-white flex items-center transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </button>
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-12">
      <button
        onClick={onBack}
        className="mb-6 text-neutral-400 hover:text-white flex items-center transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Blog
      </button>

      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-5xl md:text-6xl font-medium text-white mb-4">{post.title}</h1>
          <p className="text-sm text-neutral-400">{post.date} &bull; {post.author}</p>
        </header>

        <div className="prose prose-invert prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
};

export default BlogPostPage;

