/**
 * Base-path-safe URL builder.
 *
 * The site deploys under a base path on GitHub Pages project sites
 * (e.g. `/product-lifecycle`). Astro does NOT auto-prefix arbitrary hrefs, so
 * every internal link is routed through url() to stay correct in dev, on Pages,
 * and on a custom domain — change only astro.config's BASE and everything follows.
 */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  const out = `${base}${p}`;
  return out === '' ? '/' : out;
}

/** True when `href` matches the current pathname (for nav active state). */
export function isActive(current: string, href: string): boolean {
  const target = url(href).replace(/\/$/, '');
  const here = current.replace(/\/$/, '');
  if (target === url('/').replace(/\/$/, '')) return here === target; // Home: exact only
  return here === target || here.startsWith(`${target}/`);
}
