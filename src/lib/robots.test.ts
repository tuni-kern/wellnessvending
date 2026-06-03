import { describe, it, expect } from 'vitest';
import robots from '../app/robots';

describe('robots', () => {
  const result = robots();
  const rules = Array.isArray(result.rules) ? result.rules : [result.rules];
  const agents = rules.flatMap((r) =>
    Array.isArray(r.userAgent) ? r.userAgent : [r.userAgent],
  );

  it('welcomes the major AI crawlers', () => {
    for (const bot of [
      'GPTBot',
      'OAI-SearchBot',
      'ChatGPT-User',
      'ClaudeBot',
      'anthropic-ai',
      'PerplexityBot',
      'Google-Extended',
    ]) {
      expect(agents).toContain(bot);
    }
  });

  it('keeps the wildcard rule that disallows /admin', () => {
    const wildcard = rules.find((r) => r.userAgent === '*');
    expect(wildcard).toBeDefined();
    expect(wildcard!.disallow).toContain('/admin');
  });

  it('keeps the sitemap reference', () => {
    expect(result.sitemap).toContain('/sitemap.xml');
  });
});
