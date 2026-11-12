import { Article } from '@/types/portfolio';

export const articles: Article[] = [
  {
    tag: 'MICROSERVICES',
    readTime: '6 MIN READ',
    title: 'The simplest example is kafka + golang',
    desc: 'This article presents a simple way to implement a microservice architecture using Kafka, Golang and Docker.',
    asciiDiagram: `  [Producer API] ──(gRPC)──> ╔═══════════════════╗ ──> [Worker Pool 01]\n                             ║ KAFKA BROKER MESH ║\n  [Auth Gateway] ──(JSON)──> ╚═══════════════════╝ ──> [PostgreSQL Sink]`
  },
  {
    tag: 'GRAPHICS & SHADERS',
    readTime: '8 MIN READ',
    title: 'Real-time ASCII shaders in WebGL & Canvas2D',
    desc: 'Mapping luminance matrices, signed distance fields, and ordered Bayer dithering to crisp monospace glyph atlases at 60 frames per second.',
    asciiDiagram: `  Luminance(x,y) ──> [Bayer 4x4 Matrix] ──> GlyphAtlas[idx] ──> @%#*+=-:.`
  },
  {
    tag: 'SYSTEMS ARCHITECTURE',
    readTime: '5 MIN READ',
    title: 'Zero-copy IPC streams in Rust & WebAssembly',
    desc: 'Designing lock-free ring buffers and shared memory pipelines for high-frequency browser telemetry and local-first desktop tooling.',
    asciiDiagram: `  [RingBuffer<T>] === SharedArrayBuffer ===> [Atomics.wait / WebWorker]`
  },
  {
    tag: 'DEVOPS & INFRA',
    readTime: '7 MIN READ',
    title: 'Multi-region Kubernetes ingress with Nginx & Brotli',
    desc: 'Tuning edge compression, gRPC keepalive pooling, and zero-downtime canary rollouts across bare-metal clusters.',
    asciiDiagram: `  [Edge Anycast] ──> [Nginx Brotli L7] ──> [K8s Ingress Pod Mesh]`
  }
];
