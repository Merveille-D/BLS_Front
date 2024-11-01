/**
 * The name of the local storage key for the locale.
 */
export const LOCALE_STORAGE_NAME = "locale";
/**
 * The available locales.
 */
export const availableLocales = {
  en: "English",
  fr: "Français",
};
/**
 * Check if a locale is available.
 * @param locale - The locale to check.
 * @returns Whether the locale is available.
 */
export const isAvailableLocale = (locale) => locale in availableLocales;
/**
 * Get the default locale based on the user's browser language.
 * @returns The default locale.
 */
export const getDefaultLocale = () => {
  if (typeof window === "undefined") return "en";
  const browserLocale =
    localStorage.getItem(LOCALE_STORAGE_NAME) || navigator.language.slice(0, 2);
  return isAvailableLocale(browserLocale) ? browserLocale : "en";
};
/**
 * Load the messages for a module and locale.
 * @param moduleName - The module name.
 * @param locale - The locale.
 * @returns The messages.
 */
export const loadMessages = (moduleName, locale) => {
  try {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    const messages = require(`@/config/locales/${moduleName}/${locale}.json`);
    return Object.entries(messages).reduce((acc, [key, value]) => {
      acc[`${moduleName}.${key}`] = value;
      return acc;
    }, {});
  } catch (error) {
    return {};
  }
};
/**
 * Save the locale to local storage.
 * @param locale - The locale to save.
 */
export const saveLocale = (locale) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(LOCALE_STORAGE_NAME, locale);
};
