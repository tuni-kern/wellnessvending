import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ContactForm from '../components/ContactForm';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StickyMobileCTA from '../components/StickyMobileCTA';
import Script from 'next/script';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

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

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Free Healthy Vending for Your San Diego Office</h1>
              <p className="text-xl mb-8">
                No cost, no contract, full service. Family-run since 2017.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:6197767976"
                  className="bg-white text-primary px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition duration-300 text-center"
                >
                  Call (619) 776-7976
                </a>
                <Link
                  href="#contact"
                  className="bg-white/10 border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/20 transition duration-300 text-center"
                >
                  Get My Free Consultation
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 hidden md:block">
              <div className="rounded-lg overflow-hidden border-4 border-white shadow-2xl transform rotate-3">
                <Image
                  src="/WVFamily.avif"
                  alt="Family-owned Wellness Vending Solutions team in San Diego, CA providing healthy vending services"
                  width={600}
                  height={450}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">What You Get</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">$0 Cost, No Contracts</h3>
              <p className="text-gray-600">
                Installation, stocking, and servicing are all on us. You provide the floor space. We do the rest.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Snacks, Drinks &amp; Full Meals</h3>
              <p className="text-gray-600">
                Custom mix tailored to your team. Healthy options, traditional favorites, refrigerated meals for real lunches.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Modern Payment on Every Machine</h3>
              <p className="text-gray-600">
                Cards, tap-to-pay, mobile, cash. Your team buys what they want, however they want.
              </p>
            </div>
            <Link
              href="/repair-services"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border-2 border-primary/20 hover:border-primary block"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Machine Repair →</h3>
              <p className="text-gray-600">
                Need a technician? We service all major vending machine brands in San Diego. Remote from $95, on-site from $200.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">About Wellness Vending Solutions</h2>

          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-lg text-gray-600 mb-6">
              Since 2017, Wellness Vending Solutions has been providing businesses with quality vending services. As a small, family-owned business, we take pride in our personalized approach and commitment to customer satisfaction.
            </p>
            <p className="text-lg text-gray-600">
              Our mission is to offer convenient, healthy food and beverage options that contribute to the wellbeing of your team while requiring no investment from your business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/MCP10_3.jpg"
                alt="Wellness Vending Solutions family team providing vending services in San Diego since 2017"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Growing Together Since 2017</h3>
              <p className="text-lg text-gray-600">
                Our journey began with a simple idea: provide healthier snack options to businesses and their employees. What started as a small family venture has grown into a thriving business serving San Diego.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-center mb-8">Meet Our Family Team</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="rounded-lg overflow-hidden mb-4 h-48">
                <Image
                  src="/Semaya1.jpg"
                  alt="Semaya, Tuni's daughter and Chief Taste Tester at Wellness Vending Solutions in San Diego"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Semaya</h3>
              <p className="text-gray-600">Chief Taste Tester</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="rounded-lg overflow-hidden mb-4 h-48 flex items-center justify-center">
                <Image
                  src="/TuniProfilePic.jpg"
                  alt="Tuni Kern - Owner and Operations Manager of Wellness Vending Solutions in San Diego"
                  width={180}
                  height={180}
                  className="object-cover"
                  style={{ objectPosition: '50% 15%', maxWidth: '100%', maxHeight: '100%' }}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tuni</h3>
              <p className="text-gray-600">Owner & Operations</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="rounded-lg overflow-hidden mb-4 h-48">
                <Image
                  src="/Sophia1.jpg"
                  alt="Sophia, Tuni's daughter and Snack Quality Inspector at Wellness Vending Solutions in San Diego"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sophia</h3>
              <p className="text-gray-600">Snack Quality Inspector</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Common Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
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
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <div className="max-w-lg mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
      <StickyMobileCTA />
    </main>
  );
} 