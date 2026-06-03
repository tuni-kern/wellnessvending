import { describe, it, expect } from 'vitest';
import { FAQS, BUSINESS, schemaGraph } from './schema';

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
