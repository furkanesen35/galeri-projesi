import { create } from 'zustand';

export type SupportedLanguage = 'de' | 'en' | 'tr';
export type ThemeMode = 'light' | 'dark';

type AppConfigState = {
  language: SupportedLanguage;
  theme: ThemeMode;
  setLanguage: (lang: SupportedLanguage) => void;
  toggleTheme: () => void;
};

export const useAppConfig = create<AppConfigState>((set) => ({
  language: 'de',
  theme: 'dark',
  setLanguage: (language) => set({ language }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
}));
