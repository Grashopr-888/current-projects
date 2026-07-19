/** Shared date/label formatting so every surface renders dates identically. */

// Dates in frontmatter are authored as calendar days (YYYY-MM-DD) and parsed as UTC
// midnight. Formatting in UTC keeps the displayed day identical to what was written,
// regardless of the build machine's local timezone.
export function fmtDate(d: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(d);
}

export function fmtMonth(d: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  }).format(d);
}

export function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** "3 min read" from a body string. */
export function readingTime(body: string | undefined): string {
  const words = (body ?? '').trim().split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.round(words / 220));
  return `${mins} min read`;
}
