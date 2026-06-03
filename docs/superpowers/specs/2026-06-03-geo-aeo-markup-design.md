# GEO/AEO Technical Markup Pass — Design Spec

**Date:** 2026-06-03
**Scope:** Technical markup only — single page, no new content/pages, no copy rewrites.
**Goal:** Make wellnessvendingsolutions.com more surfaceable and citable by AI answer engines (ChatGPT, Perplexity, Google AI Overviews) and improve structured-data quality for search, without changing the visible page.

## Background

The site is a single-page Next.js 15 app (App Router) served via PM2 on port 3002, public repo `tuni-kern/wellnessvending`. Prior optimization was mostly CRO (conversion copy, CTAs, a now-removed repair page). An audit found a solid SEO foundation but specific GEO/AEO gaps.

### Already in place (do not redo)
- LocalBusiness JSON-LD on the homepage (name, description, image, phone, address, priceRange, openingHours, `sameAs` → Google Maps, `areaServed` ~35 zip codes).
- Rich metadata in `src/app/layout.tsx` (title, description, keywords, OpenGraph, Twitter, canonical, robots index/follow, author, category, metadataBase).
- `src/app/robots.ts` (wildcard allow, `/admin` disallow, sitemap reference), `src/app/sitemap.ts`, `src/app/manifest.ts`.
- FAQ section with 6 Q&As as plain HTML; semantic h1/h2/h3 headings.

### Gaps this spec addresses
1. FAQ has no `FAQPage` schema (biggest AEO miss).
2. No `llms.txt`.
3. LocalBusiness schema thin (empty geo coordinates, no logo property, no entity linking).
4. No `Organization` / `WebSite` entity schema.
5. No explicit AI-crawler welcome in robots.

## Approach (chosen: C)

Extract a schema module that builds a single cross-linked JSON-LD `@graph`, with the FAQ Q&A list as a shared single source of truth used by both the visible FAQ and the FAQPage schema. This prevents the visible-vs-marked-up FAQ drift that triggers Google FAQ penalties, keeps `page.tsx` clean, and produces a coherent entity graph (the strongest signal for GEO citation).

Approaches A (separate inline blocks) and B (inline `@graph`) were rejected: A produces ambiguous/duplicate entities with no cross-linking; B bloats `page.tsx` and duplicates FAQ content.

## File-level design

### New: `src/lib/schema.ts`
Single source of truth. Exports:

- **`FAQS`** — typed `Array<{ question: string; answer: string }>`, lifted verbatim from the current `page.tsx` FAQ array (same 6 Q&As, same wording).
- **`BUSINESS`** — constant of shared NAP facts: `name`, `telephone`, `url`, `email`, `address` (locality/region/postalCode/country), `geo` (lat/long), `areaServed`, `sameAs`. Reused across schema nodes so facts never diverge.
- **`schemaGraph`** — the JSON-LD object `{ "@context": "https://schema.org", "@graph": [ ...nodes ] }` (see below).

### Edit: `src/app/page.tsx`
- Import `FAQS` and render the visible FAQ section by mapping over it (no content change — identical output to today).
- Remove the existing inline LocalBusiness `<Script>` block.
- Add one `<Script id="schema-graph" type="application/ld+json">` emitting `JSON.stringify(schemaGraph)`.
- No other JSX, layout, copy, or styling changes.

### New: `public/llms.txt`
Served at `/llms.txt` (Next.js serves `public/` at root). Plain markdown:
- `# Wellness Vending Solutions` + one-line description.
- What we offer: free healthy office vending in San Diego; no cost, no contract, full service; family-run since 2017; snacks, drinks, and refrigerated meals; modern payment (card/tap/mobile/cash).
- Service area: San Diego County (list representative zips).
- Contact: phone `619-776-7976`, email `tuni@wellnessvendingsolutions.com`.
- Key facts: free to the business, no contract, installation typically 1–2 weeks, machine removed at no charge if usage is low.
- Link: https://wellnessvendingsolutions.com

### Edit: `src/app/robots.ts`
Convert the single rule to a rules array:
- Keep wildcard `userAgent: '*'`, `allow: '/'`, `disallow: ['/admin']`.
- Add explicit `allow: '/'` rules for AI crawlers: `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `anthropic-ai`, `PerplexityBot`, `Google-Extended`.
- Keep the `sitemap` reference.

## The `@graph` (4 cross-linked nodes)

All `@id`s are absolute (`https://wellnessvendingsolutions.com/#...`).

1. **Organization** — `@id #organization`
   `name`, `url`, `logo` (ImageObject → `/logo.png`), `sameAs` → Google Maps profile, `contactPoint` (telephone, contactType "customer service"), `founder` (Person, "Tuni Kern").

2. **LocalBusiness** — `@id #localbusiness`
   Enriched current schema: `name`, `image`, `description`, `url`, `telephone`, `address` (PostalAddress), `geo` (GeoCoordinates — **91977 zip centroid, approximately 32.715 / -117.001; not the owner's street address**), `priceRange`, `openingHoursSpecification`, `areaServed` (existing zips plus "San Diego County"), `logo`, `sameAs`, and `parentOrganization` → `#organization`.

3. **WebSite** — `@id #website`
   `name`, `url`, `publisher` → `#organization`, `inLanguage` "en-US". No `SearchAction` (no on-site search).

4. **FAQPage** — `@id #faqpage`
   `mainEntity`: array of `Question` (each with `name` + `acceptedAnswer` Text) built from `FAQS`; `isPartOf` → `#website`.

### Deliberately omitted (YAGNI / policy)
- `aggregateRating` and `Review` — GBP exists but lacks enough real reviews; fabricating violates Google policy and risks rich-result penalties. Schema is structured so these can be added later from real numbers.
- `SearchAction` — no on-site search to claim.
- `BreadcrumbList` — single page.

## Data flow

`schema.ts` (`FAQS`, `BUSINESS`) → consumed at build/render time by `page.tsx` (visible FAQ + `<Script>` JSON-LD). `llms.txt` and `robots.ts` are static/independent. Everything is static data; no runtime fetching.

## Error handling

Minimal surface — all schema data is static and typed. TypeScript types on `FAQS`/`BUSINESS` guard against shape mistakes. If `FAQS` is empty the FAQ section and FAQPage simply render nothing (acceptable, not an error state).

## Testing / verification

- `npm run build` passes (type-check + lint + static generation).
- `/llms.txt` returns 200 with expected content.
- `/robots.txt` renders with the AI-crawler rules and `/admin` disallow intact.
- Homepage JSON-LD parses as a valid single `@graph` with 4 nodes; `@id` cross-references resolve.
- Visible FAQ output is byte-for-byte the same as before (shared `FAQS`).
- No visual or behavioral change to the page (diff is schema/markup only).
- Post-deploy manual check: Google Rich Results Test + schema.org validator on the live URL.

## Out of scope

New pages, content/FAQ expansion, copy rewrites, review schema, on-site search, analytics changes, metadata rewrites in `layout.tsx` (already strong).
