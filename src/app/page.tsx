import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ContactForm from '../components/ContactForm';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Snack Smart!</h1>
              <p className="text-xl mb-8">
                A small, family owned business, since 2017 here at Wellness Vending we provide custom healthy and traditional vending options for your office, business or team at no cost to you.
              </p>
              <Link 
                href="#contact" 
                className="bg-white text-primary px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition duration-300"
              >
                Get Started
              </Link>
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
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Healthy Options</h3>
              <p className="text-gray-600">
                We offer a wide range of healthy snacks and beverages to keep your team energized and focused throughout the day.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Full Meals</h3>
              <p className="text-gray-600">
                Our refrigerated machines can serve full meals like burritos, sandwiches, and salads for a convenient lunch option.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Electronic Payments</h3>
              <p className="text-gray-600">
                All our machines accept various forms of electronic payment for a seamless vending experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Better technology equals better service</h2>
              <p className="text-lg text-gray-600 mb-6">
                Upgrade your vending options with state-of-the-art refrigerated machines capable of serving full meals like burritos, sandwiches and salads. Accept all forms of electronic payment and provide a convenient and delicious option for employees.
              </p>
              <Link 
                href="#contact" 
                className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-secondary transition duration-300"
              >
                Learn More
              </Link>
            </div>
            <div className="md:w-1/2 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/WellnessMachine.png"
                alt="Modern vending machine with healthy food options and electronic payment systems in San Diego"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
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
          
          <h3 className="text-2xl font-bold text-center mb-8">Meet Our Family Team</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="rounded-lg overflow-hidden mb-4 h-48">
                <Image
                  src="/Semaya1.jpg"
                  alt="Semaya from Wellness Vending Solutions - Customer Relations Specialist in San Diego"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Semaya</h3>
              <p className="text-gray-600">Customer Relations</p>
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
                  alt="Sophia from Wellness Vending Solutions - Inventory Management Specialist in San Diego"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sophia</h3>
              <p className="text-gray-600">Inventory Management</p>
            </div>
          </div>
        </div>
      </section>

      {/* Family Gallery Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Our Family Journey</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/MCP10_3.jpg"
                alt="Wellness Vending Solutions family team providing vending services in San Diego since 2017"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">Growing Together Since 2017</h3>
              <p className="text-lg text-gray-600 mb-4">
                Our journey began with a simple idea: provide healthier snack options to businesses and their employees. What started as a small family venture has grown into a thriving business serving the community.
              </p>
              <p className="text-lg text-gray-600">
                We believe that being family-owned gives us a unique perspective on customer service. We treat every client like they're part of our extended family, providing personalized service and attention to detail that larger companies simply can't match.
              </p>
            </div>
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
    </main>
  );
} 