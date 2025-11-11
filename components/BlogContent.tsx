import React from 'react';
import type { BlogPost } from '../types';
import { ArrowRightIcon } from './Icons';

interface BlogContentProps {
  posts: BlogPost[];
}

const BlogContent: React.FC<BlogContentProps> = ({ posts }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-medium text-white mb-12">Blog</h1>
        <div className="space-y-12">
          {posts.map((post) => (
            <div key={post.id} className="group">
              <p className="text-sm text-neutral-400 mb-1">{post.date} &bull; {post.author}</p>
              <h2 className="text-2xl font-medium text-white mb-2">{post.title}</h2>
              <p className="text-neutral-300 mb-4 leading-relaxed">{post.summary}</p>
              <a href="#" className="inline-flex items-center text-white font-medium group-hover:text-blue-400 transition-colors">
                Read more
                <ArrowRightIcon className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogContent;
