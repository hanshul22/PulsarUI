import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Rocket, Home, ArrowLeft } from 'lucide-react';
import gsap from 'gsap';

const NotFound = () => {
  useEffect(() => {
    // Animate the rocket
    gsap.to('.rocket', {
      y: -20,
      rotation: 5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Animate stars
    gsap.to('.star', {
      scale: 0.5,
      opacity: 0.5,
      duration: 1,
      stagger: {
        each: 0.2,
        repeat: -1,
        yoyo: true
      },
      ease: "power1.inOut"
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="star absolute w-1 h-1 bg-space-accent rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `twinkle ${2 + Math.random() * 3}s infinite`
          }}
        />
      ))}

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-0 left-0 w-96 h-96 bg-space-accent/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-space-highlight/30 rounded-full blur-3xl"
      />

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="rocket inline-block mb-4">
            <Rocket size={64} className="text-space-accent" />
          </div>
          <h1 className="text-8xl font-bold mb-4 gradient-text">404</h1>
          <p className="text-2xl text-space-text/80 mb-8">
            Houston, we have a problem! This page seems to be lost in space.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-space-accent text-white rounded-lg hover:bg-opacity-90 transition-colors group"
          >
            <Home className="group-hover:rotate-12 transition-transform" />
            <span>Back to Home</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-space-accent text-space-accent rounded-lg hover:bg-space-accent/10 transition-colors group"
          >
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span>Go Back</span>
          </button>
        </motion.div>
      </div>

      {/* Add some floating debris */}
      <motion.div
        animate={{
          y: [-20, 20],
          x: [-10, 10],
          rotate: [0, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/4 right-1/4 w-8 h-8 border-2 border-space-accent/20 rounded-lg"
      />
      <motion.div
        animate={{
          y: [20, -20],
          x: [10, -10],
          rotate: [360, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-1/4 left-1/4 w-6 h-6 border-2 border-space-highlight/20 rounded-full"
      />
    </div>
  );
};

export default NotFound;