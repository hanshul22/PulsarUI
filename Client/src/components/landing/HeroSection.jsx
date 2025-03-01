import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import astronaut from '../../assets/astronaut.png'
import TypeWriter from '../TypeWriterEffect';

// Text reveal animation component - simplified
const TextReveal = ({ children, delay = 0 }) => {
  return (
    <motion.div
      className="overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay, ease: [0.33, 1, 0.68, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

// Optimized particle component
const ParticlesBackground = () => {
  const particlesRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const particles = [];
    // Reduced particle count for better performance
    const particlesCount = 40;
    const colors = ['#6366F1', '#818CF8', '#A78BFA'];
    const container = particlesRef.current;
    
    // Create particles with throttled mouse interaction
    for (let i = 0; i < particlesCount; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 4 + 1;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      particle.className = 'absolute rounded-full';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = color;
      particle.style.opacity = Math.random() * 0.5 + 0.1;
      
      // Random position
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;
      
      // Store initial position
      particle.dataset.x = x;
      particle.dataset.y = y;
      
      container.appendChild(particle);
      particles.push(particle);
      
      // Initial animation with longer duration
      gsap.to(particle, {
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        duration: Math.random() * 40 + 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
    
    // Throttled mouse move handler
    let lastMoveTime = 0;
    const moveInterval = 50; // 50ms throttle
    
    const handleMouseMove = (e) => {
      const currentTime = Date.now();
      if (currentTime - lastMoveTime < moveInterval) return;
      
      lastMoveTime = currentTime;
      const { clientX, clientY } = e;
      setMousePosition({
        x: clientX / window.innerWidth,
        y: clientY / window.innerHeight
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      particles.forEach(particle => {
        gsap.killTweensOf(particle);
        particle.remove();
      });
    };
  }, []);
  
  // Update particles based on mouse position with throttling
  useEffect(() => {
    if (!particlesRef.current) return;
    
    const particles = particlesRef.current.children;
    const particlesToUpdate = Math.min(particles.length, 15); // Limit updates to 15 particles at a time
    
    for (let i = 0; i < particlesToUpdate; i++) {
      const randomIndex = Math.floor(Math.random() * particles.length);
      const particle = particles[randomIndex];
      if (!particle.dataset) continue;
      
      const baseX = parseFloat(particle.dataset.x);
      const baseY = parseFloat(particle.dataset.y);
      
      // Calculate distance from mouse
      const dx = mousePosition.x - baseX / 100;
      const dy = mousePosition.y - baseY / 100;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Only animate particles close to mouse
      if (distance < 0.3) {
        const factor = 1 - Math.min(distance * 3, 1);
        const moveX = -dx * 40 * factor;
        const moveY = -dy * 40 * factor;
        
        gsap.to(particle, {
          x: moveX,
          y: moveY,
          duration: 1,
          ease: "power2.out"
        });
      }
    }
  }, [mousePosition]);
  
  return (
    <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none"></div>
  );
};

const HeroSection = ({ introRef }) => {
  const astronautRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    // Floating animation for astronaut - simplified
    gsap.to(astronautRef.current, {
      y: -15,
      rotation: 3,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Throttled mouse move handler
    let lastMoveTime = 0;
    const moveInterval = 50; // 50ms throttle
    
    const handleMouseMove = (e) => {
      const currentTime = Date.now();
      if (currentTime - lastMoveTime < moveInterval) return;
      
      lastMoveTime = currentTime;
      
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const moveX = (x - centerX) / 40;
      const moveY = (y - centerY) / 40;
      
      setMousePosition({ x, y });
      
      // Simplified 3D effect
      gsap.to(titleRef.current, {
        x: moveX * 0.5,
        y: moveY * 0.5,
        duration: 1,
        ease: "power2.out"
      });
      
      gsap.to(astronautRef.current, {
        x: moveX * 1.2,
        y: moveY * 1.2 - 15, // Keep the floating effect
        duration: 1,
        ease: "power2.out"
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to([titleRef.current, astronautRef.current], {
        x: 0,
        y: 0,
        duration: 1,
        ease: "power2.out"
      });
      
      // Keep the floating effect for astronaut
      gsap.to(astronautRef.current, {
        y: -15,
        duration: 1,
        ease: "power2.out"
      });
    };
    
    containerRef.current.addEventListener('mousemove', handleMouseMove);
    containerRef.current.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <section 
      ref={introRef} 
      data-scroll-section 
      className="relative flex items-center min-h-screen px-8 pt-20 overflow-hidden"
    >
      {/* Optimized background effects */}
      <ParticlesBackground />
      
      {/* Simplified cosmic dust */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4 + 0.2,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              y: -Math.random() * 150 - 50,
              opacity: 0
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      <div 
        ref={containerRef}
        className="container relative grid grid-cols-1 gap-12 mx-auto z-2 md:grid-cols-2 place-items-center"
      >
        <div className="space-y-6 max-w-[550px]" data-scroll data-scroll-speed="1">
          <div ref={titleRef} className="space-y-1">
            <TextReveal delay={0.1}>
              <h1 className="text-6xl font-bold leading-tight hero-title gradient-text">Build Stellar</h1>
            </TextReveal>
            {/* <TextReveal delay={0.2}>
              <h1 className="text-6xl font-bold leading-tight hero-title gradient-text">Stellar</h1>
            </TextReveal> */}
            <TextReveal delay={0.3}>
              <h1 className="text-6xl font-bold leading-tight hero-title gradient-text">UI Components</h1>
            </TextReveal>
            {/* <TextReveal delay={0.4}>
              <h1 className="text-6xl font-bold leading-tight hero-title gradient-text">Components</h1>
            </TextReveal> */}
            <TextReveal delay={0.5}>
              <h1 className="text-6xl font-bold leading-tight hero-title gradient-text">for the Web</h1>
            </TextReveal>
            {/* <TextReveal delay={0.6}>
              <h1 className="text-6xl font-bold leading-tight hero-title gradient-text">the</h1>
            </TextReveal>
            <TextReveal delay={0.7}>
              <h1 className="text-6xl font-bold leading-tight hero-title gradient-text">Web</h1>
            </TextReveal> */}
          </div>
          
          <motion.div
            ref={descriptionRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="p-4 text-xl transition-all duration-300 border rounded-lg shadow-lg hero-description text-space-text/90 hover:text-white backdrop-blur-sm bg-white/5 border-white/10"
          >
            Create beautiful, interactive UI components for your next web project.
            Join our community of developers building the future of web design.
          </motion.div>
          
          <motion.div 
            className="flex gap-4 hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Link 
              to="/dashboard" 
              className="relative overflow-hidden group"
            >
              <div className="absolute inset-0 transition-opacity duration-300 rounded-lg bg-gradient-to-r from-space-accent to-space-highlight opacity-80 blur-sm group-hover:opacity-100"></div>
              <div className="relative flex items-center gap-2 px-6 py-3 transition-all duration-300 border rounded-lg bg-space-dark/30 backdrop-blur-md border-white/10 group-hover:border-white/20">
                <span className="font-medium text-white">Get Started</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth={2}
                  className="w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                  />
                </svg>
              </div>
            </Link>
          </motion.div>
        </div>

        <motion.div 
          className="relative flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div 
            ref={astronautRef} 
            className=" relative flex items-center justify-center transition-transform duration-500 cursor-pointer hover:scale-105 "
          >
            <div className='absolute left-32 top-12 text-black z-10'><TypeWriter/></div>
            <img 
              src={astronaut}
              alt="Astronaut"
              className="object-contain w-[500px] h-[550px] astronaut-image drop-shadow-[0_0_30px_rgba(99,102,241,0.3)] z-2"
              loading="lazy"
            />
            {/* Simplified glowing effect */}
            <div 
              className="absolute inset-0 rounded-full z-1 animate-glow"
              style={{
                background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, rgba(129,140,248,0.2) 70%, transparent 100%)',
                filter: 'blur(60px)',
                mixBlendMode: 'screen'
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;