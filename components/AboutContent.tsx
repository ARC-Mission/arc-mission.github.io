
import React from 'react';
import { ArrowRightIcon } from './Icons';

const AboutContent: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-12 text-neutral-300">
      <div className="max-w-3xl mx-auto">
        
        {/* Intro Section */}
        <div className="text-center mb-24">
          <p className="text-sm text-neutral-400 tracking-wider mb-4">Organization</p>
          <h1 className="text-5xl md:text-7xl font-medium text-white mb-6">About ARCM</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            The Alliance for Resilient Technology Munich (ARCM) is a student organization at TUM dedicated to exploring and developing civilian and dual-use technological solutions to benefit all of humanity.
          </p>
        </div>

        {/* Vision Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="max-w-md">
            <h2 className="text-4xl font-medium text-white mb-6">Our Vision for Resilient Technology</h2>
            <p className="mb-6 leading-relaxed">
              Our mission is to explore and prototype civilian and dual-use technical solutions inspired by critical technology themes, with strong ethics, openness, and industry collaboration. We position ourselves at the intersection of academic research, the deep-tech industry, and real-world challenges in technological resilience.
            </p>
          </div>
          <div className="flex justify-center">
            <img 
              src="/assets/logo_white.png"
              alt="ARCM Logo - A vision of resilient systems" 
              className="w-full max-w-md"
            />
          </div>
        </div>
        
        {/* Focus Areas Section */}
        <div className="mb-24">
            <h2 className="text-4xl font-medium text-white mb-8 text-center">A Focus on Critical Technology Areas</h2>
            <p className="text-center max-w-3xl mx-auto mb-10">The inspiration for our projects is drawn from key areas of technological advancement that are crucial for societal resilience. These domains serve as prompts for research and prototyping.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center text-sm">
                {[
                    'Energy and Power', 'Advanced Communication', 'Human Resilience',
                    'Critical Infrastructure', 'Extreme Environments', 'Resilient Space Operations',
                    'Maritime Operations', 'Autonomy & Unmanned Systems', 'Data-Assisted Decision Making'
                ].map(area => (
                    <div key={area} className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg">{area}</div>
                ))}
            </div>
        </div>

        {/* Closing Statement */}
        <div className="text-center">
           <p className="text-3xl md:text-4xl text-white leading-snug max-w-4xl mx-auto">
             We are building a unique space for students to engage with pressing challenges in emerging technology, while maintaining a steadfast commitment to civilian applications and ethical considerations.
           </p>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;