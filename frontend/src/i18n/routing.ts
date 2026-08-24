import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  locales: [
    'en', // English (default)
    'hi', // Hindi
    'bn', // Bengali
    'ta', // Tamil
    'te', // Telugu
    'mr', // Marathi
    'gu', // Gujarati
    'kn', // Kannada
    'ml', // Malayalam
    'or', // Odia
    'ja', // Japanese
    'de', // German
    'fr', // French
    'es', // Spanish
  ],
  defaultLocale: 'en',
});

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
