export interface Article {
  tag: string;
  readTime: string;
  title: string;
  desc: string;
  asciiDiagram: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'frontend' | 'backend' | 'devops';
  year: string;
  tech: string[];
  summary: string;
  asciiPreview: string[];
}

export interface WorkEntry {
  period: string;
  duration: string;
  company: string;
  role: string;
  details: string;
  badges: string[];
}
