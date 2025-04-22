import React from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Page Not Found | Wellness Vending Solutions - San Diego Vending Services',
  description: 'The page you are looking for could not be found. Explore our vending machine services in San Diego or contact us for assistance.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex flex-col items-center justify-center text-center px-4 py-20">
        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 max-w-md mb-8">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        
        <div className="space-y-4">
          <h3 className="text-xl font-medium">Looking for vending machine services in San Diego?</h3>
          <p className="text-gray-600 max-w-md mb-6">
            Wellness Vending Solutions provides custom healthy and traditional vending options
            for your office, business, or team at no cost to you.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/"
              className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-secondary transition duration-300"
            >
              Return Home
            </Link>
            <Link 
              href="/#contact"
              className="bg-white border border-primary text-primary px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 