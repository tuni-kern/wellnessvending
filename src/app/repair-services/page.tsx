import React from 'react';
import Link from 'next/link';
import Script from 'next/script';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import RepairServiceForm from '../../components/RepairServiceForm';

export const metadata = {
  title: 'Vending Machine Repair San Diego | Wellness Vending Solutions',
  description:
    'Professional vending machine repair and support in San Diego. Remote troubleshooting from $95, on-site from $200. Terminal setup, payments, refrigeration, and more.',
  alternates: { canonical: 'https://wellnessvendingsolutions.com/repair-services' },
};

export default function RepairServicesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <Script
        id="repair-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Vending Machine Repair',
            provider: {
              '@type': 'LocalBusiness',
              name: 'Wellness Vending Solutions',
              telephone: '619-776-7976',
              url: 'https://wellnessvendingsolutions.com',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'San Diego',
                addressRegion: 'CA',
                addressCountry: 'US',
              },
            },
            areaServed: { '@type': 'AdministrativeArea', name: 'San Diego County, CA' },
            offers: [
              {
                '@type': 'Offer',
                name: 'Remote Troubleshooting',
                price: '95',
                priceCurrency: 'USD',
              },
              {
                '@type': 'Offer',
                name: 'On-Site Service Visit',
                price: '200',
                priceCurrency: 'USD',
              },
            ],
          }),
        }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Same-Week Vending Machine Repair in San Diego
            </h1>
            <p className="text-xl mb-6">
              Flat rates. No diagnostic fees. Most fixes happen over the phone. Family-run since 2017, serving all of San Diego County.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <a
                href="tel:6197767976"
                className="bg-white text-primary px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition duration-300 text-center"
              >
                Call or Text 619-776-7976
              </a>
              <Link
                href="#request"
                className="bg-white/10 border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/20 transition duration-300 text-center"
              >
                Request Service
              </Link>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/90">
              <span>✓ Since 2017</span>
              <span>✓ All SD County</span>
              <span>✓ Flat-rate pricing</span>
              <span>✓ Any brand, any operator</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Transparent Pricing</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-2">Phone or Video</h3>
              <p className="text-4xl font-bold text-primary mb-4">$95<span className="text-lg text-gray-500 font-normal"> flat</span></p>
              <p className="text-gray-600 mb-4">Phone, text, or video troubleshooting. Up to 30 minutes. Most issues resolve here.</p>
              <ul className="text-gray-600 space-y-2">
                <li>• Terminal and card reader setup</li>
                <li>• Payment and price sync issues</li>
                <li>• Software and planogram config</li>
                <li>• Diagnostic triage</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-2">On-Site Visit</h3>
              <p className="text-4xl font-bold text-primary mb-4">$200<span className="text-lg text-gray-500 font-normal"> flat</span></p>
              <p className="text-gray-600 mb-4">In-person visit within SD county (15 mi). Beyond 15 mi: $0.70/mi. Parts at cost + 15%.</p>
              <ul className="text-gray-600 space-y-2">
                <li>• Refrigeration and cooling</li>
                <li>• Mechanical (motors, spirals, sensors)</li>
                <li>• Hardware diagnostics</li>
                <li>• Complex installations</li>
              </ul>
            </div>
          </div>
          <div className="max-w-4xl mx-auto mt-8 bg-white border border-primary/30 rounded-lg p-6 text-center">
            <p className="text-lg font-semibold mb-1">Need it today?</p>
            <p className="text-gray-600">Add same-day service for +50%. Call before noon for best availability.</p>
          </div>
          <p className="text-center text-gray-600 mt-6 max-w-3xl mx-auto">
            No diagnostic fees. If a phone call can&apos;t fix it, your $95 rolls into the on-site rate. You never pay twice.
          </p>
        </div>
      </section>

      {/* Common Problems */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Common Problems We Fix</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              ["Card reader won't work", "Won't take cards, takes cash but not cards, or won't power on."],
              ["Machine not cooling", "Warm drinks, compressor running loud, breaker tripping."],
              ["Products stuck or not dispensing", "Motor spins but nothing drops, broken spirals, jammed items."],
              ["Won't take cash or coins", "Bill validator rejecting, coins falling through, stuck coin returns."],
              ["Prices or display wrong", "Pricing updates, new product setup, display or software errors."],
              ["Not sure what's wrong?", "We diagnose and quote before committing. No guesswork on your end."],
            ].map(([title, desc]) => (
              <div key={title} className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-8 max-w-3xl mx-auto">
            We also handle Nayax, Cantaloupe, USA Tech, and Monarch terminals, DEX reads, VMS and planogram setup, MDB troubleshooting, and refrigeration systems.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Common Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              ['What machines do you service?', 'Most major brands: traditional snack, beverage, refrigerated, and specialty machines.'],
              ['Do you come on-site?', 'Yes, but many issues resolve over the phone first, which saves you money. We triage the call before dispatching.'],
              ['What if you can’t fix it?', 'Remote calls are capped at $95 regardless of outcome. On-site visits are quoted upfront before we dispatch, so there are no surprises.'],
              ['How fast can you come?', 'Typically within 1-2 business days. Same-day service is available at a 50% surcharge.'],
              ['Do you work on machines I didn’t buy from you?', 'Yes. Any machine, any operator, any brand.'],
            ].map(([q, a]) => (
              <div key={q} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2">{q}</h3>
                <p className="text-gray-600">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request form */}
      <section id="request" className="py-20 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-4">Request Service</h2>
          <p className="text-center text-gray-600 mb-12">Fastest way to reach us is to call or text <a href="tel:6197767976" className="text-primary font-semibold">619-776-7976</a>. Or fill out the form and we’ll respond within 24 hours.</p>
          <div className="max-w-lg mx-auto">
            <RepairServiceForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
