import React from 'react';
import type { TeamMember } from '../types';

interface TeamContentProps {
  members: TeamMember[];
}

const TeamContent: React.FC<TeamContentProps> = ({ members }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-medium text-white mb-12 text-center">Our Team</h1>
        <p className="text-lg text-neutral-300 text-center max-w-3xl mx-auto mb-16">
          Meet the dedicated students and leaders driving the Alliance for Resilient Technology Munich forward.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {members.map((member) => (
            <div key={member.id} className="text-center group">
              <div className="relative aspect-square mb-4">
                <img 
                  src={member.imageUrl} 
                  alt={`Portrait of ${member.name}`}
                  className="rounded-full w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <h3 className="font-medium text-white text-md">{member.name}</h3>
              <p className="text-sm text-neutral-400">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamContent;
