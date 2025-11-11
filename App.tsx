import React, { useState, useEffect } from 'react';
import type { Page, BlogPost, TeamMember, Project } from './types';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AboutContent from './components/AboutContent';
import BlogContent from './components/BlogContent';
import TeamContent from './components/TeamContent';
import ProjectsContent from './components/ProjectsContent';

declare const jsyaml: { load: (str: string) => unknown };

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('about');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogRes, teamRes, projectsRes] = await Promise.all([
          fetch('/data/blog.yaml'),
          fetch('/data/team.yaml'),
          fetch('/data/projects.yaml')
        ]);

        if (!blogRes.ok || !teamRes.ok || !projectsRes.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const blogText = await blogRes.text();
        const teamText = await teamRes.text();
        const projectsText = await projectsRes.text();

        setBlogPosts(jsyaml.load(blogText) as BlogPost[]);
        setTeamMembers(jsyaml.load(teamText) as TeamMember[]);
        setProjects(jsyaml.load(projectsText) as Project[]);
        
      } catch (e) {
        setError(e instanceof Error ? e.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const renderContent = () => {
    if (loading) {
      return <div className="text-center p-12">Loading content...</div>;
    }
    if (error) {
      return <div className="text-center p-12 text-red-500">Error: {error}</div>;
    }
    switch (activePage) {
      case 'about':
        return <AboutContent />;
      case 'projects':
        return <ProjectsContent projects={projects} />;
      case 'blog':
        return <BlogContent posts={blogPosts} />;
      case 'team':
        return <TeamContent members={teamMembers} />;
      default:
        return <AboutContent />;
    }
  };

  return (
    <div className="bg-black text-neutral-300 min-h-screen font-light">
      <Header onMenuClick={() => setSidebarOpen(!isSidebarOpen)} />
      <div className="flex">
        <Sidebar 
          activePage={activePage} 
          setActivePage={setActivePage} 
          isOpen={isSidebarOpen}
          setIsOpen={setSidebarOpen}
        />
        <main className="flex-1 transition-all duration-300 lg:ml-64 pt-16">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
