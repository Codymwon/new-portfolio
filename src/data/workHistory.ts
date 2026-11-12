import { WorkEntry } from '@/types/portfolio';

export const workHistory: WorkEntry[] = [
  {
    period: '2022',
    duration: '1 year 5 months',
    company: 'ITHUB',
    role: 'Frontend developer | React & Vue',
    details: 'Leading frontend architecture for enterprise developer portals, real-time collaborative editors, and accessible component libraries.',
    badges: ['React', 'Vue 3', 'TypeScript', 'GraphQL']
  },
  {
    period: '2021 - 2022',
    duration: '9 months',
    company: 'VK Development Lab',
    role: 'Frontend developer | React',
    details: 'Architected modular React state containers, micro-frontend federation pipelines, and high-contrast design system primitives serving 1.2M+ users.',
    badges: ['React 18', 'Redux Toolkit', 'WebSockets', 'SCSS']
  },
  {
    period: '2020 - 2021',
    duration: '11 months',
    company: 'SN Inc.',
    role: 'Fullstack developer | JavaScript & Python',
    details: 'Built end-to-end data ingestion pipelines, REST/gRPC APIs, and interactive analytics dashboards with sub-50ms query caching.',
    badges: ['Node.js', 'Python', 'PostgreSQL', 'Docker']
  },
  {
    period: '2018 - 2020',
    duration: '1 year 11 months',
    company: 'Business Up',
    role: 'Fullstack developer | JavaScript & Python',
    details: 'Engineered multi-tenant SaaS billing workflows, automated CI/CD deployment scripts, and responsive client applications.',
    badges: ['JavaScript', 'Python', 'MySQL', 'Nginx']
  }
];
