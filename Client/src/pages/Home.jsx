import React from 'react';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Hero />
      <Features />
    </div>
  );
}