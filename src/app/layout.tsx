import type { Metadata } from 'next';
import React from 'react';
import './globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Vending Machine Services in San Diego, CA | Wellness Vending Solutions',
  description: 'Find the best vending machine services in San Diego, CA with our comprehensive solutions. Get the convenience and variety you need, 24/7.',
  keywords: 'Vending Machine Services, San Diego, CA, Best Vending Solutions, Convenience, Variety, 24/7, 91977, 92101, 92102, 92103, 92104, 92105, 92106, 92107, 92108, 92109, 92110, 92111, 92112, 92113, 92114, 92115, 92116, 92117, 92119, 92120, 92121, 92122, 92123, 92124, 92126, 92127, 92128, 92129, 92130, 92131, 92139, 92154',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://wellnessvendingsolutions.com/',
    title: 'Vending Machine Services in San Diego, CA | Wellness Vending Solutions',
    description: 'Find the best vending machine services in San Diego, CA with our comprehensive solutions. Get the convenience and variety you need, 24/7.',
    siteName: 'Wellness Vending Solutions',
    images: [
      {
        url: '/WVFamily.avif',
        width: 600,
        height: 450,
        alt: 'Wellness Vending Solutions Family',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vending Machine Services in San Diego, CA | Wellness Vending Solutions',
    description: 'Find the best vending machine services in San Diego, CA with our comprehensive solutions. Get the convenience and variety you need, 24/7.',
    images: ['/WVFamily.avif'],
    creator: '@wellnessvending',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://wellnessvendingsolutions.com',
  },
  verification: {
    google: 'verification_token', // Replace with your Google verification token when you have one
  },
  authors: [{ name: 'Tuni Kern', url: 'https://wellnessvendingsolutions.com' }],
  category: 'Vending Services',
  metadataBase: new URL('https://wellnessvendingsolutions.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {/* Google Analytics */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-3CKGFTHT4K" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', 'G-3CKGFTHT4K');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
} 