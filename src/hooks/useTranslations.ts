import { useLocale } from '@/contexts/LocaleContext';
import viMessages from '../../messages/vi.json';
import enMessages from '../../messages/en.json';

const messages = {
  vi: viMessages,
  en: enMessages,
};

export function useTranslations() {
  const { locale } = useLocale();

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: unknown = messages[locale];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key; // Return the key if not found
      }
    }
    
    // Ensure we always return a string
    return typeof value === 'string' ? value : key;
  };

  return { t, locale };
}
