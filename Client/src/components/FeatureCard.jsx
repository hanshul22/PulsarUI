import React from 'react';
import { motion } from 'framer-motion';

export function FeatureCard({ title, description, icon: Icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="p-8 rounded-lg bg-space-accent bg-opacity-30 border border-space-highlight border-opacity-10 hover:border-opacity-20 transition-colors"
    >
      <div className="w-12 h-12 bg-space-highlight bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
        <Icon className="text-space-highlight" size={24} />
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="opacity-80 leading-relaxed">{description}</p>
    </motion.div>
  );
}