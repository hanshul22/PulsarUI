import React from 'react';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-20"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-20 h-20 mx-auto mb-8 bg-space-accent rounded-full flex items-center justify-center"
      >
        <Rocket size={32} className="text-white" />
      </motion.div>
      <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-space-text to-space-highlight text-transparent bg-clip-text">
        Welcome to Pulser UI
      </h1>
      <p className="text-xl opacity-80 max-w-2xl mx-auto mb-12 leading-relaxed">
        Your space-themed component library that brings your applications to new frontiers with stunning components and smooth animations.
      </p>
      <motion.div 
        className="flex gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Link 
          to="/components/navigation"
          className="px-8 py-3 bg-space-highlight text-white text-base font-semibold rounded-lg hover:bg-opacity-90 transition-colors"
        >
          View Components
        </Link>
        <Link 
          to="/docs"
          className="px-8 py-3 border border-space-highlight text-space-highlight font-semibold rounded-lg hover:bg-space-highlight hover:bg-opacity-10 transition-colors"
        >
          Documentation
        </Link>
      </motion.div>
    </motion.div>
  );
}