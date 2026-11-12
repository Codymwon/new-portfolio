import type { Metadata, Viewport } from 'next';
import './globals.css';
import NavigationHeader from '@/components/layout/NavigationHeader';
import TelemetryHud from '@/components/layout/TelemetryHud';
import ToastBanner from '@/components/layout/ToastBanner';
import ScrollStreamCanvas from '@/components/canvas/ScrollStreamCanvas';
import CustomizerModal from '@/components/modals/CustomizerModal';
import ArchitectureDetailModal from '@/components/modals/ArchitectureDetailModal';

export const metadata: Metadata = {
  title: 'Full-Stack Developer Portfolio — High-Definition Interactive ASCII Architecture',
  description: 'High-definition interactive ASCII and particle architecture portfolio featuring 47,000+ real-time simulated points, 3D halftone rendering, and distributed systems case studies.',
  keywords: ['Full-Stack Developer', 'ASCII Architecture', 'Creative Developer', 'WebGL', 'TypeScript', 'Golang', 'Next.js', 'React 19'],
  authors: [{ name: 'Nikita Khvatov' }],
  openGraph: {
    title: 'Full-Stack Developer Portfolio — High-Definition Interactive ASCII Architecture',
    description: 'High-definition interactive ASCII and particle architecture portfolio.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Full-Stack Developer Portfolio — High-Definition Interactive ASCII Architecture',
    description: 'High-definition interactive ASCII and particle architecture portfolio.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F0F5FA',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light-theme scroll-smooth">
      <body className="relative min-h-screen bg-[#F0F5FA] text-[#121217] selection:bg-ultraviolet selection:text-white">
        {/* GLOBAL SCROLL-LINKED ASCII STREAM CANVAS */}
        <ScrollStreamCanvas />

        {/* FLOATING ASCII TELEMETRY & SCROLL HUD (Bottom-Left) */}
        <TelemetryHud />

        {/* Large Subtle Decorative Geometric Orbital Circles with subtle ambient slow rotation */}
        <div className="orbital-circle fixed -top-44 -right-44 w-[520px] h-[520px] z-0 animate-spin-slow opacity-75" />
        <div className="orbital-circle fixed top-[45%] -right-36 w-[560px] h-[560px] z-0 animate-spin-slow opacity-75" style={{ animationDuration: '60s', animationDirection: 'reverse' }} />

        {/* TOP NAVIGATION BAR */}
        <NavigationHeader />

        {/* MAIN PAGE CONTENT */}
        {children}

        {/* MODALS & NOTIFICATIONS */}
        <CustomizerModal />
        <ArchitectureDetailModal />
        <ToastBanner />
      </body>
    </html>
  );
}
