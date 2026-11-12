import { create } from 'zustand';

export interface DetailModalState {
  isOpen: boolean;
  badge: string;
  title: string;
  content: string;
  asciiText: string | null;
  showForm: boolean;
}

interface PortfolioState {
  firstName: string;
  lastName: string;
  yearsExp: string;
  email: string;
  frontendStack: string;
  backendStack: string;
  stylesStack: string;
  devopsStack: string;
  isLight: boolean;
  lang: 'en' | 'ge';
  activeFilter: 'all' | 'frontend' | 'backend' | 'devops';
  activeArticleIndex: number;
  activeWorkIndex: number;
  scrollStreamEnabled: boolean;
  portraitMode: 'lens' | 'halftone' | 'ascii';
  hudSection: string;
  hudScrollPct: number;
  hudCursorPos: string;
  isCustomizerOpen: boolean;
  detailModal: DetailModalState;
  toast: { isOpen: boolean; message: string };

  setProfile: (data: Partial<{
    firstName: string;
    lastName: string;
    yearsExp: string;
    email: string;
    frontendStack: string;
    backendStack: string;
  }>) => void;
  toggleTheme: () => void;
  setLang: (lang: 'en' | 'ge') => void;
  setFilter: (filter: 'all' | 'frontend' | 'backend' | 'devops') => void;
  setActiveArticleIndex: (idx: number | ((prev: number) => number)) => void;
  setActiveWorkIndex: (idx: number) => void;
  toggleScrollStream: () => void;
  cyclePortraitMode: () => void;
  setHudData: (data: Partial<{ hudSection: string; hudScrollPct: number; hudCursorPos: string }>) => void;
  setCustomizerOpen: (isOpen: boolean) => void;
  openDetailModal: (data: Omit<DetailModalState, 'isOpen'>) => void;
  closeDetailModal: () => void;
  showToast: (message: string) => void;
  hideToast: () => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  firstName: 'Nikita',
  lastName: 'Khvatov',
  yearsExp: '5 years',
  email: 'hello@khvatov.dev',
  frontendStack: 'TypeScript / React / Vue / Vuex / Redux Toolkit / NextJs / Nuxt / Jest / GraphQL / React Native / Puppeteer / Enzyme',
  backendStack: 'Golang / Gin / GORM / PostgreSQL / MySQL / MongoDB / gRPC / Redis / Kafka / Node / Nest / TypeORM / Microservices',
  stylesStack: 'SCSS / SASS / PostCSS / Ant.d / MUI / Material UI',
  devopsStack: 'Nginx / Brotli / Docker / (CI/CD) / k8s / bash',
  isLight: false,
  lang: 'en',
  activeFilter: 'all',
  activeArticleIndex: 0,
  activeWorkIndex: 1,
  scrollStreamEnabled: true,
  portraitMode: 'lens',
  hudSection: 'SEC: 01 // HERO_ASCII',
  hudScrollPct: 0,
  hudCursorPos: 'XY: 000,000',
  isCustomizerOpen: false,
  detailModal: {
    isOpen: false,
    badge: '',
    title: '',
    content: '',
    asciiText: null,
    showForm: false,
  },
  toast: { isOpen: false, message: '' },

  setProfile: (data) => set((s) => ({ ...s, ...data })),
  toggleTheme: () => set((s) => {
    const next = !s.isLight;
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('light-theme', next);
      document.documentElement.classList.toggle('dark', !next);
    }
    return { isLight: next };
  }),
  setLang: (lang) => set({ lang }),
  setFilter: (activeFilter) => set({ activeFilter }),
  setActiveArticleIndex: (updater) => set((s) => ({
    activeArticleIndex: typeof updater === 'function' ? updater(s.activeArticleIndex) : updater,
  })),
  setActiveWorkIndex: (activeWorkIndex) => set({ activeWorkIndex }),
  toggleScrollStream: () => set((s) => ({ scrollStreamEnabled: !s.scrollStreamEnabled })),
  cyclePortraitMode: () => set((s) => {
    const modes: Array<'lens' | 'halftone' | 'ascii'> = ['lens', 'halftone', 'ascii'];
    const next = modes[(modes.indexOf(s.portraitMode) + 1) % modes.length];
    return { portraitMode: next };
  }),
  setHudData: (data) => set((s) => ({ ...s, ...data })),
  setCustomizerOpen: (isCustomizerOpen) => set({ isCustomizerOpen }),
  openDetailModal: (data) => set({ detailModal: { ...data, isOpen: true } }),
  closeDetailModal: () => set((s) => ({ detailModal: { ...s.detailModal, isOpen: false } })),
  showToast: (message) => set({ toast: { isOpen: true, message } }),
  hideToast: () => set({ toast: { isOpen: false, message: '' } }),
}));
