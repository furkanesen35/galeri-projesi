import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Background options
export interface BackgroundOption {
  id: string;
  name: string;
  type: 'none' | 'gradient' | 'image' | 'pattern';
  value: string; // CSS value for background or image URL
  thumbnail?: string; // Preview thumbnail
}

// Sample background options
export const backgroundOptions: BackgroundOption[] = [
  {
    id: 'none',
    name: 'Kein Hintergrund',
    type: 'none',
    value: 'transparent',
  },
  {
    id: 'gradient-blue',
    name: 'Blauer Gradient',
    type: 'gradient',
    value: 'linear-gradient(135deg, #1e3a5f 0%, #0f1c2e 50%, #0a1628 100%)',
  },
  {
    id: 'gradient-purple',
    name: 'Lila Gradient',
    type: 'gradient',
    value: 'linear-gradient(135deg, #2d1b4e 0%, #1a0f2e 50%, #0f0a1a 100%)',
  },
  {
    id: 'gradient-green',
    name: 'Grüner Gradient',
    type: 'gradient',
    value: 'linear-gradient(135deg, #1a3a2f 0%, #0f2e1c 50%, #0a1a14 100%)',
  },
  {
    id: 'gradient-warm',
    name: 'Warmer Gradient',
    type: 'gradient',
    value: 'linear-gradient(135deg, #3d2814 0%, #2a1a0d 50%, #1a1008 100%)',
  },
  {
    id: 'pattern-dots',
    name: 'Punkte Muster',
    type: 'pattern',
    value: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
  },
  {
    id: 'image-abstract-1',
    name: 'Abstrakt Blau',
    type: 'image',
    value: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1920&q=80',
  },
  {
    id: 'image-abstract-2',
    name: 'Abstrakt Dunkel',
    type: 'image',
    value: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80',
  },
  {
    id: 'image-city',
    name: 'Stadt Nacht',
    type: 'image',
    value: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80',
  },
  {
    id: 'image-car',
    name: 'Luxus Auto',
    type: 'image',
    value: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=80',
  },
  {
    id: 'image-minimal',
    name: 'Minimal Dunkel',
    type: 'image',
    value: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1920&q=80',
  },
];

interface BackgroundState {
  selectedBackgroundId: string;
  backgroundOpacity: number; // 0-100
  backgroundBlur: number; // 0-20 px
  
  // Actions
  setBackground: (id: string) => void;
  setOpacity: (opacity: number) => void;
  setBlur: (blur: number) => void;
  getSelectedBackground: () => BackgroundOption;
  reset: () => void;
}

const defaultState = {
  selectedBackgroundId: 'none',
  backgroundOpacity: 30,
  backgroundBlur: 0,
};

export const useBackgroundStore = create<BackgroundState>()(
  persist(
    (set, get) => ({
      ...defaultState,
      
      setBackground: (id) => {
        set({ selectedBackgroundId: id });
      },
      
      setOpacity: (opacity) => {
        set({ backgroundOpacity: Math.max(0, Math.min(100, opacity)) });
      },
      
      setBlur: (blur) => {
        set({ backgroundBlur: Math.max(0, Math.min(20, blur)) });
      },
      
      getSelectedBackground: () => {
        const id = get().selectedBackgroundId;
        return backgroundOptions.find(bg => bg.id === id) || backgroundOptions[0];
      },
      
      reset: () => {
        set(defaultState);
      },
    }),
    {
      name: 'background-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        selectedBackgroundId: state.selectedBackgroundId,
        backgroundOpacity: state.backgroundOpacity,
        backgroundBlur: state.backgroundBlur,
      }),
    }
  )
);
