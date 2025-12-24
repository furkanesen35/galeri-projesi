import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'light' || theme === 'system') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  const getIcon = () => {
    if (theme === 'dark') {
      return <Moon className="h-5 w-5" strokeWidth={2} />;
    }
    return <Sun className="h-5 w-5" strokeWidth={2} />;
  };

  const getLabel = () => {
    if (theme === 'dark') {
      return 'Dark Mode';
    }
    return 'Light Mode';
  };

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={toggleTheme}
        className="flex items-center justify-center w-full rounded-lg px-3 py-2.5 text-text-secondary hover:bg-surface-hover hover:text-foreground transition-all"
        title={getLabel()}
      >
        {getIcon()}
      </button>
      <div className="absolute left-full ml-2 hidden group-hover:block pointer-events-none z-50 whitespace-nowrap">
        <div className="bg-gray-900 text-white text-xs rounded px-2 py-1 shadow-lg">
          {getLabel()}
        </div>
      </div>
    </div>
  );
};
