import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RiRocketLine, RiArrowRightLine } from 'react-icons/ri';

import astronaut from '../assets/astronaut img.png';

gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
  const mainRef = useRef(null);
  const introRef = useRef(null);
  const navRef = useRef(null);
  const astronautRef = useRef(null);
  const asteroidRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Dynamic background stars
      const createStar = () => {
        const star = document.createElement('div');
        star.className = 'absolute w-1 h-1 bg-white rounded-full star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        mainRef.current.appendChild(star);

        gsap.to(star, {
          opacity: Math.random(),
          scale: Math.random() * 2,
          duration: 1 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
        });
      };

      // Create multiple stars
      for (let i = 0; i < 100; i++) {
        createStar();
      }

      // Navbar animations
      const navTimeline = gsap.timeline();
      navTimeline
        .from('.nav-logo', {
          opacity: 0,
          scale: 0,
          duration: 1,
          ease: 'back.out(1.7)'
        })
        .from('.nav-left-items > *', {
          opacity: 0,
          x: -100,
          stagger: 0.1,
          ease: 'power3.out'
        }, '-=0.5')
        .from('.nav-right-items > *', {
          opacity: 0,
          x: 100,
          stagger: 0.1,
          ease: 'power3.out'
        }, '-=0.5');

      // Heading animations
      const headingTimeline = gsap.timeline();
      headingTimeline
        .from('.hero-title', {
          opacity: 0,
          y: 100,
          duration: 1.2,
          ease: 'power4.out'
        })
        .from('.hero-description', {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: 'power3.out'
        }, '-=0.4')
        .from('.hero-buttons', {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: 'power2.out'
        }, '-=0.2')
        .from('.astronaut-image', {
          opacity: 0,
          scale: 0.5,
          duration: 1,
          ease: 'back.out(1.7)'
        }, '-=0.8');

      // Floating particles
      const particles = gsap.utils.toArray('.particle');
      particles.forEach(particle => {
        gsap.to(particle, {
          x: 'random(-100, 100)',
          y: 'random(-100, 100)',
          rotation: 'random(-360, 360)',
          duration: 'random(3, 6)',
          repeat: -1,
          yoyo: true,
          ease: 'none'
        });
      });

      // Asteroid parallax effect
      const asteroids = gsap.utils.toArray('.asteroid');
      asteroids.forEach((asteroid, index) => {
        gsap.to(asteroid, {
          y: (i) => (i % 2 === 0 ? 100 : -100),
          x: (i) => (i % 2 === 0 ? -50 : 50),
          rotation: (i) => (i % 2 === 0 ? 360 : -360),
          scrollTrigger: {
            trigger: introRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            toggleActions: 'play none none reverse'
          },
          duration: 1,
          ease: 'none'
        });
      });

      // Create floating asteroids
      const createAsteroid = (size, delay) => {
        const asteroid = document.createElement('div');
        asteroid.className = `asteroid absolute bg-space-light backdrop-blur-sm rounded-full`;
        asteroid.style.width = `${size}px`;
        asteroid.style.height = `${size}px`;
        asteroid.style.left = `${Math.random() * 100}%`;
        asteroid.style.top = `${Math.random() * 100}%`;
        mainRef.current.appendChild(asteroid);

        gsap.to(asteroid, {
          x: 'random(-200, 200)',
          y: 'random(-200, 200)',
          rotation: 'random(-360, 360)',
          duration: 'random(10, 20)',
          delay,
          repeat: -1,
          yoyo: true,
          ease: 'none'
        });
      };

      // Create multiple asteroids of varying sizes
      for (let i = 0; i < 10; i++) {
        createAsteroid(20 + Math.random() * 40, i * 0.2);
      }

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="relative min-h-screen overflow-hidden bg-space-dark">
      {/* Particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full particle bg-space-accent/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}

      {/* Navigation */}
      <nav ref={navRef} className="fixed top-0 left-0 z-50 w-full px-8 py-4 bg-space-dark/80 backdrop-blur-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-bold nav-logo gradient-text">
              Pulsar UI
            </Link>
            <div className="flex gap-6 nav-left-items">
              {/* <a href="#home" className="nav-link">Home</a>
              <a href="#features" className="nav-link">Features</a>
              <a href="#features" className="nav-link">Designs</a> */}

            </div>
          </div>
          <div className="flex gap-4 nav-right-items">
            <Link to="/login" className="btn-primary">Login</Link>
            <Link to="/signup" className="btn-primary">Sign Up</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={introRef} className="relative flex items-center min-h-screen px-8 pt-20">
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: 'radial-gradient(circle at 70% 50%, transparent 0%, rgba(11, 14, 24, 0.99) 70%)'
          }}
        />

        <div className="container relative z-10 grid grid-cols-2 gap-12 mx-auto">
          <div className="space-y-6">
            <h1 className="text-6xl font-bold leading-tight hero-title gradient-text">
              Build Stellar UI Components for the Web
            </h1>
            <p className="text-xl hero-description text-space-text/80">
              Create beautiful, interactive, and space-themed components for your next web project.
              Join our community of developers building the future of web design.
            </p>
            <div className="flex gap-4 hero-buttons">
              <Link 
                to="/dashboard" 
                className="btn-primary"
              >
                <p data-text="Get Started">Get Started</p>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth={4}
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                  />
                </svg>
              </Link>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div ref={astronautRef} className="relative flex items-center justify-center">
              <img 
                src={astronaut}
                alt="Astronaut"
                className="object-contain w-96 h-96 astronaut-image"
              />
              {/* Enhanced glowing effect behind astronaut */}
              <div 
                className="absolute inset-0 rounded-full bg-space-accent/20 blur-3xl -z-10"
                style={{
                  background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, rgba(129,140,248,0.1) 100%)',
                  filter: 'blur(40px)',
                  mixBlendMode: 'screen'
                }}
              />
            </div>
          </div>
        </div>

        {/* Enhanced decorative elements */}
        <div className="absolute w-20 h-20 rounded-full bottom-10 left-10 bg-space-accent/30 blur-xl animate-pulse" />
        <div className="absolute w-32 h-32 rounded-full top-20 right-20 bg-space-highlight/20 blur-xl animate-pulse-slow" />
      </section>
    </div>
  );
};

export default Landing;