import React, { useState, useEffect } from 'react';
import type { Page, BlogPost, TeamMember, Project } from './types';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AboutContent from './components/AboutContent';
import BlogContent from './components/BlogContent';
import TeamContent from './components/TeamContent';
import ProjectsContent from './components/ProjectsContent';
import BlogPostPage from './components/BlogPostPage';
import ProjectPage from './components/ProjectPage';
import 'highlight.js/styles/github-dark.css';

declare const jsyaml: { load: (str: string) => unknown };

type ViewState = 
  | { type: 'page'; page: Page }
  | { type: 'blog-post'; slug: string }
  | { type: 'project'; slug: string };

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('about');
  const [viewState, setViewState] = useState<ViewState>({ type: 'page', page: 'about' });
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contentRes, teamRes] = await Promise.all([
          fetch('/data/content-index.json'),
          fetch('/data/team.yaml')
        ]);

        if (!contentRes.ok || !teamRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const contentData = await contentRes.json();
        const teamText = await teamRes.text();

        setBlogPosts(contentData.posts as BlogPost[]);
        setProjects(contentData.projects as Project[]);
        setTeamMembers(jsyaml.load(teamText) as TeamMember[]);

      } catch (e) {
        setError(e instanceof Error ? e.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleNavigateToPage = (page: Page) => {
    setActivePage(page);
    setViewState({ type: 'page', page });
    setSidebarOpen(false);
  };

  const handleNavigateToBlogPost = (slug: string) => {
    setViewState({ type: 'blog-post', slug });
    setSidebarOpen(false);
  };

  const handleNavigateToProject = (slug: string) => {
    setViewState({ type: 'project', slug });
    setSidebarOpen(false);
  };

  const handleBackToPage = () => {
    setViewState({ type: 'page', page: activePage });
  };

  const renderContent = () => {
    if (loading) {
      return <div className="text-center p-12">Loading content...</div>;
    }
    if (error) {
      return <div className="text-center p-12 text-red-500">Error: {error}</div>;
    }

    if (viewState.type === 'blog-post') {
      const post = blogPosts.find(p => p.slug === viewState.slug);
      if (!post) {
        return <div className="text-center p-12">Blog post not found</div>;
      }
      return <BlogPostPage post={post} onBack={handleBackToPage} />;
    }

    if (viewState.type === 'project') {
      const project = projects.find(p => p.slug === viewState.slug);
      if (!project) {
        return <div className="text-center p-12">Project not found</div>;
      }
      return <ProjectPage project={project} onBack={handleBackToPage} />;
    }

    switch (viewState.page) {
      case 'about':
        return <AboutContent />;
      case 'projects':
        return <ProjectsContent projects={projects} onProjectClick={handleNavigateToProject} />;
      case 'blog':
        return <BlogContent posts={blogPosts} onPostClick={handleNavigateToBlogPost} />;
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
          setActivePage={handleNavigateToPage} 
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
