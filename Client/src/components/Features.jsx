import React from 'react';
import { FeatureCard } from './FeatureCard';
import { Layers, Palette, Zap } from 'lucide-react';

const features = [
  {
    icon: Layers,
    title: "50+ Components",
    description: "Ready-to-use components that are fully customizable and space-themed, perfect for building modern web applications."
  },
  {
    icon: Palette,
    title: "Dark Mode First",
    description: "Built for the darkness of space, with perfect contrast and readability. Every component is designed with dark mode in mind."
  },
  {
    icon: Zap,
    title: "Animation Ready",
    description: "Smooth animations and transitions powered by Framer Motion and GSAP. Make your interface come alive with minimal effort."
  }
];

export function Features() {
  return (
    <div className="grid md:grid-cols-3 gap-8 mb-20 px-4">
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </div>
  );
}