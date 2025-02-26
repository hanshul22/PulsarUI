import React, { useRef, useEffect } from 'react';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';

const Dashboard = () => {
  const contentWrapperRef = useRef(null);
  const mainContentRef = useRef(null);

  return (
    <div ref={contentWrapperRef} className="transition-all duration-300">
      <main ref={mainContentRef} className="pt-24 container mx-auto px-6">
        <Hero />
        <Features />
      </main>
    </div>
  );
};

export default Dashboard;