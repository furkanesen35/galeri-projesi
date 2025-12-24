import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import { useAppConfig, SupportedLanguage } from '../store/useAppConfig';

const languages: { value: SupportedLanguage; label: string; flag: string }[] = [
  { value: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { value: 'en', label: 'English', flag: '🇬🇧' },
  { value: 'tr', label: 'Türkçe', flag: '🇹🇷' }
];

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const { language, setLanguage } = useAppConfig();
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (value: SupportedLanguage) => {
    setLanguage(value);
    i18n.changeLanguage(value);
    setIsOpen(false);
  };

  const currentLang = languages.find(l => l.value === language);

  return (
    <div className="relative group">
      <button
        type="button"
        className="flex items-center justify-center w-full rounded-lg px-3 py-2.5 text-text-secondary hover:bg-surface-hover hover:text-foreground transition-all"
        title="Change Language"
        onMouseEnter={() => setIsOpen(true)}
      >
        <Languages className="h-5 w-5" strokeWidth={2} />
      </button>
      
      {isOpen && (
        <div 
          className="absolute left-full ml-0 bottom-0 bg-surface border border-border rounded-lg shadow-lg overflow-hidden z-50 min-w-[160px]"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {languages.map((lang) => (
            <button
              key={lang.value}
              type="button"
              onClick={() => handleChange(lang.value)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                language === lang.value
                  ? 'bg-primary text-primary-text'
                  : 'text-foreground hover:bg-surface-hover'
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
