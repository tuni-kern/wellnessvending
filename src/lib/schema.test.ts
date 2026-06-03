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
