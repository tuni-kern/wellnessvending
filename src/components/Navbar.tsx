"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="container py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="Wellness Vending Solutions Logo"
            width={200}
            height={60}
            className="mr-4"
          />
        </div>
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-primary font-medium hover:text-secondary">
            Home
          </Link>
          <Link href="#services" className="text-gray-700 font-medium hover:text-primary">
            Services
          </Link>
          <Link href="#about" className="text-gray-700 font-medium hover:text-primary">
            About Us
          </Link>
          <Link href="#contact" className="text-gray-700 font-medium hover:text-primary">
            Contact
          </Link>
        </nav>
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-500 hover:text-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden py-4 bg-white border-t">
          <div className="container flex flex-col space-y-4">
            <Link 
              href="/" 
              className="text-primary font-medium hover:text-secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="#services" 
              className="text-gray-700 font-medium hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              href="#about" 
              className="text-gray-700 font-medium hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              href="#contact" 
              className="text-gray-700 font-medium hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
} 