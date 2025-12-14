import { useTranslation } from 'react-i18next';
import { useAppConfig, SupportedLanguage } from '../store/useAppConfig';

const languages: { value: SupportedLanguage; label: string }[] = [
  { value: 'de', label: 'Deutsch' },
  { value: 'en', label: 'English' },
  { value: 'tr', label: 'Türkçe' }
];

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const { language, setLanguage } = useAppConfig();

  const handleChange = (value: SupportedLanguage) => {
    setLanguage(value);
    i18n.changeLanguage(value);
  };

  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm shadow">
      <span className="text-text-secondary">Lang</span>
      <select
        value={language}
        onChange={(e) => handleChange(e.target.value as SupportedLanguage)}
        className="rounded-md bg-bg-secondary px-2 py-1 text-foreground outline-none"
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};
