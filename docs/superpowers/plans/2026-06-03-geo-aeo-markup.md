# GEO/AEO Technical Markup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a cross-linked JSON-LD `@graph` (Organization, LocalBusiness, WebSite, FAQPage), an `llms.txt`, and explicit AI-crawler rules to wellnessvendingsolutions.com, with the FAQ list as a single source of truth — no visible page change.

**Architecture:** A new pure module `src/lib/schema.ts` holds the FAQ data, shared business facts, and the assembled `@graph`. `page.tsx` imports the FAQ list for its visible section (identical output) and emits the graph in one `<Script>` tag. `robots.ts` gains explicit AI-crawler rules. `public/llms.txt` is a static file served at `/llms.txt`. Vitest covers the two logic-bearing modules (`schema.ts`, `robots.ts`); the page and static file are verified by build + HTTP checks.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Vitest (new dev dependency), PM2 (deploy, port 3002).

**Spec:** `docs/superpowers/specs/2026-06-03-geo-aeo-markup-design.md`

**Working directory:** `/var/www/wellnessvending` (run all commands from here).

---

### Task 1: Branch and Vitest tooling

**Files:**
- Modify: `package.json` (add `test` script + `vitest` devDependency)
- Create: `vitest.config.ts`
- Create: `src/lib/sanity.test.ts` (temporary, deleted in Step 7)

- [ ] **Step 1: Create the working branch**

Run:
```bash
git checkout -b feat/geo-aeo-markup
```
Expected: `Switched to a new branch 'feat/geo-aeo-markup'`

- [ ] **Step 2: Install Vitest (dev-only)**

Run:
```bash
npm install -D vitest
```
Expected: completes; `npm audit` should still report 0 vulnerabilities (run `npm audit` to confirm).

- [ ] **Step 3: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
```

- [ ] **Step 4: Add the `test` script to `package.json`**

In the `"scripts"` block, add a `test` entry so it reads:
```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run"
  },
```

- [ ] **Step 5: Add a temporary sanity test to prove the runner works**

Create `src/lib/sanity.test.ts`:
```ts
import { describe, it, expect } from 'vitest';

describe('vitest runner', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 6: Run the test suite**

Run: `npm test`
Expected: PASS, 1 test passed.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vitest.config.ts src/lib/sanity.test.ts
git commit -m "Add Vitest test tooling"
```

---

### Task 2: schema.ts — FAQ data and shared business facts (TDD)

**Files:**
- Create: `src/lib/schema.ts`
- Test: `src/lib/schema.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/lib/schema.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { FAQS, BUSINESS } from './schema';

describe('FAQS', () => {
  it('has six Q&As, all non-empty', () => {
    expect(FAQS).toHaveLength(6);
    for (const faq of FAQS) {
      expect(faq.question.length).toBeGreaterThan(0);
      expect(faq.answer.length).toBeGreaterThan(0);
    }
  });

  it('preserves the first and last questions verbatim', () => {
    expect(FAQS[0].question).toBe('Is it really free?');
    expect(FAQS[5].question).toBe('Do you serve my neighborhood?');
  });
});

describe('BUSINESS', () => {
  it('exposes core NAP facts', () => {
    expect(BUSINESS.name).toBe('Wellness Vending Solutions');
    expect(BUSINESS.telephone).toBe('619-776-7976');
    expect(BUSINESS.url).toBe('https://wellnessvendingsolutions.com');
    expect(BUSINESS.address.postalCode).toBe('91977');
  });

  it('uses an approximate zip centroid, not blank coordinates', () => {
    expect(typeof BUSINESS.geo.latitude).toBe('number');
    expect(typeof BUSINESS.geo.longitude).toBe('number');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `./schema` / `FAQS` and `BUSINESS` exports missing.

- [ ] **Step 3: Create `src/lib/schema.ts` with the data layer**

```ts
export interface Faq {
  question: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    question: 'Is it really free?',
    answer:
      "Yes. Installation and servicing are free. The machines earn enough from sales that we don't need to charge you anything.",
  },
  {
    question: "What if our team doesn't use it?",
    answer:
      'If usage is low, we swap the product mix or remove the machine at no charge. No commitment, no penalty.',
  },
  {
    question: 'How long does installation take?',
    answer:
      'Usually 1-2 weeks from your yes. We handle delivery, setup, and first stocking.',
  },
  {
    question: "Can we pick what's stocked?",
    answer:
      'Yes. We consult with you on selection and adjust based on what sells at your location.',
  },
  {
    question: 'What if the machine breaks?',
    answer: 'We service it. Repair and restocking are included.',
  },
  {
    question: 'Do you serve my neighborhood?',
    answer: "We cover all of San Diego County. Call if you're unsure.",
  },
];

const SITE_URL = 'https://wellnessvendingsolutions.com';

export const BUSINESS = {
  name: 'Wellness Vending Solutions',
  url: SITE_URL,
  telephone: '619-776-7976',
  email: 'tuni@wellnessvendingsolutions.com',
  image: `${SITE_URL}/WVFamily.avif`,
  logo: `${SITE_URL}/logo.png`,
  description:
    'A family-owned business providing custom healthy and traditional vending options for offices, businesses, and teams in San Diego, CA.',
  address: {
    addressLocality: 'San Diego',
    addressRegion: 'CA',
    postalCode: '91977',
    addressCountry: 'US',
  },
  // Approximate centroid of the 91977 ZIP (Spring Valley / San Diego, CA).
  // Deliberately not the owner's street address.
  geo: { latitude: 32.7148, longitude: -117.0009 },
  sameAs: ['https://maps.app.goo.gl/zUJFPNVFkbfvuZHu6'],
  areaServed: [
    'San Diego County',
    'San Diego',
    '91977', '92101', '92102', '92103', '92104', '92105', '92106', '92107',
    '92108', '92109', '92110', '92111', '92112', '92113', '92114', '92115',
    '92116', '92117', '92119', '92120', '92121', '92122', '92123', '92124',
    '92126', '92127', '92128', '92129', '92130', '92131', '92139', '92154',
  ],
} as const;
```

Note: the `'re'` in "you're" inside the last answer must be escaped in the source as `you\'re` is NOT needed because the string uses single quotes — write that answer with double quotes to avoid escaping: `answer: "We cover all of San Diego County. Call if you're unsure."`. Use double quotes for any answer containing an apostrophe.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test`
Expected: PASS (FAQS + BUSINESS suites green; sanity test still green).

- [ ] **Step 5: Commit**

```bash
git add src/lib/schema.ts src/lib/schema.test.ts
git commit -m "Add schema data layer: FAQS and BUSINESS constants"
```

---

### Task 3: schema.ts — the cross-linked `@graph` (TDD)

**Files:**
- Modify: `src/lib/schema.ts` (append `schemaGraph` export)
- Modify: `src/lib/schema.test.ts` (add graph suite)

- [ ] **Step 1: Add the failing test**

Append to `src/lib/schema.test.ts`:
```ts
import { schemaGraph } from './schema';

describe('schemaGraph', () => {
  const graph = schemaGraph['@graph'] as Array<Record<string, any>>;

  it('contains the four entity types in order', () => {
    expect(graph.map((n) => n['@type'])).toEqual([
      'Organization',
      'LocalBusiness',
      'WebSite',
      'FAQPage',
    ]);
  });

  it('maps every FAQ into a Question/acceptedAnswer node', () => {
    const faq = graph.find((n) => n['@type'] === 'FAQPage')!;
    expect(faq.mainEntity).toHaveLength(FAQS.length);
    expect(faq.mainEntity[0].name).toBe(FAQS[0].question);
    expect(faq.mainEntity[0].acceptedAnswer.text).toBe(FAQS[0].answer);
  });

  it('cross-links resolve to defined @ids', () => {
    const ids = new Set(graph.map((n) => n['@id']));
    const website = graph.find((n) => n['@type'] === 'WebSite')!;
    const faq = graph.find((n) => n['@type'] === 'FAQPage')!;
    const lb = graph.find((n) => n['@type'] === 'LocalBusiness')!;
    expect(ids.has(website.publisher['@id'])).toBe(true);
    expect(ids.has(faq.isPartOf['@id'])).toBe(true);
    expect(ids.has(lb.parentOrganization['@id'])).toBe(true);
  });

  it('does not fabricate ratings or reviews', () => {
    for (const node of graph) {
      expect(node.aggregateRating).toBeUndefined();
      expect(node.review).toBeUndefined();
    }
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — `schemaGraph` is not exported.

- [ ] **Step 3: Append `schemaGraph` to `src/lib/schema.ts`**

Add at the end of the file:
```ts
const ORG_ID = `${SITE_URL}/#organization`;
const LOCAL_BUSINESS_ID = `${SITE_URL}/#localbusiness`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const FAQPAGE_ID = `${SITE_URL}/#faqpage`;

export const schemaGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: BUSINESS.name,
      url: BUSINESS.url,
      logo: { '@type': 'ImageObject', url: BUSINESS.logo },
      sameAs: BUSINESS.sameAs,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: BUSINESS.telephone,
        contactType: 'customer service',
      },
      founder: { '@type': 'Person', name: 'Tuni Kern' },
    },
    {
      '@type': 'LocalBusiness',
      '@id': LOCAL_BUSINESS_ID,
      name: BUSINESS.name,
      image: BUSINESS.image,
      logo: BUSINESS.logo,
      description: BUSINESS.description,
      url: BUSINESS.url,
      telephone: BUSINESS.telephone,
      address: { '@type': 'PostalAddress', ...BUSINESS.address },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: BUSINESS.geo.latitude,
        longitude: BUSINESS.geo.longitude,
      },
      priceRange: '$$',
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
      areaServed: BUSINESS.areaServed,
      sameAs: BUSINESS.sameAs,
      parentOrganization: { '@id': ORG_ID },
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      name: BUSINESS.name,
      url: BUSINESS.url,
      publisher: { '@id': ORG_ID },
      inLanguage: 'en-US',
    },
    {
      '@type': 'FAQPage',
      '@id': FAQPAGE_ID,
      isPartOf: { '@id': WEBSITE_ID },
      mainEntity: FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ],
};
```

Note: the old inline schema's `servesCuisine` field is intentionally dropped — it is a `FoodEstablishment` property, not valid on `LocalBusiness`, and adds no value for a vending operator.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test`
Expected: PASS (all `schemaGraph` assertions green).

- [ ] **Step 5: Commit**

```bash
git add src/lib/schema.ts src/lib/schema.test.ts
git commit -m "Build cross-linked JSON-LD @graph in schema module"
```

---

### Task 4: robots.ts — explicit AI-crawler rules (TDD)

**Files:**
- Modify: `src/app/robots.ts`
- Test: `src/lib/robots.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/lib/robots.test.ts`:
```ts
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — the AI-crawler agents are not present (current robots has only the `*` rule).

- [ ] **Step 3: Rewrite `src/app/robots.ts`**

Replace the entire file with:
```ts
import type { MetadataRoute } from 'next';

const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'anthropic-ai',
  'PerplexityBot',
  'Google-Extended',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin'],
      },
      {
        userAgent: AI_CRAWLERS,
        allow: '/',
      },
    ],
    sitemap: 'https://wellnessvendingsolutions.com/sitemap.xml',
  };
}
```

Note: changing `import { MetadataRoute }` to `import type { MetadataRoute }` guarantees the `next` import is erased at compile time so Vitest can import the module without resolving Next's runtime.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test`
Expected: PASS (robots suite green; everything else still green).

- [ ] **Step 5: Commit**

```bash
git add src/app/robots.ts src/lib/robots.test.ts
git commit -m "Add explicit AI-crawler allow rules to robots.txt"
```

---

### Task 5: Wire schema and FAQ source-of-truth into page.tsx

**Files:**
- Modify: `src/app/page.tsx` (imports; FAQ section; structured-data Script)

- [ ] **Step 1: Add the schema import**

At the top of `src/app/page.tsx`, after the existing `import Script from 'next/script';` line, add:
```tsx
import { FAQS, schemaGraph } from '../lib/schema';
```

- [ ] **Step 2: Replace the inline LocalBusiness Script with the graph**

Replace this block (currently lines ~15–58):
```tsx
      {/* Structured Data for LocalBusiness */}
      <Script id="structured-data" type="application/ld+json" 
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Wellness Vending Solutions",
            "image": "https://wellnessvendingsolutions.com/WVFamily.avif",
            "description": "A family-owned business providing custom healthy and traditional vending options for offices, businesses, and teams in San Diego, CA.",
            "url": "https://wellnessvendingsolutions.com",
            "telephone": "619-776-7976",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "San Diego",
              "addressRegion": "CA",
              "postalCode": "91977",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "", // Add when available
              "longitude": "" // Add when available
            },
            "priceRange": "$$",
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
              ],
              "opens": "08:00",
              "closes": "17:00"
            },
            "sameAs": [
              "https://maps.app.goo.gl/zUJFPNVFkbfvuZHu6"
            ],
            "servesCuisine": "Healthy Snacks and Beverages",
            "areaServed": ["San Diego", "91977", "92101", "92102", "92103", "92104", "92105", "92106", "92107", "92108", "92109", "92110", "92111", "92112", "92113", "92114", "92115", "92116", "92117", "92119", "92120", "92121", "92122", "92123", "92124", "92126", "92127", "92128", "92129", "92130", "92131", "92139", "92154"]
          })
        }}
      />
```
with:
```tsx
      {/* Structured Data: cross-linked entity graph (see src/lib/schema.ts) */}
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />
```

- [ ] **Step 3: Render the visible FAQ from the shared FAQS constant**

Replace this block (currently lines ~225–237):
```tsx
            {[
              ["Is it really free?", "Yes. Installation and servicing are free. The machines earn enough from sales that we don't need to charge you anything."],
              ["What if our team doesn't use it?", "If usage is low, we swap the product mix or remove the machine at no charge. No commitment, no penalty."],
              ["How long does installation take?", "Usually 1-2 weeks from your yes. We handle delivery, setup, and first stocking."],
              ["Can we pick what's stocked?", "Yes. We consult with you on selection and adjust based on what sells at your location."],
              ["What if the machine breaks?", "We service it. Repair and restocking are included."],
              ["Do you serve my neighborhood?", "We cover all of San Diego County. Call if you're unsure."],
            ].map(([q, a]) => (
              <div key={q} className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2">{q}</h3>
                <p className="text-gray-600">{a}</p>
              </div>
            ))}
```
with:
```tsx
            {FAQS.map(({ question, answer }) => (
              <div key={question} className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2">{question}</h3>
                <p className="text-gray-600">{answer}</p>
              </div>
            ))}
```

- [ ] **Step 4: Build to verify it compiles and the page is unchanged**

Run: `npm run build`
Expected: clean build, all routes generated, no type errors.

- [ ] **Step 5: Verify the rendered homepage HTML**

Run:
```bash
PORT=3010 npm run start &
SERVER_PID=$!
# --retry-connrefused waits for the server to come up (no foreground sleep)
curl -s --retry 10 --retry-connrefused --retry-delay 1 http://localhost:3010/ > /tmp/wv-home.html
echo "--- FAQ questions present (expect 4: visible FAQ + FAQ schema) ---"
grep -oE "Is it really free\?|Do you serve my neighborhood\?" /tmp/wv-home.html | wc -l
echo "--- JSON-LD @graph present (expect 1) ---"
grep -c '"@graph"' /tmp/wv-home.html
echo "--- old single-type LocalBusiness literal gone (expect 0) ---"
grep -c '"@type":"LocalBusiness","name"' /tmp/wv-home.html
kill $SERVER_PID
```
Expected: FAQ count `4` (each sampled question appears once in the visible FAQ and once in the FAQ schema), `@graph` count `1`, old-literal count `0`.

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx
git commit -m "Emit JSON-LD @graph and render FAQ from shared source"
```

---

### Task 6: Add public/llms.txt

**Files:**
- Create: `public/llms.txt`

- [ ] **Step 1: Create `public/llms.txt`**

```text
# Wellness Vending Solutions

Free, full-service healthy vending for offices and businesses in San Diego, California. Family-run since 2017.

## What we offer
- Free healthy and traditional vending machines for your workplace. No cost and no contract: we install, stock, and service the machines, and earn from sales, so the business pays nothing.
- Snacks, drinks, and refrigerated meals, with a product mix customized to your team.
- Modern payment on every machine: card, tap-to-pay, mobile, and cash.

## Service area
San Diego County, CA. Common ZIP codes served include 91977, 92101-92131, 92139, and 92154.

## Key facts
- Cost to the business: $0. No contracts.
- Installation typically takes 1-2 weeks.
- If usage is low, we adjust the product mix or remove the machine at no charge.
- Machine repair and restocking are included.

## Contact
- Phone: 619-776-7976
- Email: tuni@wellnessvendingsolutions.com
- Website: https://wellnessvendingsolutions.com
```

- [ ] **Step 2: Build and verify the file is served**

Run:
```bash
PORT=3010 npm run start &
SERVER_PID=$!
# wait for the server to come up (no foreground sleep)
curl -s --retry 10 --retry-connrefused --retry-delay 1 -o /dev/null http://localhost:3010/
echo "--- /llms.txt status (expect 200) ---"
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3010/llms.txt
echo "--- contains business name (expect >=1) ---"
curl -s http://localhost:3010/llms.txt | grep -c "Wellness Vending Solutions"
echo "--- /robots.txt has GPTBot (expect >=1) ---"
curl -s http://localhost:3010/robots.txt | grep -c "GPTBot"
kill $SERVER_PID
```
Expected: status `200`, name count `>=1`, GPTBot count `>=1`.

- [ ] **Step 3: Commit**

```bash
git add public/llms.txt
git commit -m "Add llms.txt for AI answer engines"
```

---

### Task 7: Final verification, cleanup, and handoff

**Files:**
- Delete: `src/lib/sanity.test.ts`

- [ ] **Step 1: Remove the temporary sanity test**

Run:
```bash
git rm src/lib/sanity.test.ts
```

- [ ] **Step 2: Full test + build + audit**

Run:
```bash
npm test && npm run build && npm audit
```
Expected: all tests pass, clean build, `found 0 vulnerabilities`.

- [ ] **Step 3: Confirm zero visible-content change to the page**

Run:
```bash
git diff master -- src/app/page.tsx
```
Expected: the diff touches only the imports, the structured-data `<Script>` block, and the FAQ `.map` source — no change to hero, services, about, contact, or any styling/copy.

- [ ] **Step 4: Commit the cleanup**

```bash
git add -A
git commit -m "Remove temporary sanity test"
```

- [ ] **Step 5: Push the branch**

Run:
```bash
git push -u origin feat/geo-aeo-markup
```

- [ ] **Step 6: Hand off (do NOT deploy automatically)**

Report to the user:
- All tasks complete, branch `feat/geo-aeo-markup` pushed, 0 vulnerabilities, build clean.
- Deployment (merge to `master`, `npm run build`, `npx pm2 reload wellnessvending`) is the user's call — same flow as prior changes.
- Post-deploy manual checks to suggest: Google Rich Results Test and the schema.org validator on `https://wellnessvendingsolutions.com`, and confirm `/llms.txt` + `/robots.txt` resolve on the live domain.

---

## Notes for the implementer

- **Apostrophes in `schema.ts` strings:** several FAQ answers contain apostrophes (`don't`, `you're`, `What's`). Write those string literals with double quotes (`"..."`) so no escaping is needed. The test in Task 2 Step 1 compares against the exact wording.
- **Do not touch `layout.tsx` metadata** — it is already strong and out of scope.
- **Do not reload PM2 / port 3002** during implementation; use the temporary port 3010 for verification so the live site is untouched until the user approves deploy.
- **No `Co-Authored-By` trailers** in commits (per project convention). Git identity is already configured for this repo.
