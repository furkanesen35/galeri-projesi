import { useTheme, Theme } from '../context/ThemeContext';

const themeOptions: { value: Theme; label: string; icon: string }[] = [
  { value: 'light', label: 'Light', icon: '☀️' },
  { value: 'dark', label: 'Dark', icon: '🌙' },
  { value: 'system', label: 'System', icon: '💻' }
];

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-surface p-1">
      {themeOptions.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => setTheme(option.value)}
          className={`flex items-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium transition-all ${
            theme === option.value
              ? 'bg-primary text-primary-text shadow-sm'
              : 'text-text-secondary hover:bg-surface-hover hover:text-foreground'
          }`}
          title={option.label}
        >
          <span>{option.icon}</span>
          <span className="hidden sm:inline">{option.label}</span>
        </button>
      ))}
    </div>
  );
};
