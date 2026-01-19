import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

export const LanguagePicker: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="px-3 py-2 bg-white border border-byggnads-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-byggnads-blue-500 focus:border-byggnads-blue-500 cursor-pointer"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};
