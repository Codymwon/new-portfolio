import { Project } from '@/types/portfolio';

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Axial // Reaching Hands ASCII Engine',
    category: 'frontend',
    year: '2026',
    tech: ['TypeScript', 'Canvas2D', 'WebGL', 'React'],
    summary: 'High-density image-to-ASCII rendering pipeline with spring physics cursor repulsion and scroll-triggered morph targets.',
    asciiPreview: [
      '  .=*#%%#+-      -+###*=.  ',
      ' *%%%%%%%#* ··· *#%%%%%%%* ',
      '   :=*#%#:  ✦✦✦  :#%#*=:   ',
      '            ···            '
    ]
  },
  {
    id: 'p2',
    title: 'Kafka + Go Event Mesh',
    category: 'backend',
    year: '2026',
    tech: ['Golang', 'Kafka', 'Docker', 'PostgreSQL'],
    summary: 'High-throughput distributed event bus handling 120k msgs/sec with idempotent consumers and dead-letter replay.',
    asciiPreview: [
      ' [API]══>╔═════════╗       ',
      '         ║  KAFKA  ║══>[DB]',
      ' [CLI]══>╚═════════╝       ',
      '                           '
    ]
  },
  {
    id: 'p3',
    title: 'Meow // Scanline AI Agent',
    category: 'devops',
    year: '2025',
    tech: ['Python', 'Next.js', 'WebSockets', 'Redis'],
    summary: 'Autonomous personal AI assistant with horizontal scanline halftone visuals, sandbox execution, and task planning.',
    asciiPreview: [
      '   /\\___/\\   ════════════ ',
      '  ( ◉   ◉ )  MEOW AGENT   ',
      '   >  ^  <   ════════════ ',
      '  ▀▀▀▀▀▀▀▀▀               '
    ]
  },
  {
    id: 'p4',
    title: 'Acquire // Realtime Comms Suite',
    category: 'frontend',
    year: '2025',
    tech: ['Vue 3', 'WebRTC', 'Redux Toolkit', 'GraphQL'],
    summary: 'Low-latency customer video/audio calling, automated call routing, and collaborative point-cloud horizon UI.',
    asciiPreview: [
      '       ·:*#*:·  ·:*#*:·    ',
      '     ..··:==+****+==:··..  ',
      '  .··:::----======----:::··',
      '                           '
    ]
  },
  {
    id: 'p5',
    title: 'Hyperion // gRPC Micro-Gateway',
    category: 'backend',
    year: '2024',
    tech: ['Golang', 'gRPC', 'Redis', 'NestJS'],
    summary: 'Polyglot API gateway bridging REST/GraphQL clients to internal gRPC microservices with distributed tracing.',
    asciiPreview: [
      '  Client ──(HTTP/3)──> [GW]',
      '             ┌──────────┴─┐',
      '          [Svc_A]      [Svc_B]',
      '                           '
    ]
  },
  {
    id: 'p6',
    title: 'KubePulse // CI/CD Fleet Monitor',
    category: 'devops',
    year: '2024',
    tech: ['Docker', 'Kubernetes', 'Nginx', 'Bash'],
    summary: 'Zero-config terminal & web dashboard for tracking container rollouts, Brotli asset metrics, and node health.',
    asciiPreview: [
      ' NODE_01 [█████████░] 92%  ',
      ' NODE_02 [██████████] 99%  ',
      ' NODE_03 [████████░░] 84%  ',
      '                           '
    ]
  }
];
