export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  demoUrl?: string;
  stars?: number;
  forks?: number;
  colorTheme: 'yellow' | 'cyan' | 'pink' | 'lime' | 'violet' | 'orange';
  featured: boolean;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: {
    name: string;
    level: number; // 0 to 100
    description: string;
  }[];
}

export interface TimelineItem {
  id: string;
  period: string;
  title: string;
  companyOrTopic: string;
  description: string;
  tags: string[];
  roleIcon: string;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  tagline: string;
  message: string;
  timestamp: string;
}

export interface Hackathon {
  id: string;
  title: string;
  award: string;
  prize?: string;
  period: string;
  description: string;
  tags: string[];
  colorTheme: 'yellow' | 'cyan' | 'pink' | 'lime' | 'violet' | 'orange';
}
