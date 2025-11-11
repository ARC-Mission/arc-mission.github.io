import React from 'react';
import type { Project } from '../types';
import { ArrowRightIcon } from './Icons';

const statusColor = (status: 'Active' | 'Proposed' | 'Completed') => {
    switch (status) {
        case 'Active': return 'bg-green-900/50 text-green-300 border-green-700/50';
        case 'Proposed': return 'bg-yellow-900/50 text-yellow-300 border-yellow-700/50';
        case 'Completed': return 'bg-blue-900/50 text-blue-300 border-blue-700/50';
        default: return 'bg-neutral-700 text-neutral-300';
    }
};

interface ProjectsContentProps {
  projects: Project[];
}

const ProjectsContent: React.FC<ProjectsContentProps> = ({ projects }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-medium text-white mb-4 text-center">Our Projects</h1>
        <p className="text-lg text-neutral-300 text-center max-w-3xl mx-auto mb-16">
          Exploring and prototyping civilian and dual-use technical solutions inspired by critical technology themes.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-neutral-900/50 border border-neutral-800 rounded-lg flex flex-col group transition-all hover:border-neutral-700 hover:bg-neutral-900 overflow-hidden">
              <img src={project.imageUrl} alt={`Illustration for ${project.title}`} className="w-full h-48 object-cover" />
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-medium text-white">{project.title}</h2>
                  <span className={`text-xs font-mono px-2 py-1 rounded-full border ${statusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-neutral-400 mb-4 flex-grow leading-relaxed">{project.description}</p>
                <div className="mb-4">
                    <p className="text-sm font-medium text-neutral-500 mb-2">Focus Areas</p>
                    <div className="flex flex-wrap gap-2">
                        {project.focusAreas.map(area => (
                            <span key={area} className="text-xs bg-neutral-800 text-neutral-300 px-2 py-1 rounded">
                                {area}
                            </span>
                        ))}
                    </div>
                </div>
                  <a href="#" className="inline-flex items-center text-white font-medium self-start mt-auto group-hover:text-blue-400 transition-colors">
                  Learn more
                  <ArrowRightIcon className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsContent;