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
