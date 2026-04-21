"use client";

import React from 'react';
import Link from 'next/link';

export default function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 shadow-lg">
      <div className="grid grid-cols-2 gap-2 p-3">
        <a
          href="tel:6197767976"
          className="bg-primary text-white text-center py-3 px-4 rounded-md font-medium"
        >
          Call Now
        </a>
        <Link
          href="#contact"
          className="bg-white border-2 border-primary text-primary text-center py-3 px-4 rounded-md font-medium"
        >
          Get Quote
        </Link>
      </div>
    </div>
  );
}
