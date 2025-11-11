export type Page = 'about' | 'projects' | 'blog' | 'team';

export interface NavLink {
  id: Page;
  label: string;
}

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  author: string;
  summary: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
}

export interface Project {
    id: number;
    title: string;
    status: 'Active' | 'Proposed' | 'Completed';
    description: string;
    focusAreas: string[];
    imageUrl: string;
}