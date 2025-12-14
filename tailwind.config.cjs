/**** Tailwind configuration for the Galeri frontend. ****/
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Semantic colors mapped to CSS variables
        background: 'var(--color-bg)',
        'bg-secondary': 'var(--color-bg-secondary)',
        'bg-tertiary': 'var(--color-bg-tertiary)',
        surface: 'var(--color-surface)',
        'surface-hover': 'var(--color-surface-hover)',
        
        foreground: 'var(--color-text)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
        'text-inverted': 'var(--color-text-inverted)',
        
        border: 'var(--color-border)',
        'border-hover': 'var(--color-border-hover)',
        
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
          text: 'var(--color-primary-text)',
          50: '#ecf3ff',
          100: '#d8e4ff',
          200: '#b4caff',
          300: '#89a7ff',
          400: '#667eff',
          500: '#4a55f5',
          600: '#3a3fd8',
          700: '#3133ad',
          800: '#2f2f82',
          900: '#2b2c66'
        },
        
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)'
      }
    }
  },
  plugins: []
};
