import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  // English-only site. Retired locales (hi,bn,ta,te,mr,gu,kn,ml,or,ja,de,fr,es)
  // 301 to unprefixed URLs via next.config.mjs redirects.
  locales: ['en'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});

export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing);
