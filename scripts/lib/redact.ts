/**
 * REDACTION ENGINE — the single chokepoint every ingested string flows through
 * before it can be written anywhere committable.
 *
 * Philosophy: default to redaction when uncertain. It is far better to over-redact
 * a sanitized aggregate (which a human then reviews) than to leak a secret, an
 * internal hostname, or a block of private source into a public repo.
 *
 * `redact()` returns the cleaned text plus a list of findings, so callers can log
 * what was removed and reviewers can audit the pipeline.
 */

export interface Finding {
  kind: string;
  sample: string; // a short, already-masked hint of what matched — never the full secret
}

export interface RedactResult {
  text: string;
  findings: Finding[];
}

export interface RedactOptions {
  /** Redact IPv4 addresses and internal hostnames (default true). */
  hosts?: boolean;
  /** Redact email addresses, except any in `allowEmails` (default true). */
  emails?: boolean;
  /** Collapse fenced/indented code blocks longer than this many lines (default 6). */
  maxCodeLines?: number;
  /** Emails that are intentionally public and should NOT be redacted. */
  allowEmails?: string[];
}

/** A short masked hint, e.g. "sk-a…9f" — enough to audit, not enough to reuse. */
function hint(s: string): string {
  const t = s.trim();
  if (t.length <= 8) return '•'.repeat(t.length);
  return `${t.slice(0, 3)}…${t.slice(-2)}`;
}

/** High-confidence secret patterns — always redacted regardless of options. */
const SECRET_RULES: Array<{ kind: string; re: RegExp }> = [
  { kind: 'anthropic-key', re: /sk-ant-[A-Za-z0-9\-_]{16,}/g },
  { kind: 'openai-key', re: /\bsk-[A-Za-z0-9]{20,}\b/g },
  { kind: 'github-token', re: /\bgh[pousr]_[A-Za-z0-9]{20,}\b/g },
  { kind: 'aws-access-key', re: /\bAKIA[0-9A-Z]{16}\b/g },
  { kind: 'slack-token', re: /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/g },
  { kind: 'jwt', re: /\beyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\b/g },
  { kind: 'bearer-token', re: /\bBearer\s+[A-Za-z0-9\-._~+/]{16,}=*/g },
  {
    kind: 'private-key-block',
    re: /-----BEGIN [A-Z ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z ]*PRIVATE KEY-----/g,
  },
  // KEY=value / SECRET: value style assignments with a plausible secret value
  {
    kind: 'secret-assignment',
    re: /\b([A-Z0-9_]*(?:KEY|TOKEN|SECRET|PASSWORD|PASSWD|PWD|CREDENTIAL)[A-Z0-9_]*)\s*[=:]\s*["']?[A-Za-z0-9\-_./+]{12,}["']?/g,
  },
];

const HOST_RULES: Array<{ kind: string; re: RegExp }> = [
  { kind: 'ipv4', re: /\b(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)\b/g },
  {
    kind: 'internal-hostname',
    re: /\b[a-z0-9-]+\.(?:local|internal|lan|corp|home)\b(?::\d+)?/gi,
  },
  // dead private mirror flagged during recon — never surface it
  { kind: 'private-remote', re: /codeberg\.org\/[A-Za-z0-9_\-]+\/[A-Za-z0-9_\-]+/g },
];

const EMAIL_RE = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;

function applyRules(
  text: string,
  rules: Array<{ kind: string; re: RegExp }>,
  findings: Finding[]
): string {
  let out = text;
  for (const { kind, re } of rules) {
    out = out.replace(re, (m) => {
      findings.push({ kind, sample: hint(m) });
      return `[REDACTED:${kind}]`;
    });
  }
  return out;
}

/** Collapse long code blocks to a one-line marker so private source can't ride along. */
function redactCodeBlocks(text: string, maxLines: number, findings: Finding[]): string {
  // fenced ``` blocks
  const fenced = /```[^\n]*\n([\s\S]*?)```/g;
  let out = text.replace(fenced, (_full, body: string) => {
    const lines = body.split('\n').length;
    if (lines > maxLines) {
      findings.push({ kind: 'code-block', sample: `${lines} lines` });
      return `\n[REDACTED:code-block — ${lines} lines summarized out]\n`;
    }
    return _full;
  });

  // runs of >maxLines indented (4-space / tab) lines that look like a code dump
  const linesArr = out.split('\n');
  const result: string[] = [];
  let run: string[] = [];
  const flush = () => {
    if (run.length > maxLines) {
      findings.push({ kind: 'code-block', sample: `${run.length} indented lines` });
      result.push(`[REDACTED:code-block — ${run.length} indented lines summarized out]`);
    } else {
      result.push(...run);
    }
    run = [];
  };
  for (const line of linesArr) {
    if (/^(?: {4}|\t)\S/.test(line)) run.push(line);
    else {
      flush();
      result.push(line);
    }
  }
  flush();
  return result.join('\n');
}

export function redact(text: string, opts: RedactOptions = {}): RedactResult {
  const { hosts = true, emails = true, maxCodeLines = 6, allowEmails = [] } = opts;
  const findings: Finding[] = [];
  let out = text;

  out = applyRules(out, SECRET_RULES, findings);
  if (hosts) out = applyRules(out, HOST_RULES, findings);
  if (emails) {
    out = out.replace(EMAIL_RE, (m) => {
      if (allowEmails.includes(m.toLowerCase())) return m;
      findings.push({ kind: 'email', sample: hint(m) });
      return '[REDACTED:email]';
    });
  }
  out = redactCodeBlocks(out, maxCodeLines, findings);

  return { text: out, findings };
}

/** Convenience: true if `text` contains anything the engine would redact. */
export function hasSensitive(text: string, opts?: RedactOptions): boolean {
  return redact(text, opts).findings.length > 0;
}

/** Roll findings up into a `{kind: count}` summary for logging. */
export function summarize(findings: Finding[]): Record<string, number> {
  return findings.reduce<Record<string, number>>((acc, f) => {
    acc[f.kind] = (acc[f.kind] ?? 0) + 1;
    return acc;
  }, {});
}
