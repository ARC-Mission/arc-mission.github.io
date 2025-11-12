import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import type { Project } from '../types';

interface ProjectPageProps {
  project: Project;
  onBack: () => void;
}

const statusColor = (status: 'Active' | 'Proposed' | 'Completed') => {
  switch (status) {
    case 'Active': return 'bg-green-900/50 text-green-300 border-green-700/50';
    case 'Proposed': return 'bg-yellow-900/50 text-yellow-300 border-yellow-700/50';
    case 'Completed': return 'bg-blue-900/50 text-blue-300 border-blue-700/50';
    default: return 'bg-neutral-700 text-neutral-300';
  }
};

const ProjectPage: React.FC<ProjectPageProps> = ({ project, onBack }) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        setLoading(true);
        const response = await fetch(project.markdownFile);
        if (!response.ok) {
          throw new Error('Failed to load project content');
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
  }, [project.markdownFile]);

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
          Back to Projects
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
        Back to Projects
      </button>

      <article className="max-w-3xl mx-auto">
        {project.imageUrl && (
          <div className="relative mb-8">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>
        )}

        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <h1 className="text-5xl md:text-6xl font-medium text-white">{project.title}</h1>
            <span className={`text-sm font-mono px-3 py-1 rounded-full border ${statusColor(project.status)}`}>
              {project.status}
            </span>
          </div>

          {project.focusAreas && project.focusAreas.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.focusAreas.map(area => (
                <span key={area} className="text-sm bg-neutral-800 text-neutral-300 px-3 py-1 rounded">
                  {area}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-invert prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {content}
          </ReactMarkdown>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800">
          <h3 className="text-2xl font-medium text-white mb-4">Interested in Contributing?</h3>
          <p className="text-neutral-300 mb-6">
            We're always looking for collaborators to help bring this project to life.
            Whether you're interested in development, testing, documentation, or partnerships,
            we'd love to hear from you.
          </p>
          <button
            onClick={onBack}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded transition-colors font-medium"
          >
            Back to Projects
          </button>
        </div>
      </article>
    </div>
  );
};

export default ProjectPage;
